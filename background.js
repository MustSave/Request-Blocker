chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      if (isBlocked(details.url)) {
        return { cancel: true };
      }
    },
    { urls: ["<all_urls>"] },
    ["blocking"]
);
  
function isBlocked(url) {
    // Retrieve blocked URLs from storage
    let blockedUrls = JSON.parse(localStorage.getItem('blockedUrls')) || [];
    return blockedUrls.some(blockedUrl => {
      let regex = new RegExp(blockedUrl, "i");
      return regex.test(url);
    });
  }
