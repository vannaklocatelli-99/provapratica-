document.addEventListener("DOMContentLoaded", () => {
  // 1. Gestione responsive del menu Popover su Desktop / Mobile
  const navPanel = document.querySelector(".navigation-panel");
  const mediaQuery = window.matchMedia("(min-width: 63.25rem)");

  function handleDesktopPopover(e) {
    if (!navPanel) return;
    
    if (e.matches) {
      navPanel.removeAttribute("popover");
    } else {
      navPanel.setAttribute("popover", "auto");
    }
  }

  handleDesktopPopover(mediaQuery);
  mediaQuery.addEventListener("change", handleDesktopPopover);

  // 2. Scroll fluido per il tasto "Torna all'inizio"
  const backToTopBtn = document.querySelector(".footer-back-to-top");
  
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
});