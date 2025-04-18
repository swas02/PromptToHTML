window.addEventListener('load', function() {
    const currentPage = window.location.pathname;
  
    // Get the window width
    const deviceWidth = window.innerWidth;
  
    // Check if the current page is the homepage (/) or m.html
    if (currentPage === '/' || currentPage === '/m.html') {
      // If the window width is less than or equal to 540px (mobile)
      if (deviceWidth <= 540) {
        // Redirect to m.html if not already there
        if (currentPage !== '/m.html') {
          window.location.href = "/m.html";
        }
      }
      // If the window width is between 541px and 768px (tablet)
      else if (deviceWidth > 540 && deviceWidth <= 768) {
        // You can choose to do something specific for tablets if needed
        // Currently, it doesn't redirect, but you can add actions for tablet
        console.log('Device is in tablet range: ', deviceWidth);
      }
      // If the window width is greater than 768px (desktop)
      else if (deviceWidth > 768) {
        // Redirect to index.html (/) if not already there
        if (currentPage !== '/') {
          window.location.href = "/";
        }
      }
    }
  });
  