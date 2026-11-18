/* ============ SUPREME FOOTER (same footer as the other pages, no Tailwind needed) ============
   Usage:  <div id="site-footer"></div>  then  <script src="supreme-footer.js"></script> */
(function () {
  const host = document.getElementById("site-footer");
  if (!host) return;

  const WA = "https://api.whatsapp.com/send?phone=255784749895&text=Hello%20Supreme%20Tanzania%20Safaris%2C%20I%27d%20like%20to%20plan%20a%20trip%20to%20Tanzania.%20Can%20you%20help%20me%3F";
  const BROCHURE = "files/STS-Brochure.pdf";
  const TRIPADVISOR = "https://www.tripadvisor.com/Attraction_Review-g293748-d20159091-Reviews-Supreme_Tanzania_Safaris-Dar_es_Salaam_Dar_Es_Salaam_Region.html";

  const ic = (d, s, extra) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra || ""}>${d}</svg>`;
  const ICON = {
    chat: ic('<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z"/>', 20),
    pin: ic('<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>', 16),
    phone: ic('<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>', 16),
    mail: ic('<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>', 16),
    download: ic('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>', 16),
    ig: ic('<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>', 20),
    fb: ic('<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>', 20),
    tt: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>`,
  };

  const links = [
    ["About us", "about-us.html"],
    ["Contact us", "contact.html"],
    ["Booking Terms and Conditions", "terms.html"],
    ["Tanzania Safaris", "safaris.html"],
    ["Treks in Tanzania", "treks.html"],
    ["Kilimanjaro Trekking", "kilimanjaro.html"],
    ["Zanzibar", "zanzibar.html"],
    ["Volunteer in Tanzania", "volunteer.html"],
    ["TripAdvisor", TRIPADVISOR, true],
    ["Our Brochure", BROCHURE, true],
  ];
  const social = (label, href, icon) =>
    `<a href="${href}" target="_blank" rel="noopener noreferrer" aria-label="Supreme Tanzania Safaris on ${label}" title="Supreme Tanzania Safaris on ${label}" class="sf-soc">${icon}</a>`;

  const css = `
  .sf{background:#33241a;color:#e8dcc8;padding:64px 0 96px;font-family:'Plus Jakarta Sans',system-ui,sans-serif;line-height:1.5;text-align:left}
  @media(min-width:640px){.sf{padding-bottom:32px}}
  .sf *{box-sizing:border-box}
  .sf a{text-decoration:none}
  .sf ul{list-style:none;margin:0;padding:0}
  .sf-in{max-width:1280px;margin:0 auto;padding:0 16px}
  @media(min-width:640px){.sf-in{padding:0 24px}}
  .sf-grid{display:grid;gap:40px;padding-bottom:48px;border-bottom:1px solid rgba(90, 62, 43,.5);grid-template-columns:1fr}
  @media(min-width:640px){.sf-grid{grid-template-columns:1fr 1fr}}
  @media(min-width:1024px){.sf-grid{grid-template-columns:1fr 1fr 1fr}}
  .sf-brand{font-family:'Fraunces',Georgia,serif;font-size:20px;font-weight:700;color:#fff;margin:0}
  .sf-about{margin:16px 0 0;max-width:384px;color:#d6c3a3;line-height:1.625;font-size:16px}
  .sf-wa{margin-top:24px;display:inline-flex;align-items:center;gap:8px;padding:12px 24px;border-radius:9999px;background:#25D366;color:#fff;font-weight:600;font-size:16px;box-shadow:0 10px 15px -3px rgba(0,0,0,.2);transition:all .3s}
  .sf-wa:hover{background:#1da851;transform:scale(1.03)}
  .sf-follow{margin-top:24px}
  .sf-follow p{margin:0 0 12px;font-size:14px;font-weight:600;color:#fff}
  .sf-socs{display:flex;align-items:center;gap:12px}
  .sf-soc{display:inline-flex;height:40px;width:40px;align-items:center;justify-content:center;border-radius:9999px;background:#46321f;color:#fff;transition:background .2s}
  .sf-soc:hover{background:#6f4e37}
  .sf h4{font-family:'Fraunces',Georgia,serif;font-size:18px;font-weight:700;color:#fff;margin:0 0 16px}
  .sf-links li+li{margin-top:10px}
  .sf-links a{color:#d6c3a3;font-size:14px;transition:color .2s}
  .sf-links a:hover{color:#fff}
  .sf-contact{font-size:14px}
  .sf-contact li+li{margin-top:12px}
  .sf-contact a,.sf-contact .row{display:flex;align-items:center;gap:10px;color:#e8dcc8;transition:color .2s}
  .sf-contact .row{align-items:flex-start}
  .sf-contact a:hover{color:#fff}
  .sf-contact svg{color:#a07a58;flex-shrink:0}
  .sf-contact .row svg{margin-top:2px}
  .sf-copy{padding-top:32px;text-align:center;font-size:14px;color:#c0a578}
  .sf-copy p{margin:0}
  `;
  const st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);

  const need = (name, url) => {
    if (!document.querySelector(`link[href*="${name}"]`)) {
      const l = document.createElement("link");
      l.rel = "stylesheet"; l.href = url; document.head.appendChild(l);
    }
  };
  need("Plus+Jakarta+Sans", "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap");
  need("Fraunces", "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&display=swap");

  const html = `
<footer class="sf">
  <div class="sf-in">
    <div class="sf-grid">
      <div>
        <p class="sf-brand">Supreme Tanzania Safaris</p>
        <p class="sf-about">Your trusted partner for unforgettable journeys across East Africa — wildlife safaris, Kilimanjaro treks and Zanzibar escapes, tailored to your interests and budget.</p>
        <a href="${WA}" target="_blank" rel="noopener noreferrer" class="sf-wa">${ICON.chat}WhatsApp Supreme Tanzania Safaris</a>
        <div class="sf-follow">
          <p>Follow us</p>
          <div class="sf-socs">
            ${social("Instagram", "https://www.instagram.com/supremetanzaniasafari/", ICON.ig)}
            ${social("Facebook", "https://www.facebook.com/supremetanzaniasafaris", ICON.fb)}
            ${social("TikTok", "https://www.tiktok.com/@supremetanzaniasafaris", ICON.tt)}
          </div>
        </div>
      </div>

      <div>
        <h4>Useful Links</h4>
        <ul class="sf-links">
          ${links.map(([t, h, ext]) => `<li><a href="${h}"${ext ? ' target="_blank" rel="noopener noreferrer"' : ""}>${t}</a></li>`).join("")}
        </ul>
      </div>

      <div>
        <h4>Contact us</h4>
        <ul class="sf-contact">
          <li class="row">${ICON.pin}<span>Supreme Tanzania Safaris<br />Dar es Salaam, Tanzania</span></li>
          <li><a href="tel:+255767201113">${ICON.phone}+255 767 201 113</a></li>
          <li><a href="mailto:info@supremetanzaniasafaris.com">${ICON.mail}info@supremetanzaniasafaris.com</a></li>
          <li><a href="${BROCHURE}" target="_blank" rel="noopener noreferrer">${ICON.download}Download Brochure</a></li>
        </ul>
      </div>
    </div>
    <div class="sf-copy"><p>&copy; ${new Date().getFullYear()} Supreme Tanzania Safaris. All Rights Reserved.</p></div>
  </div>
</footer>`;

  host.insertAdjacentHTML("afterend", html);
  host.remove();
})();
