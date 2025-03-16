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

// Use localStorage if available, otherwise use defaults
window.promptsData = JSON.parse(localStorage.getItem('customPrompts')) || defaultPromptsData;
assignAIModels();
