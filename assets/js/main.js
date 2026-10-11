/* ==========================================================================
   aaronYTDev's Corner — site script
   No dependencies. Loaded with `defer` on every page.
   - Theme toggle (persisted, respects system preference)
   - Mobile navigation
   - Active nav link highlighting
   - Article reading progress
   - Current year in the footer
   ========================================================================== */
(function () {
  "use strict";

  var root = document.documentElement;
  var STORAGE_KEY = "theme";

  /* --- Theme ------------------------------------------------------------- */
  function preferredTheme() {
    var stored = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch (err) {
      /* storage may be unavailable (private mode) */
    }
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;
    var toggle = document.querySelector(".theme-toggle");
    if (toggle) {
      var next = theme === "dark" ? "light" : "dark";
      toggle.setAttribute("aria-label", "Switch to " + next + " theme");
      toggle.setAttribute("title", "Switch to " + next + " theme");
      toggle.setAttribute("aria-pressed", String(theme === "light"));
    }
  }

  function setTheme(theme, persist) {
    applyTheme(theme);
    if (persist) {
      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch (err) {
        /* ignore */
      }
    }
  }

  applyTheme(root.dataset.theme || preferredTheme());

  document.addEventListener("click", function (event) {
    var toggle = event.target.closest(".theme-toggle");
    if (!toggle) return;
    var next = root.dataset.theme === "dark" ? "light" : "dark";
    setTheme(next, true);
  });

  // Follow the OS only while the visitor has not chosen explicitly.
  if (window.matchMedia) {
    var media = window.matchMedia("(prefers-color-scheme: light)");
    var onSystemChange = function (event) {
      var stored = null;
      try {
        stored = localStorage.getItem(STORAGE_KEY);
      } catch (err) {
        /* ignore */
      }
      if (stored !== "light" && stored !== "dark") {
        applyTheme(event.matches ? "light" : "dark");
      }
    };
    if (media.addEventListener) media.addEventListener("change", onSystemChange);
    else if (media.addListener) media.addListener(onSystemChange);
  }

  /* --- Mobile navigation ------------------------------------------------- */
  var navToggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
    });

    // Close the menu after tapping a link (useful on anchor/one-page flows).
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* --- Active nav link --------------------------------------------------- */
  function normalize(path) {
    path = path.replace(/\/index\.html$/, "/");
    if (path.length > 1) path = path.replace(/\/$/, "");
    return path || "/";
  }

  var current = normalize(window.location.pathname);
  var firstSegment = current.split("/")[1] || "";
  var sectionHome = firstSegment ? "/" + firstSegment : "";
  var links = document.querySelectorAll(".nav__link");
  for (var i = 0; i < links.length; i++) {
    var link = links[i];
    if (link.target === "_blank" || /^[a-z]+:/i.test(link.getAttribute("href") || "")) {
      continue;
    }
    try {
      var url = new URL(link.href, window.location.origin);
      var target = normalize(url.pathname);
      // Exact page match, or the section a nested page lives in.
      if (target === current || (sectionHome && target === sectionHome)) {
        link.setAttribute("aria-current", "page");
      }
    } catch (err) {
      /* ignore malformed hrefs */
    }
  }

  /* --- Reading progress -------------------------------------------------- */
  var progress = document.querySelector(".reading-progress");
  if (progress) {
    var updateProgress = function () {
      var doc = document.documentElement;
      var max = doc.scrollHeight - doc.clientHeight;
      var ratio = max > 0 ? doc.scrollTop / max : 0;
      progress.style.width = Math.min(100, Math.max(0, ratio * 100)) + "%";
    };
    updateProgress();
    document.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
  }

  /* --- Footer year ------------------------------------------------------- */
  var year = String(new Date().getFullYear());
  var slots = document.querySelectorAll("[data-year]");
  for (var j = 0; j < slots.length; j++) slots[j].textContent = year;

  /* --- Article count ----------------------------------------------------- */
  var counter = document.querySelector("[data-article-count]");
  if (counter) {
    var scope = counter.closest("main") || document;
    counter.textContent = String(scope.querySelectorAll(".card").length);
  }

  /* --- "Destroy this page" buttons --------------------------------------- */
  // Point every destroy button at Sprite Fusion's sandbox with this exact
  // page's URL, so it works no matter what domain the site is served from.
  var destroyLinks = document.querySelectorAll(".destroy-page");
  var destroyBase = "https://destroy.spritefusion.com/?url=";
  for (var d = 0; d < destroyLinks.length; d++) {
    destroyLinks[d].href =
      destroyBase + encodeURIComponent(window.location.href);
  }
})();
