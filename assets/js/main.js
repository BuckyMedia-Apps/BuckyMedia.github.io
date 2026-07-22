(function () {
  var root = document.documentElement;
  var STORAGE_KEY = "buckymedia-theme";
  var themes = ["cream", "night", "forest"];

  function applyTheme(theme) {
    if (theme === "cream") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", theme);
    }
    document.querySelectorAll(".theme-chip").forEach(function (chip) {
      chip.classList.toggle("active", chip.dataset.theme === theme);
    });
  }

  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (err) {
      return null;
    }
  }

  function storeTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (err) {}
  }

  var startTheme = getStoredTheme() || "cream";
  applyTheme(startTheme);

  document.addEventListener("click", function (event) {
    var chip = event.target.closest(".theme-chip");
    if (chip) {
      applyTheme(chip.dataset.theme);
      storeTheme(chip.dataset.theme);
    }
  });

  var themeBtn = document.querySelector(".theme-btn");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var current = root.getAttribute("data-theme") || "cream";
      var next = themes[(themes.indexOf(current) + 1) % themes.length];
      applyTheme(next);
      storeTheme(next);
    });
  }

  var navToggle = document.querySelector(".nav-toggle");
  var mainNav = document.querySelector(".main-nav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      mainNav.classList.toggle("mobile-open");
    });
  }

  var langBtn = document.querySelector(".lang-btn");
  var langPopover = document.querySelector(".lang-popover");
  if (langBtn && langPopover) {
    langBtn.addEventListener("click", function (event) {
      event.stopPropagation();
      langPopover.classList.toggle("open");
    });
    document.addEventListener("click", function (event) {
      if (!langPopover.contains(event.target) && event.target !== langBtn) {
        langPopover.classList.remove("open");
      }
    });
  }

  var revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealItems.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("in");
    });
  }
})();

function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: "en",
      autoDisplay: false,
    },
    "google_translate_element"
  );
}
