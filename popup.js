document.getElementById('scrapeButton').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'scrapeJob' }, (response) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
          document.getElementById('status').textContent = 'Error: Content script not found.';
        } else if (response && response.status === 'Scraping initiated') {
          document.getElementById('status').textContent = 'Scraping in progress...';
        }
      });
    });
  });

document.getElementById('exportButton').addEventListener('click', () => {
    chrome.storage.local.get('jobs', (data) => {
        const jobs = data.jobs || [];

        if (jobs.length === 0) {
            document.getElementById('status').textContent = 'No jobs to export.';
            return;
        }

        const worksheet = XLSX.utils.json_to_sheet(jobs);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Jobs");
        XLSX.writeFile(workbook, "scraped_jobs.xlsx");

        document.getElementById('status').textContent = 'Exported successfully!';
    });
});