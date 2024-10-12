chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'saveJob') {
      chrome.storage.local.get('jobs', (data) => {
        const jobs = data.jobs || [];
        jobs.push(request.jobDetails);
        chrome.storage.local.set({ jobs }, () => {
          console.log('Job details saved:', request.jobDetails);
          sendResponse({ success: true });
        });
      });
      return true; // Indicates async response
    }
  });