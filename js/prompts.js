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
                updateStats();
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
                    updateStats();
                }
            } catch (e) {
                console.error('Error parsing cached prompts:', e);
            }
        }
        
        return false;
    }
}

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

<<<<<<< HEAD
// Ensure prompts are displayed after a short delay
setTimeout(ensurePromptsDisplayed, 1000);
=======
console.log('Prompts loaded:', window.promptsData.length, 'items');
console.log('First prompt:', window.promptsData[0]);

// New prompts generated on 2025-03-16T18:23:12.422Z
const newGeneratedPrompts = [
    {
        id: 11,
        title: "Data Analysis Guide",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 12,
        title: "Code Review Framework",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 13,
        title: "Email Campaign Assistant",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 14,
        title: "Ad Copy Guide",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 15,
        title: "Data Visualization Framework",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 16,
        title: "Meeting Agenda Generator",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 17,
        title: "Brand Guidelines Assistant",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 18,
        title: "Data Analysis Template",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 19,
        title: "Executive Summary Guide",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 20,
        title: "Essay Structure Template",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    }
];

// Add these to defaultPromptsData
defaultPromptsData.push(...newGeneratedPrompts);
>>>>>>> fe17b01ffc72f254ab4238bd92411f7b678f28f6
