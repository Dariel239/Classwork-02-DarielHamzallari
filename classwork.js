const API_CONFIG = {
    url: 'https://famous-quotes4.p.rapidapi.com/random',
    headers: {
        'X-RapidAPI-Key': 'cf9f6dbc88msh151bdd354251023p18ed84jsn924d96bcbe1b',
        'X-RapidAPI-Host': 'famous-quotes4.p.rapidapi.com'
    }
};

// Show/hide input field based on search type
document.getElementById('searchType').addEventListener('change', function() {
    const searchValue = document.getElementById('searchValue');
    if (this.value === 'random') {
        searchValue.style.display = 'none';
        searchValue.value = '';
    } else {
        searchValue.style.display = 'inline-block';
        searchValue.placeholder = this.value === 'category' ? 'Enter category (e.g., love, war, hope)...' : 'Enter author name...';
    }
});

async function searchQuote() {
    const quoteText = document.getElementById('quoteText');
    const quoteAuthor = document.getElementById('quoteAuthor');
    const quoteCategory = document.getElementById('quoteCategory');
    const searchType = document.getElementById('searchType').value;
    const searchValue = document.getElementById('searchValue').value;
    
    quoteText.textContent = 'Searching...';
    quoteAuthor.textContent = '';
    quoteCategory.textContent = '';
    
    try {
        let url;
        
        // Build URL based on search type
        if (searchType === 'random') {
            url = 'https://famous-quotes4.p.rapidapi.com/random';
        } else if (searchType === 'category') {
            if (!searchValue) {
                alert('Please enter a category!');
                return;
            }
            url = `https://famous-quotes4.p.rapidapi.com/random?category=${encodeURIComponent(searchValue.toLowerCase())}`;
        } else if (searchType === 'author') {
            if (!searchValue) {
                alert('Please enter an author name!');
                return;
            }
            authorUrl = `https://famous-quotes4.p.rapidapi.com/api/v1/quotes/${encodeURIComponent(searchValue)}`;
        }
        
        const response = await fetch(url, {
            method: 'GET',
            headers: API_CONFIG.headers
        });
        
        if (!response.ok) {
            if (response.status === 429) {
                throw new Error('API limit reached. Please try again later.');
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        let data = await response.json();
        
        if (typeof data === 'string') {
            data = JSON.parse(data);
        }

        let quote;
        if (Array.isArray(data)) {
            if (data.length === 0) {
                throw new Error(`No quotes found for ${searchType}: ${searchValue}`);
            }
            quote = data[0];
        } else {
            quote = data;
        }
        
        // Check if quote matches search (API might return random if none found)
        if (searchType === 'category' && quote.category.toLowerCase() !== searchValue.toLowerCase()) {
            quoteText.textContent = `No quotes found for category "${searchValue}". Try a different category.`;
            quoteAuthor.textContent = '';
            quoteCategory.textContent = '';
            return;
        }
        
        if (searchType === 'author' && !quote.author.toLowerCase().includes(searchValue.toLowerCase())) {
            quoteText.textContent = `No quotes found for author "${searchValue}". Try a different author name.`;
            quoteAuthor.textContent = '';
            quoteCategory.textContent = '';
            return;
        }
        
        quoteText.textContent = `"${quote.text}"`;
        quoteAuthor.textContent = quote.author;
        
        let categoryText = String(quote.category);
        quoteCategory.textContent = categoryText.charAt(0).toUpperCase() + categoryText.slice(1);
        
    } catch (error) {
        console.error('Error:', error);
        quoteText.innerHTML = `<span class="error">${error.message}</span>`;
        quoteAuthor.textContent = 'Error';
        quoteCategory.textContent = '';
    }
}

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('searchType').value = 'random';
    document.getElementById('searchValue').style.display = 'none';
    searchQuote();
});
