/* ============ SHARED SITE HEADER ============
   Injects the navbar + mobile menu on every page, so the menu is edited in ONE place.
   Usage on each page:
     <div id="site-header"></div>            (add data-nav="solid" on pages with no hero image)
     <script src="nav.js"></script>
   Labels/structure mirror https://supremetanzaniasafaris.com/ */
(function () {
  const host = document.getElementById("site-header");
  if (!host) return;
  const solidPage = host.dataset.nav === "solid";

  const LOGO = "images/site/STSlogotransparentbackground-2.png";
  const BROCHURE = "files/STS-Brochure.pdf";
  const PHONE_DISPLAY = "+255 767 201 113";
  const PHONE_TEL = "+255767201113";

  /* Languages offered (same seven as the old site). "gt" is Google Translate's code (Hebrew = iw). */
  const LANGS = [
    { code: "en", gt: "en", label: "English",  short: "EN" },
    { code: "fr", gt: "fr", label: "Français", short: "FR" },
    { code: "de", gt: "de", label: "Deutsch",  short: "DE" },
    { code: "he", gt: "iw", label: "עברית",    short: "HE" },
    { code: "it", gt: "it", label: "Italiano", short: "IT" },
    { code: "ru", gt: "ru", label: "Русский",  short: "RU" },
    { code: "es", gt: "es", label: "Español",  short: "ES" },
  ];

  const slug = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + ".html";
  const kiliRoutes = [
    "8 Days Northern Circuit Route", "9 Days Northern Circuit Route",
    "6 Days Rongai Route", "7 Days Rongai Route",
    "7 Days Machame Route", "6 Days Machame Route",
    "6 Days Umbwe Route", "7 Days Umbwe Route",
    "5 Days Marangu Route", "6 Days Kili Marangu Route",
    "8 Days Lemosho Route", "7 Days Lemosho Route", "9 Days Lemosho Route",
  ].map((label) => ({ label, href: slug(label) }));

  const NAV = [
    { label: "Home", href: "index.html" },
    { label: "About", href: "about-us.html" },
    { label: "Safaris", href: "safaris.html" },
    {
      label: "Treks", href: "treks.html",
      children: [
        { label: "Kilimanjaro Trekking", href: "kilimanjaro.html", children: kiliRoutes },
        { label: "Mount Meru Trekking", href: "mount-meru.html" },
        { label: "Mount Ol doinyo Lengai", href: "ol-doinyo-lengai.html" },
      ],
    },
    {
      label: "Zanzibar", href: "zanzibar.html",
      children: [
        { label: "Pangani Town", href: "pangani-town.html" },
        { label: "Mafia Island Marine Park", href: "mafia-island.html" },
      ],
    },
    { label: "Volunteer", href: "volunteer.html" },
    { label: "Contact", href: "contact.html" },
  ];

  const current = location.pathname.split("/").pop() || "index.html";
  const isActive = (item) => item.href === current || (item.children || []).some(isActive);

  /* ---------- desktop ---------- */
  const linkBase = "px-3 xl:px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105";
  const activeCls = "underline decoration-2 underline-offset-8";

  function flyoutItem(item) {
    if (!item.children) {
      return `<li><a href="${item.href}" class="block px-4 py-2 text-sm hover:bg-savanna-50 hover:text-savanna-700 transition-colors ${isActive(item) ? "text-savanna-700 font-semibold" : ""}">${item.label}</a></li>`;
    }
    return `
      <li class="relative group/sub">
        <a href="${item.href}" class="flex items-center justify-between gap-3 px-4 py-2 text-sm hover:bg-savanna-50 hover:text-savanna-700 transition-colors ${isActive(item) ? "text-savanna-700 font-semibold" : ""}">
          ${item.label}<i data-lucide="chevron-right" class="h-3.5 w-3.5"></i>
        </a>
        <div class="absolute left-full top-0 pl-2 min-w-[16rem] invisible opacity-0 transition-all duration-200 group-hover/sub:visible group-hover/sub:opacity-100 group-focus-within/sub:visible group-focus-within/sub:opacity-100">
          <ul class="bg-white rounded-2xl shadow-2xl border border-sand-100 py-2 text-sand-700 max-h-[75vh] overflow-y-auto">
            ${item.children.map(flyoutItem).join("")}
          </ul>
        </div>
      </li>`;
  }

  function desktopItem(item) {
    const act = isActive(item) ? activeCls : "";
    if (!item.children) {
      return `<li><a href="${item.href}" data-tone="link" class="nav-link ${linkBase} text-white/90 hover:bg-white/15 hover:text-white ${act}">${item.label}</a></li>`;
    }
    return `
      <li class="relative group">
        <a href="${item.href}" data-tone="link" class="nav-link ${linkBase} inline-flex items-center gap-1 text-white/90 hover:bg-white/15 hover:text-white ${act}">
          ${item.label}<i data-lucide="chevron-down" class="h-3.5 w-3.5"></i>
        </a>
        <div class="absolute left-0 top-full pt-3 min-w-[16rem] invisible opacity-0 translate-y-1 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0">
          <ul class="bg-white rounded-2xl shadow-2xl border border-sand-100 py-2 text-sand-700">
            ${item.children.map(flyoutItem).join("")}
          </ul>
        </div>
      </li>`;
  }

  /* ---------- mobile ---------- */
  function mobileItem(item, depth) {
    const size = depth ? "text-[15px] py-2.5" : "text-base py-3.5";
    const act = isActive(item) ? "bg-savanna-50 text-savanna-700" : "text-sand-700";
    const link = `<a href="${item.href}" class="mobile-nav-link ${item.children ? "flex-1" : "block"} px-4 ${size} rounded-xl font-medium ${act} hover:bg-savanna-50 hover:text-savanna-700 transition-colors">${item.label}</a>`;
    if (!item.children) return `<li>${link}</li>`;
    return `
      <li>
        <div class="flex items-center">
          ${link}
          <button type="button" data-accordion aria-expanded="false" aria-label="Show ${item.label} submenu" class="flex items-center justify-center h-11 w-11 rounded-xl text-sand-700 hover:bg-savanna-50">
            <span class="chev inline-flex transition-transform duration-200"><i data-lucide="chevron-down" class="h-5 w-5"></i></span>
          </button>
        </div>
        <ul class="hidden ml-4 pl-3 mt-1 border-l-2 border-sand-200 space-y-0.5">
          ${item.children.map((c) => mobileItem(c, depth + 1)).join("")}
        </ul>
      </li>`;
  }

  /* ---------- markup ---------- */
  const html = `
<header id="navbar" class="fixed top-0 left-0 right-0 z-40 transition-all duration-500 bg-transparent py-4">
  <nav class="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
    <a href="index.html" class="flex items-center shrink-0" aria-label="Supreme Tanzania Safaris - Home">
      <span id="navLogoWrap" translate="no" class="bg-white/90 rounded-xl px-2.5 py-1 shadow-sm">
        <img id="navLogoImg" src="${LOGO}" alt="Supreme Tanzania Safaris" class="h-10 sm:h-12 w-auto" />
      </span>
    </a>

    <ul class="hidden lg:flex items-center gap-0.5" id="navLinks">
      ${NAV.map(desktopItem).join("")}
    </ul>

    <div class="hidden lg:flex items-center gap-2 shrink-0">
      <div id="langWrap" class="relative" translate="no">
        <button id="langBtn" type="button" data-tone="ghost" aria-haspopup="true" aria-expanded="false" title="Language" class="inline-flex items-center gap-1.5 rounded-full border-2 px-3 py-1.5 text-sm font-semibold transition-colors border-white/70 text-white hover:bg-white/15">
          <i data-lucide="globe" class="h-4 w-4"></i><span id="langCurrent">EN</span><i data-lucide="chevron-down" class="h-3.5 w-3.5"></i>
        </button>
        <ul id="langMenu" class="hidden absolute right-0 top-full mt-2 min-w-[11rem] bg-white rounded-2xl shadow-2xl border border-sand-100 py-2 text-sand-700 z-50">
          ${LANGS.map((l) => `<li><button type="button" data-lang="${l.code}" class="flex w-full items-center justify-between gap-4 px-4 py-2 text-sm hover:bg-savanna-50 hover:text-savanna-700 transition-colors"><span>${l.label}</span><span class="text-xs text-sand-400">${l.short}</span></button></li>`).join("")}
        </ul>
      </div>
      <a href="${BROCHURE}" target="_blank" rel="noopener noreferrer" data-tone="ghost" class="inline-flex items-center gap-1.5 rounded-full border-2 px-3 py-1.5 text-sm font-semibold transition-colors border-white/70 text-white hover:bg-white/15" title="Download Brochure">
        <i data-lucide="download" class="h-4 w-4"></i><span class="hidden xl:inline">Brochure</span>
      </a>
      <a href="booking.html" data-tone="cta" class="inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-lg px-4 py-2 text-sm bg-white/95 hover:bg-white text-savanna-700">Start Planning</a>
    </div>

    <button id="menuOpenBtn" data-tone="menu" class="lg:hidden flex items-center justify-center h-10 w-10 rounded-lg transition-colors text-white hover:bg-white/15" aria-label="Open menu">
      <i data-lucide="menu" class="h-6 w-6"></i>
    </button>
  </nav>
</header>

<div id="mobileMenuWrap" class="fixed inset-0 z-50 lg:hidden transition-all duration-300 invisible opacity-0">
  <div id="mobileMenuBackdrop" class="absolute inset-0 bg-savanna-900/60 backdrop-blur-sm"></div>
  <div id="mobileMenuPanel" class="absolute right-0 top-0 h-full w-[82%] max-w-sm bg-sand-50 shadow-2xl flex flex-col transition-transform duration-400 translate-x-full">
    <div class="flex items-center justify-between px-5 py-4 border-b border-sand-200">
      <span class="font-display text-xl font-bold text-savanna-800">Menu</span>
      <button id="menuCloseBtn" class="flex items-center justify-center h-10 w-10 rounded-lg text-savanna-700 hover:bg-sand-100" aria-label="Close menu">
        <i data-lucide="x" class="h-6 w-6"></i>
      </button>
    </div>
    <ul class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
      ${NAV.map((i) => mobileItem(i, 0)).join("")}
    </ul>
    <div class="px-5 pt-4 pb-1 border-t border-sand-200" translate="no">
      <p class="mb-2 text-xs font-semibold uppercase tracking-wide text-sand-500">Language</p>
      <div class="flex flex-wrap gap-2">
        ${LANGS.map((l) => `<button type="button" data-lang="${l.code}" class="lang-chip rounded-full border border-sand-300 px-3 py-1.5 text-sm font-semibold text-sand-700 hover:bg-savanna-50">${l.short}</button>`).join("")}
      </div>
    </div>
    <div class="px-5 py-5 border-t border-sand-200 space-y-3">
      <a href="booking.html" class="mobile-nav-link inline-flex items-center justify-center rounded-full font-semibold bg-savanna-600 hover:bg-savanna-700 text-white shadow-lg px-6 py-3 text-base w-full transition-colors">Start Planning</a>
      <a href="${BROCHURE}" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-full border-2 border-savanna-600 text-savanna-700 font-semibold text-sm">
        <i data-lucide="download" class="h-4 w-4"></i>Download Brochure
      </a>
      <a href="tel:${PHONE_TEL}" class="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-full border-2 border-sand-300 text-sand-700 font-semibold text-sm">
        <i data-lucide="phone" class="h-4 w-4"></i>${PHONE_DISPLAY}
      </a>
    </div>
  </div>
</div>`;

  host.insertAdjacentHTML("afterend", html);
  host.remove();

  /* If the logo image cannot load, show the company name as text instead */
  const logoImg = document.getElementById("navLogoImg");
  const showNameText = () => {
    document.getElementById("navLogoWrap").innerHTML =
      '<span class="flex flex-col leading-none text-center text-[#0b0b0b]">' +
      '<span class="font-display text-xl sm:text-2xl font-extrabold tracking-wide">SUPREME</span>' +
      '<span class="text-[9px] sm:text-[10px] font-bold tracking-[0.28em] mt-1">TANZANIA SAFARIS</span></span>';
  };
  logoImg.addEventListener("error", showNameText);
  if (logoImg.complete && logoImg.naturalWidth === 0) showNameText();

  /* ---------- behaviour ---------- */
  const header = document.getElementById("navbar");
  const TONES = {
    link:  [["text-white/90", "hover:bg-white/15", "hover:text-white"], ["text-sand-700", "hover:bg-sand-100", "hover:text-savanna-700"]],
    ghost: [["border-white/70", "text-white", "hover:bg-white/15"], ["border-savanna-600", "text-savanna-700", "hover:bg-savanna-50"]],
    cta:   [["bg-white/95", "hover:bg-white", "text-savanna-700"], ["bg-savanna-600", "hover:bg-savanna-700", "text-white"]],
    menu:  [["text-white", "hover:bg-white/15"], ["text-savanna-800", "hover:bg-sand-100"]],
  };

  function applyState(solid) {
    header.classList.toggle("bg-transparent", !solid);
    header.classList.toggle("py-4", !solid);
    ["bg-sand-50/95", "backdrop-blur-md", "shadow-md", "py-2"].forEach((c) => header.classList.toggle(c, solid));
    header.querySelectorAll("[data-tone]").forEach((el) => {
      const [light, dark] = TONES[el.dataset.tone];
      el.classList.remove(...(solid ? light : dark));
      el.classList.add(...(solid ? dark : light));
    });
  }
  const onScroll = () => applyState(solidPage || window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const wrap = document.getElementById("mobileMenuWrap");
  const panel = document.getElementById("mobileMenuPanel");
  const open = () => {
    wrap.classList.remove("invisible", "opacity-0");
    wrap.classList.add("visible", "opacity-100");
    panel.classList.remove("translate-x-full");
    panel.classList.add("translate-x-0");
    document.body.style.overflow = "hidden";
  };
  const close = () => {
    wrap.classList.add("invisible", "opacity-0");
    wrap.classList.remove("visible", "opacity-100");
    panel.classList.add("translate-x-full");
    panel.classList.remove("translate-x-0");
    document.body.style.overflow = "";
  };
  document.getElementById("menuOpenBtn").addEventListener("click", open);
  document.getElementById("menuCloseBtn").addEventListener("click", close);
  document.getElementById("mobileMenuBackdrop").addEventListener("click", close);
  wrap.querySelectorAll(".mobile-nav-link").forEach((l) => l.addEventListener("click", close));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });

  wrap.querySelectorAll("[data-accordion]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const sub = btn.closest("li").querySelector(":scope > ul");
      const show = sub.classList.toggle("hidden") === false;
      btn.setAttribute("aria-expanded", String(show));
      btn.querySelector(".chev").classList.toggle("rotate-180", show);
    });
  });

  /* ---------- language switcher (uses Google Translate; the choice is remembered on every page) ---------- */
  const gtCookie = () => {
    const m = document.cookie.match(/(?:^|;\s*)googtrans=\/[^/]*\/([^;]+)/);
    return m ? decodeURIComponent(m[1]) : "en";
  };
  const currentLang = (LANGS.find((l) => l.gt === gtCookie()) || LANGS[0]).code;

  function writeCookie(value, expires) {
    const host = location.hostname;
    const parts = ["googtrans=" + value, "path=/"];
    if (expires) parts.push("expires=Thu, 01 Jan 1970 00:00:00 GMT");
    const base = parts.join("; ");
    document.cookie = base;
    if (host.indexOf(".") > -1) {
      document.cookie = base + "; domain=" + host;
      document.cookie = base + "; domain=." + host.replace(/^www\./, "");
    }
  }
  function chooseLang(code) {
    const l = LANGS.find((x) => x.code === code);
    if (!l || code === currentLang) return;
    if (code === "en") writeCookie("/en/en", true); else writeCookie("/en/" + l.gt, false);
    location.reload();
  }

  /* hide Google's own banner and highlights so only our switcher shows */
  const gtStyle = document.createElement("style");
  gtStyle.textContent =
    ".goog-te-banner-frame,.goog-te-balloon-frame,#goog-gt-tt,.goog-tooltip,.goog-te-gadget-icon,iframe.skiptranslate{display:none!important}" +
    "body{top:0!important}.goog-text-highlight{background:none!important;box-shadow:none!important}" +
    "#google_translate_element{position:absolute;left:-9999px;top:0}";
  document.head.appendChild(gtStyle);

  document.getElementById("langCurrent").textContent = (LANGS.find((l) => l.code === currentLang) || LANGS[0]).short;
  document.querySelectorAll(".lang-chip").forEach((c) => {
    if (c.dataset.lang === currentLang) c.classList.add("bg-savanna-600", "text-white", "border-savanna-600");
  });

  const langBtn = document.getElementById("langBtn");
  const langMenu = document.getElementById("langMenu");
  const toggleLangMenu = (show) => {
    langMenu.classList.toggle("hidden", !show);
    langBtn.setAttribute("aria-expanded", String(show));
  };
  langBtn.addEventListener("click", (e) => { e.stopPropagation(); toggleLangMenu(langMenu.classList.contains("hidden")); });
  document.addEventListener("click", () => toggleLangMenu(false));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") toggleLangMenu(false); });
  document.querySelectorAll("[data-lang]").forEach((b) => b.addEventListener("click", () => chooseLang(b.dataset.lang)));

  /* only load Google Translate when a non-English language is chosen */
  if (currentLang !== "en") {
    const holder = document.createElement("div");
    holder.id = "google_translate_element";
    document.body.appendChild(holder);
    window.googleTranslateElementInit = () => {
      new google.translate.TranslateElement(
        { pageLanguage: "en", includedLanguages: LANGS.map((l) => l.gt).join(","), autoDisplay: false },
        "google_translate_element"
      );
    };
    const gs = document.createElement("script");
    gs.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    gs.async = true;
    document.head.appendChild(gs);
    if (currentLang === "he") {            /* right-to-left for Hebrew, menu bar stays as it is */
      document.documentElement.dir = "rtl";
      header.setAttribute("dir", "ltr");
      document.getElementById("mobileMenuWrap").setAttribute("dir", "ltr");
    }
  }

  document.addEventListener("DOMContentLoaded", () => { if (window.lucide) lucide.createIcons(); });
})();