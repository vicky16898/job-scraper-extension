# Job Description Scraper

A Chrome extension that scrapes job descriptions from job boards and exports them as an Excel file.

## Features
- Scrapes job title, company name, and job description from job boards.
- Allows users to scrape multiple job postings.
- Exports scraped job data to an Excel file.

## Installation

### 1. Clone or download the project
```bash
git clone https://github.com/your-username/job-description-scraper.git
```

### 2. Load the Extension in Chrome:
1. Open Chrome and go to `chrome://extensions/`.
2. Enable **"Developer mode"** in the top right corner.
3. Click **"Load unpacked"**.
4. Select the folder where this project is located.

## Usage

### 1. Navigate to a Job Posting
Go to a job posting page on the target website (e.g., `https://wing.com/careers/*`).

### 2. Scrape Job Details
1. Click the extension icon in the Chrome toolbar to open the popup.
2. Click **"Scrape This Job"** to scrape the job title, company, and description.
3. The job details will be stored locally.

### 3. Scrape Multiple Job Postings
You can navigate to multiple job postings and repeat the scraping process by clicking **"Scrape This Job"** on each one. The details will accumulate in storage.

### 4. Export Job Details to Excel
Once you have scraped all the job postings, click **"Export to Excel"** to download an Excel file (`scraped_jobs.xlsx`) containing the details of all the jobs you've scraped.

## Development

### Content Scripts
The content script uses different selectors to scrape the job title, company, and description from the page.

### Background Script
The background script stores the scraped job details in Chrome's local storage and ensures jobs are saved across different sessions.

### Popup Script
The popup script allows users to trigger scraping and export the stored jobs as an Excel file.

### Manifest
This extension uses **Manifest Version 3** and relies on the following permissions:
- `activeTab`: To interact with the currently active tab.
- `storage`: To store and retrieve job details.

## License

[MIT](LICENSE)
