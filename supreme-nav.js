/* ============ SUPREME NAV (same header as the original site, no Tailwind needed) ============
   Usage:  <div id="site-header"></div>  then  <script src="supreme-nav.js"></script>
   Same menu, dropdowns, EN switcher, Brochure and Start Planning as nav.js. */
(function () {
  const host = document.getElementById("site-header");
  if (!host) return;
  const solidPage = host.dataset.nav === "solid";

  const LOGO = "images/site/STSlogotransparentbackground-2.png";
  const BROCHURE = "files/STS-Brochure.pdf";
  const PHONE_DISPLAY = "+255 767 201 113";
  const PHONE_TEL = "+255767201113";

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

  /* ---------- icons (inline, so no icon library is needed) ---------- */
  const svg = (d, s) => `<svg class="sn-ic" width="${s || 16}" height="${s || 16}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const IC = {
    down: (s) => svg('<path d="m6 9 6 6 6-6"/>', s || 14),
    right: (s) => svg('<path d="m9 18 6-6-6-6"/>', s || 14),
    globe: () => svg('<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>', 16),
    download: () => svg('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>', 16),
    menu: () => svg('<path d="M4 6h16M4 12h16M4 18h16"/>', 24),
    x: () => svg('<path d="M18 6 6 18M6 6l12 12"/>', 24),
    phone: () => svg('<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>', 16),
  };

  /* ---------- desktop ---------- */
  function flyoutItem(item) {
    const act = isActive(item) ? " is-active" : "";
    if (!item.children) {
      return `<li><a href="${item.href}" class="sn-dd-link${act}">${item.label}</a></li>`;
    }
    return `
      <li class="sn-sub">
        <a href="${item.href}" class="sn-dd-link sn-dd-split${act}">${item.label}${IC.right()}</a>
        <div class="sn-fly"><ul class="sn-menu sn-menu-scroll">${item.children.map(flyoutItem).join("")}</ul></div>
      </li>`;
  }
  function desktopItem(item) {
    const act = isActive(item) ? " is-active" : "";
    if (!item.children) {
      return `<li><a href="${item.href}" class="sn-link${act}">${item.label}</a></li>`;
    }
    return `
      <li class="sn-item">
        <a href="${item.href}" class="sn-link sn-has-kids${act}">${item.label}${IC.down()}</a>
        <div class="sn-drop"><ul class="sn-menu">${item.children.map(flyoutItem).join("")}</ul></div>
      </li>`;
  }

  /* ---------- mobile ---------- */
  function mobileItem(item, depth) {
    const act = isActive(item) ? " is-active" : "";
    const link = `<a href="${item.href}" class="sn-m-link sn-mobile-link${depth ? " is-sub" : ""}${act}">${item.label}</a>`;
    if (!item.children) return `<li>${link}</li>`;
    return `
      <li>
        <div class="sn-m-row">
          ${link}
          <button type="button" data-accordion aria-expanded="false" aria-label="Show ${item.label} submenu" class="sn-m-toggle"><span class="chev">${IC.down(20)}</span></button>
        </div>
        <ul class="sn-m-sub" hidden>${item.children.map((c) => mobileItem(c, depth + 1)).join("")}</ul>
      </li>`;
  }

  /* ---------- styles ---------- */
  const css = `
  #sn-header,#sn-header *,#sn-mobile,#sn-mobile *{box-sizing:border-box}
  #sn-header,#sn-mobile{font-family:'Plus Jakarta Sans',system-ui,sans-serif;line-height:1.5}
  #sn-header ul,#sn-mobile ul{list-style:none;margin:0;padding:0}
  #sn-header a,#sn-mobile a{text-decoration:none}
  .sn-ic{display:inline-block;flex-shrink:0;vertical-align:middle}

  #sn-header{position:fixed;top:0;left:0;right:0;z-index:1000;padding:16px 0;background:transparent;transition:all .5s ease}
  #sn-header.sn-solid{background:rgba(250,247,242,.95);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -2px rgba(0,0,0,.1);padding:8px 0}
  .sn-bar{max-width:1280px;margin:0 auto;padding:0 16px;display:flex;align-items:center;justify-content:space-between;gap:16px}
  @media(min-width:640px){.sn-bar{padding:0 24px}}

  .sn-logo{display:flex;align-items:center;flex-shrink:0}
  .sn-logo-wrap{display:block;background:rgba(255,255,255,.9);border-radius:12px;padding:4px 10px;box-shadow:0 1px 2px rgba(0,0,0,.08)}
  .sn-logo-wrap img{height:40px;width:auto;display:block;max-width:none}
  @media(min-width:640px){.sn-logo-wrap img{height:48px}}

  .sn-links{display:none;align-items:center;gap:2px}
  .sn-right{display:none;align-items:center;gap:8px;flex-shrink:0}
  .sn-burger{display:flex;align-items:center;justify-content:center;height:40px;width:40px;border-radius:8px;border:0;background:transparent;cursor:pointer;color:#fff;transition:background .2s,color .2s}
  .sn-burger:hover{background:rgba(255,255,255,.15)}
  .sn-solid .sn-burger{color:#304025}.sn-solid .sn-burger:hover{background:#f5efe6}
  @media(min-width:1024px){.sn-links,.sn-right{display:flex}.sn-burger{display:none}}

  .sn-link{display:inline-flex;align-items:center;gap:4px;padding:8px 12px;border-radius:9999px;font-size:14px;font-weight:500;color:rgba(255,255,255,.9);transition:all .2s ease}
  @media(min-width:1280px){.sn-link{padding:8px 16px}}
  .sn-link:hover{background:rgba(255,255,255,.15);color:#fff;transform:scale(1.05)}
  .sn-solid .sn-link{color:#6f5739}.sn-solid .sn-link:hover{background:#f5efe6;color:#3a502c}
  #sn-header .sn-link.is-active{text-decoration:underline;text-decoration-thickness:2px;text-underline-offset:8px}

  .sn-item,.sn-sub{position:relative}
  .sn-drop{position:absolute;left:0;top:100%;padding-top:12px;min-width:256px;visibility:hidden;opacity:0;transform:translateY(4px);transition:all .2s ease}
  .sn-item:hover>.sn-drop,.sn-item:focus-within>.sn-drop{visibility:visible;opacity:1;transform:none}
  .sn-fly{position:absolute;left:100%;top:0;padding-left:8px;min-width:256px;visibility:hidden;opacity:0;transition:all .2s ease}
  .sn-sub:hover>.sn-fly,.sn-sub:focus-within>.sn-fly{visibility:visible;opacity:1}
  .sn-menu{background:#fff;border-radius:16px;box-shadow:0 25px 50px -12px rgba(0,0,0,.25);border:1px solid #f5efe6;padding:8px 0;color:#6f5739}
  .sn-menu-scroll{max-height:75vh;overflow-y:auto}
  .sn-dd-link{display:block;padding:8px 16px;font-size:14px;color:#6f5739;transition:all .2s}
  .sn-dd-split{display:flex;align-items:center;justify-content:space-between;gap:12px}
  .sn-dd-link:hover{background:#f3f7f0;color:#3a502c}
  .sn-dd-link.is-active{color:#3a502c;font-weight:600}

  .sn-ghost{display:inline-flex;align-items:center;gap:6px;border:2px solid rgba(255,255,255,.7);border-radius:9999px;padding:6px 12px;font-size:14px;font-weight:600;color:#fff;background:transparent;cursor:pointer;font-family:inherit;transition:all .2s}
  .sn-ghost:hover{background:rgba(255,255,255,.15)}
  .sn-solid .sn-ghost{border-color:#496636;color:#3a502c}.sn-solid .sn-ghost:hover{background:#f3f7f0}
  .sn-brochure-txt{display:none}
  @media(min-width:1280px){.sn-brochure-txt{display:inline}}
  .sn-cta{display:inline-flex;align-items:center;justify-content:center;border-radius:9999px;font-weight:600;font-size:14px;padding:8px 16px;background:rgba(255,255,255,.95);color:#3a502c;box-shadow:0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -4px rgba(0,0,0,.1);transition:all .3s}
  .sn-cta:hover{background:#fff;transform:scale(1.03)}
  .sn-solid .sn-cta{background:#496636;color:#fff}.sn-solid .sn-cta:hover{background:#3a502c}

  #sn-langWrap{position:relative}
  #sn-langMenu{display:none;position:absolute;right:0;top:100%;margin-top:8px;min-width:176px;background:#fff;border-radius:16px;box-shadow:0 25px 50px -12px rgba(0,0,0,.25);border:1px solid #f5efe6;padding:8px 0;color:#6f5739;z-index:50}
  #sn-langMenu.open{display:block}
  #sn-langMenu button{display:flex;width:100%;align-items:center;justify-content:space-between;gap:16px;padding:8px 16px;font-size:14px;background:none;border:0;cursor:pointer;color:inherit;font-family:inherit;transition:all .2s}
  #sn-langMenu button:hover{background:#f3f7f0;color:#3a502c}
  #sn-langMenu button span+span{font-size:12px;color:#c0a578}

  /* mobile menu */
  #sn-mobile{position:fixed;inset:0;z-index:1100;visibility:hidden;opacity:0;transition:all .3s}
  #sn-mobile.open{visibility:visible;opacity:1}
  .sn-backdrop{position:absolute;inset:0;background:rgba(40,54,33,.6);backdrop-filter:blur(4px)}
  .sn-panel{position:absolute;right:0;top:0;height:100%;width:82%;max-width:384px;background:#faf7f2;box-shadow:0 25px 50px -12px rgba(0,0,0,.4);display:flex;flex-direction:column;transform:translateX(100%);transition:transform .4s ease}
  #sn-mobile.open .sn-panel{transform:none}
  .sn-panel-head{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid #e8dcc8}
  .sn-panel-head span{font-family:'Playfair Display',Georgia,serif;font-size:20px;font-weight:700;color:#304025}
  .sn-panel-head button{display:flex;align-items:center;justify-content:center;height:40px;width:40px;border-radius:8px;border:0;background:transparent;color:#3a502c;cursor:pointer}
  .sn-panel-head button:hover{background:#f5efe6}
  .sn-m-list{flex:1;padding:16px 12px;overflow-y:auto}
  .sn-m-list li+li{margin-top:4px}
  .sn-m-row{display:flex;align-items:center}
  .sn-m-link{display:block;flex:1;padding:14px 16px;border-radius:12px;font-weight:500;font-size:16px;color:#6f5739;transition:all .2s}
  .sn-m-link.is-sub{font-size:15px;padding:10px 16px}
  .sn-m-link:hover,.sn-m-link.is-active{background:#f3f7f0;color:#3a502c}
  .sn-m-toggle{display:flex;align-items:center;justify-content:center;height:44px;width:44px;border:0;background:none;color:#6f5739;cursor:pointer;border-radius:12px}
  .sn-m-toggle .chev{display:flex;transition:transform .2s}
  .sn-m-toggle .chev.rot{transform:rotate(180deg)}
  .sn-m-sub{margin:4px 0 0 16px;padding-left:12px;border-left:2px solid #e8dcc8}
  .sn-m-sub[hidden]{display:none}
  .sn-panel-sec{padding:16px 20px 4px;border-top:1px solid #e8dcc8}
  .sn-panel-sec p{margin:0 0 8px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#a8895a}
  .sn-chips{display:flex;flex-wrap:wrap;gap:8px}
  .sn-chip{border:1px solid #d6c3a3;border-radius:9999px;padding:6px 12px;font-size:14px;font-weight:600;color:#6f5739;background:none;cursor:pointer;font-family:inherit}
  .sn-chip:hover{background:#f3f7f0}
  .sn-chip.on{background:#496636;color:#fff;border-color:#496636}
  .sn-panel-act{padding:20px;border-top:1px solid #e8dcc8;display:flex;flex-direction:column;gap:12px}
  .sn-panel-act a{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:12px 16px;border-radius:9999px;font-weight:600;font-size:14px}
  .sn-panel-act .go{background:#496636;color:#fff;font-size:16px;padding:12px 24px;box-shadow:0 10px 15px -3px rgba(0,0,0,.1)}
  .sn-panel-act .go:hover{background:#3a502c}
  .sn-panel-act .br{border:2px solid #496636;color:#3a502c}
  .sn-panel-act .ph{border:2px solid #d6c3a3;color:#6f5739}
  `;
  const styleEl = document.createElement("style");
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* the nav font (the rest of the page already loads Inter + Playfair) */
  if (!document.querySelector('link[href*="Plus+Jakarta+Sans"]')) {
    const f = document.createElement("link");
    f.rel = "stylesheet";
    f.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap";
    document.head.appendChild(f);
  }

  /* ---------- markup ---------- */
  const html = `
<header id="sn-header">
  <nav class="sn-bar">
    <a href="index.html" class="sn-logo" aria-label="Supreme Tanzania Safaris - Home">
      <span id="navLogoWrap" translate="no" class="sn-logo-wrap"><img id="navLogoImg" src="${LOGO}" alt="Supreme Tanzania Safaris" /></span>
    </a>

    <ul class="sn-links" id="sn-links">${NAV.map(desktopItem).join("")}</ul>

    <div class="sn-right">
      <div id="sn-langWrap" translate="no">
        <button id="sn-langBtn" type="button" class="sn-ghost" aria-haspopup="true" aria-expanded="false" title="Language">
          ${IC.globe()}<span id="sn-langCurrent">EN</span>${IC.down()}
        </button>
        <ul id="sn-langMenu">
          ${LANGS.map((l) => `<li><button type="button" data-lang="${l.code}"><span>${l.label}</span><span>${l.short}</span></button></li>`).join("")}
        </ul>
      </div>
      <a href="${BROCHURE}" target="_blank" rel="noopener noreferrer" class="sn-ghost" title="Download Brochure">${IC.download()}<span class="sn-brochure-txt">Brochure</span></a>
      <a href="booking.html" class="sn-cta">Start Planning</a>
    </div>

    <button id="sn-open" class="sn-burger" aria-label="Open menu">${IC.menu()}</button>
  </nav>
</header>

<div id="sn-mobile">
  <div class="sn-backdrop" id="sn-backdrop"></div>
  <div class="sn-panel">
    <div class="sn-panel-head"><span>Menu</span><button id="sn-close" aria-label="Close menu">${IC.x()}</button></div>
    <ul class="sn-m-list">${NAV.map((i) => mobileItem(i, 0)).join("")}</ul>
    <div class="sn-panel-sec" translate="no">
      <p>Language</p>
      <div class="sn-chips">${LANGS.map((l) => `<button type="button" data-lang="${l.code}" class="sn-chip">${l.short}</button>`).join("")}</div>
    </div>
    <div class="sn-panel-act">
      <a href="booking.html" class="go sn-mobile-link">Start Planning</a>
      <a href="${BROCHURE}" target="_blank" rel="noopener noreferrer" class="br">${IC.download()}Download Brochure</a>
      <a href="tel:${PHONE_TEL}" class="ph">${IC.phone()}${PHONE_DISPLAY}</a>
    </div>
  </div>
</div>`;

  host.insertAdjacentHTML("afterend", html);
  host.remove();

  /* If the logo image cannot load, show the company name as text instead */
  const logoImg = document.getElementById("navLogoImg");
  const showNameText = () => {
    document.getElementById("navLogoWrap").innerHTML =
      '<span style="display:flex;flex-direction:column;line-height:1;text-align:center;color:#0b0b0b">' +
      '<span style="font-family:\'Playfair Display\',Georgia,serif;font-size:22px;font-weight:800;letter-spacing:.04em">SUPREME</span>' +
      '<span style="font-size:10px;font-weight:700;letter-spacing:.28em;margin-top:4px">TANZANIA SAFARIS</span></span>';
  };
  logoImg.addEventListener("error", showNameText);
  if (logoImg.complete && logoImg.naturalWidth === 0) showNameText();

  /* ---------- behaviour ---------- */
  const header = document.getElementById("sn-header");
  const onScroll = () => header.classList.toggle("sn-solid", solidPage || window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const wrap = document.getElementById("sn-mobile");
  const open = () => { wrap.classList.add("open"); document.body.style.overflow = "hidden"; };
  const close = () => { wrap.classList.remove("open"); document.body.style.overflow = ""; };
  document.getElementById("sn-open").addEventListener("click", open);
  document.getElementById("sn-close").addEventListener("click", close);
  document.getElementById("sn-backdrop").addEventListener("click", close);
  wrap.querySelectorAll(".sn-mobile-link").forEach((l) => l.addEventListener("click", close));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });

  wrap.querySelectorAll("[data-accordion]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const sub = btn.closest("li").querySelector(":scope > ul");
      const show = sub.hasAttribute("hidden");
      if (show) sub.removeAttribute("hidden"); else sub.setAttribute("hidden", "");
      btn.setAttribute("aria-expanded", String(show));
      btn.querySelector(".chev").classList.toggle("rot", show);
    });
  });

  /* ---------- language switcher (Google Translate; the choice is remembered on every page) ---------- */
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

  const gtStyle = document.createElement("style");
  gtStyle.textContent =
    ".goog-te-banner-frame,.goog-te-balloon-frame,#goog-gt-tt,.goog-tooltip,.goog-te-gadget-icon,iframe.skiptranslate{display:none!important}" +
    "body{top:0!important}.goog-text-highlight{background:none!important;box-shadow:none!important}" +
    "#google_translate_element{position:absolute;left:-9999px;top:0}";
  document.head.appendChild(gtStyle);

  document.getElementById("sn-langCurrent").textContent = (LANGS.find((l) => l.code === currentLang) || LANGS[0]).short;
  document.querySelectorAll(".sn-chip").forEach((c) => { if (c.dataset.lang === currentLang) c.classList.add("on"); });

  const langBtn = document.getElementById("sn-langBtn");
  const langMenu = document.getElementById("sn-langMenu");
  const toggleLangMenu = (show) => {
    langMenu.classList.toggle("open", show);
    langBtn.setAttribute("aria-expanded", String(show));
  };
  langBtn.addEventListener("click", (e) => { e.stopPropagation(); toggleLangMenu(!langMenu.classList.contains("open")); });
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
    if (currentLang === "he") {
      document.documentElement.dir = "rtl";
      header.setAttribute("dir", "ltr");
      wrap.setAttribute("dir", "ltr");
    }
  }
})();
