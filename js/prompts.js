console.log('prompts.js starting to load');

// Safety check and initialization
if (typeof window.promptsData === 'undefined') {
    window.promptsData = [];
}

console.log('Prompts.js loading...');

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
    },
    // Example of a problematic prompt that might need fixing
    {
        id: 999,
        title: "Problematic Prompt",
        // Fix unescaped quotes in content
        content: "Write about \"artificial intelligence\" and its impact on society.",
        // Fix missing comma
        category: "writing"
    }
];

// Add all new prompts to defaultPromptsData
defaultPromptsData.push(
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
        title: "Data Analysis Framework",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
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
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 314,
        title: "API Documentation Generator",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 315,
        title: "Algorithm Design Assistant",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 316,
        title: "SWOT Analysis Template",
        content: "Create a SWOT",
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

// Initialize prompts with merged data
try {
    // Set window.promptsData
    window.promptsData = defaultPromptsData;
    console.log('Total prompts loaded:', window.promptsData.length);
    
    // Signal that prompts are loaded
    window.promptsLoaded = true;
    window.dispatchEvent(new Event('promptsLoaded'));
} catch (error) {
    console.error('Error initializing prompts:', error);
    window.promptsData = defaultPromptsData; // Fallback to defaults
}

// Assign AI models
assignAIModels();

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

// New prompts generated on 2025-03-16T17:45:50.928Z
const newGeneratedPrompts = [
    {
        id: 1000,
        title: "Algorithm Design Template",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 1001,
        title: "Blog Post Framework",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 1002,
        title: "Story Idea Framework",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 1003,
        title: "Ad Copy Guide",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 1004,
        title: "Statistical Model Template",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 1005,
        title: "Blog Post Template",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 1006,
        title: "Debugging Help Guide",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 1007,
        title: "Layout Design Guide",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 1008,
        title: "Social Media Post Guide",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 1009,
        title: "Story Idea Template",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 1010,
        title: "Story Idea Guide",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 1011,
        title: "Business Plan Generator",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 1012,
        title: "Social Media Post Framework",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 1013,
        title: "Chart Interpretation Generator",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 1014,
        title: "Ad Copy Assistant",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 1015,
        title: "Marketing Strategy Guide",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 1016,
        title: "Article Outline Assistant",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 1017,
        title: "Marketing Strategy Template",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 1018,
        title: "Essay Structure Generator",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 1019,
        title: "Business Plan Assistant",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 1020,
        title: "Story Idea Generator",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 1021,
        title: "Social Media Post Template",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 1022,
        title: "Blog Post Template",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 1023,
        title: "API Documentation Framework",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 1024,
        title: "API Documentation Framework",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 1025,
        title: "UI Mockup Framework",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 1026,
        title: "Article Outline Framework",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 1027,
        title: "Debugging Help Assistant",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 1028,
        title: "Marketing Strategy Framework",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 1029,
        title: "Brand Guidelines Guide",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 1030,
        title: "Color Scheme Guide",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 1031,
        title: "Chart Interpretation Generator",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 1032,
        title: "API Documentation Guide",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 1033,
        title: "Code Review Framework",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 1034,
        title: "Chart Interpretation Guide",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 1035,
        title: "UI Mockup Generator",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 1036,
        title: "UI Mockup Generator",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 1037,
        title: "Story Idea Guide",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 1038,
        title: "Color Scheme Assistant",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 1039,
        title: "Chart Interpretation Guide",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 1040,
        title: "Business Plan Template",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 1041,
        title: "Executive Summary Generator",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 1042,
        title: "Social Media Post Assistant",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 1043,
        title: "Ad Copy Assistant",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 1044,
        title: "Social Media Post Generator",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 1045,
        title: "Meeting Agenda Generator",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 1046,
        title: "Executive Summary Generator",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 1047,
        title: "UI Mockup Template",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 1048,
        title: "Email Campaign Guide",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 1049,
        title: "Ad Copy Template",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 1050,
        title: "Chart Interpretation Assistant",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 1051,
        title: "Essay Structure Framework",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 1052,
        title: "Data Analysis Template",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 1053,
        title: "Marketing Strategy Assistant",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 1054,
        title: "Meeting Agenda Framework",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 1055,
        title: "Chart Interpretation Template",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 1056,
        title: "Code Review Guide",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 1057,
        title: "Executive Summary Guide",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 1058,
        title: "Meeting Agenda Framework",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 1059,
        title: "Chart Interpretation Assistant",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 1060,
        title: "Marketing Strategy Generator",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 1061,
        title: "Layout Design Guide",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 1062,
        title: "Article Outline Framework",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 1063,
        title: "Debugging Help Template",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 1064,
        title: "Social Media Post Assistant",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 1065,
        title: "Data Visualization Generator",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 1066,
        title: "Data Analysis Guide",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 1067,
        title: "Chart Interpretation Assistant",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 1068,
        title: "SWOT Analysis Generator",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 1069,
        title: "Email Campaign Generator",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 1070,
        title: "UI Mockup Guide",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 1071,
        title: "Chart Interpretation Template",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 1072,
        title: "Chart Interpretation Guide",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 1073,
        title: "Article Outline Guide",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 1074,
        title: "Debugging Help Template",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 1075,
        title: "Story Idea Template",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 1076,
        title: "Code Review Template",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 1077,
        title: "Business Plan Template",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 1078,
        title: "Marketing Strategy Framework",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 1079,
        title: "Chart Interpretation Generator",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 1080,
        title: "Data Analysis Template",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 1081,
        title: "Article Outline Framework",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 1082,
        title: "Debugging Help Guide",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 1083,
        title: "Layout Design Guide",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 1084,
        title: "Story Idea Framework",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 1085,
        title: "Algorithm Design Template",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 1086,
        title: "Brand Guidelines Framework",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 1087,
        title: "Social Media Post Assistant",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 1088,
        title: "SWOT Analysis Assistant",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 1089,
        title: "Chart Interpretation Assistant",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 1090,
        title: "Code Review Template",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 1091,
        title: "Layout Design Guide",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 1092,
        title: "Article Outline Framework",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 1093,
        title: "Debugging Help Guide",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 1094,
        title: "Blog Post Guide",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 1095,
        title: "Social Media Post Framework",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 1096,
        title: "UI Mockup Assistant",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 1097,
        title: "Color Scheme Generator",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 1098,
        title: "API Documentation Assistant",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 1099,
        title: "Story Idea Template",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    }
];

// Add these to defaultPromptsData
defaultPromptsData.push(...newGeneratedPrompts);

// New prompts generated on 2025-03-16T17:49:32.385Z
const newGeneratedPrompts = [
    {
        id: 1100,
        title: "SWOT Analysis Generator",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 1101,
        title: "Email Campaign Framework",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 1102,
        title: "API Documentation Assistant",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 1103,
        title: "Ad Copy Guide",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 1104,
        title: "Ad Copy Assistant",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 1105,
        title: "Brand Guidelines Template",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 1106,
        title: "Marketing Strategy Template",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 1107,
        title: "Data Visualization Guide",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 1108,
        title: "Statistical Model Generator",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 1109,
        title: "Brand Guidelines Generator",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 1110,
        title: "Blog Post Generator",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 1111,
        title: "Statistical Model Assistant",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 1112,
        title: "API Documentation Assistant",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 1113,
        title: "Email Campaign Template",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 1114,
        title: "Email Campaign Generator",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 1115,
        title: "SWOT Analysis Template",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 1116,
        title: "Marketing Strategy Framework",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 1117,
        title: "Email Campaign Template",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 1118,
        title: "Algorithm Design Assistant",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 1119,
        title: "Business Plan Template",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 1120,
        title: "Story Idea Generator",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 1121,
        title: "Layout Design Guide",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 1122,
        title: "Ad Copy Guide",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 1123,
        title: "UI Mockup Generator",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 1124,
        title: "Business Plan Template",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 1125,
        title: "Social Media Post Framework",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 1126,
        title: "Data Analysis Framework",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 1127,
        title: "Debugging Help Generator",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 1128,
        title: "Meeting Agenda Guide",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 1129,
        title: "UI Mockup Assistant",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 1130,
        title: "Executive Summary Template",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 1131,
        title: "Social Media Post Assistant",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 1132,
        title: "Marketing Strategy Framework",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 1133,
        title: "Ad Copy Assistant",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 1134,
        title: "Email Campaign Generator",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 1135,
        title: "Social Media Post Guide",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 1136,
        title: "Blog Post Template",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 1137,
        title: "Essay Structure Generator",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 1138,
        title: "Code Review Template",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 1139,
        title: "Ad Copy Guide",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 1140,
        title: "Article Outline Framework",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 1141,
        title: "Data Analysis Framework",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 1142,
        title: "Article Outline Framework",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 1143,
        title: "Essay Structure Framework",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 1144,
        title: "Ad Copy Template",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 1145,
        title: "API Documentation Template",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 1146,
        title: "Data Visualization Guide",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 1147,
        title: "SWOT Analysis Assistant",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 1148,
        title: "Meeting Agenda Assistant",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 1149,
        title: "Article Outline Guide",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 1150,
        title: "API Documentation Guide",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 1151,
        title: "Data Visualization Framework",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 1152,
        title: "Social Media Post Assistant",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 1153,
        title: "UI Mockup Template",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 1154,
        title: "Ad Copy Assistant",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 1155,
        title: "Debugging Help Generator",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 1156,
        title: "Code Review Framework",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 1157,
        title: "Debugging Help Assistant",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 1158,
        title: "Ad Copy Generator",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 1159,
        title: "Color Scheme Generator",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 1160,
        title: "Chart Interpretation Template",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 1161,
        title: "Ad Copy Template",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 1162,
        title: "Data Analysis Guide",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 1163,
        title: "Data Visualization Framework",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 1164,
        title: "Marketing Strategy Template",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 1165,
        title: "Algorithm Design Framework",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 1166,
        title: "Chart Interpretation Generator",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 1167,
        title: "Code Review Guide",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 1168,
        title: "Article Outline Framework",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 1169,
        title: "Color Scheme Assistant",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 1170,
        title: "Story Idea Generator",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 1171,
        title: "Color Scheme Generator",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 1172,
        title: "Meeting Agenda Guide",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 1173,
        title: "Statistical Model Guide",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 1174,
        title: "Executive Summary Generator",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 1175,
        title: "Brand Guidelines Assistant",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 1176,
        title: "Data Analysis Framework",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 1177,
        title: "Story Idea Framework",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 1178,
        title: "Email Campaign Framework",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 1179,
        title: "Essay Structure Guide",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 1180,
        title: "Marketing Strategy Generator",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 1181,
        title: "SWOT Analysis Framework",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 1182,
        title: "Story Idea Guide",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 1183,
        title: "Ad Copy Guide",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 1184,
        title: "Data Analysis Template",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 1185,
        title: "Business Plan Assistant",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 1186,
        title: "Social Media Post Template",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 1187,
        title: "Meeting Agenda Template",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 1188,
        title: "Chart Interpretation Template",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 1189,
        title: "SWOT Analysis Template",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 1190,
        title: "Story Idea Guide",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 1191,
        title: "Statistical Model Template",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 1192,
        title: "Chart Interpretation Framework",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 1193,
        title: "Color Scheme Generator",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 1194,
        title: "Article Outline Generator",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 1195,
        title: "Chart Interpretation Generator",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 1196,
        title: "Data Analysis Template",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 1197,
        title: "Marketing Strategy Guide",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 1198,
        title: "UI Mockup Guide",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 1199,
        title: "UI Mockup Guide",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 1200,
        title: "Color Scheme Guide",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 1201,
        title: "UI Mockup Framework",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 1202,
        title: "Story Idea Template",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 1203,
        title: "API Documentation Framework",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 1204,
        title: "Layout Design Guide",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 1205,
        title: "Story Idea Assistant",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 1206,
        title: "UI Mockup Framework",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 1207,
        title: "Social Media Post Framework",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 1208,
        title: "Ad Copy Template",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 1209,
        title: "Layout Design Template",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 1210,
        title: "Algorithm Design Template",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 1211,
        title: "Article Outline Generator",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 1212,
        title: "Data Visualization Framework",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 1213,
        title: "Debugging Help Generator",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 1214,
        title: "Ad Copy Template",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 1215,
        title: "Blog Post Generator",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 1216,
        title: "Chart Interpretation Framework",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 1217,
        title: "UI Mockup Assistant",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 1218,
        title: "Algorithm Design Assistant",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 1219,
        title: "Debugging Help Assistant",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 1220,
        title: "Executive Summary Framework",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 1221,
        title: "Algorithm Design Assistant",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 1222,
        title: "Business Plan Guide",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 1223,
        title: "Color Scheme Assistant",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 1224,
        title: "UI Mockup Framework",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 1225,
        title: "Code Review Framework",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 1226,
        title: "Data Visualization Generator",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 1227,
        title: "Debugging Help Framework",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 1228,
        title: "Article Outline Assistant",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 1229,
        title: "Social Media Post Generator",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 1230,
        title: "Debugging Help Assistant",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 1231,
        title: "Email Campaign Template",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 1232,
        title: "Statistical Model Guide",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 1233,
        title: "Ad Copy Generator",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 1234,
        title: "Statistical Model Assistant",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 1235,
        title: "Story Idea Template",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 1236,
        title: "Data Analysis Generator",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 1237,
        title: "UI Mockup Template",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 1238,
        title: "SWOT Analysis Framework",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 1239,
        title: "Data Analysis Framework",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 1240,
        title: "Essay Structure Assistant",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 1241,
        title: "Email Campaign Template",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 1242,
        title: "UI Mockup Generator",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 1243,
        title: "Article Outline Framework",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 1244,
        title: "Meeting Agenda Framework",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 1245,
        title: "Data Analysis Framework",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 1246,
        title: "Marketing Strategy Guide",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 1247,
        title: "Chart Interpretation Generator",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 1248,
        title: "Executive Summary Framework",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 1249,
        title: "Algorithm Design Template",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 1250,
        title: "Algorithm Design Template",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 1251,
        title: "Debugging Help Guide",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 1252,
        title: "Blog Post Framework",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 1253,
        title: "Statistical Model Assistant",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 1254,
        title: "Essay Structure Generator",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 1255,
        title: "Data Visualization Guide",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 1256,
        title: "Debugging Help Generator",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 1257,
        title: "Chart Interpretation Guide",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 1258,
        title: "Chart Interpretation Guide",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 1259,
        title: "Chart Interpretation Generator",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 1260,
        title: "Data Analysis Generator",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 1261,
        title: "Marketing Strategy Framework",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 1262,
        title: "Chart Interpretation Framework",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 1263,
        title: "Layout Design Template",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 1264,
        title: "Blog Post Guide",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 1265,
        title: "SWOT Analysis Generator",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 1266,
        title: "Algorithm Design Assistant",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 1267,
        title: "Data Analysis Template",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 1268,
        title: "Article Outline Template",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 1269,
        title: "Color Scheme Guide",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 1270,
        title: "Business Plan Generator",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 1271,
        title: "Debugging Help Template",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 1272,
        title: "UI Mockup Framework",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 1273,
        title: "Ad Copy Template",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 1274,
        title: "API Documentation Framework",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 1275,
        title: "Chart Interpretation Template",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 1276,
        title: "Algorithm Design Framework",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 1277,
        title: "Social Media Post Framework",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 1278,
        title: "UI Mockup Generator",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 1279,
        title: "Social Media Post Framework",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 1280,
        title: "UI Mockup Generator",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 1281,
        title: "Social Media Post Template",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 1282,
        title: "Statistical Model Generator",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 1283,
        title: "Algorithm Design Template",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 1284,
        title: "Algorithm Design Generator",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 1285,
        title: "Brand Guidelines Guide",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 1286,
        title: "Executive Summary Framework",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 1287,
        title: "Article Outline Template",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 1288,
        title: "Blog Post Assistant",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 1289,
        title: "Article Outline Guide",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 1290,
        title: "Business Plan Guide",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 1291,
        title: "UI Mockup Assistant",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 1292,
        title: "Data Visualization Template",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 1293,
        title: "Story Idea Framework",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 1294,
        title: "Blog Post Generator",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 1295,
        title: "API Documentation Framework",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 1296,
        title: "Statistical Model Generator",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 1297,
        title: "Executive Summary Guide",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 1298,
        title: "Brand Guidelines Framework",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 1299,
        title: "Data Visualization Assistant",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 1300,
        title: "Chart Interpretation Generator",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 1301,
        title: "UI Mockup Guide",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 1302,
        title: "Layout Design Guide",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 1303,
        title: "Brand Guidelines Framework",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 1304,
        title: "Data Analysis Generator",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 1305,
        title: "Brand Guidelines Guide",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 1306,
        title: "API Documentation Template",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 1307,
        title: "Article Outline Generator",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 1308,
        title: "Story Idea Template",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 1309,
        title: "Story Idea Generator",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 1310,
        title: "Data Visualization Generator",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 1311,
        title: "Story Idea Framework",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 1312,
        title: "Algorithm Design Guide",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 1313,
        title: "Chart Interpretation Generator",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 1314,
        title: "Business Plan Template",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 1315,
        title: "SWOT Analysis Template",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 1316,
        title: "Data Visualization Assistant",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 1317,
        title: "Meeting Agenda Framework",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 1318,
        title: "UI Mockup Generator",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 1319,
        title: "Essay Structure Guide",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 1320,
        title: "Essay Structure Generator",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 1321,
        title: "SWOT Analysis Generator",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 1322,
        title: "Color Scheme Framework",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 1323,
        title: "Email Campaign Generator",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 1324,
        title: "Data Analysis Framework",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 1325,
        title: "Chart Interpretation Template",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 1326,
        title: "Email Campaign Framework",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 1327,
        title: "Story Idea Generator",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 1328,
        title: "Chart Interpretation Assistant",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 1329,
        title: "SWOT Analysis Guide",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 1330,
        title: "API Documentation Generator",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 1331,
        title: "Social Media Post Framework",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 1332,
        title: "Meeting Agenda Template",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 1333,
        title: "UI Mockup Template",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 1334,
        title: "UI Mockup Assistant",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 1335,
        title: "Data Analysis Assistant",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 1336,
        title: "Blog Post Guide",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 1337,
        title: "Statistical Model Generator",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 1338,
        title: "Debugging Help Generator",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 1339,
        title: "UI Mockup Template",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 1340,
        title: "Business Plan Framework",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 1341,
        title: "Debugging Help Assistant",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 1342,
        title: "Social Media Post Template",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 1343,
        title: "Debugging Help Guide",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 1344,
        title: "Marketing Strategy Generator",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 1345,
        title: "Data Analysis Template",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 1346,
        title: "Algorithm Design Framework",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 1347,
        title: "Brand Guidelines Assistant",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 1348,
        title: "Executive Summary Generator",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 1349,
        title: "Article Outline Generator",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 1350,
        title: "Data Visualization Assistant",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 1351,
        title: "Story Idea Framework",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 1352,
        title: "Data Analysis Template",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 1353,
        title: "Essay Structure Assistant",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 1354,
        title: "UI Mockup Guide",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 1355,
        title: "Executive Summary Assistant",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 1356,
        title: "Layout Design Template",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 1357,
        title: "Story Idea Guide",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 1358,
        title: "Essay Structure Generator",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 1359,
        title: "Debugging Help Framework",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 1360,
        title: "Color Scheme Template",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 1361,
        title: "Chart Interpretation Assistant",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 1362,
        title: "UI Mockup Template",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 1363,
        title: "Statistical Model Assistant",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 1364,
        title: "Executive Summary Framework",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 1365,
        title: "Data Analysis Assistant",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 1366,
        title: "Data Analysis Framework",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 1367,
        title: "Code Review Guide",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 1368,
        title: "Statistical Model Template",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 1369,
        title: "Color Scheme Guide",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 1370,
        title: "Business Plan Guide",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 1371,
        title: "Email Campaign Generator",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 1372,
        title: "Code Review Guide",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 1373,
        title: "Meeting Agenda Assistant",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 1374,
        title: "Story Idea Template",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 1375,
        title: "Code Review Generator",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 1376,
        title: "Business Plan Template",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 1377,
        title: "Statistical Model Guide",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 1378,
        title: "Social Media Post Guide",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 1379,
        title: "Article Outline Template",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 1380,
        title: "Marketing Strategy Guide",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 1381,
        title: "Article Outline Assistant",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 1382,
        title: "Blog Post Guide",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 1383,
        title: "Meeting Agenda Guide",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 1384,
        title: "Data Analysis Generator",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 1385,
        title: "UI Mockup Template",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 1386,
        title: "Algorithm Design Framework",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 1387,
        title: "Essay Structure Framework",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 1388,
        title: "Code Review Generator",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 1389,
        title: "Business Plan Guide",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 1390,
        title: "Email Campaign Framework",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 1391,
        title: "API Documentation Guide",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 1392,
        title: "Statistical Model Template",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 1393,
        title: "Layout Design Guide",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 1394,
        title: "Blog Post Framework",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 1395,
        title: "SWOT Analysis Guide",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 1396,
        title: "Meeting Agenda Generator",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 1397,
        title: "Story Idea Assistant",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 1398,
        title: "Essay Structure Framework",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 1399,
        title: "Marketing Strategy Framework",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 1400,
        title: "Story Idea Generator",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 1401,
        title: "Color Scheme Guide",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 1402,
        title: "Statistical Model Guide",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 1403,
        title: "Meeting Agenda Framework",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 1404,
        title: "Email Campaign Framework",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 1405,
        title: "Chart Interpretation Framework",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 1406,
        title: "Blog Post Framework",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 1407,
        title: "Algorithm Design Assistant",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 1408,
        title: "Chart Interpretation Assistant",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 1409,
        title: "Code Review Guide",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 1410,
        title: "Marketing Strategy Template",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 1411,
        title: "Story Idea Assistant",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 1412,
        title: "Meeting Agenda Framework",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 1413,
        title: "Algorithm Design Guide",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 1414,
        title: "Code Review Generator",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 1415,
        title: "API Documentation Guide",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 1416,
        title: "Algorithm Design Framework",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 1417,
        title: "Marketing Strategy Guide",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 1418,
        title: "Blog Post Template",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 1419,
        title: "Code Review Framework",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 1420,
        title: "Color Scheme Template",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 1421,
        title: "Debugging Help Assistant",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 1422,
        title: "Meeting Agenda Generator",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 1423,
        title: "Social Media Post Assistant",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 1424,
        title: "Statistical Model Generator",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 1425,
        title: "Blog Post Template",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 1426,
        title: "Story Idea Guide",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 1427,
        title: "Statistical Model Assistant",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 1428,
        title: "API Documentation Template",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 1429,
        title: "UI Mockup Template",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 1430,
        title: "Color Scheme Guide",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 1431,
        title: "Color Scheme Framework",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 1432,
        title: "Email Campaign Template",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 1433,
        title: "Brand Guidelines Framework",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 1434,
        title: "Story Idea Template",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 1435,
        title: "Data Visualization Generator",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 1436,
        title: "UI Mockup Framework",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 1437,
        title: "Statistical Model Template",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 1438,
        title: "UI Mockup Template",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 1439,
        title: "Code Review Assistant",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 1440,
        title: "UI Mockup Template",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 1441,
        title: "Social Media Post Generator",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 1442,
        title: "Layout Design Guide",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 1443,
        title: "Algorithm Design Guide",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 1444,
        title: "Statistical Model Assistant",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 1445,
        title: "Meeting Agenda Template",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 1446,
        title: "Brand Guidelines Framework",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 1447,
        title: "Email Campaign Guide",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 1448,
        title: "Ad Copy Generator",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 1449,
        title: "Layout Design Framework",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 1450,
        title: "Article Outline Generator",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 1451,
        title: "Essay Structure Framework",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 1452,
        title: "Code Review Framework",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 1453,
        title: "API Documentation Generator",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 1454,
        title: "Chart Interpretation Generator",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 1455,
        title: "Statistical Model Guide",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 1456,
        title: "Social Media Post Generator",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 1457,
        title: "Story Idea Assistant",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 1458,
        title: "Article Outline Guide",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 1459,
        title: "Data Visualization Generator",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 1460,
        title: "Marketing Strategy Framework",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 1461,
        title: "Algorithm Design Framework",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 1462,
        title: "Blog Post Generator",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 1463,
        title: "Data Analysis Framework",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 1464,
        title: "UI Mockup Guide",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 1465,
        title: "Email Campaign Template",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 1466,
        title: "Story Idea Assistant",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 1467,
        title: "Meeting Agenda Guide",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 1468,
        title: "Statistical Model Generator",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 1469,
        title: "Statistical Model Assistant",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 1470,
        title: "Layout Design Generator",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 1471,
        title: "Story Idea Template",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 1472,
        title: "API Documentation Assistant",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 1473,
        title: "Blog Post Assistant",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 1474,
        title: "UI Mockup Guide",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 1475,
        title: "API Documentation Template",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 1476,
        title: "SWOT Analysis Generator",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 1477,
        title: "Data Analysis Framework",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 1478,
        title: "Story Idea Assistant",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 1479,
        title: "Blog Post Assistant",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 1480,
        title: "Statistical Model Assistant",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 1481,
        title: "Business Plan Guide",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 1482,
        title: "Brand Guidelines Generator",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 1483,
        title: "Executive Summary Assistant",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 1484,
        title: "API Documentation Guide",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 1485,
        title: "Color Scheme Framework",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 1486,
        title: "UI Mockup Assistant",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 1487,
        title: "Data Analysis Assistant",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 1488,
        title: "UI Mockup Assistant",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 1489,
        title: "Business Plan Generator",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 1490,
        title: "Business Plan Assistant",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 1491,
        title: "Color Scheme Guide",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 1492,
        title: "Social Media Post Guide",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 1493,
        title: "Meeting Agenda Generator",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 1494,
        title: "Social Media Post Assistant",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 1495,
        title: "Social Media Post Template",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 1496,
        title: "Email Campaign Framework",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 1497,
        title: "Debugging Help Template",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 1498,
        title: "Data Visualization Template",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 1499,
        title: "Meeting Agenda Assistant",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 1500,
        title: "Code Review Template",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 1501,
        title: "Statistical Model Guide",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 1502,
        title: "Brand Guidelines Generator",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 1503,
        title: "Essay Structure Guide",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 1504,
        title: "SWOT Analysis Assistant",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 1505,
        title: "Meeting Agenda Framework",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 1506,
        title: "Social Media Post Assistant",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 1507,
        title: "Executive Summary Framework",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 1508,
        title: "Color Scheme Assistant",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 1509,
        title: "Statistical Model Framework",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 1510,
        title: "Chart Interpretation Framework",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 1511,
        title: "SWOT Analysis Assistant",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 1512,
        title: "Marketing Strategy Guide",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 1513,
        title: "SWOT Analysis Framework",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 1514,
        title: "Story Idea Template",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 1515,
        title: "Statistical Model Template",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 1516,
        title: "Social Media Post Guide",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 1517,
        title: "SWOT Analysis Template",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 1518,
        title: "Chart Interpretation Assistant",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 1519,
        title: "Chart Interpretation Framework",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 1520,
        title: "Email Campaign Template",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 1521,
        title: "Layout Design Framework",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 1522,
        title: "Data Analysis Framework",
        content: "Write a Python script to analyze [DATA_TYPE] data and generate insights about [TOPIC].",
        category: "data"
    },
    {
        id: 1523,
        title: "Layout Design Template",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 1524,
        title: "Debugging Help Template",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 1525,
        title: "Executive Summary Template",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 1526,
        title: "Marketing Strategy Template",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 1527,
        title: "Essay Structure Guide",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 1528,
        title: "Brand Guidelines Guide",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 1529,
        title: "Business Plan Template",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 1530,
        title: "Data Visualization Guide",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 1531,
        title: "Email Campaign Framework",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 1532,
        title: "Ad Copy Template",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 1533,
        title: "Color Scheme Generator",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 1534,
        title: "Algorithm Design Template",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 1535,
        title: "Color Scheme Assistant",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 1536,
        title: "Data Visualization Assistant",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 1537,
        title: "Data Visualization Template",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 1538,
        title: "Color Scheme Guide",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 1539,
        title: "Layout Design Generator",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 1540,
        title: "Email Campaign Template",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 1541,
        title: "UI Mockup Framework",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 1542,
        title: "Social Media Post Template",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 1543,
        title: "Article Outline Template",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 1544,
        title: "Meeting Agenda Generator",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 1545,
        title: "API Documentation Framework",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 1546,
        title: "API Documentation Framework",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 1547,
        title: "Blog Post Template",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 1548,
        title: "Article Outline Assistant",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 1549,
        title: "Data Visualization Framework",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 1550,
        title: "Business Plan Template",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 1551,
        title: "Essay Structure Assistant",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 1552,
        title: "Social Media Post Generator",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 1553,
        title: "Brand Guidelines Framework",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 1554,
        title: "Algorithm Design Generator",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 1555,
        title: "Story Idea Assistant",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 1556,
        title: "Story Idea Generator",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 1557,
        title: "Email Campaign Guide",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 1558,
        title: "Blog Post Assistant",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 1559,
        title: "Ad Copy Framework",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 1560,
        title: "Article Outline Generator",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 1561,
        title: "Marketing Strategy Guide",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 1562,
        title: "Color Scheme Generator",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 1563,
        title: "SWOT Analysis Template",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 1564,
        title: "UI Mockup Generator",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 1565,
        title: "Blog Post Template",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 1566,
        title: "Blog Post Assistant",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 1567,
        title: "Color Scheme Framework",
        content: "Suggest UI improvements for this interface: [DESCRIPTION]",
        category: "design"
    },
    {
        id: 1568,
        title: "UI Mockup Assistant",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 1569,
        title: "Blog Post Template",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 1570,
        title: "Debugging Help Guide",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 1571,
        title: "Brand Guidelines Generator",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 1572,
        title: "Social Media Post Generator",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 1573,
        title: "Chart Interpretation Template",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 1574,
        title: "Ad Copy Framework",
        content: "Develop a tagline for [BRAND] that communicates its unique value proposition in under 10 words.",
        category: "marketing"
    },
    {
        id: 1575,
        title: "Blog Post Generator",
        content: "Write a compelling introduction paragraph for an article about [TOPIC] that hooks the reader's attention.",
        category: "writing"
    },
    {
        id: 1576,
        title: "Brand Guidelines Generator",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 1577,
        title: "Meeting Agenda Assistant",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 1578,
        title: "Ad Copy Generator",
        content: "Write a compelling marketing email for [PRODUCT] that highlights its key benefits and includes a strong call to action.",
        category: "marketing"
    },
    {
        id: 1579,
        title: "Executive Summary Template",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 1580,
        title: "Meeting Agenda Template",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 1581,
        title: "Business Plan Template",
        content: "Write an executive summary for a business plan for a new [BUSINESS_TYPE] startup.",
        category: "business"
    },
    {
        id: 1582,
        title: "Business Plan Assistant",
        content: "Develop a 30-60-90 day plan for a new [JOB_TITLE] role.",
        category: "business"
    },
    {
        id: 1583,
        title: "Data Visualization Assistant",
        content: "Suggest the best chart type to visualize [DATA_DESCRIPTION] and explain why.",
        category: "data"
    },
    {
        id: 1584,
        title: "Meeting Agenda Guide",
        content: "Create a SWOT analysis template for a [BUSINESS_TYPE] business.",
        category: "business"
    },
    {
        id: 1585,
        title: "Data Visualization Template",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 1586,
        title: "API Documentation Generator",
        content: "Review this code and suggest improvements for readability and performance: [CODE]",
        category: "coding"
    },
    {
        id: 1587,
        title: "Essay Structure Assistant",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 1588,
        title: "Code Review Template",
        content: "Write a function in [LANGUAGE] that [FUNCTION_DESCRIPTION]",
        category: "coding"
    },
    {
        id: 1589,
        title: "Layout Design Generator",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 1590,
        title: "Ad Copy Guide",
        content: "Create 5 different social media post ideas for promoting [PRODUCT/SERVICE] on [PLATFORM].",
        category: "marketing"
    },
    {
        id: 1591,
        title: "Chart Interpretation Assistant",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 1592,
        title: "Code Review Assistant",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    },
    {
        id: 1593,
        title: "Chart Interpretation Guide",
        content: "Explain how to interpret this data visualization: [DESCRIPTION]",
        category: "data"
    },
    {
        id: 1594,
        title: "Essay Structure Assistant",
        content: "Generate 10 creative headline ideas for an article about [TOPIC] that would perform well on social media.",
        category: "writing"
    },
    {
        id: 1595,
        title: "Brand Guidelines Guide",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 1596,
        title: "Story Idea Generator",
        content: "Create a detailed outline for a blog post about [TOPIC] that includes an introduction, 5 main sections, and a conclusion.",
        category: "writing"
    },
    {
        id: 1597,
        title: "Brand Guidelines Framework",
        content: "Create a wireframe description for the homepage of a [WEBSITE_TYPE] website.",
        category: "design"
    },
    {
        id: 1598,
        title: "Color Scheme Guide",
        content: "Describe a color scheme for a [BRAND_TYPE] that conveys [EMOTION/QUALITY].",
        category: "design"
    },
    {
        id: 1599,
        title: "Algorithm Design Generator",
        content: "Explain how to implement [ALGORITHM] in [LANGUAGE] with example code.",
        category: "coding"
    }
];

// Add these to defaultPromptsData
defaultPromptsData.push(...newGeneratedPrompts);
