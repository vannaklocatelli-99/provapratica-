document.addEventListener("DOMContentLoaded", () => {
  // 1. Gestione responsive del menu Popover su Desktop / Mobile (Soglia a 1000px)
  const navPanel = document.getElementById("navigation-panel") || document.querySelector(".navigation-panel");
  const mediaQuery = window.matchMedia("(min-width: 1000px)");

  function handleDesktopPopover(e) {
    if (!navPanel) return;
    
    if (e.matches) {
      // Su Desktop rimuove l'attributo popover
      navPanel.removeAttribute("popover");
    } else {
      // Su Mobile lo ripristina
      navPanel.setAttribute("popover", "auto");
    }
  }

  handleDesktopPopover(mediaQuery);
  mediaQuery.addEventListener("change", handleDesktopPopover);

  // 2. Scroll fluido e chiusura menu per le voci dei capitoli (#concept, #sitemap, ecc.)
  const menuLinks = document.querySelectorAll(".navigation-panel a[href^='#']");

  menuLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");

      if (targetId && targetId !== "#") {
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          e.preventDefault();

          // Chiude il popover su mobile dopo il click
          if (navPanel && navPanel.hidePopover) {
            try {
              navPanel.hidePopover();
            } catch (err) {
              // Ignora se non è aperto come popover su desktop
            }
          }

          // Scorrimento fluido verso la sezione corrispondente (corretto il refuso)
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      }
    });
  });

  // 3. Scroll fluido per il tasto "Torna all'inizio"
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

  // 4. Gestione interattiva per BreakdownTabs (Cambio immagini e stato al click)
  const tabItems = document.querySelectorAll(".breakdownTabs-item");
  const tabButtons = document.querySelectorAll(".breakdownTabs-button");

  tabButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      // Rimuove la classe di selezione da tutti gli elementi
      tabItems.forEach(item => item.classList.remove("is-selected"));
      
      // La aggiunge solo all'elemento cliccato (attivando così l'immagine corrispondente via CSS)
      if (tabItems[index]) {
        tabItems[index].classList.add("is-selected");
      }
    });
  });
});