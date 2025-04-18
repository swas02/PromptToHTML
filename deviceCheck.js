  const currentPath = window.location.pathname.replace(/\/+$/, '');
  const deviceWidth = window.innerWidth;

  const isMobile = deviceWidth <= 720;
  const desktopPath = '/PromptToHTML';
  const mobilePath = '/PromptToHTML/m.html';

  if (currentPath === desktopPath || currentPath === mobilePath) {
    if (isMobile && currentPath !== mobilePath) {
      window.location.href = mobilePath;
    } else if (!isMobile && currentPath !== desktopPath) {
      window.location.href = desktopPath;
    }
  }
