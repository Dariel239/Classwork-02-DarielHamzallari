const API_CONFIG = {
    url: 'https://famous-quotes4.p.rapidapi.com/random',
    headers: {
        'X-RapidAPI-Key': 'cf9f6dbc88msh151bdd354251023p18ed84jsn924d96bcbe1b',
        'X-RapidAPI-Host': 'famous-quotes4.p.rapidapi.com'
    }
};

async function fetchQuote() {
    const quoteText = document.getElementById('quoteText');
    const quoteAuthor = document.getElementById('quoteAuthor');
    const quoteCategory = document.getElementById('quoteCategory');
    
    quoteText.textContent = 'Loading...';
    quoteAuthor.textContent = '';
    if (quoteCategory) quoteCategory.textContent = '';
    
    try {
        const response = await fetch(API_CONFIG.url, {
            method: 'GET',
            headers: API_CONFIG.headers
        });
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        if (typeof data === 'string') {
            data = JSON.parse(data);
        }   
        
        let quote;
        if (Array.isArray(data)) {
            quote = data[0];
        } else {
            quote = data;
        }
        
        if (quote.text && quote.author) {
            quoteText.textContent = `"${quote.text}"`;
            quoteAuthor.textContent = quote.author;
            if (quote.category) {
                if (quoteCategory) quoteCategory.textContent = quote.category;
            }
        } else {
            quoteText.textContent = `"${quote.quote || JSON.stringify(quote)}"`;
            quoteAuthor.textContent = quote.author || 'Anonymous';
            if (quote.category && quoteCategory) {
                quoteCategory.textContent = quote.category;
            }
        }
        
    } catch (error) {
        console.error('Error:', error);
        quoteText.innerHTML = '<span class="error">Failed to fetch quote. Check API key.</span>';
        quoteAuthor.textContent = 'Error';
        if (quoteCategory) quoteCategory.textContent = '';
    }
}

// Fetch quote when page loads
window.addEventListener('DOMContentLoaded', fetchQuote);
