window.addEventListener('load', function() {
    const currentPage = window.location.pathname;
  
    // Get the window width
    const deviceWidth = window.innerWidth;
  
    // Check if the current page is the homepage (/) or m.html
    if (currentPage === '/PromptToHTML' || currentPage === 'PromptToHTML/m.html') {
      // If the window width is less than or equal to 540px (mobile)
      if (deviceWidth <= 540) {
        // Redirect to m.html if not already there
        if (currentPage !== 'PromptToHTML/m.html') {
          window.location.href = "PromptToHTML/m.html";
        }
      }
      // If the window width is greater than 768px (desktop)
      else if (deviceWidth > 540) {
        // Redirect to index.html (/) if not already there
        if (currentPage !== '/PromptToHTML') {
          window.location.href = "/PromptToHTML";
        }
      }
    }
  });
  