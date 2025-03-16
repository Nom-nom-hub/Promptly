console.log('prompts.js loading, version:', PROMPTS_VERSION);

// Sample prompts data
const defaultPromptsData = [
    {
        id: 1,
        title: "Blog Post Outline",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections with subpoints, and a conclusion.",
        category: "writing"
    },
    {
        id: 2,
        title: "Creative Writing Prompt",
        content: "Write a short story about a character who discovers an old diary in their attic.",
        category: "writing"
    },
    {
        id: 3,
        title: "Code Refactoring",
        content: "Refactor this code to improve readability and performance while maintaining the same functionality: [CODE]",
        category: "coding"
    },
    {
        id: 4,
        title: "Marketing Email",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 5,
        title: "Data Analysis",
        content: "Analyze this dataset and provide insights on [TOPIC]. Here's the data: [DATA]",
        category: "data"
    },
    {
        id: 6,
        title: "Product Review",
        content: "Write a detailed review of [PRODUCT] based on my experience with it.",
        category: "reviews"
    },
    {
        id: 7,
        title: "Social Media Post",
        content: "Create a social media post for [PLATFORM] about [TOPIC] that includes a call to action and a relevant image.",
        category: "social media"
    },
    {
        id: 8,
        title: "Email Campaign",
        content: "Design an email campaign for [CAMPAIGN_NAME] that includes a series of emails with a consistent theme and a call to action.",
        category: "email"
    },
    {
        id: 9,
        title: "Content Creation",
        content: "Generate a blog post about [TOPIC] that includes a strong call to action and a relevant image.",
        category: "content creation"
    },
    {
        id: 10,
        title: "Product Description",
        content: "Write a detailed description of [PRODUCT] that includes its key features and benefits.",
        category: "marketing"
    }
];

// Initialize the prompts data
if (typeof window.promptsData === 'undefined') {
    window.promptsData = [...defaultPromptsData];
}

// Improved function to fetch the latest prompts from GitHub
async function fetchLatestPrompts() {
    try {
        // Add cache-busting parameter to avoid browser caching
        const url = `https://raw.githubusercontent.com/nom-nom-hub/Promptly/main/js/prompts.js?v=${Date.now()}`;
        console.log('Fetching latest prompts from GitHub:', url);
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch prompts: ${response.status}`);
        }
        
        const promptsJs = await response.text();
        console.log('Fetched prompts.js, length:', promptsJs.length);
        
        // Execute the fetched JS directly to get the most up-to-date prompts
        // First, save the current promptsData
        const oldPromptsData = window.promptsData || [];
        
        // Create a temporary function to evaluate the script in a controlled way
        const evalPrompts = new Function(promptsJs + '; return defaultPromptsData;');
        
        try {
            // Get the latest defaultPromptsData
            const remotePromptsData = evalPrompts();
            console.log('Parsed remote prompts:', remotePromptsData.length);
            
            // Merge with local custom prompts (if any)
            const localCustomPrompts = oldPromptsData.filter(p => p.custom === true);
            
            // Replace the prompts data with the merged data
            window.promptsData = [...remotePromptsData, ...localCustomPrompts];
            
            console.log('Merged prompts:', window.promptsData.length, 'items');
            
            // Save to localStorage for offline use
            localStorage.setItem('latestPrompts', JSON.stringify(remotePromptsData));
            localStorage.setItem('lastPromptSync', new Date().toISOString());
            
            // Update the UI if it's already initialized
            if (typeof displayPrompts === 'function') {
                displayPrompts();
                if (typeof updateStats === 'function') {
                    updateStats();
                }
                showToast('Prompts updated successfully!', 'success');
            }
            
            // Dispatch event that prompts were updated
            window.dispatchEvent(new Event('promptsUpdated'));
            
            return true;
        } catch (evalError) {
            console.error('Error evaluating fetched prompts:', evalError);
            throw evalError;
        }
    } catch (error) {
        console.error('Error fetching latest prompts:', error);
        showToast('Failed to fetch latest prompts', 'error');
        
        // Try to load from localStorage if available
        const savedPrompts = localStorage.getItem('latestPrompts');
        if (savedPrompts) {
            try {
                const parsedPrompts = JSON.parse(savedPrompts);
                console.log('Using cached prompts from localStorage:', parsedPrompts.length);
                
                // Merge with local custom prompts
                const oldPromptsData = window.promptsData || [];
                const localCustomPrompts = oldPromptsData.filter(p => p.custom === true);
                window.promptsData = [...parsedPrompts, ...localCustomPrompts];
                
                // Update the UI if it's already initialized
                if (typeof displayPrompts === 'function') {
                    displayPrompts();
                    if (typeof updateStats === 'function') {
                        updateStats();
                    }
                }
            } catch (e) {
                console.error('Error parsing cached prompts:', e);
            }
        }
        
        return false;
    }
}

// Make sure fetchLatestPrompts is globally available
window.fetchLatestPrompts = fetchLatestPrompts;

// Function to ensure prompts are displayed
function ensurePromptsDisplayed() {
    console.log('Ensuring prompts are displayed...');
    
    // If displayPrompts function exists, call it
    if (typeof displayPrompts === 'function') {
        console.log('Calling displayPrompts function');
        displayPrompts();
        
        // Also update stats if that function exists
        if (typeof updateStats === 'function') {
            updateStats();
        }
    } else {
        console.log('displayPrompts function not available yet, will try again');
        // Try again in a moment
        setTimeout(ensurePromptsDisplayed, 500);
    }
    
    // Hide loading indicators
    const loadingIndicators = document.querySelectorAll('#loading-indicator, .loading-indicator, #loading-status');
    loadingIndicators.forEach(indicator => {
        if (indicator) {
            indicator.style.display = 'none';
        }
    });
}

// Always try to fetch the latest prompts on page load
// This ensures GitHub Pages always shows the latest generated prompts
window.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, displaying initial prompts and fetching latest...');
    
    // First display the default prompts immediately
    ensurePromptsDisplayed();
    
    // Then try to fetch the latest prompts
    setTimeout(() => {
        fetchLatestPrompts().then(success => {
            console.log('Initial prompt sync completed:', success ? 'success' : 'failed');
            // Ensure prompts are displayed after fetch attempt
            ensurePromptsDisplayed();
        });
    }, 1000); // Short delay to ensure other scripts are loaded
});

// Signal that prompts are loaded
window.promptsLoaded = true;
// Dispatch event for other scripts waiting on prompts
window.dispatchEvent(new Event('promptsLoaded'));

// Ensure prompts are displayed after a short delay
setTimeout(ensurePromptsDisplayed, 1000);

// New prompts generated on 2025-03-16T18:34:52.004Z
const newGeneratedPrompts = [
    {
        id: 11,
        title: "Social Media Post Template",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 12,
        title: "API Documentation Framework",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 13,
        title: "Statistical Model Guide",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 14,
        title: "Color Scheme Generator",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 15,
        title: "Data Visualization Assistant",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 16,
        title: "Meeting Agenda Framework",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 17,
        title: "Algorithm Design Template",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 18,
        title: "Data Visualization Template",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 19,
        title: "Brand Guidelines Generator",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 20,
        title: "Blog Post Guide",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    }
];

// Add these to defaultPromptsData
defaultPromptsData.push(...newGeneratedPrompts);

// New prompts generated on 2025-03-16T18:36:36.807Z
const newGeneratedPrompts = [
    {
        id: 21,
        title: "Business Plan Generator",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 22,
        title: "Brand Guidelines Assistant",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 23,
        title: "UI Mockup Guide",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 24,
        title: "Article Outline Assistant",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 25,
        title: "Statistical Model Guide",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 26,
        title: "Algorithm Design Generator",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 27,
        title: "Algorithm Design Guide",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 28,
        title: "Color Scheme Guide",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 29,
        title: "Brand Guidelines Assistant",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 30,
        title: "API Documentation Assistant",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 31,
        title: "Brand Guidelines Guide",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 32,
        title: "API Documentation Generator",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 33,
        title: "SWOT Analysis Generator",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 34,
        title: "Data Analysis Template",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 35,
        title: "Blog Post Template",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 36,
        title: "Marketing Strategy Template",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 37,
        title: "Brand Guidelines Guide",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 38,
        title: "Color Scheme Template",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 39,
        title: "Marketing Strategy Assistant",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 40,
        title: "Color Scheme Guide",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 41,
        title: "Code Review Guide",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 42,
        title: "Email Campaign Guide",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 43,
        title: "Essay Structure Assistant",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 44,
        title: "Essay Structure Assistant",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 45,
        title: "Color Scheme Guide",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 46,
        title: "Color Scheme Generator",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 47,
        title: "Article Outline Assistant",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 48,
        title: "API Documentation Generator",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 49,
        title: "Statistical Model Guide",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 50,
        title: "Executive Summary Assistant",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 51,
        title: "Data Analysis Framework",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 52,
        title: "Executive Summary Assistant",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 53,
        title: "UI Mockup Framework",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 54,
        title: "Business Plan Template",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 55,
        title: "Statistical Model Framework",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 56,
        title: "Statistical Model Template",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 57,
        title: "Email Campaign Template",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 58,
        title: "SWOT Analysis Assistant",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 59,
        title: "Executive Summary Generator",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 60,
        title: "API Documentation Generator",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 61,
        title: "Article Outline Framework",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 62,
        title: "Layout Design Generator",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 63,
        title: "Algorithm Design Framework",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 64,
        title: "Layout Design Guide",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 65,
        title: "Layout Design Template",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 66,
        title: "API Documentation Assistant",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 67,
        title: "Ad Copy Assistant",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 68,
        title: "Ad Copy Template",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 69,
        title: "Email Campaign Guide",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 70,
        title: "Ad Copy Generator",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 71,
        title: "Algorithm Design Guide",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 72,
        title: "Statistical Model Generator",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 73,
        title: "Story Idea Generator",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 74,
        title: "SWOT Analysis Assistant",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 75,
        title: "SWOT Analysis Template",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 76,
        title: "Statistical Model Guide",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 77,
        title: "Data Analysis Framework",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 78,
        title: "Data Analysis Framework",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 79,
        title: "Story Idea Template",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 80,
        title: "Layout Design Assistant",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 81,
        title: "Marketing Strategy Framework",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 82,
        title: "UI Mockup Assistant",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 83,
        title: "Chart Interpretation Guide",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 84,
        title: "API Documentation Generator",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 85,
        title: "Meeting Agenda Framework",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 86,
        title: "SWOT Analysis Template",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 87,
        title: "Chart Interpretation Template",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 88,
        title: "Essay Structure Framework",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 89,
        title: "Email Campaign Generator",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 90,
        title: "Executive Summary Guide",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 91,
        title: "Executive Summary Generator",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 92,
        title: "Story Idea Framework",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 93,
        title: "SWOT Analysis Assistant",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 94,
        title: "Business Plan Assistant",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 95,
        title: "Code Review Guide",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 96,
        title: "Article Outline Framework",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 97,
        title: "Data Visualization Assistant",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 98,
        title: "Executive Summary Template",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 99,
        title: "Marketing Strategy Generator",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 100,
        title: "Ad Copy Guide",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 101,
        title: "Story Idea Framework",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 102,
        title: "Executive Summary Framework",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 103,
        title: "API Documentation Assistant",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 104,
        title: "Meeting Agenda Assistant",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 105,
        title: "Debugging Help Guide",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 106,
        title: "Brand Guidelines Guide",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 107,
        title: "Layout Design Guide",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 108,
        title: "Executive Summary Framework",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 109,
        title: "Marketing Strategy Assistant",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 110,
        title: "UI Mockup Guide",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 111,
        title: "Algorithm Design Template",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 112,
        title: "Business Plan Framework",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 113,
        title: "Marketing Strategy Template",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 114,
        title: "Ad Copy Assistant",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 115,
        title: "Blog Post Template",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 116,
        title: "Chart Interpretation Generator",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 117,
        title: "Email Campaign Generator",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 118,
        title: "UI Mockup Generator",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 119,
        title: "Algorithm Design Template",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 120,
        title: "Business Plan Template",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    }
];

// Add these to defaultPromptsData
defaultPromptsData.push(...newGeneratedPrompts);

// New prompts generated on 2025-03-16T18:41:06.941Z
const newGeneratedPrompts = [
    {
        id: 121,
        title: "Wireframe Develop optimizes",
        content: "Develop a wireframe for [WEBSITE_TYPE] that optimizes for [CONVERSION_GOAL].",
        category: "design",
        ai: "Llama"
    },
    {
        id: 122,
        title: "Includes palette, color",
        content: "Create a brand style guide for [COMPANY] that includes color palette, typography, and usage guidelines.",
        category: "design",
        ai: "Llama"
    },
    {
        id: 123,
        title: "Research findings, methodology,",
        content: "Summarize the key findings, methodology, and implications of research on [TOPIC] in a clear and concise manner.",
        category: "writing",
        ai: "Gemini"
    },
    {
        id: 124,
        title: "Step-by-step implement Create",
        content: "Create a step-by-step tutorial on how to implement [FEATURE] in [FRAMEWORK].",
        category: "coding",
        ai: "Llama"
    },
    {
        id: 125,
        title: "Write space optimal",
        content: "Write a function in [LANGUAGE] that [FUNCTIONALITY] with optimal time and space complexity.",
        category: "coding",
        ai: "GPT-4"
    },
    {
        id: 126,
        title: "Develop engagement increase",
        content: "Develop a content strategy for [BRAND] that will increase engagement on [PLATFORM].",
        category: "marketing",
        ai: "Claude"
    },
    {
        id: 127,
        title: "About addresses includes",
        content: "Create a detailed [CONTENT_TYPE] about [TOPIC] that includes [STRUCTURE] and addresses [AUDIENCE].",
        category: "writing",
        ai: "Gemini"
    },
    {
        id: 128,
        title: "Focus marketing Create",
        content: "Create a marketing campaign for [PRODUCT] targeting [AUDIENCE] with a focus on [BENEFIT].",
        category: "marketing",
        ai: "Llama"
    },
    {
        id: 129,
        title: "Interface improves emphasizes",
        content: "Design a user interface for [APPLICATION] that emphasizes [DESIGN_PRINCIPLE] and improves [USER_EXPERIENCE].",
        category: "design",
        ai: "GPT-4"
    },
    {
        id: 130,
        title: "Create strategy effectively",
        content: "Create a data visualization strategy for [DATA_TYPE] that effectively communicates [KEY_INSIGHT].",
        category: "data",
        ai: "Claude"
    },
    {
        id: 131,
        title: "Optimizes wireframe Develop",
        content: "Develop a wireframe for [WEBSITE_TYPE] that optimizes for [CONVERSION_GOAL].",
        category: "design",
        ai: "Llama"
    },
    {
        id: 132,
        title: "Develop comprehensive tailored",
        content: "Develop a comprehensive [CONTENT_TYPE] on [TOPIC] with [STRUCTURE] tailored for [AUDIENCE].",
        category: "writing",
        ai: "Claude"
    },
    {
        id: 133,
        title: "Effectively Create strategy",
        content: "Create a data visualization strategy for [DATA_TYPE] that effectively communicates [KEY_INSIGHT].",
        category: "data",
        ai: "Llama"
    },
    {
        id: 134,
        title: "Addresses detailed about",
        content: "Create a detailed [CONTENT_TYPE] about [TOPIC] that includes [STRUCTURE] and addresses [AUDIENCE].",
        category: "writing",
        ai: "Claude"
    },
    {
        id: 135,
        title: "Strategy. includes market",
        content: "Create a business plan for [BUSINESS_TYPE] that includes market analysis, financial projections, and growth strategy.",
        category: "business",
        ai: "Llama"
    },
    {
        id: 136,
        title: "Methodology, research concise",
        content: "Summarize the key findings, methodology, and implications of research on [TOPIC] in a clear and concise manner.",
        category: "writing",
        ai: "Claude"
    },
    {
        id: 137,
        title: "Provide insights Analyze",
        content: "Analyze this dataset about [TOPIC] and provide insights on [SPECIFIC_QUESTION].",
        category: "data",
        ai: "GPT-4"
    },
    {
        id: 138,
        title: "Improves interface emphasizes",
        content: "Design a user interface for [APPLICATION] that emphasizes [DESIGN_PRINCIPLE] and improves [USER_EXPERIENCE].",
        category: "design",
        ai: "GPT-4"
    },
    {
        id: 139,
        title: "Visualization effectively communicates",
        content: "Create a data visualization strategy for [DATA_TYPE] that effectively communicates [KEY_INSIGHT].",
        category: "data",
        ai: "Llama"
    },
    {
        id: 140,
        title: "Strategy communicates effectively",
        content: "Create a data visualization strategy for [DATA_TYPE] that effectively communicates [KEY_INSIGHT].",
        category: "data",
        ai: "Llama"
    },
    {
        id: 141,
        title: "Dashboard tracks Design",
        content: "Design a dashboard that tracks [METRICS] for a [BUSINESS_TYPE].",
        category: "data",
        ai: "GPT-4"
    },
    {
        id: 142,
        title: "Methodology, Summarize findings,",
        content: "Summarize the key findings, methodology, and implications of research on [TOPIC] in a clear and concise manner.",
        category: "writing",
        ai: "Llama"
    },
    {
        id: 143,
        title: "Comprehensive Develop tailored",
        content: "Develop a comprehensive [CONTENT_TYPE] on [TOPIC] with [STRUCTURE] tailored for [AUDIENCE].",
        category: "writing",
        ai: "Claude"
    },
    {
        id: 144,
        title: "Dashboard Design tracks",
        content: "Design a dashboard that tracks [METRICS] for a [BUSINESS_TYPE].",
        category: "data",
        ai: "Claude"
    },
    {
        id: 145,
        title: "Addresses about detailed",
        content: "Create a detailed [CONTENT_TYPE] about [TOPIC] that includes [STRUCTURE] and addresses [AUDIENCE].",
        category: "writing",
        ai: "Claude"
    },
    {
        id: 146,
        title: "Effectively visualization communicates",
        content: "Create a data visualization strategy for [DATA_TYPE] that effectively communicates [KEY_INSIGHT].",
        category: "data",
        ai: "Claude"
    },
    {
        id: 147,
        title: "Appeal pitch Develop",
        content: "Develop a pitch deck for [STARTUP_IDEA] that will appeal to [INVESTOR_TYPE].",
        category: "business",
        ai: "GPT-4"
    },
    {
        id: 148,
        title: "Provide Analyze insights",
        content: "Analyze this dataset about [TOPIC] and provide insights on [SPECIFIC_QUESTION].",
        category: "data",
        ai: "Llama"
    },
    {
        id: 149,
        title: "Create implement tutorial",
        content: "Create a step-by-step tutorial on how to implement [FEATURE] in [FRAMEWORK].",
        category: "coding",
        ai: "Gemini"
    },
    {
        id: 150,
        title: "Function optimal Write",
        content: "Write a function in [LANGUAGE] that [FUNCTIONALITY] with optimal time and space complexity.",
        category: "coding",
        ai: "Gemini"
    },
    {
        id: 151,
        title: "Optimizes Develop wireframe",
        content: "Develop a wireframe for [WEBSITE_TYPE] that optimizes for [CONVERSION_GOAL].",
        category: "design",
        ai: "GPT-4"
    },
    {
        id: 152,
        title: "Projections, business Create",
        content: "Create a business plan for [BUSINESS_TYPE] that includes market analysis, financial projections, and growth strategy.",
        category: "business",
        ai: "Gemini"
    },
    {
        id: 153,
        title: "Wireframe Develop optimizes",
        content: "Develop a wireframe for [WEBSITE_TYPE] that optimizes for [CONVERSION_GOAL].",
        category: "design",
        ai: "Claude"
    },
    {
        id: 154,
        title: "Palette, brand typography,",
        content: "Create a brand style guide for [COMPANY] that includes color palette, typography, and usage guidelines.",
        category: "design",
        ai: "Gemini"
    },
    {
        id: 155,
        title: "Compelling Write objections",
        content: "Write a compelling email sequence for [PRODUCT_LAUNCH] that addresses common objections and includes clear CTAs.",
        category: "marketing",
        ai: "Llama"
    },
    {
        id: 156,
        title: "Comprehensive tailored Develop",
        content: "Develop a comprehensive [CONTENT_TYPE] on [TOPIC] with [STRUCTURE] tailored for [AUDIENCE].",
        category: "writing",
        ai: "Gemini"
    },
    {
        id: 157,
        title: "Implications Summarize concise",
        content: "Summarize the key findings, methodology, and implications of research on [TOPIC] in a clear and concise manner.",
        category: "writing",
        ai: "GPT-4"
    },
    {
        id: 158,
        title: "Business Create strategy.",
        content: "Create a business plan for [BUSINESS_TYPE] that includes market analysis, financial projections, and growth strategy.",
        category: "business",
        ai: "GPT-4"
    },
    {
        id: 159,
        title: "Tutorial Create step-by-step",
        content: "Create a step-by-step tutorial on how to implement [FEATURE] in [FRAMEWORK].",
        category: "coding",
        ai: "Gemini"
    },
    {
        id: 160,
        title: "Detailed Create about",
        content: "Create a detailed [CONTENT_TYPE] about [TOPIC] that includes [STRUCTURE] and addresses [AUDIENCE].",
        category: "writing",
        ai: "GPT-4"
    },
    {
        id: 161,
        title: "Develop increase engagement",
        content: "Develop a content strategy for [BRAND] that will increase engagement on [PLATFORM].",
        category: "marketing",
        ai: "GPT-4"
    },
    {
        id: 162,
        title: "Marketing targeting focus",
        content: "Create a marketing campaign for [PRODUCT] targeting [AUDIENCE] with a focus on [BENEFIT].",
        category: "marketing",
        ai: "Llama"
    },
    {
        id: 163,
        title: "Financial business market",
        content: "Create a business plan for [BUSINESS_TYPE] that includes market analysis, financial projections, and growth strategy.",
        category: "business",
        ai: "Llama"
    },
    {
        id: 164,
        title: "Supposed Debug that's",
        content: "Debug this [LANGUAGE] code that's supposed to [FUNCTIONALITY] but is producing [ERROR].",
        category: "coding",
        ai: "Claude"
    },
    {
        id: 165,
        title: "Supposed producing that's",
        content: "Debug this [LANGUAGE] code that's supposed to [FUNCTIONALITY] but is producing [ERROR].",
        category: "coding",
        ai: "Claude"
    },
    {
        id: 166,
        title: "About addresses includes",
        content: "Create a detailed [CONTENT_TYPE] about [TOPIC] that includes [STRUCTURE] and addresses [AUDIENCE].",
        category: "writing",
        ai: "GPT-4"
    },
    {
        id: 167,
        title: "Create implement tutorial",
        content: "Create a step-by-step tutorial on how to implement [FEATURE] in [FRAMEWORK].",
        category: "coding",
        ai: "Gemini"
    },
    {
        id: 168,
        title: "Engagement increase Develop",
        content: "Develop a content strategy for [BRAND] that will increase engagement on [PLATFORM].",
        category: "marketing",
        ai: "Gemini"
    },
    {
        id: 169,
        title: "Effectively Create communicates",
        content: "Create a data visualization strategy for [DATA_TYPE] that effectively communicates [KEY_INSIGHT].",
        category: "data",
        ai: "Gemini"
    },
    {
        id: 170,
        title: "Communicates visualization effectively",
        content: "Create a data visualization strategy for [DATA_TYPE] that effectively communicates [KEY_INSIGHT].",
        category: "data",
        ai: "Llama"
    },
    {
        id: 171,
        title: "Develop appeal pitch",
        content: "Develop a pitch deck for [STARTUP_IDEA] that will appeal to [INVESTOR_TYPE].",
        category: "business",
        ai: "GPT-4"
    },
    {
        id: 172,
        title: "Write space complexity.",
        content: "Write a function in [LANGUAGE] that [FUNCTIONALITY] with optimal time and space complexity.",
        category: "coding",
        ai: "Gemini"
    },
    {
        id: 173,
        title: "Tracks dashboard Design",
        content: "Design a dashboard that tracks [METRICS] for a [BUSINESS_TYPE].",
        category: "data",
        ai: "Gemini"
    },
    {
        id: 174,
        title: "Optimizes Develop wireframe",
        content: "Develop a wireframe for [WEBSITE_TYPE] that optimizes for [CONVERSION_GOAL].",
        category: "design",
        ai: "Claude"
    },
    {
        id: 175,
        title: "That's producing Debug",
        content: "Debug this [LANGUAGE] code that's supposed to [FUNCTIONALITY] but is producing [ERROR].",
        category: "coding",
        ai: "Llama"
    },
    {
        id: 176,
        title: "Color usage brand",
        content: "Create a brand style guide for [COMPANY] that includes color palette, typography, and usage guidelines.",
        category: "design",
        ai: "Llama"
    },
    {
        id: 177,
        title: "Analysis industry. detailed",
        content: "Write a detailed SWOT analysis for [COMPANY] in the [INDUSTRY] industry.",
        category: "business",
        ai: "Claude"
    },
    {
        id: 178,
        title: "Marketing targeting campaign",
        content: "Create a marketing campaign for [PRODUCT] targeting [AUDIENCE] with a focus on [BENEFIT].",
        category: "marketing",
        ai: "Claude"
    },
    {
        id: 179,
        title: "Optimizes wireframe Develop",
        content: "Develop a wireframe for [WEBSITE_TYPE] that optimizes for [CONVERSION_GOAL].",
        category: "design",
        ai: "GPT-4"
    },
    {
        id: 180,
        title: "Strategy visualization Create",
        content: "Create a data visualization strategy for [DATA_TYPE] that effectively communicates [KEY_INSIGHT].",
        category: "data",
        ai: "GPT-4"
    },
    {
        id: 181,
        title: "Includes clear addresses",
        content: "Write a compelling email sequence for [PRODUCT_LAUNCH] that addresses common objections and includes clear CTAs.",
        category: "marketing",
        ai: "Llama"
    },
    {
        id: 182,
        title: "Create campaign focus",
        content: "Create a marketing campaign for [PRODUCT] targeting [AUDIENCE] with a focus on [BENEFIT].",
        category: "marketing",
        ai: "Gemini"
    },
    {
        id: 183,
        title: "Increase engagement Develop",
        content: "Develop a content strategy for [BRAND] that will increase engagement on [PLATFORM].",
        category: "marketing",
        ai: "Llama"
    },
    {
        id: 184,
        title: "Addresses Create detailed",
        content: "Create a detailed [CONTENT_TYPE] about [TOPIC] that includes [STRUCTURE] and addresses [AUDIENCE].",
        category: "writing",
        ai: "Gemini"
    },
    {
        id: 185,
        title: "Email addresses clear",
        content: "Write a compelling email sequence for [PRODUCT_LAUNCH] that addresses common objections and includes clear CTAs.",
        category: "marketing",
        ai: "GPT-4"
    },
    {
        id: 186,
        title: "Develop tailored comprehensive",
        content: "Develop a comprehensive [CONTENT_TYPE] on [TOPIC] with [STRUCTURE] tailored for [AUDIENCE].",
        category: "writing",
        ai: "Claude"
    },
    {
        id: 187,
        title: "Visualization Create strategy",
        content: "Create a data visualization strategy for [DATA_TYPE] that effectively communicates [KEY_INSIGHT].",
        category: "data",
        ai: "GPT-4"
    },
    {
        id: 188,
        title: "Addresses about Create",
        content: "Create a detailed [CONTENT_TYPE] about [TOPIC] that includes [STRUCTURE] and addresses [AUDIENCE].",
        category: "writing",
        ai: "GPT-4"
    },
    {
        id: 189,
        title: "Interface Design emphasizes",
        content: "Design a user interface for [APPLICATION] that emphasizes [DESIGN_PRINCIPLE] and improves [USER_EXPERIENCE].",
        category: "design",
        ai: "Claude"
    },
    {
        id: 190,
        title: "Design improves emphasizes",
        content: "Design a user interface for [APPLICATION] that emphasizes [DESIGN_PRINCIPLE] and improves [USER_EXPERIENCE].",
        category: "design",
        ai: "Claude"
    },
    {
        id: 191,
        title: "Create usage brand",
        content: "Create a brand style guide for [COMPANY] that includes color palette, typography, and usage guidelines.",
        category: "design",
        ai: "Llama"
    },
    {
        id: 192,
        title: "Methodology, concise implications",
        content: "Summarize the key findings, methodology, and implications of research on [TOPIC] in a clear and concise manner.",
        category: "writing",
        ai: "Claude"
    },
    {
        id: 193,
        title: "Develop pitch appeal",
        content: "Develop a pitch deck for [STARTUP_IDEA] that will appeal to [INVESTOR_TYPE].",
        category: "business",
        ai: "Gemini"
    },
    {
        id: 194,
        title: "Brand guide typography,",
        content: "Create a brand style guide for [COMPANY] that includes color palette, typography, and usage guidelines.",
        category: "design",
        ai: "Claude"
    },
    {
        id: 195,
        title: "Develop appeal pitch",
        content: "Develop a pitch deck for [STARTUP_IDEA] that will appeal to [INVESTOR_TYPE].",
        category: "business",
        ai: "GPT-4"
    },
    {
        id: 196,
        title: "Detailed Write industry.",
        content: "Write a detailed SWOT analysis for [COMPANY] in the [INDUSTRY] industry.",
        category: "business",
        ai: "GPT-4"
    },
    {
        id: 197,
        title: "Design tracks dashboard",
        content: "Design a dashboard that tracks [METRICS] for a [BUSINESS_TYPE].",
        category: "data",
        ai: "Claude"
    },
    {
        id: 198,
        title: "Optimizes Develop wireframe",
        content: "Develop a wireframe for [WEBSITE_TYPE] that optimizes for [CONVERSION_GOAL].",
        category: "design",
        ai: "GPT-4"
    },
    {
        id: 199,
        title: "Develop optimizes wireframe",
        content: "Develop a wireframe for [WEBSITE_TYPE] that optimizes for [CONVERSION_GOAL].",
        category: "design",
        ai: "Llama"
    },
    {
        id: 200,
        title: "Sequence CTAs. addresses",
        content: "Write a compelling email sequence for [PRODUCT_LAUNCH] that addresses common objections and includes clear CTAs.",
        category: "marketing",
        ai: "Gemini"
    },
    {
        id: 201,
        title: "Analyze dataset about",
        content: "Analyze this dataset about [TOPIC] and provide insights on [SPECIFIC_QUESTION].",
        category: "data",
        ai: "Claude"
    },
    {
        id: 202,
        title: "Focus targeting marketing",
        content: "Create a marketing campaign for [PRODUCT] targeting [AUDIENCE] with a focus on [BENEFIT].",
        category: "marketing",
        ai: "Claude"
    },
    {
        id: 203,
        title: "Space optimal Write",
        content: "Write a function in [LANGUAGE] that [FUNCTIONALITY] with optimal time and space complexity.",
        category: "coding",
        ai: "Gemini"
    },
    {
        id: 204,
        title: "Usage color palette,",
        content: "Create a brand style guide for [COMPANY] that includes color palette, typography, and usage guidelines.",
        category: "design",
        ai: "Claude"
    },
    {
        id: 205,
        title: "Effectively strategy Create",
        content: "Create a data visualization strategy for [DATA_TYPE] that effectively communicates [KEY_INSIGHT].",
        category: "data",
        ai: "Gemini"
    },
    {
        id: 206,
        title: "Strategy effectively visualization",
        content: "Create a data visualization strategy for [DATA_TYPE] that effectively communicates [KEY_INSIGHT].",
        category: "data",
        ai: "GPT-4"
    },
    {
        id: 207,
        title: "Color style palette,",
        content: "Create a brand style guide for [COMPANY] that includes color palette, typography, and usage guidelines.",
        category: "design",
        ai: "Llama"
    },
    {
        id: 208,
        title: "Supposed Debug producing",
        content: "Debug this [LANGUAGE] code that's supposed to [FUNCTIONALITY] but is producing [ERROR].",
        category: "coding",
        ai: "Gemini"
    },
    {
        id: 209,
        title: "Create addresses detailed",
        content: "Create a detailed [CONTENT_TYPE] about [TOPIC] that includes [STRUCTURE] and addresses [AUDIENCE].",
        category: "writing",
        ai: "GPT-4"
    },
    {
        id: 210,
        title: "Typography, usage palette,",
        content: "Create a brand style guide for [COMPANY] that includes color palette, typography, and usage guidelines.",
        category: "design",
        ai: "Claude"
    },
    {
        id: 211,
        title: "Develop wireframe optimizes",
        content: "Develop a wireframe for [WEBSITE_TYPE] that optimizes for [CONVERSION_GOAL].",
        category: "design",
        ai: "GPT-4"
    },
    {
        id: 212,
        title: "Develop comprehensive tailored",
        content: "Develop a comprehensive [CONTENT_TYPE] on [TOPIC] with [STRUCTURE] tailored for [AUDIENCE].",
        category: "writing",
        ai: "Gemini"
    },
    {
        id: 213,
        title: "Includes palette, guidelines.",
        content: "Create a brand style guide for [COMPANY] that includes color palette, typography, and usage guidelines.",
        category: "design",
        ai: "Llama"
    },
    {
        id: 214,
        title: "Implications clear Summarize",
        content: "Summarize the key findings, methodology, and implications of research on [TOPIC] in a clear and concise manner.",
        category: "writing",
        ai: "Gemini"
    },
    {
        id: 215,
        title: "Space Write complexity.",
        content: "Write a function in [LANGUAGE] that [FUNCTIONALITY] with optimal time and space complexity.",
        category: "coding",
        ai: "Claude"
    },
    {
        id: 216,
        title: "Space complexity. Write",
        content: "Write a function in [LANGUAGE] that [FUNCTIONALITY] with optimal time and space complexity.",
        category: "coding",
        ai: "Claude"
    },
    {
        id: 217,
        title: "Includes guidelines. Create",
        content: "Create a brand style guide for [COMPANY] that includes color palette, typography, and usage guidelines.",
        category: "design",
        ai: "Claude"
    },
    {
        id: 218,
        title: "Function space optimal",
        content: "Write a function in [LANGUAGE] that [FUNCTIONALITY] with optimal time and space complexity.",
        category: "coding",
        ai: "Llama"
    },
    {
        id: 219,
        title: "Addresses email sequence",
        content: "Write a compelling email sequence for [PRODUCT_LAUNCH] that addresses common objections and includes clear CTAs.",
        category: "marketing",
        ai: "Gemini"
    },
    {
        id: 220,
        title: "Increase strategy content",
        content: "Develop a content strategy for [BRAND] that will increase engagement on [PLATFORM].",
        category: "marketing",
        ai: "Gemini"
    },
    {
        id: 221,
        title: "Develop comprehensive tailored",
        content: "Develop a comprehensive [CONTENT_TYPE] on [TOPIC] with [STRUCTURE] tailored for [AUDIENCE].",
        category: "writing",
        ai: "Gemini"
    },
    {
        id: 222,
        title: "Focus Create targeting",
        content: "Create a marketing campaign for [PRODUCT] targeting [AUDIENCE] with a focus on [BENEFIT].",
        category: "marketing",
        ai: "GPT-4"
    },
    {
        id: 223,
        title: "Develop optimizes wireframe",
        content: "Develop a wireframe for [WEBSITE_TYPE] that optimizes for [CONVERSION_GOAL].",
        category: "design",
        ai: "Claude"
    },
    {
        id: 224,
        title: "Sequence common email",
        content: "Write a compelling email sequence for [PRODUCT_LAUNCH] that addresses common objections and includes clear CTAs.",
        category: "marketing",
        ai: "GPT-4"
    },
    {
        id: 225,
        title: "Addresses Create about",
        content: "Create a detailed [CONTENT_TYPE] about [TOPIC] that includes [STRUCTURE] and addresses [AUDIENCE].",
        category: "writing",
        ai: "Llama"
    },
    {
        id: 226,
        title: "Guide brand includes",
        content: "Create a brand style guide for [COMPANY] that includes color palette, typography, and usage guidelines.",
        category: "design",
        ai: "Claude"
    },
    {
        id: 227,
        title: "Analysis industry. detailed",
        content: "Write a detailed SWOT analysis for [COMPANY] in the [INDUSTRY] industry.",
        category: "business",
        ai: "Llama"
    },
    {
        id: 228,
        title: "That's Debug supposed",
        content: "Debug this [LANGUAGE] code that's supposed to [FUNCTIONALITY] but is producing [ERROR].",
        category: "coding",
        ai: "Llama"
    },
    {
        id: 229,
        title: "Analysis detailed industry.",
        content: "Write a detailed SWOT analysis for [COMPANY] in the [INDUSTRY] industry.",
        category: "business",
        ai: "GPT-4"
    },
    {
        id: 230,
        title: "Strategy Create visualization",
        content: "Create a data visualization strategy for [DATA_TYPE] that effectively communicates [KEY_INSIGHT].",
        category: "data",
        ai: "Llama"
    },
    {
        id: 231,
        title: "Tailored Develop comprehensive",
        content: "Develop a comprehensive [CONTENT_TYPE] on [TOPIC] with [STRUCTURE] tailored for [AUDIENCE].",
        category: "writing",
        ai: "Claude"
    },
    {
        id: 232,
        title: "About Analyze insights",
        content: "Analyze this dataset about [TOPIC] and provide insights on [SPECIFIC_QUESTION].",
        category: "data",
        ai: "GPT-4"
    },
    {
        id: 233,
        title: "Analyze insights about",
        content: "Analyze this dataset about [TOPIC] and provide insights on [SPECIFIC_QUESTION].",
        category: "data",
        ai: "GPT-4"
    },
    {
        id: 234,
        title: "Addresses common compelling",
        content: "Write a compelling email sequence for [PRODUCT_LAUNCH] that addresses common objections and includes clear CTAs.",
        category: "marketing",
        ai: "Gemini"
    },
    {
        id: 235,
        title: "Appeal pitch Develop",
        content: "Develop a pitch deck for [STARTUP_IDEA] that will appeal to [INVESTOR_TYPE].",
        category: "business",
        ai: "Llama"
    },
    {
        id: 236,
        title: "Provide Analyze dataset",
        content: "Analyze this dataset about [TOPIC] and provide insights on [SPECIFIC_QUESTION].",
        category: "data",
        ai: "Gemini"
    },
    {
        id: 237,
        title: "Interface improves Design",
        content: "Design a user interface for [APPLICATION] that emphasizes [DESIGN_PRINCIPLE] and improves [USER_EXPERIENCE].",
        category: "design",
        ai: "GPT-4"
    },
    {
        id: 238,
        title: "Implications clear manner.",
        content: "Summarize the key findings, methodology, and implications of research on [TOPIC] in a clear and concise manner.",
        category: "writing",
        ai: "GPT-4"
    },
    {
        id: 239,
        title: "Includes analysis, projections,",
        content: "Create a business plan for [BUSINESS_TYPE] that includes market analysis, financial projections, and growth strategy.",
        category: "business",
        ai: "Claude"
    },
    {
        id: 240,
        title: "Focus campaign targeting",
        content: "Create a marketing campaign for [PRODUCT] targeting [AUDIENCE] with a focus on [BENEFIT].",
        category: "marketing",
        ai: "Llama"
    },
    {
        id: 241,
        title: "Tracks dashboard Design",
        content: "Design a dashboard that tracks [METRICS] for a [BUSINESS_TYPE].",
        category: "data",
        ai: "Llama"
    },
    {
        id: 242,
        title: "Develop comprehensive tailored",
        content: "Develop a comprehensive [CONTENT_TYPE] on [TOPIC] with [STRUCTURE] tailored for [AUDIENCE].",
        category: "writing",
        ai: "Llama"
    },
    {
        id: 243,
        title: "Email compelling clear",
        content: "Write a compelling email sequence for [PRODUCT_LAUNCH] that addresses common objections and includes clear CTAs.",
        category: "marketing",
        ai: "GPT-4"
    },
    {
        id: 244,
        title: "Develop comprehensive tailored",
        content: "Develop a comprehensive [CONTENT_TYPE] on [TOPIC] with [STRUCTURE] tailored for [AUDIENCE].",
        category: "writing",
        ai: "Llama"
    },
    {
        id: 245,
        title: "Debug that's supposed",
        content: "Debug this [LANGUAGE] code that's supposed to [FUNCTIONALITY] but is producing [ERROR].",
        category: "coding",
        ai: "GPT-4"
    },
    {
        id: 246,
        title: "Addresses includes detailed",
        content: "Create a detailed [CONTENT_TYPE] about [TOPIC] that includes [STRUCTURE] and addresses [AUDIENCE].",
        category: "writing",
        ai: "Claude"
    },
    {
        id: 247,
        title: "Tailored Develop comprehensive",
        content: "Develop a comprehensive [CONTENT_TYPE] on [TOPIC] with [STRUCTURE] tailored for [AUDIENCE].",
        category: "writing",
        ai: "Llama"
    },
    {
        id: 248,
        title: "Communicates effectively visualization",
        content: "Create a data visualization strategy for [DATA_TYPE] that effectively communicates [KEY_INSIGHT].",
        category: "data",
        ai: "Gemini"
    },
    {
        id: 249,
        title: "Methodology, Summarize concise",
        content: "Summarize the key findings, methodology, and implications of research on [TOPIC] in a clear and concise manner.",
        category: "writing",
        ai: "Gemini"
    },
    {
        id: 250,
        title: "Debug producing supposed",
        content: "Debug this [LANGUAGE] code that's supposed to [FUNCTIONALITY] but is producing [ERROR].",
        category: "coding",
        ai: "Claude"
    },
    {
        id: 251,
        title: "Strategy content engagement",
        content: "Develop a content strategy for [BRAND] that will increase engagement on [PLATFORM].",
        category: "marketing",
        ai: "Gemini"
    },
    {
        id: 252,
        title: "Clear sequence compelling",
        content: "Write a compelling email sequence for [PRODUCT_LAUNCH] that addresses common objections and includes clear CTAs.",
        category: "marketing",
        ai: "Llama"
    },
    {
        id: 253,
        title: "That's producing supposed",
        content: "Debug this [LANGUAGE] code that's supposed to [FUNCTIONALITY] but is producing [ERROR].",
        category: "coding",
        ai: "Gemini"
    },
    {
        id: 254,
        title: "Research findings, Summarize",
        content: "Summarize the key findings, methodology, and implications of research on [TOPIC] in a clear and concise manner.",
        category: "writing",
        ai: "Llama"
    },
    {
        id: 255,
        title: "Develop wireframe optimizes",
        content: "Develop a wireframe for [WEBSITE_TYPE] that optimizes for [CONVERSION_GOAL].",
        category: "design",
        ai: "Claude"
    },
    {
        id: 256,
        title: "Strategy. business financial",
        content: "Create a business plan for [BUSINESS_TYPE] that includes market analysis, financial projections, and growth strategy.",
        category: "business",
        ai: "GPT-4"
    },
    {
        id: 257,
        title: "Engagement Develop strategy",
        content: "Develop a content strategy for [BRAND] that will increase engagement on [PLATFORM].",
        category: "marketing",
        ai: "Claude"
    },
    {
        id: 258,
        title: "Develop appeal pitch",
        content: "Develop a pitch deck for [STARTUP_IDEA] that will appeal to [INVESTOR_TYPE].",
        category: "business",
        ai: "Gemini"
    },
    {
        id: 259,
        title: "Strategy Develop increase",
        content: "Develop a content strategy for [BRAND] that will increase engagement on [PLATFORM].",
        category: "marketing",
        ai: "GPT-4"
    },
    {
        id: 260,
        title: "Create tutorial step-by-step",
        content: "Create a step-by-step tutorial on how to implement [FEATURE] in [FRAMEWORK].",
        category: "coding",
        ai: "GPT-4"
    },
    {
        id: 261,
        title: "Visualization effectively strategy",
        content: "Create a data visualization strategy for [DATA_TYPE] that effectively communicates [KEY_INSIGHT].",
        category: "data",
        ai: "GPT-4"
    },
    {
        id: 262,
        title: "Style includes palette,",
        content: "Create a brand style guide for [COMPANY] that includes color palette, typography, and usage guidelines.",
        category: "design",
        ai: "Claude"
    },
    {
        id: 263,
        title: "Write analysis detailed",
        content: "Write a detailed SWOT analysis for [COMPANY] in the [INDUSTRY] industry.",
        category: "business",
        ai: "Llama"
    },
    {
        id: 264,
        title: "Create market analysis,",
        content: "Create a business plan for [BUSINESS_TYPE] that includes market analysis, financial projections, and growth strategy.",
        category: "business",
        ai: "Llama"
    },
    {
        id: 265,
        title: "Develop appeal pitch",
        content: "Develop a pitch deck for [STARTUP_IDEA] that will appeal to [INVESTOR_TYPE].",
        category: "business",
        ai: "Gemini"
    },
    {
        id: 266,
        title: "Sequence clear email",
        content: "Write a compelling email sequence for [PRODUCT_LAUNCH] that addresses common objections and includes clear CTAs.",
        category: "marketing",
        ai: "GPT-4"
    },
    {
        id: 267,
        title: "Sequence objections common",
        content: "Write a compelling email sequence for [PRODUCT_LAUNCH] that addresses common objections and includes clear CTAs.",
        category: "marketing",
        ai: "Claude"
    },
    {
        id: 268,
        title: "Palette, usage guide",
        content: "Create a brand style guide for [COMPANY] that includes color palette, typography, and usage guidelines.",
        category: "design",
        ai: "Llama"
    },
    {
        id: 269,
        title: "Develop tailored comprehensive",
        content: "Develop a comprehensive [CONTENT_TYPE] on [TOPIC] with [STRUCTURE] tailored for [AUDIENCE].",
        category: "writing",
        ai: "Gemini"
    },
    {
        id: 270,
        title: "Sequence addresses clear",
        content: "Write a compelling email sequence for [PRODUCT_LAUNCH] that addresses common objections and includes clear CTAs.",
        category: "marketing",
        ai: "Llama"
    },
    {
        id: 271,
        title: "Interface Design improves",
        content: "Design a user interface for [APPLICATION] that emphasizes [DESIGN_PRINCIPLE] and improves [USER_EXPERIENCE].",
        category: "design",
        ai: "Gemini"
    },
    {
        id: 272,
        title: "Write space complexity.",
        content: "Write a function in [LANGUAGE] that [FUNCTIONALITY] with optimal time and space complexity.",
        category: "coding",
        ai: "Llama"
    },
    {
        id: 273,
        title: "Emphasizes improves Design",
        content: "Design a user interface for [APPLICATION] that emphasizes [DESIGN_PRINCIPLE] and improves [USER_EXPERIENCE].",
        category: "design",
        ai: "Llama"
    },
    {
        id: 274,
        title: "Usage Create color",
        content: "Create a brand style guide for [COMPANY] that includes color palette, typography, and usage guidelines.",
        category: "design",
        ai: "GPT-4"
    },
    {
        id: 275,
        title: "Write detailed analysis",
        content: "Write a detailed SWOT analysis for [COMPANY] in the [INDUSTRY] industry.",
        category: "business",
        ai: "Claude"
    },
    {
        id: 276,
        title: "Content engagement increase",
        content: "Develop a content strategy for [BRAND] that will increase engagement on [PLATFORM].",
        category: "marketing",
        ai: "Claude"
    },
    {
        id: 277,
        title: "About Analyze provide",
        content: "Analyze this dataset about [TOPIC] and provide insights on [SPECIFIC_QUESTION].",
        category: "data",
        ai: "Gemini"
    },
    {
        id: 278,
        title: "Improves emphasizes interface",
        content: "Design a user interface for [APPLICATION] that emphasizes [DESIGN_PRINCIPLE] and improves [USER_EXPERIENCE].",
        category: "design",
        ai: "Claude"
    },
    {
        id: 279,
        title: "Function space Write",
        content: "Write a function in [LANGUAGE] that [FUNCTIONALITY] with optimal time and space complexity.",
        category: "coding",
        ai: "Claude"
    },
    {
        id: 280,
        title: "Detailed Create about",
        content: "Create a detailed [CONTENT_TYPE] about [TOPIC] that includes [STRUCTURE] and addresses [AUDIENCE].",
        category: "writing",
        ai: "Claude"
    },
    {
        id: 281,
        title: "Campaign Create targeting",
        content: "Create a marketing campaign for [PRODUCT] targeting [AUDIENCE] with a focus on [BENEFIT].",
        category: "marketing",
        ai: "Gemini"
    },
    {
        id: 282,
        title: "Objections CTAs. compelling",
        content: "Write a compelling email sequence for [PRODUCT_LAUNCH] that addresses common objections and includes clear CTAs.",
        category: "marketing",
        ai: "Claude"
    },
    {
        id: 283,
        title: "Tracks Design dashboard",
        content: "Design a dashboard that tracks [METRICS] for a [BUSINESS_TYPE].",
        category: "data",
        ai: "Llama"
    },
    {
        id: 284,
        title: "Communicates effectively Create",
        content: "Create a data visualization strategy for [DATA_TYPE] that effectively communicates [KEY_INSIGHT].",
        category: "data",
        ai: "Claude"
    },
    {
        id: 285,
        title: "Interface emphasizes Design",
        content: "Design a user interface for [APPLICATION] that emphasizes [DESIGN_PRINCIPLE] and improves [USER_EXPERIENCE].",
        category: "design",
        ai: "Llama"
    },
    {
        id: 286,
        title: "Dashboard tracks Design",
        content: "Design a dashboard that tracks [METRICS] for a [BUSINESS_TYPE].",
        category: "data",
        ai: "Claude"
    },
    {
        id: 287,
        title: "Write optimal function",
        content: "Write a function in [LANGUAGE] that [FUNCTIONALITY] with optimal time and space complexity.",
        category: "coding",
        ai: "Claude"
    },
    {
        id: 288,
        title: "About provide dataset",
        content: "Analyze this dataset about [TOPIC] and provide insights on [SPECIFIC_QUESTION].",
        category: "data",
        ai: "Claude"
    },
    {
        id: 289,
        title: "Style brand guidelines.",
        content: "Create a brand style guide for [COMPANY] that includes color palette, typography, and usage guidelines.",
        category: "design",
        ai: "Gemini"
    },
    {
        id: 290,
        title: "Content increase engagement",
        content: "Develop a content strategy for [BRAND] that will increase engagement on [PLATFORM].",
        category: "marketing",
        ai: "GPT-4"
    },
    {
        id: 291,
        title: "Clear implications concise",
        content: "Summarize the key findings, methodology, and implications of research on [TOPIC] in a clear and concise manner.",
        category: "writing",
        ai: "Claude"
    },
    {
        id: 292,
        title: "Appeal Develop pitch",
        content: "Develop a pitch deck for [STARTUP_IDEA] that will appeal to [INVESTOR_TYPE].",
        category: "business",
        ai: "Claude"
    },
    {
        id: 293,
        title: "That's supposed Debug",
        content: "Debug this [LANGUAGE] code that's supposed to [FUNCTIONALITY] but is producing [ERROR].",
        category: "coding",
        ai: "Claude"
    },
    {
        id: 294,
        title: "Clear implications methodology,",
        content: "Summarize the key findings, methodology, and implications of research on [TOPIC] in a clear and concise manner.",
        category: "writing",
        ai: "Llama"
    },
    {
        id: 295,
        title: "Manner. methodology, concise",
        content: "Summarize the key findings, methodology, and implications of research on [TOPIC] in a clear and concise manner.",
        category: "writing",
        ai: "Gemini"
    },
    {
        id: 296,
        title: "Visualization communicates Create",
        content: "Create a data visualization strategy for [DATA_TYPE] that effectively communicates [KEY_INSIGHT].",
        category: "data",
        ai: "GPT-4"
    },
    {
        id: 297,
        title: "Visualization effectively communicates",
        content: "Create a data visualization strategy for [DATA_TYPE] that effectively communicates [KEY_INSIGHT].",
        category: "data",
        ai: "Llama"
    },
    {
        id: 298,
        title: "Provide insights about",
        content: "Analyze this dataset about [TOPIC] and provide insights on [SPECIFIC_QUESTION].",
        category: "data",
        ai: "Llama"
    },
    {
        id: 299,
        title: "Develop wireframe optimizes",
        content: "Develop a wireframe for [WEBSITE_TYPE] that optimizes for [CONVERSION_GOAL].",
        category: "design",
        ai: "Gemini"
    },
    {
        id: 300,
        title: "Create tutorial implement",
        content: "Create a step-by-step tutorial on how to implement [FEATURE] in [FRAMEWORK].",
        category: "coding",
        ai: "Llama"
    },
    {
        id: 301,
        title: "Concise methodology, findings,",
        content: "Summarize the key findings, methodology, and implications of research on [TOPIC] in a clear and concise manner.",
        category: "writing",
        ai: "Claude"
    },
    {
        id: 302,
        title: "Emphasizes Design interface",
        content: "Design a user interface for [APPLICATION] that emphasizes [DESIGN_PRINCIPLE] and improves [USER_EXPERIENCE].",
        category: "design",
        ai: "GPT-4"
    },
    {
        id: 303,
        title: "Interface improves Design",
        content: "Design a user interface for [APPLICATION] that emphasizes [DESIGN_PRINCIPLE] and improves [USER_EXPERIENCE].",
        category: "design",
        ai: "Llama"
    },
    {
        id: 304,
        title: "Analysis detailed Write",
        content: "Write a detailed SWOT analysis for [COMPANY] in the [INDUSTRY] industry.",
        category: "business",
        ai: "Claude"
    },
    {
        id: 305,
        title: "Strategy increase engagement",
        content: "Develop a content strategy for [BRAND] that will increase engagement on [PLATFORM].",
        category: "marketing",
        ai: "GPT-4"
    },
    {
        id: 306,
        title: "Concise Summarize manner.",
        content: "Summarize the key findings, methodology, and implications of research on [TOPIC] in a clear and concise manner.",
        category: "writing",
        ai: "GPT-4"
    },
    {
        id: 307,
        title: "Design dashboard tracks",
        content: "Design a dashboard that tracks [METRICS] for a [BUSINESS_TYPE].",
        category: "data",
        ai: "GPT-4"
    },
    {
        id: 308,
        title: "Clear Summarize methodology,",
        content: "Summarize the key findings, methodology, and implications of research on [TOPIC] in a clear and concise manner.",
        category: "writing",
        ai: "Gemini"
    },
    {
        id: 309,
        title: "Compelling includes email",
        content: "Write a compelling email sequence for [PRODUCT_LAUNCH] that addresses common objections and includes clear CTAs.",
        category: "marketing",
        ai: "Gemini"
    },
    {
        id: 310,
        title: "Develop optimizes wireframe",
        content: "Develop a wireframe for [WEBSITE_TYPE] that optimizes for [CONVERSION_GOAL].",
        category: "design",
        ai: "Claude"
    },
    {
        id: 311,
        title: "Step-by-step implement Create",
        content: "Create a step-by-step tutorial on how to implement [FEATURE] in [FRAMEWORK].",
        category: "coding",
        ai: "Gemini"
    },
    {
        id: 312,
        title: "About detailed Create",
        content: "Create a detailed [CONTENT_TYPE] about [TOPIC] that includes [STRUCTURE] and addresses [AUDIENCE].",
        category: "writing",
        ai: "Llama"
    },
    {
        id: 313,
        title: "Improves emphasizes interface",
        content: "Design a user interface for [APPLICATION] that emphasizes [DESIGN_PRINCIPLE] and improves [USER_EXPERIENCE].",
        category: "design",
        ai: "Llama"
    },
    {
        id: 314,
        title: "Create visualization communicates",
        content: "Create a data visualization strategy for [DATA_TYPE] that effectively communicates [KEY_INSIGHT].",
        category: "data",
        ai: "Llama"
    },
    {
        id: 315,
        title: "Step-by-step implement tutorial",
        content: "Create a step-by-step tutorial on how to implement [FEATURE] in [FRAMEWORK].",
        category: "coding",
        ai: "Llama"
    },
    {
        id: 316,
        title: "Brand usage guidelines.",
        content: "Create a brand style guide for [COMPANY] that includes color palette, typography, and usage guidelines.",
        category: "design",
        ai: "Llama"
    },
    {
        id: 317,
        title: "Research Summarize concise",
        content: "Summarize the key findings, methodology, and implications of research on [TOPIC] in a clear and concise manner.",
        category: "writing",
        ai: "Gemini"
    },
    {
        id: 318,
        title: "Develop optimizes wireframe",
        content: "Develop a wireframe for [WEBSITE_TYPE] that optimizes for [CONVERSION_GOAL].",
        category: "design",
        ai: "Claude"
    },
    {
        id: 319,
        title: "Methodology, research implications",
        content: "Summarize the key findings, methodology, and implications of research on [TOPIC] in a clear and concise manner.",
        category: "writing",
        ai: "Gemini"
    },
    {
        id: 320,
        title: "Findings, Summarize manner.",
        content: "Summarize the key findings, methodology, and implications of research on [TOPIC] in a clear and concise manner.",
        category: "writing",
        ai: "GPT-4"
    },
    {
        id: 321,
        title: "That's producing Debug",
        content: "Debug this [LANGUAGE] code that's supposed to [FUNCTIONALITY] but is producing [ERROR].",
        category: "coding",
        ai: "Llama"
    },
    {
        id: 322,
        title: "Addresses compelling Write",
        content: "Write a compelling email sequence for [PRODUCT_LAUNCH] that addresses common objections and includes clear CTAs.",
        category: "marketing",
        ai: "Llama"
    },
    {
        id: 323,
        title: "Effectively strategy visualization",
        content: "Create a data visualization strategy for [DATA_TYPE] that effectively communicates [KEY_INSIGHT].",
        category: "data",
        ai: "Llama"
    },
    {
        id: 324,
        title: "Develop tailored comprehensive",
        content: "Develop a comprehensive [CONTENT_TYPE] on [TOPIC] with [STRUCTURE] tailored for [AUDIENCE].",
        category: "writing",
        ai: "GPT-4"
    },
    {
        id: 325,
        title: "Appeal pitch Develop",
        content: "Develop a pitch deck for [STARTUP_IDEA] that will appeal to [INVESTOR_TYPE].",
        category: "business",
        ai: "Llama"
    },
    {
        id: 326,
        title: "Develop wireframe optimizes",
        content: "Develop a wireframe for [WEBSITE_TYPE] that optimizes for [CONVERSION_GOAL].",
        category: "design",
        ai: "GPT-4"
    },
    {
        id: 327,
        title: "Compelling includes sequence",
        content: "Write a compelling email sequence for [PRODUCT_LAUNCH] that addresses common objections and includes clear CTAs.",
        category: "marketing",
        ai: "GPT-4"
    },
    {
        id: 328,
        title: "Addresses email compelling",
        content: "Write a compelling email sequence for [PRODUCT_LAUNCH] that addresses common objections and includes clear CTAs.",
        category: "marketing",
        ai: "Gemini"
    },
    {
        id: 329,
        title: "About includes detailed",
        content: "Create a detailed [CONTENT_TYPE] about [TOPIC] that includes [STRUCTURE] and addresses [AUDIENCE].",
        category: "writing",
        ai: "GPT-4"
    },
    {
        id: 330,
        title: "Concise manner. research",
        content: "Summarize the key findings, methodology, and implications of research on [TOPIC] in a clear and concise manner.",
        category: "writing",
        ai: "Gemini"
    },
    {
        id: 331,
        title: "Engagement Develop content",
        content: "Develop a content strategy for [BRAND] that will increase engagement on [PLATFORM].",
        category: "marketing",
        ai: "Claude"
    },
    {
        id: 332,
        title: "That's supposed Debug",
        content: "Debug this [LANGUAGE] code that's supposed to [FUNCTIONALITY] but is producing [ERROR].",
        category: "coding",
        ai: "Llama"
    },
    {
        id: 333,
        title: "Supposed that's Debug",
        content: "Debug this [LANGUAGE] code that's supposed to [FUNCTIONALITY] but is producing [ERROR].",
        category: "coding",
        ai: "GPT-4"
    },
    {
        id: 334,
        title: "Marketing focus campaign",
        content: "Create a marketing campaign for [PRODUCT] targeting [AUDIENCE] with a focus on [BENEFIT].",
        category: "marketing",
        ai: "GPT-4"
    },
    {
        id: 335,
        title: "Dashboard Design tracks",
        content: "Design a dashboard that tracks [METRICS] for a [BUSINESS_TYPE].",
        category: "data",
        ai: "Claude"
    },
    {
        id: 336,
        title: "About Analyze provide",
        content: "Analyze this dataset about [TOPIC] and provide insights on [SPECIFIC_QUESTION].",
        category: "data",
        ai: "Llama"
    },
    {
        id: 337,
        title: "About Analyze provide",
        content: "Analyze this dataset about [TOPIC] and provide insights on [SPECIFIC_QUESTION].",
        category: "data",
        ai: "GPT-4"
    },
    {
        id: 338,
        title: "Style includes usage",
        content: "Create a brand style guide for [COMPANY] that includes color palette, typography, and usage guidelines.",
        category: "design",
        ai: "GPT-4"
    },
    {
        id: 339,
        title: "Create targeting focus",
        content: "Create a marketing campaign for [PRODUCT] targeting [AUDIENCE] with a focus on [BENEFIT].",
        category: "marketing",
        ai: "Llama"
    },
    {
        id: 340,
        title: "Visualization Create communicates",
        content: "Create a data visualization strategy for [DATA_TYPE] that effectively communicates [KEY_INSIGHT].",
        category: "data",
        ai: "Gemini"
    },
    {
        id: 341,
        title: "Detailed addresses about",
        content: "Create a detailed [CONTENT_TYPE] about [TOPIC] that includes [STRUCTURE] and addresses [AUDIENCE].",
        category: "writing",
        ai: "Llama"
    },
    {
        id: 342,
        title: "Appeal pitch Develop",
        content: "Develop a pitch deck for [STARTUP_IDEA] that will appeal to [INVESTOR_TYPE].",
        category: "business",
        ai: "GPT-4"
    },
    {
        id: 343,
        title: "Communicates Create visualization",
        content: "Create a data visualization strategy for [DATA_TYPE] that effectively communicates [KEY_INSIGHT].",
        category: "data",
        ai: "Llama"
    },
    {
        id: 344,
        title: "Color typography, style",
        content: "Create a brand style guide for [COMPANY] that includes color palette, typography, and usage guidelines.",
        category: "design",
        ai: "Llama"
    },
    {
        id: 345,
        title: "CTAs. includes addresses",
        content: "Write a compelling email sequence for [PRODUCT_LAUNCH] that addresses common objections and includes clear CTAs.",
        category: "marketing",
        ai: "Gemini"
    },
    {
        id: 346,
        title: "Pitch appeal Develop",
        content: "Develop a pitch deck for [STARTUP_IDEA] that will appeal to [INVESTOR_TYPE].",
        category: "business",
        ai: "Claude"
    },
    {
        id: 347,
        title: "Pitch Develop appeal",
        content: "Develop a pitch deck for [STARTUP_IDEA] that will appeal to [INVESTOR_TYPE].",
        category: "business",
        ai: "GPT-4"
    },
    {
        id: 348,
        title: "Analyze insights about",
        content: "Analyze this dataset about [TOPIC] and provide insights on [SPECIFIC_QUESTION].",
        category: "data",
        ai: "Claude"
    },
    {
        id: 349,
        title: "Tutorial Create step-by-step",
        content: "Create a step-by-step tutorial on how to implement [FEATURE] in [FRAMEWORK].",
        category: "coding",
        ai: "Claude"
    },
    {
        id: 350,
        title: "Develop comprehensive tailored",
        content: "Develop a comprehensive [CONTENT_TYPE] on [TOPIC] with [STRUCTURE] tailored for [AUDIENCE].",
        category: "writing",
        ai: "Llama"
    },
    {
        id: 351,
        title: "Improves emphasizes interface",
        content: "Design a user interface for [APPLICATION] that emphasizes [DESIGN_PRINCIPLE] and improves [USER_EXPERIENCE].",
        category: "design",
        ai: "GPT-4"
    },
    {
        id: 352,
        title: "Develop pitch appeal",
        content: "Develop a pitch deck for [STARTUP_IDEA] that will appeal to [INVESTOR_TYPE].",
        category: "business",
        ai: "GPT-4"
    },
    {
        id: 353,
        title: "Develop wireframe optimizes",
        content: "Develop a wireframe for [WEBSITE_TYPE] that optimizes for [CONVERSION_GOAL].",
        category: "design",
        ai: "Gemini"
    },
    {
        id: 354,
        title: "Wireframe optimizes Develop",
        content: "Develop a wireframe for [WEBSITE_TYPE] that optimizes for [CONVERSION_GOAL].",
        category: "design",
        ai: "Gemini"
    },
    {
        id: 355,
        title: "Addresses includes Create",
        content: "Create a detailed [CONTENT_TYPE] about [TOPIC] that includes [STRUCTURE] and addresses [AUDIENCE].",
        category: "writing",
        ai: "Claude"
    },
    {
        id: 356,
        title: "Engagement content increase",
        content: "Develop a content strategy for [BRAND] that will increase engagement on [PLATFORM].",
        category: "marketing",
        ai: "Claude"
    },
    {
        id: 357,
        title: "Interface improves emphasizes",
        content: "Design a user interface for [APPLICATION] that emphasizes [DESIGN_PRINCIPLE] and improves [USER_EXPERIENCE].",
        category: "design",
        ai: "Llama"
    },
    {
        id: 358,
        title: "Producing Debug supposed",
        content: "Debug this [LANGUAGE] code that's supposed to [FUNCTIONALITY] but is producing [ERROR].",
        category: "coding",
        ai: "Gemini"
    },
    {
        id: 359,
        title: "Develop appeal pitch",
        content: "Develop a pitch deck for [STARTUP_IDEA] that will appeal to [INVESTOR_TYPE].",
        category: "business",
        ai: "Llama"
    },
    {
        id: 360,
        title: "Emphasizes improves Design",
        content: "Design a user interface for [APPLICATION] that emphasizes [DESIGN_PRINCIPLE] and improves [USER_EXPERIENCE].",
        category: "design",
        ai: "Claude"
    },
    {
        id: 361,
        title: "Provide dataset Analyze",
        content: "Analyze this dataset about [TOPIC] and provide insights on [SPECIFIC_QUESTION].",
        category: "data",
        ai: "GPT-4"
    },
    {
        id: 362,
        title: "Sequence email CTAs.",
        content: "Write a compelling email sequence for [PRODUCT_LAUNCH] that addresses common objections and includes clear CTAs.",
        category: "marketing",
        ai: "Claude"
    },
    {
        id: 363,
        title: "Optimal Write function",
        content: "Write a function in [LANGUAGE] that [FUNCTIONALITY] with optimal time and space complexity.",
        category: "coding",
        ai: "Claude"
    },
    {
        id: 364,
        title: "Wireframe optimizes Develop",
        content: "Develop a wireframe for [WEBSITE_TYPE] that optimizes for [CONVERSION_GOAL].",
        category: "design",
        ai: "Gemini"
    },
    {
        id: 365,
        title: "Space complexity. function",
        content: "Write a function in [LANGUAGE] that [FUNCTIONALITY] with optimal time and space complexity.",
        category: "coding",
        ai: "GPT-4"
    },
    {
        id: 366,
        title: "Tailored Develop comprehensive",
        content: "Develop a comprehensive [CONTENT_TYPE] on [TOPIC] with [STRUCTURE] tailored for [AUDIENCE].",
        category: "writing",
        ai: "Llama"
    },
    {
        id: 367,
        title: "Tailored Develop comprehensive",
        content: "Develop a comprehensive [CONTENT_TYPE] on [TOPIC] with [STRUCTURE] tailored for [AUDIENCE].",
        category: "writing",
        ai: "GPT-4"
    },
    {
        id: 368,
        title: "Campaign Create marketing",
        content: "Create a marketing campaign for [PRODUCT] targeting [AUDIENCE] with a focus on [BENEFIT].",
        category: "marketing",
        ai: "Gemini"
    },
    {
        id: 369,
        title: "Comprehensive tailored Develop",
        content: "Develop a comprehensive [CONTENT_TYPE] on [TOPIC] with [STRUCTURE] tailored for [AUDIENCE].",
        category: "writing",
        ai: "Gemini"
    },
    {
        id: 370,
        title: "Design tracks dashboard",
        content: "Design a dashboard that tracks [METRICS] for a [BUSINESS_TYPE].",
        category: "data",
        ai: "Gemini"
    },
    {
        id: 371,
        title: "Complexity. space function",
        content: "Write a function in [LANGUAGE] that [FUNCTIONALITY] with optimal time and space complexity.",
        category: "coding",
        ai: "Llama"
    },
    {
        id: 372,
        title: "About includes Create",
        content: "Create a detailed [CONTENT_TYPE] about [TOPIC] that includes [STRUCTURE] and addresses [AUDIENCE].",
        category: "writing",
        ai: "Gemini"
    },
    {
        id: 373,
        title: "Create detailed addresses",
        content: "Create a detailed [CONTENT_TYPE] about [TOPIC] that includes [STRUCTURE] and addresses [AUDIENCE].",
        category: "writing",
        ai: "Gemini"
    },
    {
        id: 374,
        title: "Strategy communicates visualization",
        content: "Create a data visualization strategy for [DATA_TYPE] that effectively communicates [KEY_INSIGHT].",
        category: "data",
        ai: "Llama"
    },
    {
        id: 375,
        title: "Emphasizes Design interface",
        content: "Design a user interface for [APPLICATION] that emphasizes [DESIGN_PRINCIPLE] and improves [USER_EXPERIENCE].",
        category: "design",
        ai: "GPT-4"
    },
    {
        id: 376,
        title: "Addresses email sequence",
        content: "Write a compelling email sequence for [PRODUCT_LAUNCH] that addresses common objections and includes clear CTAs.",
        category: "marketing",
        ai: "Claude"
    },
    {
        id: 377,
        title: "Projections, strategy. market",
        content: "Create a business plan for [BUSINESS_TYPE] that includes market analysis, financial projections, and growth strategy.",
        category: "business",
        ai: "GPT-4"
    },
    {
        id: 378,
        title: "Develop pitch appeal",
        content: "Develop a pitch deck for [STARTUP_IDEA] that will appeal to [INVESTOR_TYPE].",
        category: "business",
        ai: "GPT-4"
    },
    {
        id: 379,
        title: "Tutorial Create implement",
        content: "Create a step-by-step tutorial on how to implement [FEATURE] in [FRAMEWORK].",
        category: "coding",
        ai: "GPT-4"
    },
    {
        id: 380,
        title: "Style usage brand",
        content: "Create a brand style guide for [COMPANY] that includes color palette, typography, and usage guidelines.",
        category: "design",
        ai: "Gemini"
    },
    {
        id: 381,
        title: "Clear Summarize research",
        content: "Summarize the key findings, methodology, and implications of research on [TOPIC] in a clear and concise manner.",
        category: "writing",
        ai: "GPT-4"
    },
    {
        id: 382,
        title: "Space complexity. Write",
        content: "Write a function in [LANGUAGE] that [FUNCTIONALITY] with optimal time and space complexity.",
        category: "coding",
        ai: "GPT-4"
    },
    {
        id: 383,
        title: "Detailed about Create",
        content: "Create a detailed [CONTENT_TYPE] about [TOPIC] that includes [STRUCTURE] and addresses [AUDIENCE].",
        category: "writing",
        ai: "Claude"
    },
    {
        id: 384,
        title: "Detailed includes about",
        content: "Create a detailed [CONTENT_TYPE] about [TOPIC] that includes [STRUCTURE] and addresses [AUDIENCE].",
        category: "writing",
        ai: "Llama"
    },
    {
        id: 385,
        title: "Producing that's supposed",
        content: "Debug this [LANGUAGE] code that's supposed to [FUNCTIONALITY] but is producing [ERROR].",
        category: "coding",
        ai: "Claude"
    },
    {
        id: 386,
        title: "Business projections, analysis,",
        content: "Create a business plan for [BUSINESS_TYPE] that includes market analysis, financial projections, and growth strategy.",
        category: "business",
        ai: "Gemini"
    },
    {
        id: 387,
        title: "Methodology, concise implications",
        content: "Summarize the key findings, methodology, and implications of research on [TOPIC] in a clear and concise manner.",
        category: "writing",
        ai: "Llama"
    },
    {
        id: 388,
        title: "Research findings, methodology,",
        content: "Summarize the key findings, methodology, and implications of research on [TOPIC] in a clear and concise manner.",
        category: "writing",
        ai: "Claude"
    },
    {
        id: 389,
        title: "Brand Create typography,",
        content: "Create a brand style guide for [COMPANY] that includes color palette, typography, and usage guidelines.",
        category: "design",
        ai: "GPT-4"
    },
    {
        id: 390,
        title: "Insights dataset provide",
        content: "Analyze this dataset about [TOPIC] and provide insights on [SPECIFIC_QUESTION].",
        category: "data",
        ai: "Llama"
    },
    {
        id: 391,
        title: "Wireframe Develop optimizes",
        content: "Develop a wireframe for [WEBSITE_TYPE] that optimizes for [CONVERSION_GOAL].",
        category: "design",
        ai: "Claude"
    },
    {
        id: 392,
        title: "Develop appeal pitch",
        content: "Develop a pitch deck for [STARTUP_IDEA] that will appeal to [INVESTOR_TYPE].",
        category: "business",
        ai: "Llama"
    },
    {
        id: 393,
        title: "Complexity. function space",
        content: "Write a function in [LANGUAGE] that [FUNCTIONALITY] with optimal time and space complexity.",
        category: "coding",
        ai: "Gemini"
    },
    {
        id: 394,
        title: "Industry. Write detailed",
        content: "Write a detailed SWOT analysis for [COMPANY] in the [INDUSTRY] industry.",
        category: "business",
        ai: "Gemini"
    },
    {
        id: 395,
        title: "Wireframe Develop optimizes",
        content: "Develop a wireframe for [WEBSITE_TYPE] that optimizes for [CONVERSION_GOAL].",
        category: "design",
        ai: "Claude"
    },
    {
        id: 396,
        title: "Color brand Create",
        content: "Create a brand style guide for [COMPANY] that includes color palette, typography, and usage guidelines.",
        category: "design",
        ai: "GPT-4"
    },
    {
        id: 397,
        title: "Dashboard Design tracks",
        content: "Design a dashboard that tracks [METRICS] for a [BUSINESS_TYPE].",
        category: "data",
        ai: "Gemini"
    },
    {
        id: 398,
        title: "Interface improves emphasizes",
        content: "Design a user interface for [APPLICATION] that emphasizes [DESIGN_PRINCIPLE] and improves [USER_EXPERIENCE].",
        category: "design",
        ai: "Llama"
    },
    {
        id: 399,
        title: "Includes addresses detailed",
        content: "Create a detailed [CONTENT_TYPE] about [TOPIC] that includes [STRUCTURE] and addresses [AUDIENCE].",
        category: "writing",
        ai: "Llama"
    },
    {
        id: 400,
        title: "Effectively communicates visualization",
        content: "Create a data visualization strategy for [DATA_TYPE] that effectively communicates [KEY_INSIGHT].",
        category: "data",
        ai: "Gemini"
    },
    {
        id: 401,
        title: "Insights dataset about",
        content: "Analyze this dataset about [TOPIC] and provide insights on [SPECIFIC_QUESTION].",
        category: "data",
        ai: "Gemini"
    },
    {
        id: 402,
        title: "Create implement step-by-step",
        content: "Create a step-by-step tutorial on how to implement [FEATURE] in [FRAMEWORK].",
        category: "coding",
        ai: "GPT-4"
    },
    {
        id: 403,
        title: "Projections, analysis, Create",
        content: "Create a business plan for [BUSINESS_TYPE] that includes market analysis, financial projections, and growth strategy.",
        category: "business",
        ai: "Llama"
    },
    {
        id: 404,
        title: "Clear research findings,",
        content: "Summarize the key findings, methodology, and implications of research on [TOPIC] in a clear and concise manner.",
        category: "writing",
        ai: "Gemini"
    },
    {
        id: 405,
        title: "Analyze about insights",
        content: "Analyze this dataset about [TOPIC] and provide insights on [SPECIFIC_QUESTION].",
        category: "data",
        ai: "Claude"
    },
    {
        id: 406,
        title: "Develop optimizes wireframe",
        content: "Develop a wireframe for [WEBSITE_TYPE] that optimizes for [CONVERSION_GOAL].",
        category: "design",
        ai: "Claude"
    },
    {
        id: 407,
        title: "Optimizes wireframe Develop",
        content: "Develop a wireframe for [WEBSITE_TYPE] that optimizes for [CONVERSION_GOAL].",
        category: "design",
        ai: "Gemini"
    },
    {
        id: 408,
        title: "Interface improves Design",
        content: "Design a user interface for [APPLICATION] that emphasizes [DESIGN_PRINCIPLE] and improves [USER_EXPERIENCE].",
        category: "design",
        ai: "Llama"
    },
    {
        id: 409,
        title: "Strategy content increase",
        content: "Develop a content strategy for [BRAND] that will increase engagement on [PLATFORM].",
        category: "marketing",
        ai: "Gemini"
    },
    {
        id: 410,
        title: "About Analyze provide",
        content: "Analyze this dataset about [TOPIC] and provide insights on [SPECIFIC_QUESTION].",
        category: "data",
        ai: "Claude"
    },
    {
        id: 411,
        title: "Typography, brand Create",
        content: "Create a brand style guide for [COMPANY] that includes color palette, typography, and usage guidelines.",
        category: "design",
        ai: "Gemini"
    },
    {
        id: 412,
        title: "Increase engagement Develop",
        content: "Develop a content strategy for [BRAND] that will increase engagement on [PLATFORM].",
        category: "marketing",
        ai: "Claude"
    },
    {
        id: 413,
        title: "Analysis, strategy. includes",
        content: "Create a business plan for [BUSINESS_TYPE] that includes market analysis, financial projections, and growth strategy.",
        category: "business",
        ai: "Gemini"
    },
    {
        id: 414,
        title: "Develop optimizes wireframe",
        content: "Develop a wireframe for [WEBSITE_TYPE] that optimizes for [CONVERSION_GOAL].",
        category: "design",
        ai: "GPT-4"
    },
    {
        id: 415,
        title: "Step-by-step Create tutorial",
        content: "Create a step-by-step tutorial on how to implement [FEATURE] in [FRAMEWORK].",
        category: "coding",
        ai: "Gemini"
    },
    {
        id: 416,
        title: "Pitch Develop appeal",
        content: "Develop a pitch deck for [STARTUP_IDEA] that will appeal to [INVESTOR_TYPE].",
        category: "business",
        ai: "GPT-4"
    },
    {
        id: 417,
        title: "Focus campaign Create",
        content: "Create a marketing campaign for [PRODUCT] targeting [AUDIENCE] with a focus on [BENEFIT].",
        category: "marketing",
        ai: "Claude"
    },
    {
        id: 418,
        title: "Develop engagement increase",
        content: "Develop a content strategy for [BRAND] that will increase engagement on [PLATFORM].",
        category: "marketing",
        ai: "Gemini"
    },
    {
        id: 419,
        title: "Tracks dashboard Design",
        content: "Design a dashboard that tracks [METRICS] for a [BUSINESS_TYPE].",
        category: "data",
        ai: "Gemini"
    },
    {
        id: 420,
        title: "Market analysis, strategy.",
        content: "Create a business plan for [BUSINESS_TYPE] that includes market analysis, financial projections, and growth strategy.",
        category: "business",
        ai: "Llama"
    },
    {
        id: 421,
        title: "Engagement increase Develop",
        content: "Develop a content strategy for [BRAND] that will increase engagement on [PLATFORM].",
        category: "marketing",
        ai: "GPT-4"
    },
    {
        id: 422,
        title: "Clear Summarize findings,",
        content: "Summarize the key findings, methodology, and implications of research on [TOPIC] in a clear and concise manner.",
        category: "writing",
        ai: "GPT-4"
    },
    {
        id: 423,
        title: "Improves interface Design",
        content: "Design a user interface for [APPLICATION] that emphasizes [DESIGN_PRINCIPLE] and improves [USER_EXPERIENCE].",
        category: "design",
        ai: "Claude"
    },
    {
        id: 424,
        title: "Objections addresses compelling",
        content: "Write a compelling email sequence for [PRODUCT_LAUNCH] that addresses common objections and includes clear CTAs.",
        category: "marketing",
        ai: "Llama"
    },
    {
        id: 425,
        title: "Detailed Write industry.",
        content: "Write a detailed SWOT analysis for [COMPANY] in the [INDUSTRY] industry.",
        category: "business",
        ai: "Gemini"
    },
    {
        id: 426,
        title: "Appeal pitch Develop",
        content: "Develop a pitch deck for [STARTUP_IDEA] that will appeal to [INVESTOR_TYPE].",
        category: "business",
        ai: "GPT-4"
    },
    {
        id: 427,
        title: "Content Develop strategy",
        content: "Develop a content strategy for [BRAND] that will increase engagement on [PLATFORM].",
        category: "marketing",
        ai: "Claude"
    },
    {
        id: 428,
        title: "Analysis detailed industry.",
        content: "Write a detailed SWOT analysis for [COMPANY] in the [INDUSTRY] industry.",
        category: "business",
        ai: "Llama"
    },
    {
        id: 429,
        title: "Provide Analyze insights",
        content: "Analyze this dataset about [TOPIC] and provide insights on [SPECIFIC_QUESTION].",
        category: "data",
        ai: "Claude"
    },
    {
        id: 430,
        title: "Wireframe optimizes Develop",
        content: "Develop a wireframe for [WEBSITE_TYPE] that optimizes for [CONVERSION_GOAL].",
        category: "design",
        ai: "Llama"
    },
    {
        id: 431,
        title: "Complexity. space function",
        content: "Write a function in [LANGUAGE] that [FUNCTIONALITY] with optimal time and space complexity.",
        category: "coding",
        ai: "GPT-4"
    },
    {
        id: 432,
        title: "Strategy increase engagement",
        content: "Develop a content strategy for [BRAND] that will increase engagement on [PLATFORM].",
        category: "marketing",
        ai: "Claude"
    },
    {
        id: 433,
        title: "That's supposed Debug",
        content: "Debug this [LANGUAGE] code that's supposed to [FUNCTIONALITY] but is producing [ERROR].",
        category: "coding",
        ai: "Llama"
    },
    {
        id: 434,
        title: "Content engagement increase",
        content: "Develop a content strategy for [BRAND] that will increase engagement on [PLATFORM].",
        category: "marketing",
        ai: "Claude"
    },
    {
        id: 435,
        title: "Tailored Develop comprehensive",
        content: "Develop a comprehensive [CONTENT_TYPE] on [TOPIC] with [STRUCTURE] tailored for [AUDIENCE].",
        category: "writing",
        ai: "Llama"
    },
    {
        id: 436,
        title: "Complexity. space Write",
        content: "Write a function in [LANGUAGE] that [FUNCTIONALITY] with optimal time and space complexity.",
        category: "coding",
        ai: "GPT-4"
    },
    {
        id: 437,
        title: "Strategy Develop engagement",
        content: "Develop a content strategy for [BRAND] that will increase engagement on [PLATFORM].",
        category: "marketing",
        ai: "GPT-4"
    },
    {
        id: 438,
        title: "Develop appeal pitch",
        content: "Develop a pitch deck for [STARTUP_IDEA] that will appeal to [INVESTOR_TYPE].",
        category: "business",
        ai: "Llama"
    },
    {
        id: 439,
        title: "Write clear includes",
        content: "Write a compelling email sequence for [PRODUCT_LAUNCH] that addresses common objections and includes clear CTAs.",
        category: "marketing",
        ai: "Claude"
    },
    {
        id: 440,
        title: "Tracks Design dashboard",
        content: "Design a dashboard that tracks [METRICS] for a [BUSINESS_TYPE].",
        category: "data",
        ai: "GPT-4"
    },
    {
        id: 441,
        title: "Function optimal Write",
        content: "Write a function in [LANGUAGE] that [FUNCTIONALITY] with optimal time and space complexity.",
        category: "coding",
        ai: "Gemini"
    },
    {
        id: 442,
        title: "Engagement Develop strategy",
        content: "Develop a content strategy for [BRAND] that will increase engagement on [PLATFORM].",
        category: "marketing",
        ai: "Gemini"
    },
    {
        id: 443,
        title: "Create implement tutorial",
        content: "Create a step-by-step tutorial on how to implement [FEATURE] in [FRAMEWORK].",
        category: "coding",
        ai: "Claude"
    },
    {
        id: 444,
        title: "Communicates visualization strategy",
        content: "Create a data visualization strategy for [DATA_TYPE] that effectively communicates [KEY_INSIGHT].",
        category: "data",
        ai: "GPT-4"
    },
    {
        id: 445,
        title: "Strategy engagement increase",
        content: "Develop a content strategy for [BRAND] that will increase engagement on [PLATFORM].",
        category: "marketing",
        ai: "Llama"
    },
    {
        id: 446,
        title: "Design interface improves",
        content: "Design a user interface for [APPLICATION] that emphasizes [DESIGN_PRINCIPLE] and improves [USER_EXPERIENCE].",
        category: "design",
        ai: "Llama"
    },
    {
        id: 447,
        title: "Typography, color usage",
        content: "Create a brand style guide for [COMPANY] that includes color palette, typography, and usage guidelines.",
        category: "design",
        ai: "Llama"
    },
    {
        id: 448,
        title: "Debug that's producing",
        content: "Debug this [LANGUAGE] code that's supposed to [FUNCTIONALITY] but is producing [ERROR].",
        category: "coding",
        ai: "Gemini"
    },
    {
        id: 449,
        title: "Create targeting marketing",
        content: "Create a marketing campaign for [PRODUCT] targeting [AUDIENCE] with a focus on [BENEFIT].",
        category: "marketing",
        ai: "Claude"
    },
    {
        id: 450,
        title: "Create includes addresses",
        content: "Create a detailed [CONTENT_TYPE] about [TOPIC] that includes [STRUCTURE] and addresses [AUDIENCE].",
        category: "writing",
        ai: "Claude"
    },
    {
        id: 451,
        title: "Increase content Develop",
        content: "Develop a content strategy for [BRAND] that will increase engagement on [PLATFORM].",
        category: "marketing",
        ai: "Claude"
    },
    {
        id: 452,
        title: "Write function space",
        content: "Write a function in [LANGUAGE] that [FUNCTIONALITY] with optimal time and space complexity.",
        category: "coding",
        ai: "Claude"
    },
    {
        id: 453,
        title: "Includes about detailed",
        content: "Create a detailed [CONTENT_TYPE] about [TOPIC] that includes [STRUCTURE] and addresses [AUDIENCE].",
        category: "writing",
        ai: "Claude"
    },
    {
        id: 454,
        title: "Tutorial Create step-by-step",
        content: "Create a step-by-step tutorial on how to implement [FEATURE] in [FRAMEWORK].",
        category: "coding",
        ai: "Claude"
    },
    {
        id: 455,
        title: "Implement tutorial step-by-step",
        content: "Create a step-by-step tutorial on how to implement [FEATURE] in [FRAMEWORK].",
        category: "coding",
        ai: "Llama"
    },
    {
        id: 456,
        title: "Tracks Design dashboard",
        content: "Design a dashboard that tracks [METRICS] for a [BUSINESS_TYPE].",
        category: "data",
        ai: "GPT-4"
    },
    {
        id: 457,
        title: "Focus marketing campaign",
        content: "Create a marketing campaign for [PRODUCT] targeting [AUDIENCE] with a focus on [BENEFIT].",
        category: "marketing",
        ai: "Gemini"
    },
    {
        id: 458,
        title: "Focus Create campaign",
        content: "Create a marketing campaign for [PRODUCT] targeting [AUDIENCE] with a focus on [BENEFIT].",
        category: "marketing",
        ai: "Llama"
    },
    {
        id: 459,
        title: "Develop comprehensive tailored",
        content: "Develop a comprehensive [CONTENT_TYPE] on [TOPIC] with [STRUCTURE] tailored for [AUDIENCE].",
        category: "writing",
        ai: "Claude"
    },
    {
        id: 460,
        title: "Sequence includes addresses",
        content: "Write a compelling email sequence for [PRODUCT_LAUNCH] that addresses common objections and includes clear CTAs.",
        category: "marketing",
        ai: "GPT-4"
    },
    {
        id: 461,
        title: "Tracks dashboard Design",
        content: "Design a dashboard that tracks [METRICS] for a [BUSINESS_TYPE].",
        category: "data",
        ai: "Claude"
    },
    {
        id: 462,
        title: "Detailed industry. Write",
        content: "Write a detailed SWOT analysis for [COMPANY] in the [INDUSTRY] industry.",
        category: "business",
        ai: "GPT-4"
    },
    {
        id: 463,
        title: "Detailed Write analysis",
        content: "Write a detailed SWOT analysis for [COMPANY] in the [INDUSTRY] industry.",
        category: "business",
        ai: "Claude"
    },
    {
        id: 464,
        title: "Space optimal Write",
        content: "Write a function in [LANGUAGE] that [FUNCTIONALITY] with optimal time and space complexity.",
        category: "coding",
        ai: "GPT-4"
    },
    {
        id: 465,
        title: "Analyze dataset provide",
        content: "Analyze this dataset about [TOPIC] and provide insights on [SPECIFIC_QUESTION].",
        category: "data",
        ai: "Claude"
    },
    {
        id: 466,
        title: "Create communicates effectively",
        content: "Create a data visualization strategy for [DATA_TYPE] that effectively communicates [KEY_INSIGHT].",
        category: "data",
        ai: "Gemini"
    },
    {
        id: 467,
        title: "Marketing campaign targeting",
        content: "Create a marketing campaign for [PRODUCT] targeting [AUDIENCE] with a focus on [BENEFIT].",
        category: "marketing",
        ai: "Llama"
    },
    {
        id: 468,
        title: "Tailored Develop comprehensive",
        content: "Develop a comprehensive [CONTENT_TYPE] on [TOPIC] with [STRUCTURE] tailored for [AUDIENCE].",
        category: "writing",
        ai: "Llama"
    },
    {
        id: 469,
        title: "Industry. Write analysis",
        content: "Write a detailed SWOT analysis for [COMPANY] in the [INDUSTRY] industry.",
        category: "business",
        ai: "Claude"
    },
    {
        id: 470,
        title: "Dashboard Design tracks",
        content: "Design a dashboard that tracks [METRICS] for a [BUSINESS_TYPE].",
        category: "data",
        ai: "Gemini"
    },
    {
        id: 471,
        title: "Analyze dataset provide",
        content: "Analyze this dataset about [TOPIC] and provide insights on [SPECIFIC_QUESTION].",
        category: "data",
        ai: "Claude"
    },
    {
        id: 472,
        title: "About addresses detailed",
        content: "Create a detailed [CONTENT_TYPE] about [TOPIC] that includes [STRUCTURE] and addresses [AUDIENCE].",
        category: "writing",
        ai: "GPT-4"
    },
    {
        id: 473,
        title: "Step-by-step Create implement",
        content: "Create a step-by-step tutorial on how to implement [FEATURE] in [FRAMEWORK].",
        category: "coding",
        ai: "Claude"
    },
    {
        id: 474,
        title: "Analysis industry. Write",
        content: "Write a detailed SWOT analysis for [COMPANY] in the [INDUSTRY] industry.",
        category: "business",
        ai: "Llama"
    },
    {
        id: 475,
        title: "Style usage brand",
        content: "Create a brand style guide for [COMPANY] that includes color palette, typography, and usage guidelines.",
        category: "design",
        ai: "Llama"
    },
    {
        id: 476,
        title: "Focus campaign targeting",
        content: "Create a marketing campaign for [PRODUCT] targeting [AUDIENCE] with a focus on [BENEFIT].",
        category: "marketing",
        ai: "Gemini"
    },
    {
        id: 477,
        title: "Write complexity. space",
        content: "Write a function in [LANGUAGE] that [FUNCTIONALITY] with optimal time and space complexity.",
        category: "coding",
        ai: "Gemini"
    },
    {
        id: 478,
        title: "Develop appeal pitch",
        content: "Develop a pitch deck for [STARTUP_IDEA] that will appeal to [INVESTOR_TYPE].",
        category: "business",
        ai: "Llama"
    },
    {
        id: 479,
        title: "Develop appeal pitch",
        content: "Develop a pitch deck for [STARTUP_IDEA] that will appeal to [INVESTOR_TYPE].",
        category: "business",
        ai: "Claude"
    },
    {
        id: 480,
        title: "Manner. concise research",
        content: "Summarize the key findings, methodology, and implications of research on [TOPIC] in a clear and concise manner.",
        category: "writing",
        ai: "Claude"
    },
    {
        id: 481,
        title: "Concise Summarize research",
        content: "Summarize the key findings, methodology, and implications of research on [TOPIC] in a clear and concise manner.",
        category: "writing",
        ai: "Claude"
    },
    {
        id: 482,
        title: "Emphasizes interface Design",
        content: "Design a user interface for [APPLICATION] that emphasizes [DESIGN_PRINCIPLE] and improves [USER_EXPERIENCE].",
        category: "design",
        ai: "Llama"
    },
    {
        id: 483,
        title: "Concise manner. methodology,",
        content: "Summarize the key findings, methodology, and implications of research on [TOPIC] in a clear and concise manner.",
        category: "writing",
        ai: "Llama"
    },
    {
        id: 484,
        title: "Financial Create strategy.",
        content: "Create a business plan for [BUSINESS_TYPE] that includes market analysis, financial projections, and growth strategy.",
        category: "business",
        ai: "Claude"
    },
    {
        id: 485,
        title: "That's Debug producing",
        content: "Debug this [LANGUAGE] code that's supposed to [FUNCTIONALITY] but is producing [ERROR].",
        category: "coding",
        ai: "GPT-4"
    },
    {
        id: 486,
        title: "Addresses compelling common",
        content: "Write a compelling email sequence for [PRODUCT_LAUNCH] that addresses common objections and includes clear CTAs.",
        category: "marketing",
        ai: "GPT-4"
    },
    {
        id: 487,
        title: "Tracks dashboard Design",
        content: "Design a dashboard that tracks [METRICS] for a [BUSINESS_TYPE].",
        category: "data",
        ai: "Claude"
    },
    {
        id: 488,
        title: "Tutorial implement Create",
        content: "Create a step-by-step tutorial on how to implement [FEATURE] in [FRAMEWORK].",
        category: "coding",
        ai: "GPT-4"
    },
    {
        id: 489,
        title: "Addresses detailed Create",
        content: "Create a detailed [CONTENT_TYPE] about [TOPIC] that includes [STRUCTURE] and addresses [AUDIENCE].",
        category: "writing",
        ai: "Llama"
    },
    {
        id: 490,
        title: "Communicates visualization effectively",
        content: "Create a data visualization strategy for [DATA_TYPE] that effectively communicates [KEY_INSIGHT].",
        category: "data",
        ai: "GPT-4"
    },
    {
        id: 491,
        title: "Effectively Create strategy",
        content: "Create a data visualization strategy for [DATA_TYPE] that effectively communicates [KEY_INSIGHT].",
        category: "data",
        ai: "Claude"
    },
    {
        id: 492,
        title: "Develop comprehensive tailored",
        content: "Develop a comprehensive [CONTENT_TYPE] on [TOPIC] with [STRUCTURE] tailored for [AUDIENCE].",
        category: "writing",
        ai: "GPT-4"
    },
    {
        id: 493,
        title: "Interface Design emphasizes",
        content: "Design a user interface for [APPLICATION] that emphasizes [DESIGN_PRINCIPLE] and improves [USER_EXPERIENCE].",
        category: "design",
        ai: "GPT-4"
    },
    {
        id: 494,
        title: "Develop optimizes wireframe",
        content: "Develop a wireframe for [WEBSITE_TYPE] that optimizes for [CONVERSION_GOAL].",
        category: "design",
        ai: "Claude"
    },
    {
        id: 495,
        title: "Dataset insights Analyze",
        content: "Analyze this dataset about [TOPIC] and provide insights on [SPECIFIC_QUESTION].",
        category: "data",
        ai: "Claude"
    },
    {
        id: 496,
        title: "Strategy engagement content",
        content: "Develop a content strategy for [BRAND] that will increase engagement on [PLATFORM].",
        category: "marketing",
        ai: "Gemini"
    },
    {
        id: 497,
        title: "Communicates Create effectively",
        content: "Create a data visualization strategy for [DATA_TYPE] that effectively communicates [KEY_INSIGHT].",
        category: "data",
        ai: "Gemini"
    },
    {
        id: 498,
        title: "Create addresses detailed",
        content: "Create a detailed [CONTENT_TYPE] about [TOPIC] that includes [STRUCTURE] and addresses [AUDIENCE].",
        category: "writing",
        ai: "Claude"
    },
    {
        id: 499,
        title: "Design tracks dashboard",
        content: "Design a dashboard that tracks [METRICS] for a [BUSINESS_TYPE].",
        category: "data",
        ai: "Gemini"
    },
    {
        id: 500,
        title: "Interface improves Design",
        content: "Design a user interface for [APPLICATION] that emphasizes [DESIGN_PRINCIPLE] and improves [USER_EXPERIENCE].",
        category: "design",
        ai: "Llama"
    },
    {
        id: 501,
        title: "Focus campaign targeting",
        content: "Create a marketing campaign for [PRODUCT] targeting [AUDIENCE] with a focus on [BENEFIT].",
        category: "marketing",
        ai: "Claude"
    },
    {
        id: 502,
        title: "Guidelines. color palette,",
        content: "Create a brand style guide for [COMPANY] that includes color palette, typography, and usage guidelines.",
        category: "design",
        ai: "Gemini"
    },
    {
        id: 503,
        title: "Space complexity. function",
        content: "Write a function in [LANGUAGE] that [FUNCTIONALITY] with optimal time and space complexity.",
        category: "coding",
        ai: "Llama"
    },
    {
        id: 504,
        title: "Addresses sequence email",
        content: "Write a compelling email sequence for [PRODUCT_LAUNCH] that addresses common objections and includes clear CTAs.",
        category: "marketing",
        ai: "Gemini"
    },
    {
        id: 505,
        title: "Interface improves emphasizes",
        content: "Design a user interface for [APPLICATION] that emphasizes [DESIGN_PRINCIPLE] and improves [USER_EXPERIENCE].",
        category: "design",
        ai: "Claude"
    },
    {
        id: 506,
        title: "Write industry. analysis",
        content: "Write a detailed SWOT analysis for [COMPANY] in the [INDUSTRY] industry.",
        category: "business",
        ai: "Claude"
    },
    {
        id: 507,
        title: "Strategy content Develop",
        content: "Develop a content strategy for [BRAND] that will increase engagement on [PLATFORM].",
        category: "marketing",
        ai: "Llama"
    },
    {
        id: 508,
        title: "Create step-by-step tutorial",
        content: "Create a step-by-step tutorial on how to implement [FEATURE] in [FRAMEWORK].",
        category: "coding",
        ai: "GPT-4"
    },
    {
        id: 509,
        title: "Wireframe optimizes Develop",
        content: "Develop a wireframe for [WEBSITE_TYPE] that optimizes for [CONVERSION_GOAL].",
        category: "design",
        ai: "GPT-4"
    },
    {
        id: 510,
        title: "Design tracks dashboard",
        content: "Design a dashboard that tracks [METRICS] for a [BUSINESS_TYPE].",
        category: "data",
        ai: "Gemini"
    },
    {
        id: 511,
        title: "Appeal Develop pitch",
        content: "Develop a pitch deck for [STARTUP_IDEA] that will appeal to [INVESTOR_TYPE].",
        category: "business",
        ai: "GPT-4"
    },
    {
        id: 512,
        title: "Marketing targeting focus",
        content: "Create a marketing campaign for [PRODUCT] targeting [AUDIENCE] with a focus on [BENEFIT].",
        category: "marketing",
        ai: "GPT-4"
    },
    {
        id: 513,
        title: "Focus marketing targeting",
        content: "Create a marketing campaign for [PRODUCT] targeting [AUDIENCE] with a focus on [BENEFIT].",
        category: "marketing",
        ai: "Gemini"
    },
    {
        id: 514,
        title: "Write email sequence",
        content: "Write a compelling email sequence for [PRODUCT_LAUNCH] that addresses common objections and includes clear CTAs.",
        category: "marketing",
        ai: "GPT-4"
    },
    {
        id: 515,
        title: "Optimal Write function",
        content: "Write a function in [LANGUAGE] that [FUNCTIONALITY] with optimal time and space complexity.",
        category: "coding",
        ai: "GPT-4"
    },
    {
        id: 516,
        title: "Create implement step-by-step",
        content: "Create a step-by-step tutorial on how to implement [FEATURE] in [FRAMEWORK].",
        category: "coding",
        ai: "GPT-4"
    },
    {
        id: 517,
        title: "Create addresses about",
        content: "Create a detailed [CONTENT_TYPE] about [TOPIC] that includes [STRUCTURE] and addresses [AUDIENCE].",
        category: "writing",
        ai: "Llama"
    },
    {
        id: 518,
        title: "Create visualization communicates",
        content: "Create a data visualization strategy for [DATA_TYPE] that effectively communicates [KEY_INSIGHT].",
        category: "data",
        ai: "GPT-4"
    },
    {
        id: 519,
        title: "Visualization communicates Create",
        content: "Create a data visualization strategy for [DATA_TYPE] that effectively communicates [KEY_INSIGHT].",
        category: "data",
        ai: "Gemini"
    },
    {
        id: 520,
        title: "Dataset provide about",
        content: "Analyze this dataset about [TOPIC] and provide insights on [SPECIFIC_QUESTION].",
        category: "data",
        ai: "Claude"
    },
    {
        id: 521,
        title: "Create focus targeting",
        content: "Create a marketing campaign for [PRODUCT] targeting [AUDIENCE] with a focus on [BENEFIT].",
        category: "marketing",
        ai: "Claude"
    },
    {
        id: 522,
        title: "Develop comprehensive tailored",
        content: "Develop a comprehensive [CONTENT_TYPE] on [TOPIC] with [STRUCTURE] tailored for [AUDIENCE].",
        category: "writing",
        ai: "Claude"
    },
    {
        id: 523,
        title: "Strategy Create effectively",
        content: "Create a data visualization strategy for [DATA_TYPE] that effectively communicates [KEY_INSIGHT].",
        category: "data",
        ai: "Llama"
    },
    {
        id: 524,
        title: "Create market includes",
        content: "Create a business plan for [BUSINESS_TYPE] that includes market analysis, financial projections, and growth strategy.",
        category: "business",
        ai: "GPT-4"
    },
    {
        id: 525,
        title: "Develop pitch appeal",
        content: "Develop a pitch deck for [STARTUP_IDEA] that will appeal to [INVESTOR_TYPE].",
        category: "business",
        ai: "Gemini"
    },
    {
        id: 526,
        title: "Design emphasizes improves",
        content: "Design a user interface for [APPLICATION] that emphasizes [DESIGN_PRINCIPLE] and improves [USER_EXPERIENCE].",
        category: "design",
        ai: "GPT-4"
    },
    {
        id: 527,
        title: "Provide Analyze dataset",
        content: "Analyze this dataset about [TOPIC] and provide insights on [SPECIFIC_QUESTION].",
        category: "data",
        ai: "Gemini"
    },
    {
        id: 528,
        title: "Supposed Debug that's",
        content: "Debug this [LANGUAGE] code that's supposed to [FUNCTIONALITY] but is producing [ERROR].",
        category: "coding",
        ai: "Gemini"
    },
    {
        id: 529,
        title: "Appeal pitch Develop",
        content: "Develop a pitch deck for [STARTUP_IDEA] that will appeal to [INVESTOR_TYPE].",
        category: "business",
        ai: "Gemini"
    },
    {
        id: 530,
        title: "Tailored Develop comprehensive",
        content: "Develop a comprehensive [CONTENT_TYPE] on [TOPIC] with [STRUCTURE] tailored for [AUDIENCE].",
        category: "writing",
        ai: "Llama"
    },
    {
        id: 531,
        title: "Producing Debug that's",
        content: "Debug this [LANGUAGE] code that's supposed to [FUNCTIONALITY] but is producing [ERROR].",
        category: "coding",
        ai: "Claude"
    },
    {
        id: 532,
        title: "Marketing focus targeting",
        content: "Create a marketing campaign for [PRODUCT] targeting [AUDIENCE] with a focus on [BENEFIT].",
        category: "marketing",
        ai: "GPT-4"
    },
    {
        id: 533,
        title: "Methodology, implications concise",
        content: "Summarize the key findings, methodology, and implications of research on [TOPIC] in a clear and concise manner.",
        category: "writing",
        ai: "Gemini"
    },
    {
        id: 534,
        title: "Complexity. optimal space",
        content: "Write a function in [LANGUAGE] that [FUNCTIONALITY] with optimal time and space complexity.",
        category: "coding",
        ai: "GPT-4"
    },
    {
        id: 535,
        title: "That's producing Debug",
        content: "Debug this [LANGUAGE] code that's supposed to [FUNCTIONALITY] but is producing [ERROR].",
        category: "coding",
        ai: "Claude"
    },
    {
        id: 536,
        title: "Develop optimizes wireframe",
        content: "Develop a wireframe for [WEBSITE_TYPE] that optimizes for [CONVERSION_GOAL].",
        category: "design",
        ai: "Claude"
    },
    {
        id: 537,
        title: "Detailed includes addresses",
        content: "Create a detailed [CONTENT_TYPE] about [TOPIC] that includes [STRUCTURE] and addresses [AUDIENCE].",
        category: "writing",
        ai: "Llama"
    },
    {
        id: 538,
        title: "Comprehensive tailored Develop",
        content: "Develop a comprehensive [CONTENT_TYPE] on [TOPIC] with [STRUCTURE] tailored for [AUDIENCE].",
        category: "writing",
        ai: "Claude"
    },
    {
        id: 539,
        title: "Guide typography, palette,",
        content: "Create a brand style guide for [COMPANY] that includes color palette, typography, and usage guidelines.",
        category: "design",
        ai: "Llama"
    },
    {
        id: 540,
        title: "Appeal Develop pitch",
        content: "Develop a pitch deck for [STARTUP_IDEA] that will appeal to [INVESTOR_TYPE].",
        category: "business",
        ai: "Claude"
    },
    {
        id: 541,
        title: "Methodology, research manner.",
        content: "Summarize the key findings, methodology, and implications of research on [TOPIC] in a clear and concise manner.",
        category: "writing",
        ai: "GPT-4"
    },
    {
        id: 542,
        title: "Optimal function space",
        content: "Write a function in [LANGUAGE] that [FUNCTIONALITY] with optimal time and space complexity.",
        category: "coding",
        ai: "Claude"
    },
    {
        id: 543,
        title: "Step-by-step implement Create",
        content: "Create a step-by-step tutorial on how to implement [FEATURE] in [FRAMEWORK].",
        category: "coding",
        ai: "GPT-4"
    },
    {
        id: 544,
        title: "Tutorial step-by-step Create",
        content: "Create a step-by-step tutorial on how to implement [FEATURE] in [FRAMEWORK].",
        category: "coding",
        ai: "Claude"
    },
    {
        id: 545,
        title: "Create targeting campaign",
        content: "Create a marketing campaign for [PRODUCT] targeting [AUDIENCE] with a focus on [BENEFIT].",
        category: "marketing",
        ai: "Llama"
    },
    {
        id: 546,
        title: "Business projections, financial",
        content: "Create a business plan for [BUSINESS_TYPE] that includes market analysis, financial projections, and growth strategy.",
        category: "business",
        ai: "Claude"
    },
    {
        id: 547,
        title: "Optimal space Write",
        content: "Write a function in [LANGUAGE] that [FUNCTIONALITY] with optimal time and space complexity.",
        category: "coding",
        ai: "Gemini"
    },
    {
        id: 548,
        title: "Implement step-by-step tutorial",
        content: "Create a step-by-step tutorial on how to implement [FEATURE] in [FRAMEWORK].",
        category: "coding",
        ai: "GPT-4"
    },
    {
        id: 549,
        title: "Email compelling addresses",
        content: "Write a compelling email sequence for [PRODUCT_LAUNCH] that addresses common objections and includes clear CTAs.",
        category: "marketing",
        ai: "GPT-4"
    },
    {
        id: 550,
        title: "Sequence common addresses",
        content: "Write a compelling email sequence for [PRODUCT_LAUNCH] that addresses common objections and includes clear CTAs.",
        category: "marketing",
        ai: "GPT-4"
    },
    {
        id: 551,
        title: "Improves Design emphasizes",
        content: "Design a user interface for [APPLICATION] that emphasizes [DESIGN_PRINCIPLE] and improves [USER_EXPERIENCE].",
        category: "design",
        ai: "Claude"
    },
    {
        id: 552,
        title: "Design interface emphasizes",
        content: "Design a user interface for [APPLICATION] that emphasizes [DESIGN_PRINCIPLE] and improves [USER_EXPERIENCE].",
        category: "design",
        ai: "Gemini"
    },
    {
        id: 553,
        title: "Content strategy Develop",
        content: "Develop a content strategy for [BRAND] that will increase engagement on [PLATFORM].",
        category: "marketing",
        ai: "Claude"
    },
    {
        id: 554,
        title: "Usage style brand",
        content: "Create a brand style guide for [COMPANY] that includes color palette, typography, and usage guidelines.",
        category: "design",
        ai: "Llama"
    },
    {
        id: 555,
        title: "Findings, clear manner.",
        content: "Summarize the key findings, methodology, and implications of research on [TOPIC] in a clear and concise manner.",
        category: "writing",
        ai: "Llama"
    },
    {
        id: 556,
        title: "Tailored comprehensive Develop",
        content: "Develop a comprehensive [CONTENT_TYPE] on [TOPIC] with [STRUCTURE] tailored for [AUDIENCE].",
        category: "writing",
        ai: "Claude"
    },
    {
        id: 557,
        title: "Create about detailed",
        content: "Create a detailed [CONTENT_TYPE] about [TOPIC] that includes [STRUCTURE] and addresses [AUDIENCE].",
        category: "writing",
        ai: "Gemini"
    },
    {
        id: 558,
        title: "Develop content strategy",
        content: "Develop a content strategy for [BRAND] that will increase engagement on [PLATFORM].",
        category: "marketing",
        ai: "Gemini"
    },
    {
        id: 559,
        title: "About detailed includes",
        content: "Create a detailed [CONTENT_TYPE] about [TOPIC] that includes [STRUCTURE] and addresses [AUDIENCE].",
        category: "writing",
        ai: "Claude"
    },
    {
        id: 560,
        title: "Concise findings, implications",
        content: "Summarize the key findings, methodology, and implications of research on [TOPIC] in a clear and concise manner.",
        category: "writing",
        ai: "GPT-4"
    },
    {
        id: 561,
        title: "Typography, Create guidelines.",
        content: "Create a brand style guide for [COMPANY] that includes color palette, typography, and usage guidelines.",
        category: "design",
        ai: "Claude"
    },
    {
        id: 562,
        title: "Improves emphasizes Design",
        content: "Design a user interface for [APPLICATION] that emphasizes [DESIGN_PRINCIPLE] and improves [USER_EXPERIENCE].",
        category: "design",
        ai: "Llama"
    },
    {
        id: 563,
        title: "Dashboard tracks Design",
        content: "Design a dashboard that tracks [METRICS] for a [BUSINESS_TYPE].",
        category: "data",
        ai: "GPT-4"
    },
    {
        id: 564,
        title: "Comprehensive Develop tailored",
        content: "Develop a comprehensive [CONTENT_TYPE] on [TOPIC] with [STRUCTURE] tailored for [AUDIENCE].",
        category: "writing",
        ai: "Llama"
    },
    {
        id: 565,
        title: "Campaign Create targeting",
        content: "Create a marketing campaign for [PRODUCT] targeting [AUDIENCE] with a focus on [BENEFIT].",
        category: "marketing",
        ai: "Llama"
    },
    {
        id: 566,
        title: "Comprehensive tailored Develop",
        content: "Develop a comprehensive [CONTENT_TYPE] on [TOPIC] with [STRUCTURE] tailored for [AUDIENCE].",
        category: "writing",
        ai: "Llama"
    },
    {
        id: 567,
        title: "About Create addresses",
        content: "Create a detailed [CONTENT_TYPE] about [TOPIC] that includes [STRUCTURE] and addresses [AUDIENCE].",
        category: "writing",
        ai: "GPT-4"
    },
    {
        id: 568,
        title: "Includes addresses clear",
        content: "Write a compelling email sequence for [PRODUCT_LAUNCH] that addresses common objections and includes clear CTAs.",
        category: "marketing",
        ai: "Llama"
    },
    {
        id: 569,
        title: "Step-by-step implement Create",
        content: "Create a step-by-step tutorial on how to implement [FEATURE] in [FRAMEWORK].",
        category: "coding",
        ai: "GPT-4"
    },
    {
        id: 570,
        title: "Wireframe optimizes Develop",
        content: "Develop a wireframe for [WEBSITE_TYPE] that optimizes for [CONVERSION_GOAL].",
        category: "design",
        ai: "Llama"
    },
    {
        id: 571,
        title: "Step-by-step Create implement",
        content: "Create a step-by-step tutorial on how to implement [FEATURE] in [FRAMEWORK].",
        category: "coding",
        ai: "Llama"
    },
    {
        id: 572,
        title: "Includes about Create",
        content: "Create a detailed [CONTENT_TYPE] about [TOPIC] that includes [STRUCTURE] and addresses [AUDIENCE].",
        category: "writing",
        ai: "Gemini"
    },
    {
        id: 573,
        title: "Tutorial implement Create",
        content: "Create a step-by-step tutorial on how to implement [FEATURE] in [FRAMEWORK].",
        category: "coding",
        ai: "Claude"
    },
    {
        id: 574,
        title: "Create step-by-step tutorial",
        content: "Create a step-by-step tutorial on how to implement [FEATURE] in [FRAMEWORK].",
        category: "coding",
        ai: "Llama"
    },
    {
        id: 575,
        title: "Detailed industry. analysis",
        content: "Write a detailed SWOT analysis for [COMPANY] in the [INDUSTRY] industry.",
        category: "business",
        ai: "GPT-4"
    },
    {
        id: 576,
        title: "Create step-by-step implement",
        content: "Create a step-by-step tutorial on how to implement [FEATURE] in [FRAMEWORK].",
        category: "coding",
        ai: "Claude"
    },
    {
        id: 577,
        title: "Debug supposed that's",
        content: "Debug this [LANGUAGE] code that's supposed to [FUNCTIONALITY] but is producing [ERROR].",
        category: "coding",
        ai: "Llama"
    },
    {
        id: 578,
        title: "Pitch appeal Develop",
        content: "Develop a pitch deck for [STARTUP_IDEA] that will appeal to [INVESTOR_TYPE].",
        category: "business",
        ai: "Llama"
    },
    {
        id: 579,
        title: "Increase Develop engagement",
        content: "Develop a content strategy for [BRAND] that will increase engagement on [PLATFORM].",
        category: "marketing",
        ai: "GPT-4"
    },
    {
        id: 580,
        title: "Targeting Create focus",
        content: "Create a marketing campaign for [PRODUCT] targeting [AUDIENCE] with a focus on [BENEFIT].",
        category: "marketing",
        ai: "Gemini"
    },
    {
        id: 581,
        title: "Create strategy. market",
        content: "Create a business plan for [BUSINESS_TYPE] that includes market analysis, financial projections, and growth strategy.",
        category: "business",
        ai: "Gemini"
    },
    {
        id: 582,
        title: "Comprehensive Develop tailored",
        content: "Develop a comprehensive [CONTENT_TYPE] on [TOPIC] with [STRUCTURE] tailored for [AUDIENCE].",
        category: "writing",
        ai: "Llama"
    },
    {
        id: 583,
        title: "Supposed Debug producing",
        content: "Debug this [LANGUAGE] code that's supposed to [FUNCTIONALITY] but is producing [ERROR].",
        category: "coding",
        ai: "GPT-4"
    },
    {
        id: 584,
        title: "Market projections, Create",
        content: "Create a business plan for [BUSINESS_TYPE] that includes market analysis, financial projections, and growth strategy.",
        category: "business",
        ai: "Llama"
    },
    {
        id: 585,
        title: "Methodology, concise Summarize",
        content: "Summarize the key findings, methodology, and implications of research on [TOPIC] in a clear and concise manner.",
        category: "writing",
        ai: "Llama"
    },
    {
        id: 586,
        title: "Addresses includes detailed",
        content: "Create a detailed [CONTENT_TYPE] about [TOPIC] that includes [STRUCTURE] and addresses [AUDIENCE].",
        category: "writing",
        ai: "Gemini"
    },
    {
        id: 587,
        title: "Campaign targeting focus",
        content: "Create a marketing campaign for [PRODUCT] targeting [AUDIENCE] with a focus on [BENEFIT].",
        category: "marketing",
        ai: "Llama"
    },
    {
        id: 588,
        title: "Palette, includes guide",
        content: "Create a brand style guide for [COMPANY] that includes color palette, typography, and usage guidelines.",
        category: "design",
        ai: "Llama"
    },
    {
        id: 589,
        title: "Step-by-step Create tutorial",
        content: "Create a step-by-step tutorial on how to implement [FEATURE] in [FRAMEWORK].",
        category: "coding",
        ai: "GPT-4"
    },
    {
        id: 590,
        title: "Tutorial step-by-step implement",
        content: "Create a step-by-step tutorial on how to implement [FEATURE] in [FRAMEWORK].",
        category: "coding",
        ai: "Llama"
    },
    {
        id: 591,
        title: "Engagement Develop increase",
        content: "Develop a content strategy for [BRAND] that will increase engagement on [PLATFORM].",
        category: "marketing",
        ai: "GPT-4"
    },
    {
        id: 592,
        title: "Detailed includes Create",
        content: "Create a detailed [CONTENT_TYPE] about [TOPIC] that includes [STRUCTURE] and addresses [AUDIENCE].",
        category: "writing",
        ai: "Gemini"
    },
    {
        id: 593,
        title: "Develop pitch appeal",
        content: "Develop a pitch deck for [STARTUP_IDEA] that will appeal to [INVESTOR_TYPE].",
        category: "business",
        ai: "Llama"
    },
    {
        id: 594,
        title: "Develop appeal pitch",
        content: "Develop a pitch deck for [STARTUP_IDEA] that will appeal to [INVESTOR_TYPE].",
        category: "business",
        ai: "Llama"
    },
    {
        id: 595,
        title: "Implement step-by-step tutorial",
        content: "Create a step-by-step tutorial on how to implement [FEATURE] in [FRAMEWORK].",
        category: "coding",
        ai: "Gemini"
    },
    {
        id: 596,
        title: "Tracks dashboard Design",
        content: "Design a dashboard that tracks [METRICS] for a [BUSINESS_TYPE].",
        category: "data",
        ai: "GPT-4"
    },
    {
        id: 597,
        title: "Implement Create step-by-step",
        content: "Create a step-by-step tutorial on how to implement [FEATURE] in [FRAMEWORK].",
        category: "coding",
        ai: "GPT-4"
    },
    {
        id: 598,
        title: "Analysis industry. Write",
        content: "Write a detailed SWOT analysis for [COMPANY] in the [INDUSTRY] industry.",
        category: "business",
        ai: "GPT-4"
    },
    {
        id: 599,
        title: "Optimizes wireframe Develop",
        content: "Develop a wireframe for [WEBSITE_TYPE] that optimizes for [CONVERSION_GOAL].",
        category: "design",
        ai: "GPT-4"
    },
    {
        id: 600,
        title: "Interface emphasizes improves",
        content: "Design a user interface for [APPLICATION] that emphasizes [DESIGN_PRINCIPLE] and improves [USER_EXPERIENCE].",
        category: "design",
        ai: "Llama"
    },
    {
        id: 601,
        title: "Create communicates effectively",
        content: "Create a data visualization strategy for [DATA_TYPE] that effectively communicates [KEY_INSIGHT].",
        category: "data",
        ai: "Claude"
    },
    {
        id: 602,
        title: "Develop optimizes wireframe",
        content: "Develop a wireframe for [WEBSITE_TYPE] that optimizes for [CONVERSION_GOAL].",
        category: "design",
        ai: "Claude"
    },
    {
        id: 603,
        title: "Guide includes guidelines.",
        content: "Create a brand style guide for [COMPANY] that includes color palette, typography, and usage guidelines.",
        category: "design",
        ai: "Gemini"
    },
    {
        id: 604,
        title: "Create communicates visualization",
        content: "Create a data visualization strategy for [DATA_TYPE] that effectively communicates [KEY_INSIGHT].",
        category: "data",
        ai: "Gemini"
    },
    {
        id: 605,
        title: "Content engagement strategy",
        content: "Develop a content strategy for [BRAND] that will increase engagement on [PLATFORM].",
        category: "marketing",
        ai: "Llama"
    },
    {
        id: 606,
        title: "Addresses includes about",
        content: "Create a detailed [CONTENT_TYPE] about [TOPIC] that includes [STRUCTURE] and addresses [AUDIENCE].",
        category: "writing",
        ai: "Gemini"
    },
    {
        id: 607,
        title: "Develop appeal pitch",
        content: "Develop a pitch deck for [STARTUP_IDEA] that will appeal to [INVESTOR_TYPE].",
        category: "business",
        ai: "Gemini"
    },
    {
        id: 608,
        title: "Supposed Debug producing",
        content: "Debug this [LANGUAGE] code that's supposed to [FUNCTIONALITY] but is producing [ERROR].",
        category: "coding",
        ai: "Gemini"
    },
    {
        id: 609,
        title: "Financial business market",
        content: "Create a business plan for [BUSINESS_TYPE] that includes market analysis, financial projections, and growth strategy.",
        category: "business",
        ai: "Claude"
    },
    {
        id: 610,
        title: "Develop optimizes wireframe",
        content: "Develop a wireframe for [WEBSITE_TYPE] that optimizes for [CONVERSION_GOAL].",
        category: "design",
        ai: "Llama"
    },
    {
        id: 611,
        title: "Optimizes wireframe Develop",
        content: "Develop a wireframe for [WEBSITE_TYPE] that optimizes for [CONVERSION_GOAL].",
        category: "design",
        ai: "Claude"
    },
    {
        id: 612,
        title: "Clear includes objections",
        content: "Write a compelling email sequence for [PRODUCT_LAUNCH] that addresses common objections and includes clear CTAs.",
        category: "marketing",
        ai: "Gemini"
    },
    {
        id: 613,
        title: "Develop optimizes wireframe",
        content: "Develop a wireframe for [WEBSITE_TYPE] that optimizes for [CONVERSION_GOAL].",
        category: "design",
        ai: "GPT-4"
    },
    {
        id: 614,
        title: "Create step-by-step implement",
        content: "Create a step-by-step tutorial on how to implement [FEATURE] in [FRAMEWORK].",
        category: "coding",
        ai: "Llama"
    },
    {
        id: 615,
        title: "Create step-by-step tutorial",
        content: "Create a step-by-step tutorial on how to implement [FEATURE] in [FRAMEWORK].",
        category: "coding",
        ai: "Gemini"
    },
    {
        id: 616,
        title: "Wireframe Develop optimizes",
        content: "Develop a wireframe for [WEBSITE_TYPE] that optimizes for [CONVERSION_GOAL].",
        category: "design",
        ai: "GPT-4"
    },
    {
        id: 617,
        title: "Function Write complexity.",
        content: "Write a function in [LANGUAGE] that [FUNCTIONALITY] with optimal time and space complexity.",
        category: "coding",
        ai: "Claude"
    },
    {
        id: 618,
        title: "Concise clear research",
        content: "Summarize the key findings, methodology, and implications of research on [TOPIC] in a clear and concise manner.",
        category: "writing",
        ai: "Llama"
    },
    {
        id: 619,
        title: "Write industry. analysis",
        content: "Write a detailed SWOT analysis for [COMPANY] in the [INDUSTRY] industry.",
        category: "business",
        ai: "Gemini"
    },
    {
        id: 620,
        title: "Interface improves emphasizes",
        content: "Design a user interface for [APPLICATION] that emphasizes [DESIGN_PRINCIPLE] and improves [USER_EXPERIENCE].",
        category: "design",
        ai: "GPT-4"
    }
];

// Add these to defaultPromptsData
defaultPromptsData.push(...newGeneratedPrompts);
