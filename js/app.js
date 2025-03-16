// DOM Elements
const promptsContainer = document.getElementById('prompts-container');
const searchInput = document.getElementById('search-input');
const categoryButtons = document.querySelectorAll('.category-btn');
const themeToggle = document.querySelector('.theme-toggle');
const randomPromptBtn = document.getElementById('random-prompt-btn');
const generatePromptBtn = document.getElementById('generate-prompt-btn');
const exportBtn = document.getElementById('export-btn');

// State
let currentCategory = 'all';
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let darkMode = localStorage.getItem('darkMode') === 'true';
let currentPage = 1;
let pageSize = 20;
let totalPages = 1;
let ratings = JSON.parse(localStorage.getItem('promptRatings')) || {};
let sharedPrompts = JSON.parse(localStorage.getItem('sharedPrompts')) || [];
let communityPrompts = JSON.parse(localStorage.getItem('communityPrompts')) || [];
let notificationEmails = JSON.parse(localStorage.getItem('notificationEmails')) || [];
let promptUsage = JSON.parse(localStorage.getItem('promptUsage')) || {};

// Wait for everything to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Safety check
    if (!window.promptsData) {
        console.error('promptsData not found, initializing empty array');
        window.promptsData = [];
    }
    
    console.log('App.js loaded');
    console.log('Initial promptsData:', window.promptsData.length, 'prompts');
    
    // Initialize the app
    initializeApp();
});

function initializeApp() {
    try {
        // Apply saved theme
        if (darkMode) {
            document.body.classList.add('dark-mode');
        }
        
        // Display prompts
        displayPrompts();
        
        // Set up event listeners
        setupEventListeners();
        
        // Initialize the bulk generation button
        addBulkGenerationButton();
        
        // Update stats
        updateStats();
    } catch (error) {
        console.error('Error initializing app:', error);
        showToast('Error loading the application. Please refresh the page.', 'error');
    }
}

// Event Listeners
function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', () => {
        displayPrompts();
    });
    
    // Category filtering
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentCategory = button.dataset.category;
            displayPrompts();
        });
    });
    
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Random prompt - Add debug logging
    randomPromptBtn.addEventListener('click', () => {
        console.log('Random prompt button clicked');
        showRandomPrompt();
    });
    
    // Generate new prompt
    generatePromptBtn.addEventListener('click', generateNewPrompt);
    
    // Export favorites
    exportBtn.addEventListener('click', exportFavorites);
    
    // Initialize stats
    updateStats();
    
    // Pagination controls
    document.getElementById('prev-page').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayPrompts();
            window.scrollTo(0, 0);
        }
    });
    
    document.getElementById('next-page').addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayPrompts();
            window.scrollTo(0, 0);
        }
    });
    
    document.getElementById('page-size').addEventListener('change', function() {
        pageSize = parseInt(this.value);
        currentPage = 1;
        displayPrompts();
    });
    
    // View toggle
    document.getElementById('grid-view-btn').addEventListener('click', function() {
        document.getElementById('prompts-container').className = 'prompts-grid';
        this.classList.add('active');
        document.getElementById('list-view-btn').classList.remove('active');
        localStorage.setItem('viewMode', 'grid');
    });
    
    document.getElementById('list-view-btn').addEventListener('click', function() {
        document.getElementById('prompts-container').className = 'prompts-list';
        this.classList.add('active');
        document.getElementById('grid-view-btn').classList.remove('active');
        localStorage.setItem('viewMode', 'list');
    });
    
    // Load saved view preference
    const savedView = localStorage.getItem('viewMode');
    if (savedView === 'list') {
        document.getElementById('list-view-btn').click();
    }
}

// Display prompts based on current filters
function displayPrompts() {
    const searchTerm = searchInput.value.toLowerCase();
    
    // Filter prompts based on search term and category
    let filteredPrompts = promptsData.filter(prompt => {
        const matchesSearch = prompt.title.toLowerCase().includes(searchTerm) || 
                             prompt.content.toLowerCase().includes(searchTerm);
        
        if (currentCategory === 'all') {
            return matchesSearch;
        } else if (currentCategory === 'favorites') {
            return matchesSearch && favorites.includes(prompt.id);
        } else {
            return matchesSearch && prompt.category === currentCategory;
        }
    });

    // Sort by rating if available
    filteredPrompts.sort((a, b) => {
        const ratingA = ratings[a.id] ? ratings[a.id].up - ratings[a.id].down : 0;
        const ratingB = ratings[b.id] ? ratings[b.id].up - ratings[b.id].down : 0;
        return ratingB - ratingA;
    });

    // Pagination logic
    totalPages = Math.ceil(filteredPrompts.length / pageSize);
    document.getElementById('current-page').textContent = currentPage;
    document.getElementById('total-pages').textContent = totalPages;
    
    // Clear container
    promptsContainer.innerHTML = '';
    
    // Show no results message if needed
    if (filteredPrompts.length === 0) {
        promptsContainer.innerHTML = '<div class="no-results">No prompts found. Try a different search term or category.</div>';
        return;
    }
    
    // Get template
    const template = document.getElementById('prompt-card-template');
    
    // Calculate pagination
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, filteredPrompts.length);
    const paginatedPrompts = filteredPrompts.slice(startIndex, endIndex);
    
    // Add prompts to container
    paginatedPrompts.forEach(prompt => {
        // Clone template
        const promptCard = template.content.cloneNode(true).querySelector('.prompt-card');
        const isFavorite = favorites.includes(prompt.id);
        
        // Set content
        promptCard.querySelector('.category-tag').textContent = prompt.category;
        
        // Set AI recommendation tag
        const aiTag = promptCard.querySelector('.ai-tag');
        if (prompt.ai) {
            aiTag.textContent = `Best for: ${prompt.ai}`;
            aiTag.dataset.ai = prompt.ai;
            aiTag.style.display = 'inline-block';
        } else {
            // Default to a random AI if not specified
            const aiModels = ['GPT-4', 'Claude', 'Gemini', 'Llama'];
            const randomAI = aiModels[Math.floor(Math.random() * aiModels.length)];
            prompt.ai = randomAI;
            aiTag.textContent = `Best for: ${randomAI}`;
            aiTag.dataset.ai = randomAI;
            aiTag.style.display = 'inline-block';
        }
        
        const titleElement = promptCard.querySelector('h3');
        titleElement.textContent = prompt.title;
        const contentElement = promptCard.querySelector('p');
        contentElement.textContent = prompt.content;
        
        // Make title and content clickable
        titleElement.style.cursor = 'pointer';
        contentElement.style.cursor = 'pointer';
        titleElement.addEventListener('click', () => showPromptDetails(prompt.id));
        contentElement.addEventListener('click', () => showPromptDetails(prompt.id));
        
        // Set buttons
        const copyBtn = promptCard.querySelector('.copy-btn');
        copyBtn.dataset.prompt = prompt.id;
        
        const favoriteBtn = promptCard.querySelector('.favorite-btn');
        favoriteBtn.dataset.prompt = prompt.id;
        if (isFavorite) {
            favoriteBtn.classList.add('active');
            favoriteBtn.querySelector('i').className = 'fas fa-star';
        }
        
        // Set ratings
        const ratingContainer = promptCard.querySelector('.rating-container');
        const ratingCount = promptCard.querySelector('.rating-count');
        const ratingUp = promptCard.querySelector('.rating-up');
        const ratingDown = promptCard.querySelector('.rating-down');
        
        // Set rating data
        ratingUp.dataset.prompt = prompt.id;
        ratingDown.dataset.prompt = prompt.id;
        
        // Set rating count
        const promptRating = ratings[prompt.id] || { up: 0, down: 0 };
        ratingCount.textContent = promptRating.up - promptRating.down;
        
        // Highlight user's rating if any
        if (promptRating.userRating === 'up') {
            ratingUp.className = 'fas fa-thumbs-up rating-up active';
        } else if (promptRating.userRating === 'down') {
            ratingDown.className = 'fas fa-thumbs-down rating-down active';
        }
        
        // Set share button
        const shareBtn = promptCard.querySelector('.share-btn');
        shareBtn.dataset.prompt = prompt.id;
        if (sharedPrompts.includes(prompt.id)) {
            shareBtn.innerHTML = '<i class="fas fa-check"></i>';
            shareBtn.title = 'Shared';
        }
        
        promptsContainer.appendChild(promptCard);
    });
    
    // Add event listeners to new buttons
    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', copyPrompt);
    });
    
    document.querySelectorAll('.favorite-btn').forEach(button => {
        button.addEventListener('click', toggleFavorite);
    });
    
    document.querySelectorAll('.rating-up, .rating-down').forEach(button => {
        button.addEventListener('click', ratePrompt);
    });
    
    document.querySelectorAll('.share-btn').forEach(button => {
        button.addEventListener('click', sharePrompt);
    });
}

// Copy prompt to clipboard
function copyPrompt(e) {
    if (!e || !e.currentTarget || !e.currentTarget.dataset) {
        console.error('Invalid event or missing dataset in copyPrompt function');
        return;
    }
    
    const promptId = parseInt(e.currentTarget.dataset.prompt);
    if (isNaN(promptId)) {
        console.error('Invalid prompt ID:', e.currentTarget.dataset.prompt);
        return;
    }
    
    const prompt = promptsData.find(p => p.id === promptId);
    
    if (!prompt) {
        console.error('Prompt not found with ID:', promptId);
        return;
    }
    
    console.log(`Copying prompt: ${prompt.title}`);
    
    // Check if prompt contains variables (check for both {{ }} and [ ] formats)
    if ((prompt.content.includes('{{') && prompt.content.includes('}}')) || 
        (prompt.content.includes('[') && prompt.content.includes(']'))) {
        // Process template variables
        processPromptTemplate(prompt.content).then(processedContent => {
            // Copy processed content to clipboard
            navigator.clipboard.writeText(processedContent)
                .then(() => {
                    showToast('Prompt copied to clipboard!');
                    
                    // Track usage
                    trackPromptUsage(promptId);
                    
                    updateStats();
                })
                .catch(err => {
                    console.error('Failed to copy:', err);
                    showToast('Failed to copy prompt', 'error');
                });
        });
    } else {
        // Regular prompt without variables
        navigator.clipboard.writeText(prompt.content)
            .then(() => {
                showToast('Prompt copied to clipboard!');
                
                // Track usage
                trackPromptUsage(promptId);
                
                updateStats();
            })
            .catch(err => {
                console.error('Failed to copy:', err);
                showToast('Failed to copy prompt', 'error');
            });
    }
}

// Toggle favorite status
function toggleFavorite(e) {
    const promptId = parseInt(e.currentTarget.dataset.prompt);
    
    if (favorites.includes(promptId)) {
        // Remove from favorites
        favorites = favorites.filter(id => id !== promptId);
        e.currentTarget.classList.remove('active');
        e.currentTarget.querySelector('i').className = 'far fa-star';
    } else {
        // Add to favorites
        favorites.push(promptId);
        e.currentTarget.classList.add('active');
        e.currentTarget.querySelector('i').className = 'fas fa-star';
    }
    
    // Save to localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    // Refresh display if on favorites tab
    if (currentCategory === 'favorites') {
        displayPrompts();
    }
    
    // Update stats after changing favorites
    updateStats();
}

// Toggle theme
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    darkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', darkMode);
}

// Show random prompt with improved visual highlighting
function showRandomPrompt() {
    // Check if we have prompts
    if (!promptsData || promptsData.length === 0) {
        console.error("No prompts available to select randomly");
        return;
    }
    
    console.log(`Selecting random prompt from ${promptsData.length} prompts`);
    
    const randomIndex = Math.floor(Math.random() * promptsData.length);
    const randomPrompt = promptsData[randomIndex];
    
    console.log(`Selected random prompt: ${randomPrompt.id} - ${randomPrompt.title}`);
    
    // Reset filters
    searchInput.value = '';
    categoryButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector('[data-category="all"]').classList.add('active');
    currentCategory = 'all';
    
    // Calculate which page the random prompt should be on
    const itemsPerPage = parseInt(document.getElementById('page-size').value);
    const allPrompts = promptsData.filter(prompt => true); // No filtering
    const promptIndex = allPrompts.findIndex(p => p.id === randomPrompt.id);
    
    if (promptIndex === -1) {
        console.error(`Prompt with ID ${randomPrompt.id} not found in promptsData`);
        return;
    }
    
    // Calculate the page number and set it
    currentPage = Math.floor(promptIndex / itemsPerPage) + 1;
    console.log(`Random prompt should be on page ${currentPage}`);
    
    // Display all prompts with the correct page
    displayPrompts();
    
    // Find and highlight the random prompt card
    setTimeout(() => {
        const promptCards = document.querySelectorAll('.prompt-card');
        let foundCard = false;
        
        console.log(`Looking for prompt ID ${randomPrompt.id} among ${promptCards.length} cards`);
        
        promptCards.forEach(card => {
            const copyBtn = card.querySelector('.copy-btn');
            if (!copyBtn) {
                console.log('Found a card without a copy button');
                return;
            }
            
            const cardPromptId = parseInt(copyBtn.dataset.prompt);
            console.log(`Checking card with prompt ID: ${cardPromptId}`);
            
            if (cardPromptId === randomPrompt.id) {
                foundCard = true;
                console.log(`Found card for prompt ${randomPrompt.id}, highlighting it`);
                
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                card.classList.add('highlight-card');
                
                // Add pulsing animation
                card.style.animation = 'pulse 2s infinite';
                
                // Add a "Random Pick" label
                const randomLabel = document.createElement('div');
                randomLabel.className = 'prompt-label random-label';
                randomLabel.textContent = 'Random Pick';
                card.appendChild(randomLabel);
                
                // Remove highlight after 5 seconds
                setTimeout(() => {
                    card.classList.remove('highlight-card');
                    card.style.animation = '';
                    if (card.contains(randomLabel)) {
                        card.removeChild(randomLabel);
                    }
                }, 5000);
            }
        });
        
        if (!foundCard) {
            console.error(`Could not find card for prompt ${randomPrompt.id}. Trying again with increased timeout.`);
            // Try again with a longer timeout as a fallback
            setTimeout(() => {
                const promptCards = document.querySelectorAll('.prompt-card');
                promptCards.forEach(card => {
                    const copyBtn = card.querySelector('.copy-btn');
                    if (!copyBtn) return;
                    
                    const cardPromptId = parseInt(copyBtn.dataset.prompt);
                    if (cardPromptId === randomPrompt.id) {
                        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        card.classList.add('highlight-card');
                        card.style.animation = 'pulse 2s infinite';
                        
                        const randomLabel = document.createElement('div');
                        randomLabel.className = 'prompt-label random-label';
                        randomLabel.textContent = 'Random Pick';
                        card.appendChild(randomLabel);
                        
                        setTimeout(() => {
                            card.classList.remove('highlight-card');
                            card.style.animation = '';
                            if (card.contains(randomLabel)) {
                                card.removeChild(randomLabel);
                            }
                        }, 5000);
                        
                        console.log('Found card on second attempt');
                    }
                });
            }, 800);
        }
    }, 500); // Increased timeout to ensure DOM is updated
}

// Generate a new professional prompt
function generateNewPrompt() {
    console.log("Generate new prompt function called");
    
    // Show loading state
    generatePromptBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    generatePromptBtn.disabled = true;
    
    // Generate a new prompt using templates
    setTimeout(() => {
        try {
            const newPrompt = createPromptFromTemplates();
            console.log("New prompt created:", newPrompt);
            
            // Add to promptsData
            promptsData.push(newPrompt);
            
            // Save to localStorage
            localStorage.setItem('customPrompts', JSON.stringify(promptsData));
            
            // Reset button
            generatePromptBtn.innerHTML = '<i class="fas fa-magic"></i> Generate New';
            generatePromptBtn.disabled = false;
            
            // Update display and stats
            displayPrompts();
            updateStats();
            
            // Highlight the new prompt
            highlightPrompt(newPrompt.id);
            
            // Offer to save to codebase for developers
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                const saveToCodebase = confirm('Would you like to save this prompt to the codebase for all users?');
                if (saveToCodebase) {
                    // Format the prompt as JavaScript code
                    let promptCode = '// New prompt generated on ' + new Date().toISOString() + '\n';
                    promptCode += 'defaultPromptsData.push({\n';
                    promptCode += `    id: ${newPrompt.id},\n`;
                    promptCode += `    title: "${newPrompt.title}",\n`;
                    promptCode += `    content: "${newPrompt.content.replace(/"/g, '\\"')}",\n`;
                    promptCode += `    category: "${newPrompt.category}"\n`;
                    promptCode += '});\n';
                    
                    // Copy to clipboard
                    navigator.clipboard.writeText(promptCode)
                        .then(() => {
                            alert('Prompt code copied to clipboard! Paste this into js/prompts.js');
                        })
                        .catch(err => {
                            console.error('Failed to copy:', err);
                            alert('Failed to copy to clipboard. See console for the code to add.');
                            console.log('Add this to js/prompts.js:');
                            console.log(promptCode);
                        });
                }
            }
        } catch (error) {
            console.error("Error generating prompt:", error);
            // Reset button even if there's an error
            generatePromptBtn.innerHTML = '<i class="fas fa-magic"></i> Generate New';
            generatePromptBtn.disabled = false;
            showToast("Error generating prompt. Check console for details.", "error");
        }
    }, 800); // Simulate generation time
}

// Create a new prompt from templates with improved quality and consistent placeholders
function createPromptFromTemplates() {
    // Enhanced templates with consistent [PLACEHOLDER] format
    const templates = {
        writing: [
            "Create a detailed [CONTENT_TYPE] about [TOPIC] that includes [STRUCTURE] and addresses [AUDIENCE].",
            "Develop a comprehensive [CONTENT_TYPE] on [TOPIC] with [STRUCTURE] tailored for [AUDIENCE].",
            "Summarize the key findings, methodology, and implications of research on [TOPIC] in a clear and concise manner."
        ],
        coding: [
            "Write a [LANGUAGE] function that [FUNCTIONALITY] with optimal [OPTIMIZATION] and includes [DOCUMENTATION].",
            "Create a [PATTERN] implementation in [LANGUAGE] that solves [PROBLEM] while ensuring [BEST_PRACTICE].",
            "Develop a [SCOPE] solution in [LANGUAGE] that handles [FUNCTIONALITY] with proper [ERROR_HANDLING]."
        ],
        marketing: [
            "Write a [CONTENT_TYPE] for [PRODUCT] that highlights [BENEFITS] and includes [CALL_TO_ACTION].",
            "Create a [CHANNEL] campaign strategy for [PRODUCT] targeting [AUDIENCE] with focus on [OBJECTIVE].",
            "Develop a [CONTENT_TYPE] that positions [PRODUCT] as [POSITIONING] in the market."
        ],
        data: [
            "Create a data analysis plan for [DATASET] that includes [TECHNIQUES] to uncover insights about [TOPIC].",
            "Design a dashboard that visualizes [METRICS] for [AUDIENCE] to make decisions about [DECISION].",
            "Write a script to clean and transform [DATASET] focusing on handling [ISSUES] and preparing for [ANALYSIS]."
        ],
        business: [
            "Develop a strategic plan for [COMPANY] to [OBJECTIVE] in the next [TIMEFRAME].",
            "Create a competitive analysis framework for [INDUSTRY] focusing on [ASPECTS].",
            "Write a business case for [INITIATIVE] that demonstrates [BENEFITS] and addresses [CONCERNS]."
        ],
        design: [
            "Design a [COMPONENT] that follows [PRINCIPLES] and enhances [USER_EXPERIENCE].",
            "Create a [COMPONENT] design that implements [PRINCIPLES] while optimizing for [USER_GOAL].",
            "Develop a user-centered [COMPONENT] that incorporates [PRINCIPLES] to solve [USER_PROBLEM]."
        ]
    };
    
    // Function to replace template placeholders with brackets
    function generatePromptWithBrackets(category) {
        const template = templates[category][Math.floor(Math.random() * templates[category].length)];
        let content = template;
        
        // Replace {placeholders} with [PLACEHOLDERS] if they exist
        const placeholders = template.match(/\{(\w+)\}/g) || [];
        placeholders.forEach(placeholder => {
            const key = placeholder.replace(/[{}]/g, '');
            const bracketKey = '[' + key.toUpperCase() + ']';
            content = content.replace(placeholder, bracketKey);
        });
        
        return content;
    }
    
    // Select a random category
    const categories = Object.keys(templates);
    const category = categories[Math.floor(Math.random() * categories.length)];
    
    // Generate a prompt with bracketed placeholders
    const content = generatePromptWithBrackets(category);
    
    // Create a title based on the content
    const words = content.split(' ').filter(word => word.length > 4 && !word.includes('['));
    const titleWords = [];
    for (let i = 0; i < 3 && words.length > 0; i++) {
        const index = Math.floor(Math.random() * words.length);
        titleWords.push(words.splice(index, 1)[0]);
    }
    const title = titleWords.join(' ').replace(/[,.]/g, '');
    
    // Assign appropriate AI model based on category and content
    let aiModel;
    if (category === 'coding') {
        aiModel = 'Claude';
    } else if (category === 'writing') {
        aiModel = 'GPT-4';
    } else if (category === 'data') {
        aiModel = 'Gemini';
    } else if (category === 'business') {
        aiModel = 'Claude';
    } else if (category === 'design') {
        aiModel = 'Midjourney';
    } else if (category === 'marketing') {
        aiModel = 'Llama';
    } else {
        // Randomly assign for other categories
        const aiModels = ['GPT-4', 'Claude', 'Gemini', 'Llama'];
        aiModel = aiModels[Math.floor(Math.random() * aiModels.length)];
    }
    
    // Create the new prompt object
    return {
        id: promptsData.length > 0 ? Math.max(...promptsData.map(p => p.id)) + 1 : 1,
        title: title.charAt(0).toUpperCase() + title.slice(1),
        content: content,
        category: category,
        ai: aiModel
    };
}

// Highlight a specific prompt
function highlightPrompt(promptId) {
    setTimeout(() => {
        const promptCards = document.querySelectorAll('.prompt-card');
        promptCards.forEach(card => {
            const cardPromptId = parseInt(card.querySelector('.copy-btn').dataset.prompt);
            if (cardPromptId === promptId) {
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                card.classList.add('highlight-card');
                card.style.animation = 'pulse 2s infinite';
                
                // Add a "New" label
                const newLabel = document.createElement('div');
                newLabel.className = 'prompt-label new-label';
                newLabel.textContent = 'New';
                card.appendChild(newLabel);
                
                // Remove highlight after 5 seconds
                setTimeout(() => {
                    card.classList.remove('highlight-card');
                    card.style.animation = '';
                    if (card.contains(newLabel)) {
                        card.removeChild(newLabel);
                    }
                }, 5000);
            }
        });
    }, 100);
}

// Export favorites
function exportFavorites() {
    if (favorites.length === 0) {
        alert('You have no favorite prompts to export.');
        return;
    }
    
    const favoritePrompts = promptsData.filter(prompt => favorites.includes(prompt.id));
    const exportData = JSON.stringify(favoritePrompts, null, 2);
    
    // Create download link
    const blob = new Blob([exportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'favorite-prompts.json';
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
}

// Update stats counters - completely rewritten for reliability
function updateStats() {
    // Force a direct update of the stats in the header
    const promptCountElement = document.getElementById('prompt-count');
    if (promptCountElement && promptCountElement.querySelector('span')) {
        promptCountElement.querySelector('span').textContent = promptsData.length;
    } else {
        console.error('Could not find prompt-count element');
    }
    
    const favoritesCountElement = document.getElementById('favorites-count');
    if (favoritesCountElement && favoritesCountElement.querySelector('span')) {
        favoritesCountElement.querySelector('span').textContent = favorites.length;
    } else {
        console.error('Could not find favorites-count element');
    }
    
    // Log the actual values for debugging
    console.log(`Stats should update to: ${promptsData.length} prompts, ${favorites.length} favorites`);
}

// Add this code at the end of your file to force an immediate update
// This will run as soon as the script loads
(function forceStatsUpdate() {
    console.log('Forcing stats update...');
    // Wait a short time to ensure DOM is ready
    setTimeout(() => {
        console.log(`Updating stats with ${promptsData.length} prompts and ${favorites.length} favorites`);
        
        // Direct DOM manipulation as a fallback
        const promptCountSpan = document.querySelector('#prompt-count span');
        if (promptCountSpan) {
            promptCountSpan.textContent = promptsData.length;
            console.log('Updated prompt count display');
        }
        
        const favoritesCountSpan = document.querySelector('#favorites-count span');
        if (favoritesCountSpan) {
            favoritesCountSpan.textContent = favorites.length;
            console.log('Updated favorites count display');
        }
    }, 500);
})(); // Add console command for developers

console.generatePrompts = function(count = 100) {
    return generateBulkPrompts(count);
};

// Modal functionality
function setupModalFunctionality() {
    // Setup modal close buttons
    document.querySelectorAll('.close-modal').forEach(closeBtn => {
        closeBtn.addEventListener('click', closeModal);
    });
    
    // Close modal when clicking outside content
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    });
    
    // Setup export buttons - check if elements exist first
    const exportJsonBtn = document.getElementById('export-json');
    if (exportJsonBtn) {
        exportJsonBtn.addEventListener('click', () => {
            closeModal();
            exportPrompts('json');
        });
    }
    
    const exportCsvBtn = document.getElementById('export-csv');
    if (exportCsvBtn) {
        exportCsvBtn.addEventListener('click', () => {
            closeModal();
            exportPrompts('csv');
        });
    }
}

// Show prompt details in a modal
function showPromptDetails(promptId) {
    const prompt = promptsData.find(p => p.id === parseInt(promptId));
    if (!prompt) {
        showToast('Prompt not found', 'error');
        return;
    }
    
    // Populate modal with prompt details
    const modal = document.getElementById('prompt-detail-modal') || createPromptDetailModal();
    
    // Set modal content
    document.getElementById('modal-prompt-title').textContent = prompt.title;
    document.getElementById('modal-prompt-content').textContent = prompt.content;
    document.getElementById('modal-prompt-category').textContent = prompt.category;
    
    // Set AI model if available
    const aiElement = document.getElementById('modal-prompt-ai');
    if (aiElement) {
        aiElement.textContent = prompt.ai || 'Not specified';
    }
    
    // Set up copy button
    const copyBtn = document.getElementById('modal-copy-btn');
    copyBtn.dataset.promptId = prompt.id;
    copyBtn.addEventListener('click', function() {
        const id = parseInt(this.dataset.promptId);
        copyPromptToClipboard(id);
    });
    
    // Show the modal
    modal.style.display = 'block';
}

// Create modal if it doesn't exist
function createPromptDetailModal() {
    const modal = document.createElement('div');
    modal.id = 'prompt-detail-modal';
    modal.className = 'modal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2 id="modal-prompt-title"></h2>
            <div class="prompt-metadata">
                <span>Category: <span id="modal-prompt-category"></span></span>
                <span>AI: <span id="modal-prompt-ai"></span></span>
            </div>
            <div id="modal-prompt-content"></div>
            <div class="prompt-actions">
                <button id="modal-copy-btn" class="primary-btn">
                    <i class="fas fa-copy"></i> Copy to Clipboard
                </button>
                <button id="modal-edit-btn">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button id="modal-favorite-btn">
                    <i class="far fa-star"></i> Favorite
                </button>
            </div>
        </div>
    `;
    
    // Add close functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Close when clicking outside the modal
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    return modal;
}

// Comment out or remove the setup functions for these features
// function setupDailyPrompt() {
//     const dailyPromptBtn = document.getElementById('daily-prompt-btn');
//     if (dailyPromptBtn) {
//         dailyPromptBtn.addEventListener('click', () => {
//             // Get today's date as string for seed
//             const today = new Date().toISOString().split('T')[0];
//             
//             // Use the date string to create a seeded random number
//             let seed = 0;
//             for (let i = 0; i < today.length; i++) {
//                 seed += today.charCodeAt(i);
//             }
//             
//             // Check if we have prompts
//             if (!promptsData || promptsData.length === 0) {
//                 showToast("No prompts available");
//                 return;
//             }
//             
//             // Use the seed to select a prompt
//             const randomIndex = seed % promptsData.length;
//             const dailyPrompt = promptsData[randomIndex];
//             
//             // Make sure we have a valid prompt before showing details
//             if (dailyPrompt && dailyPrompt.id) {
//                 console.log("Daily prompt selected:", dailyPrompt);
//                 showPromptDetails(dailyPrompt.id);
//             } else {
//                 console.error("Invalid daily prompt:", dailyPrompt);
//                 showToast("Could not load daily prompt");
//             }
//         });
//     }
// }

// function setupCommunityFeatures() {
//     const communityBtn = document.getElementById('community-prompts-btn');
//     if (communityBtn) {
//         communityBtn.addEventListener('click', () => {
//             showCommunityPanel();
//         });
//     } else {
//         console.error('Community prompts button not found');
//     }
// }

// function setupAnalyticsFeatures() {
//     const analyticsBtn = document.getElementById('analytics-btn');
//     if (analyticsBtn) {
//         analyticsBtn.addEventListener('click', () => {
//             showAnalyticsDashboard();
//         });
//     } else {
//         console.error('Analytics button not found');
//     }
// }

// Update the main setup function to remove these feature initializations
function setupModalFunctionality() {
    // Setup modal close buttons
    document.querySelectorAll('.close-modal').forEach(closeBtn => {
        closeBtn.addEventListener('click', closeModal);
    });
    
    // Close modal when clicking outside content
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    });
    
    // Setup export buttons - check if elements exist first
    const exportJsonBtn = document.getElementById('export-json');
    if (exportJsonBtn) {
        exportJsonBtn.addEventListener('click', () => {
            closeModal();
            exportPrompts('json');
        });
    }
    
    const exportCsvBtn = document.getElementById('export-csv');
    if (exportCsvBtn) {
        exportCsvBtn.addEventListener('click', () => {
            closeModal();
            exportPrompts('csv');
        });
    }
}

// Also update any function that calls these setup functions
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the app
    setupModalFunctionality();
    setupFooterLinks();
    
    // Rest of your initialization code...
    
    // Update prompts with highlights flag
    updatePromptsWithHighlights();
}); // Add console command for developers

console.generatePrompts = function(count = 100) {
    return generateBulkPrompts(count);
};

// Add event listeners for About and Help links
function setupFooterLinks() {
    // About link
    const aboutLink = document.getElementById('about-link');
    if (aboutLink) {
        aboutLink.addEventListener('click', function(e) {
            e.preventDefault();
            showModal('About Enterprise AI Prompt Library', `
                <div class="about-content">
                    <p>The Enterprise AI Prompt Library is a curated collection of prompts designed to help professionals get the most out of AI tools.</p>
                    <p>Our library includes prompts for various business needs including writing, coding, marketing, data analysis, and more.</p>
                    <p>Version 1.0.0</p>
                </div>
            `);
        });
    }
    
    // Help link
    const helpLink = document.getElementById('help-link');
    if (helpLink) {
        helpLink.addEventListener('click', function(e) {
            e.preventDefault();
            showModal('Help & FAQ', `
                <div class="help-content">
                    <h3>How to use prompts</h3>
                    <p>Click on any prompt card to view details. Use the copy button to copy the prompt to your clipboard, then paste it into your preferred AI tool.</p>
                    
                    <h3>Customizing prompts</h3>
                    <p>Replace text in [BRACKETS] with your specific information before using the prompt.</p>
                    
                    <h3>Saving favorites</h3>
                    <p>Click the star icon on any prompt to save it to your favorites. Access your favorites by clicking the "Favorites" category.</p>
                </div>
            `);
        });
    }
}

// Show modal with dynamic content
function showModal(title, content) {
    const modal = document.getElementById('prompt-modal');
    if (!modal) {
        console.error('Modal element not found');
        return;
    }
    
    // Set title
    const modalTitle = document.getElementById('modal-title');
    if (modalTitle) {
        modalTitle.textContent = title;
    }
    
    // Set content
    const modalContent = document.getElementById('modal-content');
    if (modalContent) {
        // Clear previous content
        modalContent.innerHTML = '';
        
        // Add new content
        if (typeof content === 'string') {
            modalContent.innerHTML = content;
        } else if (content instanceof Element) {
            modalContent.appendChild(content);
        }
    }
    
    // Show modal
    modal.style.display = 'flex';
}

// Update statistics display
function updateStats() {
    // Calculate usage statistics
    const usageStats = calculateUsageStats();
    
    // Update chart if it exists
    if (window.usageChart) {
        // Update chart data
        window.usageChart.data.labels = usageStats.slice(0, 5).map(item => truncateText(item.title, 12));
        window.usageChart.data.datasets[0].data = usageStats.slice(0, 5).map(item => item.count);
        window.usageChart.update();
    }
    
    // Populate the top prompts list
    populateTopPromptsList(usageStats);
}

// Helper function to truncate text
function truncateText(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

// Add the missing generateBulkPrompts function
function generateBulkPrompts(count) {
    console.log(`Generating ${count} prompts...`);
    
    // Show loading state
    showToast(`Generating ${count} prompts...`, 'info');
    
    // Generate prompts
    setTimeout(() => {
        const newPrompts = [];
        
        for (let i = 0; i < count; i++) {
            const newPrompt = createPromptFromTemplates();
            newPrompts.push(newPrompt);
            
            // Add to promptsData
            promptsData.push(newPrompt);
        }
        
        // Save to localStorage
        localStorage.setItem('customPrompts', JSON.stringify(promptsData));
        
        // Update display and stats
        displayPrompts();
        updateStats();
        
        // Show success message
        showToast(`Successfully generated ${count} new prompts!`, 'success');
        
        console.log(`Generated ${count} prompts. Total prompts: ${promptsData.length}`);
    }, 1000); // Simulate generation time
    
    return true; // For console function
}

// Make sure this is available as a console command
console.generatePrompts = function(count = 100) {
    return generateBulkPrompts(count);
};

// Update displayPrompts to check for highlights
function updatePromptsWithHighlights() {
    promptsData.forEach(prompt => {
        // Check if prompt contains highlights
        prompt.hasHighlights = prompt.content.includes('**') || prompt.content.includes('__');
    });
    
    // Save updated prompts
    localStorage.setItem('customPrompts', JSON.stringify(promptsData));
}

// Call this function on page load
document.addEventListener('DOMContentLoaded', function() {
    // Existing initialization code...
    
    // Update prompts with highlights flag
    updatePromptsWithHighlights();
}); // This closing parenthesis and semicolon should be here

// Add the missing closeModal function
function closeModal() {
    // Close all modals
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}

// Add the missing ratePrompt function
function ratePrompt(event) {
    const promptId = parseInt(event.currentTarget.dataset.prompt);
    const isUpvote = event.currentTarget.classList.contains('rating-up');
    
    // Get current ratings or initialize if not exists
    const ratings = JSON.parse(localStorage.getItem('promptRatings') || '{}');
    
    // Initialize rating for this prompt if not exists
    if (!ratings[promptId]) {
        ratings[promptId] = { up: 0, down: 0, userRating: null };
    }
    
    // Handle user's previous rating
    if (ratings[promptId].userRating === 'up' && isUpvote) {
        // User is removing upvote
        ratings[promptId].up--;
        ratings[promptId].userRating = null;
        event.currentTarget.className = 'far fa-thumbs-up rating-up';
    } else if (ratings[promptId].userRating === 'down' && !isUpvote) {
        // User is removing downvote
        ratings[promptId].down--;
        ratings[promptId].userRating = null;
        event.currentTarget.className = 'far fa-thumbs-down rating-down';
    } else {
        // User is changing vote or voting for first time
        if (ratings[promptId].userRating === 'up' && !isUpvote) {
            // Change from up to down
            ratings[promptId].up--;
            ratings[promptId].down++;
            
            // Update UI for both buttons
            event.currentTarget.className = 'fas fa-thumbs-down rating-down active';
            document.querySelector(`.rating-up[data-prompt="${promptId}"]`).className = 'far fa-thumbs-up rating-up';
        } else if (ratings[promptId].userRating === 'down' && isUpvote) {
            // Change from down to up
            ratings[promptId].down--;
            ratings[promptId].up++;
            
            // Update UI for both buttons
            event.currentTarget.className = 'fas fa-thumbs-up rating-up active';
            document.querySelector(`.rating-down[data-prompt="${promptId}"]`).className = 'far fa-thumbs-down rating-down';
        } else {
            // New vote
            if (isUpvote) {
                ratings[promptId].up++;
                event.currentTarget.className = 'fas fa-thumbs-up rating-up active';
            } else {
                ratings[promptId].down++;
                event.currentTarget.className = 'fas fa-thumbs-down rating-down active';
            }
        }
        
        // Set user rating
        ratings[promptId].userRating = isUpvote ? 'up' : 'down';
    }
    
    // Update rating count display
    const card = event.currentTarget.closest('.prompt-card');
    const ratingCount = card.querySelector('.rating-count');
    ratingCount.textContent = ratings[promptId].up - ratings[promptId].down;
    
    // Save to localStorage
    localStorage.setItem('promptRatings', JSON.stringify(ratings));
    
    // Show toast
    showToast('Rating saved!');
}

// Add the missing sharePrompt function
function sharePrompt(e) {
    if (!e || !e.currentTarget || !e.currentTarget.dataset) {
        console.error('Invalid event or missing dataset in sharePrompt function');
        return;
    }
    
    const promptId = parseInt(e.currentTarget.dataset.prompt);
    if (isNaN(promptId)) {
        console.error('Invalid prompt ID:', e.currentTarget.dataset.prompt);
        return;
    }
    
    const prompt = promptsData.find(p => p.id === promptId);
    
    if (!prompt) {
        console.error('Prompt not found with ID:', promptId);
        showToast('Prompt not found', 'error');
        return;
    }
    
    // Get shared prompts array from localStorage
    let sharedPrompts = JSON.parse(localStorage.getItem('sharedPrompts') || '[]');
    
    // Check if already shared
    if (sharedPrompts.includes(promptId)) {
        // Already shared, do nothing or show message
        showToast('This prompt is already shared');
        return;
    }
    
    // Store the button reference to avoid it becoming null later
    const shareButton = e.currentTarget;
    
    // Simulate sharing to a server
    setTimeout(() => {
        // Add to shared prompts
        sharedPrompts.push(promptId);
        localStorage.setItem('sharedPrompts', JSON.stringify(sharedPrompts));
        
        // Update UI - check if button still exists in DOM
        if (shareButton && shareButton.isConnected) {
            shareButton.innerHTML = '<i class="fas fa-check"></i>';
            shareButton.title = 'Shared';
        } else {
            console.log('Share button no longer in DOM, skipping UI update');
        }
        
        // Show success message
        showToast('Prompt shared successfully!');
    }, 500);
}

// Add the missing calculateUsageStats function
function calculateUsageStats() {
    // Get usage data from localStorage
    const usageData = JSON.parse(localStorage.getItem('promptUsage') || '{}');
    
    // Convert to array for sorting
    const usageArray = [];
    
    // Process each prompt usage
    for (const promptId in usageData) {
        // Find the prompt in promptsData
        const prompt = promptsData.find(p => p.id === parseInt(promptId));
        
        // Only include if prompt exists
        if (prompt) {
            usageArray.push({
                id: parseInt(promptId),
                title: prompt.title,
                category: prompt.category,
                count: usageData[promptId],
                lastUsed: prompt.lastUsed || null
            });
        }
    }
    
    // Sort by usage count (descending)
    usageArray.sort((a, b) => b.count - a.count);
    
    return usageArray;
}

// Add the missing populateTopPromptsList function
function populateTopPromptsList(usageStats) {
    // Get the container element
    const topPromptsList = document.getElementById('top-prompts-list');
    
    // If element doesn't exist, return
    if (!topPromptsList) return;
    
    // Clear existing content
    topPromptsList.innerHTML = '';
    
    // Add top 5 prompts to the list
    usageStats.slice(0, 5).forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span class="prompt-title">${truncateText(item.title, 25)}</span>
            <span class="prompt-usage">${item.count} uses</span>
        `;
        
        // Add click handler to show prompt details
        listItem.addEventListener('click', () => {
            showPromptDetails(item.id);
        });
        
        topPromptsList.appendChild(listItem);
    });
    
    // If no usage data, show message
    if (usageStats.length === 0) {
        const listItem = document.createElement('li');
        listItem.textContent = 'No usage data yet';
        listItem.className = 'no-data';
        topPromptsList.appendChild(listItem);
    }
}

// Add the missing trackPromptUsage function
function trackPromptUsage(promptId) {
    // Get current usage data
    const usageData = JSON.parse(localStorage.getItem('promptUsage') || '{}');
    
    // Increment usage count
    usageData[promptId] = (usageData[promptId] || 0) + 1;
    
    // Save back to localStorage
    localStorage.setItem('promptUsage', JSON.stringify(usageData));
    
    // Update last used timestamp on the prompt
    const promptIndex = promptsData.findIndex(p => p.id === promptId);
    if (promptIndex !== -1) {
        promptsData[promptIndex].lastUsed = new Date().toISOString();
        localStorage.setItem('customPrompts', JSON.stringify(promptsData));
    }
}

// Add the missing addBulkGenerationButton function
function addBulkGenerationButton() {
    // Check if the button already exists
    if (document.getElementById('bulk-generate-btn')) {
        return; // Button already exists, no need to create it again
    }
    
    // Find the container where we want to add the button
    const actionsContainer = document.querySelector('.actions-container');
    if (!actionsContainer) {
        console.error('Actions container not found');
        return;
    }
    
    // Create the bulk generation button
    const bulkButton = document.createElement('button');
    bulkButton.id = 'bulk-generate-btn';
    bulkButton.className = 'secondary-btn';
    bulkButton.innerHTML = '<i class="fas fa-bolt"></i> Bulk Generate';
    bulkButton.title = 'Generate multiple prompts at once';
    
    // Add event listener to the button
    bulkButton.addEventListener('click', function() {
        console.log('Bulk generate button clicked');
        const count = prompt('How many prompts would you like to generate?', '100');
        if (count && !isNaN(count) && parseInt(count) > 0) {
            bulkButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
            bulkButton.disabled = true;
            
            // Use setTimeout to allow UI to update before processing
            setTimeout(() => {
                generateBulkPrompts(parseInt(count));
                bulkButton.innerHTML = '<i class="fas fa-bolt"></i> Bulk Generate';
                bulkButton.disabled = false;
            }, 100);
        }
    });
    
    // Add the button to the container
    // Insert before the export button if it exists
    const exportBtn = document.getElementById('export-btn');
    if (exportBtn) {
        actionsContainer.insertBefore(bulkButton, exportBtn);
    } else {
        actionsContainer.appendChild(bulkButton);
    }
    
    console.log('Bulk generation button added');
}

// Add the missing showToast function
function showToast(message, type = 'success') {
    // Create toast container if it doesn't exist
    let toastContainer = document.getElementById('toast-container');
    
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        document.body.appendChild(toastContainer);
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    // Add icon based on type
    let icon = '';
    switch (type) {
        case 'success':
            icon = '<i class="fas fa-check-circle"></i>';
            break;
        case 'error':
            icon = '<i class="fas fa-exclamation-circle"></i>';
            break;
        case 'info':
            icon = '<i class="fas fa-info-circle"></i>';
            break;
        case 'warning':
            icon = '<i class="fas fa-exclamation-triangle"></i>';
            break;
    }
    
    // Set toast content
    toast.innerHTML = `${icon} <span>${message}</span>`;
    
    // Add to container
    toastContainer.appendChild(toast);
    
    // Show toast with animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
        toast.classList.remove('show');
        
        // Remove from DOM after animation completes
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Add the missing processPromptTemplate function
async function processPromptTemplate(content) {
    // Check if content is a string
    if (typeof content !== 'string') {
        console.error('Invalid content type in processPromptTemplate:', typeof content);
        return content;
    }
    
    console.log('Processing template:', content);
    
    // Create a copy of the content to work with
    let processedContent = content;
    
    // Find all variables in the format {{variable_name}} or [variable_name]
    const variableRegex = /(\{\{([^}]+)\}\})|(\[([^\]]+)\])/g;
    const variables = [];
    let match;
    
    // Collect all unique variables
    while ((match = variableRegex.exec(content)) !== null) {
        const varName = match[2] || match[4]; // Group 2 is {{var}}, group 4 is [var]
        if (!variables.includes(varName)) {
            variables.push(varName);
        }
    }
    
    // If no variables found, return original content
    if (variables.length === 0) {
        return content;
    }
    
    // Process each variable
    for (const variable of variables) {
        // Create a user-friendly variable name by cleaning up special characters
        const friendlyName = variable
            .replace(/_/g, ' ')
            .replace(/\//g, ' or ') // Replace slashes with "or"
            .replace(/[^\w\s]/g, ' ') // Replace other special chars with spaces
            .replace(/\s+/g, ' ') // Replace multiple spaces with single space
            .trim()
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        
        // Prompt user for value
        const value = prompt(`Enter value for ${friendlyName}:`, '');
        
        // Replace all occurrences of the variable
        if (value !== null) { // Only replace if user didn't cancel
            // Escape special characters in the variable name for regex
            const escapedVar = variable.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            
            // Replace both {{variable}} and [variable] formats
            const bracketRegex = new RegExp(`\\[${escapedVar}\\]`, 'g');
            const curlyRegex = new RegExp(`\\{\\{${escapedVar}\\}\\}`, 'g');
            
            processedContent = processedContent
                .replace(bracketRegex, value)
                .replace(curlyRegex, value);
        }
    }
    
    console.log('Processed content:', processedContent);
    return processedContent;
}
