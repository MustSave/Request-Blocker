document.addEventListener('DOMContentLoaded', function() {
    // Load blocked URLs from storage
    let blockedUrls = JSON.parse(localStorage.getItem('blockedUrls')) || [];
    let blockedUrlsList = document.getElementById('blockedUrlsList');
  
    // Display blocked URLs
    blockedUrls.forEach(url => {
      addUrlToList(url);
    });
  
    // Handle form submission to add URL
    document.getElementById('addUrlForm').addEventListener('submit', function(event) {
      event.preventDefault();
      let urlInput = document.getElementById('urlInput');
      let url = urlInput.value.trim();
      if (url) {
        blockedUrls.push(url);
        localStorage.setItem('blockedUrls', JSON.stringify(blockedUrls));
        addUrlToList(url);
        urlInput.value = '';
      }
    });
  
    // Handle click event to delete URL
    blockedUrlsList.addEventListener('click', function(event) {
      if (event.target.classList.contains('delete-btn')) {
        let listItem = event.target.parentElement;
        let urlToRemove = listItem.dataset.url;
        blockedUrls = blockedUrls.filter(url => url !== urlToRemove);
        localStorage.setItem('blockedUrls', JSON.stringify(blockedUrls));
        listItem.remove();
      }
    });
  
    // Function to add URL to the list
    function addUrlToList(url) {
      let li = document.createElement('li');
      li.dataset.url = url;
      li.innerHTML = `
        <span class="url-regex">${url}</span>
        <button class="delete-btn">Delete</button>
      `;
      blockedUrlsList.appendChild(li);
    }
  });
  