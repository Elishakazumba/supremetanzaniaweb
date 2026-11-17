/* ============ SHARED SITE HEADER — new look (v2) ============
   Builds the navbar + mobile drawer. The menu is edited in ONE place (NAV below).
   Usage on a page:   <div id="site-header"></div>  <script src="theme-nav.js"></script>
   Same menu structure and language switcher as the original nav.js. */
(function () {
  const host = document.getElementById("site-header");
  if (!host) return;

  const LOGO = "images/site/logo-mark.png";
  const BROCHURE = "files/STS-Brochure.pdf";
  const PHONE_DISPLAY = "+255 767 201 113";
  const PHONE_TEL = "+255767201113";

  /* Languages offered. "gt" is Google Translate's code (Hebrew = iw). */
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
  function subItem(item) {
    const act = isActive(item) ? " active" : "";
    if (!item.children) return `<li><a href="${item.href}" class="${act.trim()}">${item.label}</a></li>`;
    return `<li class="has-sub">
      <a href="${item.href}" class="${act.trim()}">${item.label}<i class="fa-solid fa-chevron-right"></i></a>
      <div class="sub-menu"><ul class="sub-panel scroll">${item.children.map(subItem).join("")}</ul></div>
    </li>`;
  }
  function topItem(item) {
    const act = isActive(item) ? "active" : "";
    if (!item.children) return `<li><a href="${item.href}" class="${act}">${item.label}</a></li>`;
    return `<li class="has-sub">
      <a href="${item.href}" class="${act}">${item.label}<i class="fa-solid fa-chevron-down"></i></a>
      <div class="sub-menu"><ul class="sub-panel">${item.children.map(subItem).join("")}</ul></div>
    </li>`;
  }

  /* ---------- mobile ---------- */
  function mobileItem(item) {
    const act = isActive(item) ? "active" : "";
    if (!item.children) return `<li><a href="${item.href}" class="${act}">${item.label}</a></li>`;
    return `<li>
      <div class="m-row"><a href="${item.href}" class="${act}">${item.label}</a>
        <button type="button" class="m-toggle" aria-expanded="false" aria-label="Show ${item.label} submenu"><i class="fa-solid fa-chevron-down"></i></button></div>
      <ul class="m-sub">${item.children.map(mobileItem).join("")}</ul>
    </li>`;
  }

  const html = `
<header class="navbar" id="navbar">
  <div class="nav-container">
    <a href="index.html" class="logo" aria-label="Supreme Tanzania Safaris - Home">
      <img src="${LOGO}" alt="" width="50" height="42" />
      <span class="logo-text" translate="no"><span class="logo-main">SUPREME</span><span class="logo-sub">TANZANIA SAFARIS</span></span>
    </a>
    <ul class="nav-links" id="navLinks">${NAV.map(topItem).join("")}</ul>
    <div class="nav-tools">
      <div class="lang-wrap" id="langWrap" translate="no">
        <button class="tool-btn" id="langBtn" type="button" aria-haspopup="true" aria-expanded="false" title="Language">
          <i class="fa-solid fa-globe"></i><span id="langCurrent">EN</span><i class="fa-solid fa-chevron-down" style="font-size:.55rem"></i>
        </button>
        <ul class="lang-menu" id="langMenu">
          ${LANGS.map((l) => `<li><button type="button" data-lang="${l.code}"><span>${l.label}</span><small>${l.short}</small></button></li>`).join("")}
        </ul>
      </div>
      <a href="${BROCHURE}" target="_blank" rel="noopener noreferrer" class="tool-btn brochure" title="Download Brochure"><i class="fa-solid fa-download"></i><span>Brochure</span></a>
      <a href="booking.html" class="nav-cta">Start Planning</a>
    </div>
    <button class="hamburger" id="menuOpenBtn" type="button" aria-label="Open menu"><span></span><span></span><span></span></button>
  </div>
</header>

<div class="mobile-wrap" id="mobileWrap">
  <div class="mobile-backdrop" id="mobileBackdrop"></div>
  <div class="mobile-panel">
    <div class="mobile-head"><strong>Menu</strong><button class="mobile-close" id="menuCloseBtn" type="button" aria-label="Close menu"><i class="fa-solid fa-xmark"></i></button></div>
    <ul class="mobile-list">${NAV.map(mobileItem).join("")}</ul>
    <div class="mobile-foot" translate="no">
      <div class="lang-chips">${LANGS.map((l) => `<button type="button" data-lang="${l.code}">${l.short}</button>`).join("")}</div>
      <a href="booking.html" class="btn-primary">Start Planning</a>
      <a href="${BROCHURE}" target="_blank" rel="noopener noreferrer" class="btn-secondary"><i class="fa-solid fa-download"></i> Download Brochure</a>
      <a href="tel:${PHONE_TEL}" class="btn-secondary"><i class="fa-solid fa-phone"></i> ${PHONE_DISPLAY}</a>
    </div>
  </div>
</div>`;

  host.insertAdjacentHTML("afterend", html);
  host.remove();

  /* ---------- behaviour ---------- */
  const navbar = document.getElementById("navbar");
  const onScroll = () => navbar.classList.toggle("scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const wrap = document.getElementById("mobileWrap");
  const setMenu = (open) => {
    wrap.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
  };
  document.getElementById("menuOpenBtn").addEventListener("click", () => setMenu(true));
  document.getElementById("menuCloseBtn").addEventListener("click", () => setMenu(false));
  document.getElementById("mobileBackdrop").addEventListener("click", () => setMenu(false));
  wrap.querySelectorAll(".mobile-list a, .mobile-foot a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") { setMenu(false); toggleLang(false); } });

  wrap.querySelectorAll(".m-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const sub = btn.closest("li").querySelector(":scope > .m-sub");
      const show = sub.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(show));
    });
  });

  /* ---------- language switcher (Google Translate; choice is remembered on every page) ---------- */
  const gtCookie = () => {
    const m = document.cookie.match(/(?:^|;\s*)googtrans=\/[^/]*\/([^;]+)/);
    return m ? decodeURIComponent(m[1]) : "en";
  };
  const currentLang = (LANGS.find((l) => l.gt === gtCookie()) || LANGS[0]).code;

  function writeCookie(value, expires) {
    const h = location.hostname;
    const parts = ["googtrans=" + value, "path=/"];
    if (expires) parts.push("expires=Thu, 01 Jan 1970 00:00:00 GMT");
    const base = parts.join("; ");
    document.cookie = base;
    if (h.indexOf(".") > -1) {
      document.cookie = base + "; domain=" + h;
      document.cookie = base + "; domain=." + h.replace(/^www\./, "");
    }
  }
  function chooseLang(code) {
    const l = LANGS.find((x) => x.code === code);
    if (!l || code === currentLang) return;
    if (code === "en") writeCookie("/en/en", true); else writeCookie("/en/" + l.gt, false);
    location.reload();
  }

  document.getElementById("langCurrent").textContent = (LANGS.find((l) => l.code === currentLang) || LANGS[0]).short;
  document.querySelectorAll(".lang-chips button").forEach((c) => { if (c.dataset.lang === currentLang) c.classList.add("on"); });

  const langBtn = document.getElementById("langBtn");
  const langMenu = document.getElementById("langMenu");
  function toggleLang(show) {
    langMenu.classList.toggle("open", show);
    langBtn.setAttribute("aria-expanded", String(show));
  }
  langBtn.addEventListener("click", (e) => { e.stopPropagation(); toggleLang(!langMenu.classList.contains("open")); });
  document.addEventListener("click", () => toggleLang(false));
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
      navbar.setAttribute("dir", "ltr");
      wrap.setAttribute("dir", "ltr");
    }
  }
})();
