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
    
    quoteText.textContent = 'Loading...';
    
    try {
        const response = await fetch(API_CONFIG.url, {
            method: 'GET',
            headers: API_CONFIG.headers
        });
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        
        if (data.text && data.author) {
            quoteText.textContent = `"${data.text}"`;
            quoteAuthor.textContent = data.author;
        } else {
            quoteText.textContent = `"${data.quote || JSON.stringify(data)}"`;
            quoteAuthor.textContent = data.author || 'Anonymous';
        }
        
    } catch (error) {
        console.error('Error:', error);
        quoteText.innerHTML = '<span class="error">Failed to fetch quote. Check API key.</span>';
        quoteAuthor.textContent = 'Error';
    }
}

// Fetch quote when page loads
window.addEventListener('DOMContentLoaded', fetchQuote);
