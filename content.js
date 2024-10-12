console.log('Content script is loaded.');
function scrapeJobDetails() {
    let title = '';
    let company = '';
    let description = '';

    // Try multiple selectors for job title
    const titleSelectors = ['h1.job-title', 'h2.job-title', '.job-card h2', 'h1', 'h2'];
    for (const selector of titleSelectors) {
        const element = document.querySelector(selector);
        if (element) {
            title = element.textContent.trim();
            break;
        }
    }

    // Try multiple selectors for company name
    const companySelectors = ['.company-name', '.job-company', 'span.company', 'b', 'strong'];
    for (const selector of companySelectors) {
        const element = document.querySelector(selector);
        if (element) {
            company = element.textContent.trim();
            break;
        }
    }

    // Try multiple selectors for job description
    const descriptionSelectors = ['.job-description', '.description', 'p.details', 'div.details'];
    for (const selector of descriptionSelectors) {
        const element = document.querySelector(selector);
        if (element) {
            description = element.textContent.trim();
            break;
        }
    }

    return { title, company, description };
}

function fallbackScrape() {
    const fullText = document.body.innerText;
    const lines = fullText.split('\n').filter(line => line.trim() !== '');

    // Assume the first non-empty line is the title
    const title = lines[0] || '';

    // Look for common company indicators
    const companyIndicators = ['at', 'by', 'for', 'company:'];
    let company = '';
    for (const line of lines) {
        for (const indicator of companyIndicators) {
            if (line.toLowerCase().includes(indicator)) {
                company = line.split(indicator)[1].trim();
                break;
            }
        }
        if (company) break;
    }

    // Assume the rest is the description
    const description = lines.slice(2).join(' ');

    return { title, company, description };
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'scrapeJob') {
        console.log('Scraping initiated.');
        let jobDetails = scrapeJobDetails();
        console.log(jobDetails);
        // If primary scraping method fails, use fallback method
        if (!jobDetails.title && !jobDetails.company && !jobDetails.description) {
            jobDetails = fallbackScrape();
        }

        // Send job details to background script for storage
        chrome.runtime.sendMessage({ action: 'saveJob', jobDetails }, (response) => {
            if (response.success) {
                console.log('Job details saved successfully.');
            }
        });

        sendResponse(jobDetails);
    }
});