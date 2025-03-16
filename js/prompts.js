// Add at the start of the file
console.log('Prompts.js loaded');

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
        title: "Code Refactoring",
        content: "Refactor this code to improve readability and performance while maintaining the same functionality: [CODE]",
        category: "coding"
    },
    {
        id: 3,
        title: "Marketing Email",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 4,
        title: "Bug Fix Request",
        content: "I'm encountering a bug where [DESCRIBE ISSUE]. Here's my code: [CODE]. Please help me identify and fix the issue.",
        category: "coding"
    },
    {
        id: 5,
        title: "Social Media Caption",
        content: "Create an engaging social media caption for a post about [TOPIC] that includes relevant hashtags and a call to action.",
        category: "marketing"
    },
    {
        id: 6,
        title: "Story Prompt",
        content: "Write a short story set in [SETTING] featuring a character who [CHARACTER TRAIT/ACTION] and faces a challenge involving [CHALLENGE].",
        category: "writing"
    },
    {
        id: 7,
        title: "API Documentation",
        content: "Create clear documentation for an API endpoint that [ENDPOINT FUNCTION], including parameters, response format, and example usage.",
        category: "coding"
    },
    {
        id: 8,
        title: "Product Description",
        content: "Write a compelling product description for [PRODUCT] that highlights its features, benefits, and unique selling points.",
        category: "marketing"
    },
    {
        id: 9,
        title: "Research Summary",
        content: "Summarize the key findings, methodology, and implications of research on [TOPIC] in a clear and concise manner.",
        category: "writing"
    },
    {
        id: 10,
        title: "Algorithm Explanation",
        content: "Explain how the [ALGORITHM NAME] algorithm works, its time complexity, and provide a simple implementation example.",
        category: "coding"
    },
    {
        id: 11,
        title: "Customer Testimonial",
        content: "Create a realistic customer testimonial for [PRODUCT/SERVICE] that highlights specific benefits and results.",
        category: "marketing"
    },
    {
        id: 12,
        title: "Technical Tutorial",
        content: "Create a step-by-step tutorial explaining how to [TECHNICAL TASK] with code examples and explanations.",
        category: "coding"
    },
    {
        id: 13,
        title: "Data Analysis Plan",
        content: "Create a comprehensive data analysis plan for [DATASET] that includes data cleaning steps, exploratory analysis, statistical methods, and visualization approaches.",
        category: "data"
    },
    {
        id: 14,
        title: "Business Strategy Memo",
        content: "Draft a strategic memo addressing how [COMPANY] should respond to [MARKET CHANGE/COMPETITOR ACTION] with specific recommendations and implementation timeline.",
        category: "business"
    },
    {
        id: 15,
        title: "UI Component Design",
        content: "Describe the design specifications for a [COMPONENT TYPE] that follows accessibility guidelines and works across desktop and mobile interfaces.",
        category: "design"
    },
    {
        id: 16,
        title: "Database Query Optimization",
        content: "Optimize this database query for better performance while maintaining the same results: [QUERY]",
        category: "coding"
    },
    {
        id: 17,
        title: "Executive Summary",
        content: "Write an executive summary of [REPORT/PROPOSAL] highlighting key findings, recommendations, and expected outcomes in under 500 words.",
        category: "business"
    },
    {
        id: 18,
        title: "Data Visualization Script",
        content: "Create a Python script using matplotlib/seaborn to visualize [DATA TYPE] that shows [SPECIFIC RELATIONSHIP] with proper labels and styling.",
        category: "data"
    },
    {
        id: 19,
        title: "Design System Guidelines",
        content: "Outline the key components of a design system for [PRODUCT/BRAND], including color palette, typography, spacing, and component principles.",
        category: "design"
    },
    {
        id: 20,
        title: "Competitive Analysis Framework",
        content: "Create a framework for analyzing competitors in the [INDUSTRY] market, including key metrics, data sources, and evaluation criteria.",
        category: "business"
    }
];

// Function to merge default prompts with custom prompts
function mergePrompts(defaults, customs) {
    // Create a map of existing default IDs
    const defaultIds = new Set(defaults.map(p => p.id));
    
    // Filter out any custom prompts that have the same IDs as defaults
    const validCustoms = customs.filter(p => !defaultIds.has(p.id));
    
    // Combine defaults with valid custom prompts
    return [...defaults, ...validCustoms];
}

// Initialize prompts with merged data
window.promptsData = mergePrompts(
    defaultPromptsData,
    JSON.parse(localStorage.getItem('customPrompts') || '[]')
);

// Save the merged prompts
localStorage.setItem('customPrompts', JSON.stringify(window.promptsData));

console.log('Total prompts loaded:', window.promptsData.length);

// Function to assign appropriate AI models based on prompt content and category
function assignAIModels() {
    promptsData.forEach(prompt => {
        // If AI is already assigned, skip
        if (prompt.ai) return;
        
        const content = prompt.content.toLowerCase();
        const category = prompt.category.toLowerCase();
        
        // Assign AI based on content and category patterns
        if (category === 'coding' || 
            content.includes('code') || 
            content.includes('algorithm') || 
            content.includes('debug')) {
            prompt.ai = 'Claude';
        } 
        else if (category === 'writing' || 
                content.includes('story') || 
                content.includes('creative') || 
                content.includes('blog')) {
            prompt.ai = 'GPT-4';
        }
        else if (category === 'data' || 
                content.includes('analysis') || 
                content.includes('visualization') || 
                content.includes('statistics')) {
            prompt.ai = 'Gemini';
        }
        else if (category === 'business' || 
                content.includes('strategy') || 
                content.includes('marketing') || 
                content.includes('business')) {
            prompt.ai = 'Claude';
        }
        else if (category === 'design' || 
                content.includes('ui') || 
                content.includes('ux') || 
                content.includes('design')) {
            prompt.ai = 'Midjourney';
        }
        else {
            // Randomly assign for other cases
            const aiModels = ['GPT-4', 'Claude', 'Gemini', 'Llama'];
            prompt.ai = aiModels[Math.floor(Math.random() * aiModels.length)];
        }
    });
    
    // Save updated prompts to localStorage
    localStorage.setItem('customPrompts', JSON.stringify(promptsData));
}

assignAIModels();

// Add a function to generate and save new prompts to the codebase
function generateAndSavePrompts(count = 5) {
    console.log(`Generating ${count} new prompts for codebase...`);
    
    // Array to hold the new prompts
    const newPrompts = [];
    
    // Generate the specified number of prompts
    for (let i = 0; i < count; i++) {
        const newPrompt = createPromptFromTemplates();
        newPrompts.push(newPrompt);
    }
    
    // Format the prompts as JavaScript code
    let promptsCode = '// New prompts generated on ' + new Date().toISOString() + '\n';
    promptsCode += 'const newGeneratedPrompts = [\n';
    
    newPrompts.forEach((prompt, index) => {
        promptsCode += `    {\n`;
        promptsCode += `        id: ${prompt.id},\n`;
        promptsCode += `        title: "${prompt.title}",\n`;
        promptsCode += `        content: "${prompt.content.replace(/"/g, '\\"')}",\n`;
        promptsCode += `        category: "${prompt.category}"\n`;
        promptsCode += `    }${index < newPrompts.length - 1 ? ',' : ''}\n`;
    });
    
    promptsCode += '];\n\n';
    promptsCode += '// Add these to defaultPromptsData\n';
    promptsCode += 'defaultPromptsData.push(...newGeneratedPrompts);\n';
    
    // Display the code to copy
    console.log('Copy this code to js/prompts.js:');
    console.log(promptsCode);
    
    // Create a downloadable file
    const blob = new Blob([promptsCode], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'new-prompts.js';
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
    
    return newPrompts;
}

// Add to console commands
console.generateAndSavePrompts = generateAndSavePrompts;

// New prompts generated on 2025-03-16T16:54:58.887Z
const newGeneratedPrompts = [
    {
        id: 21,
        title: "Business Plan Generator",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 22,
        title: "Brand Guidelines Template",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 23,
        title: "Social Media Post Template",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 24,
        title: "Chart Interpretation Assistant",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 25,
        title: "SWOT Analysis Template",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 26,
        title: "Business Plan Template",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 27,
        title: "UI Mockup Assistant",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 28,
        title: "Article Outline Guide",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 29,
        title: "Email Campaign Framework",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 30,
        title: "Data Analysis Assistant",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 31,
        title: "Blog Post Generator",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 32,
        title: "Brand Guidelines Assistant",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 33,
        title: "Brand Guidelines Guide",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 34,
        title: "Color Scheme Generator",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 35,
        title: "SWOT Analysis Template",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 36,
        title: "Business Plan Assistant",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 37,
        title: "Marketing Strategy Framework",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 38,
        title: "Email Campaign Template",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 39,
        title: "Algorithm Design Generator",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 40,
        title: "Code Review Framework",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 41,
        title: "Color Scheme Guide",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 42,
        title: "Essay Structure Generator",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 43,
        title: "API Documentation Assistant",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 44,
        title: "Article Outline Guide",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 45,
        title: "Layout Design Assistant",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 46,
        title: "Layout Design Assistant",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 47,
        title: "Marketing Strategy Template",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 48,
        title: "Article Outline Assistant",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 49,
        title: "API Documentation Framework",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 50,
        title: "Color Scheme Template",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 51,
        title: "Debugging Help Framework",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 52,
        title: "Social Media Post Assistant",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 53,
        title: "SWOT Analysis Assistant",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 54,
        title: "SWOT Analysis Template",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 55,
        title: "Layout Design Guide",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 56,
        title: "Algorithm Design Guide",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 57,
        title: "Story Idea Guide",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 58,
        title: "Statistical Model Framework",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 59,
        title: "Essay Structure Template",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 60,
        title: "API Documentation Framework",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 61,
        title: "Executive Summary Template",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 62,
        title: "Layout Design Generator",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 63,
        title: "Executive Summary Assistant",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 64,
        title: "Statistical Model Assistant",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 65,
        title: "Data Visualization Generator",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 66,
        title: "Debugging Help Assistant",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 67,
        title: "UI Mockup Guide",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 68,
        title: "Meeting Agenda Generator",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 69,
        title: "Essay Structure Template",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 70,
        title: "Blog Post Generator",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 71,
        title: "Blog Post Assistant",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 72,
        title: "Color Scheme Generator",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 73,
        title: "Meeting Agenda Assistant",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 74,
        title: "Debugging Help Assistant",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 75,
        title: "Chart Interpretation Framework",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 76,
        title: "Meeting Agenda Framework",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 77,
        title: "Color Scheme Assistant",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 78,
        title: "Story Idea Template",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 79,
        title: "Data Visualization Template",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 80,
        title: "Email Campaign Guide",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 81,
        title: "Marketing Strategy Generator",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 82,
        title: "Meeting Agenda Framework",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 83,
        title: "SWOT Analysis Template",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 84,
        title: "Social Media Post Generator",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 85,
        title: "Algorithm Design Assistant",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 86,
        title: "Layout Design Framework",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 87,
        title: "API Documentation Guide",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 88,
        title: "Brand Guidelines Assistant",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 89,
        title: "Color Scheme Assistant",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 90,
        title: "SWOT Analysis Guide",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 91,
        title: "SWOT Analysis Assistant",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 92,
        title: "Story Idea Generator",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 93,
        title: "Layout Design Generator",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 94,
        title: "SWOT Analysis Guide",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 95,
        title: "Chart Interpretation Guide",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 96,
        title: "UI Mockup Framework",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 97,
        title: "Color Scheme Generator",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 98,
        title: "Executive Summary Generator",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 99,
        title: "Essay Structure Template",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 100,
        title: "Meeting Agenda Assistant",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 101,
        title: "Ad Copy Assistant",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 102,
        title: "Code Review Template",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 103,
        title: "Chart Interpretation Assistant",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 104,
        title: "Data Visualization Framework",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 105,
        title: "Essay Structure Assistant",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 106,
        title: "UI Mockup Framework",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 107,
        title: "Chart Interpretation Guide",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 108,
        title: "Debugging Help Generator",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 109,
        title: "Data Analysis Template",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 110,
        title: "Story Idea Guide",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 111,
        title: "Ad Copy Guide",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 112,
        title: "Statistical Model Framework",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 113,
        title: "Email Campaign Framework",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 114,
        title: "Algorithm Design Generator",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 115,
        title: "Algorithm Design Template",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 116,
        title: "Meeting Agenda Assistant",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 117,
        title: "Marketing Strategy Assistant",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 118,
        title: "Article Outline Framework",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 119,
        title: "Color Scheme Generator",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 120,
        title: "API Documentation Guide",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 121,
        title: "Story Idea Generator",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 122,
        title: "Data Analysis Generator",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 123,
        title: "Blog Post Template",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 124,
        title: "Brand Guidelines Guide",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 125,
        title: "Business Plan Framework",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 126,
        title: "API Documentation Framework",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 127,
        title: "Ad Copy Generator",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 128,
        title: "Layout Design Template",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 129,
        title: "API Documentation Template",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 130,
        title: "Blog Post Assistant",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 131,
        title: "Article Outline Assistant",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 132,
        title: "Ad Copy Framework",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 133,
        title: "Business Plan Framework",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 134,
        title: "Meeting Agenda Guide",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 135,
        title: "Social Media Post Guide",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 136,
        title: "Data Analysis Generator",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 137,
        title: "Article Outline Generator",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 138,
        title: "Blog Post Template",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 139,
        title: "Email Campaign Framework",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 140,
        title: "Executive Summary Guide",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 141,
        title: "API Documentation Generator",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 142,
        title: "Chart Interpretation Assistant",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 143,
        title: "Data Analysis Template",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 144,
        title: "Meeting Agenda Guide",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 145,
        title: "Social Media Post Template",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 146,
        title: "Brand Guidelines Guide",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 147,
        title: "Statistical Model Generator",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 148,
        title: "Chart Interpretation Framework",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 149,
        title: "Brand Guidelines Guide",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 150,
        title: "Color Scheme Guide",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 151,
        title: "Ad Copy Framework",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 152,
        title: "Social Media Post Template",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 153,
        title: "Color Scheme Framework",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 154,
        title: "UI Mockup Guide",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 155,
        title: "Chart Interpretation Assistant",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 156,
        title: "Data Visualization Framework",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 157,
        title: "API Documentation Framework",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 158,
        title: "Debugging Help Generator",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 159,
        title: "Data Visualization Template",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 160,
        title: "Brand Guidelines Framework",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 161,
        title: "UI Mockup Generator",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 162,
        title: "API Documentation Assistant",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 163,
        title: "Data Analysis Assistant",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 164,
        title: "Marketing Strategy Framework",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 165,
        title: "Statistical Model Assistant",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 166,
        title: "Layout Design Framework",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 167,
        title: "Story Idea Assistant",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 168,
        title: "Statistical Model Generator",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 169,
        title: "Email Campaign Framework",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 170,
        title: "Chart Interpretation Guide",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 171,
        title: "Story Idea Framework",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 172,
        title: "SWOT Analysis Framework",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 173,
        title: "Statistical Model Framework",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 174,
        title: "Brand Guidelines Framework",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 175,
        title: "Debugging Help Assistant",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 176,
        title: "Blog Post Template",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 177,
        title: "Business Plan Generator",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 178,
        title: "API Documentation Generator",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 179,
        title: "Ad Copy Assistant",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 180,
        title: "Meeting Agenda Assistant",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 181,
        title: "Marketing Strategy Assistant",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 182,
        title: "Executive Summary Template",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 183,
        title: "Algorithm Design Framework",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 184,
        title: "Color Scheme Framework",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 185,
        title: "Layout Design Guide",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 186,
        title: "Marketing Strategy Generator",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 187,
        title: "Debugging Help Assistant",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 188,
        title: "Email Campaign Guide",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 189,
        title: "Brand Guidelines Generator",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 190,
        title: "Meeting Agenda Guide",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 191,
        title: "Layout Design Assistant",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 192,
        title: "SWOT Analysis Template",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 193,
        title: "Chart Interpretation Assistant",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 194,
        title: "Executive Summary Generator",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 195,
        title: "Code Review Assistant",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 196,
        title: "Article Outline Guide",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 197,
        title: "Chart Interpretation Assistant",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 198,
        title: "UI Mockup Framework",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 199,
        title: "Essay Structure Assistant",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 200,
        title: "Code Review Generator",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 201,
        title: "Chart Interpretation Generator",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 202,
        title: "UI Mockup Guide",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 203,
        title: "Article Outline Guide",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 204,
        title: "Debugging Help Template",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 205,
        title: "Algorithm Design Guide",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 206,
        title: "Layout Design Generator",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 207,
        title: "Ad Copy Framework",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 208,
        title: "Story Idea Generator",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 209,
        title: "Algorithm Design Framework",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 210,
        title: "Blog Post Framework",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 211,
        title: "Story Idea Assistant",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 212,
        title: "UI Mockup Guide",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 213,
        title: "API Documentation Generator",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 214,
        title: "SWOT Analysis Template",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 215,
        title: "Ad Copy Framework",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 216,
        title: "Color Scheme Guide",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 217,
        title: "Code Review Template",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 218,
        title: "Marketing Strategy Framework",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 219,
        title: "Color Scheme Template",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 220,
        title: "Color Scheme Guide",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 221,
        title: "Ad Copy Generator",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 222,
        title: "Layout Design Assistant",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 223,
        title: "Brand Guidelines Guide",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 224,
        title: "Article Outline Assistant",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 225,
        title: "Blog Post Template",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 226,
        title: "Meeting Agenda Generator",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 227,
        title: "Email Campaign Assistant",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 228,
        title: "Essay Structure Generator",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 229,
        title: "Code Review Template",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 230,
        title: "Color Scheme Assistant",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 231,
        title: "Story Idea Framework",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 232,
        title: "Business Plan Guide",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 233,
        title: "Marketing Strategy Template",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 234,
        title: "Essay Structure Assistant",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 235,
        title: "Chart Interpretation Framework",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 236,
        title: "UI Mockup Template",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 237,
        title: "SWOT Analysis Framework",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 238,
        title: "Code Review Framework",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 239,
        title: "Social Media Post Framework",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 240,
        title: "Email Campaign Guide",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 241,
        title: "Social Media Post Template",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 242,
        title: "Essay Structure Generator",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 243,
        title: "Chart Interpretation Guide",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 244,
        title: "Algorithm Design Guide",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 245,
        title: "Code Review Template",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 246,
        title: "Code Review Assistant",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 247,
        title: "SWOT Analysis Guide",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 248,
        title: "UI Mockup Framework",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 249,
        title: "Data Visualization Guide",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 250,
        title: "Data Visualization Generator",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 251,
        title: "Chart Interpretation Framework",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 252,
        title: "Statistical Model Generator",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 253,
        title: "Data Analysis Assistant",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 254,
        title: "Layout Design Guide",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 255,
        title: "Email Campaign Assistant",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 256,
        title: "Color Scheme Template",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 257,
        title: "Executive Summary Assistant",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 258,
        title: "Chart Interpretation Framework",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 259,
        title: "Algorithm Design Framework",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 260,
        title: "Layout Design Framework",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 261,
        title: "Story Idea Generator",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 262,
        title: "Data Analysis Template",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 263,
        title: "Executive Summary Template",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 264,
        title: "Social Media Post Generator",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 265,
        title: "Debugging Help Assistant",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 266,
        title: "Data Analysis Generator",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 267,
        title: "SWOT Analysis Guide",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 268,
        title: "Color Scheme Assistant",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 269,
        title: "Brand Guidelines Generator",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 270,
        title: "SWOT Analysis Template",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 271,
        title: "Debugging Help Assistant",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 272,
        title: "Algorithm Design Assistant",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 273,
        title: "Social Media Post Framework",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 274,
        title: "Statistical Model Assistant",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 275,
        title: "Blog Post Assistant",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 276,
        title: "Ad Copy Assistant",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 277,
        title: "Email Campaign Guide",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 278,
        title: "Color Scheme Template",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 279,
        title: "Business Plan Assistant",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 280,
        title: "Essay Structure Assistant",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 281,
        title: "Algorithm Design Assistant",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 282,
        title: "Brand Guidelines Template",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 283,
        title: "Debugging Help Framework",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 284,
        title: "Social Media Post Assistant",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 285,
        title: "Article Outline Framework",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 286,
        title: "Algorithm Design Template",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 287,
        title: "Meeting Agenda Template",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 288,
        title: "Algorithm Design Template",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 289,
        title: "Statistical Model Guide",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 290,
        title: "Statistical Model Generator",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 291,
        title: "Ad Copy Template",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 292,
        title: "Marketing Strategy Guide",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 293,
        title: "Meeting Agenda Guide",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 294,
        title: "Article Outline Template",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 295,
        title: "SWOT Analysis Generator",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 296,
        title: "Blog Post Framework",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 297,
        title: "Code Review Generator",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 298,
        title: "Article Outline Guide",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 299,
        title: "Article Outline Assistant",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 300,
        title: "Code Review Template",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 301,
        title: "SWOT Analysis Guide",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 302,
        title: "Algorithm Design Framework",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 303,
        title: "Marketing Strategy Template",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 304,
        title: "Story Idea Generator",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 305,
        title: "API Documentation Template",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 306,
        title: "Social Media Post Assistant",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 307,
        title: "Layout Design Template",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 308,
        title: "API Documentation Assistant",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 309,
        title: "Essay Structure Template",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 310,
        title: "Business Plan Assistant",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 311,
        title: "Color Scheme Generator",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 312,
        title: "Executive Summary Framework",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 313,
        title: "Business Plan Generator",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 314,
        title: "Statistical Model Framework",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 315,
        title: "Social Media Post Template",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 316,
        title: "Color Scheme Template",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 317,
        title: "Code Review Assistant",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 318,
        title: "Meeting Agenda Framework",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 319,
        title: "Data Visualization Template",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 320,
        title: "Chart Interpretation Template",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 321,
        title: "Executive Summary Assistant",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 322,
        title: "Business Plan Framework",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 323,
        title: "Chart Interpretation Template",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 324,
        title: "Ad Copy Framework",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 325,
        title: "API Documentation Template",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 326,
        title: "Executive Summary Template",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 327,
        title: "Statistical Model Framework",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 328,
        title: "SWOT Analysis Guide",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 329,
        title: "Color Scheme Guide",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 330,
        title: "Marketing Strategy Guide",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 331,
        title: "Brand Guidelines Template",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 332,
        title: "Executive Summary Framework",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 333,
        title: "Statistical Model Framework",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 334,
        title: "Business Plan Generator",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 335,
        title: "Article Outline Framework",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 336,
        title: "Social Media Post Framework",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 337,
        title: "Debugging Help Framework",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 338,
        title: "SWOT Analysis Framework",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 339,
        title: "Email Campaign Template",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 340,
        title: "Business Plan Generator",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 341,
        title: "Social Media Post Guide",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 342,
        title: "Email Campaign Framework",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 343,
        title: "Statistical Model Template",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 344,
        title: "Email Campaign Assistant",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 345,
        title: "Email Campaign Assistant",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 346,
        title: "Marketing Strategy Generator",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 347,
        title: "Algorithm Design Guide",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 348,
        title: "Layout Design Generator",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 349,
        title: "Debugging Help Generator",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 350,
        title: "Executive Summary Template",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 351,
        title: "Email Campaign Generator",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 352,
        title: "Email Campaign Framework",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 353,
        title: "Business Plan Template",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 354,
        title: "Email Campaign Template",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 355,
        title: "Executive Summary Template",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 356,
        title: "Data Visualization Guide",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 357,
        title: "Business Plan Assistant",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 358,
        title: "Social Media Post Template",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 359,
        title: "Color Scheme Assistant",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 360,
        title: "Marketing Strategy Guide",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 361,
        title: "Color Scheme Assistant",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 362,
        title: "Social Media Post Framework",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 363,
        title: "SWOT Analysis Guide",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 364,
        title: "Debugging Help Template",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 365,
        title: "Color Scheme Guide",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 366,
        title: "Color Scheme Generator",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 367,
        title: "Meeting Agenda Assistant",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 368,
        title: "Business Plan Generator",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 369,
        title: "Executive Summary Generator",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 370,
        title: "Color Scheme Template",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 371,
        title: "Meeting Agenda Framework",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 372,
        title: "Essay Structure Generator",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 373,
        title: "Social Media Post Framework",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 374,
        title: "Code Review Assistant",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 375,
        title: "Meeting Agenda Generator",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 376,
        title: "Story Idea Assistant",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 377,
        title: "Social Media Post Generator",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 378,
        title: "Statistical Model Framework",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 379,
        title: "Essay Structure Guide",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 380,
        title: "Data Analysis Guide",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 381,
        title: "Statistical Model Framework",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 382,
        title: "Data Analysis Generator",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 383,
        title: "Algorithm Design Guide",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 384,
        title: "Meeting Agenda Generator",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 385,
        title: "Ad Copy Template",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 386,
        title: "Executive Summary Template",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 387,
        title: "Ad Copy Template",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 388,
        title: "Social Media Post Assistant",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 389,
        title: "Blog Post Assistant",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 390,
        title: "Blog Post Guide",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 391,
        title: "Debugging Help Template",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 392,
        title: "Executive Summary Assistant",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 393,
        title: "Chart Interpretation Template",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 394,
        title: "Meeting Agenda Assistant",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 395,
        title: "Business Plan Framework",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 396,
        title: "Chart Interpretation Assistant",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 397,
        title: "Social Media Post Generator",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 398,
        title: "Data Visualization Assistant",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 399,
        title: "Ad Copy Generator",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 400,
        title: "SWOT Analysis Assistant",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 401,
        title: "Algorithm Design Framework",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 402,
        title: "Marketing Strategy Guide",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 403,
        title: "Marketing Strategy Framework",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 404,
        title: "Algorithm Design Assistant",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 405,
        title: "Blog Post Framework",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 406,
        title: "UI Mockup Guide",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 407,
        title: "Statistical Model Framework",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 408,
        title: "Marketing Strategy Generator",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 409,
        title: "Data Analysis Guide",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 410,
        title: "Blog Post Framework",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 411,
        title: "Blog Post Assistant",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 412,
        title: "Brand Guidelines Generator",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 413,
        title: "Executive Summary Guide",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 414,
        title: "Statistical Model Assistant",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 415,
        title: "Marketing Strategy Generator",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 416,
        title: "Color Scheme Framework",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 417,
        title: "Email Campaign Template",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 418,
        title: "Chart Interpretation Guide",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 419,
        title: "Data Visualization Framework",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 420,
        title: "Code Review Template",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 421,
        title: "UI Mockup Generator",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 422,
        title: "Executive Summary Generator",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 423,
        title: "Essay Structure Template",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 424,
        title: "Data Visualization Assistant",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 425,
        title: "UI Mockup Framework",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 426,
        title: "Debugging Help Assistant",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 427,
        title: "Brand Guidelines Template",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 428,
        title: "Ad Copy Framework",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 429,
        title: "API Documentation Guide",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 430,
        title: "Data Analysis Framework",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 431,
        title: "Article Outline Generator",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 432,
        title: "Chart Interpretation Template",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 433,
        title: "Debugging Help Assistant",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 434,
        title: "Executive Summary Template",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 435,
        title: "Debugging Help Generator",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 436,
        title: "Color Scheme Assistant",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 437,
        title: "Marketing Strategy Guide",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 438,
        title: "Data Visualization Template",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 439,
        title: "Business Plan Guide",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 440,
        title: "Business Plan Assistant",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 441,
        title: "Marketing Strategy Template",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 442,
        title: "Article Outline Assistant",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 443,
        title: "Brand Guidelines Guide",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 444,
        title: "Data Analysis Guide",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 445,
        title: "UI Mockup Assistant",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 446,
        title: "Ad Copy Assistant",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 447,
        title: "Data Visualization Guide",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 448,
        title: "Article Outline Template",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 449,
        title: "Ad Copy Framework",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 450,
        title: "Statistical Model Framework",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 451,
        title: "Chart Interpretation Template",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 452,
        title: "Data Visualization Generator",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 453,
        title: "Brand Guidelines Template",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 454,
        title: "Social Media Post Generator",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 455,
        title: "Social Media Post Framework",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 456,
        title: "Email Campaign Generator",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 457,
        title: "UI Mockup Assistant",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 458,
        title: "Debugging Help Framework",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 459,
        title: "Article Outline Guide",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 460,
        title: "Business Plan Template",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 461,
        title: "Data Visualization Template",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 462,
        title: "Debugging Help Template",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 463,
        title: "Code Review Framework",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 464,
        title: "Color Scheme Template",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 465,
        title: "Email Campaign Assistant",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 466,
        title: "Data Analysis Guide",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 467,
        title: "Statistical Model Generator",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 468,
        title: "Social Media Post Assistant",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 469,
        title: "Story Idea Guide",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 470,
        title: "Meeting Agenda Assistant",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 471,
        title: "SWOT Analysis Guide",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 472,
        title: "Blog Post Guide",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 473,
        title: "Email Campaign Template",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 474,
        title: "Meeting Agenda Template",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 475,
        title: "Brand Guidelines Framework",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 476,
        title: "Algorithm Design Guide",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 477,
        title: "Brand Guidelines Guide",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 478,
        title: "Data Visualization Template",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 479,
        title: "Code Review Generator",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 480,
        title: "Data Visualization Assistant",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 481,
        title: "Marketing Strategy Guide",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 482,
        title: "Marketing Strategy Framework",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 483,
        title: "Data Analysis Generator",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 484,
        title: "Essay Structure Guide",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 485,
        title: "Blog Post Generator",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 486,
        title: "SWOT Analysis Framework",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 487,
        title: "API Documentation Guide",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 488,
        title: "Layout Design Generator",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 489,
        title: "Essay Structure Framework",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 490,
        title: "Chart Interpretation Template",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 491,
        title: "API Documentation Guide",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 492,
        title: "Debugging Help Guide",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 493,
        title: "Meeting Agenda Template",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 494,
        title: "Chart Interpretation Generator",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 495,
        title: "Social Media Post Framework",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 496,
        title: "Brand Guidelines Guide",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 497,
        title: "Email Campaign Template",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 498,
        title: "Algorithm Design Template",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 499,
        title: "Article Outline Template",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 500,
        title: "Statistical Model Framework",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 501,
        title: "Color Scheme Assistant",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 502,
        title: "Algorithm Design Template",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 503,
        title: "Social Media Post Framework",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 504,
        title: "Executive Summary Generator",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 505,
        title: "API Documentation Guide",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 506,
        title: "Data Visualization Assistant",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 507,
        title: "Business Plan Template",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 508,
        title: "Layout Design Generator",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 509,
        title: "Marketing Strategy Framework",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 510,
        title: "Email Campaign Framework",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 511,
        title: "Ad Copy Generator",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 512,
        title: "Meeting Agenda Framework",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 513,
        title: "Debugging Help Template",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 514,
        title: "SWOT Analysis Framework",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 515,
        title: "Data Visualization Assistant",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 516,
        title: "Email Campaign Generator",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 517,
        title: "UI Mockup Assistant",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 518,
        title: "Algorithm Design Guide",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 519,
        title: "Meeting Agenda Framework",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 520,
        title: "Executive Summary Guide",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    }
];

// Add these to defaultPromptsData
defaultPromptsData.push(...newGeneratedPrompts);
