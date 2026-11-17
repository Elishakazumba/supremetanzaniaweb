/* ============ SUPREME — page behaviour for the new look (v2) ============
   Each setup only runs if its section exists, so this one file is shared by
   index.html, about-us.html and contact.html. */

/* ---------- WhatsApp (same number + messages as the original script.js) ---------- */
const PHONE_NUMBER = "255784749895"; // WhatsApp: +255 784 749 895
const whatsappLink = (message) =>
  `https://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${encodeURIComponent(message)}`;

const adventureTypes = [
  { id: "safari", label: "Safari" },
  { id: "mountain", label: "Mountain" },
  { id: "beach", label: "Beach" },
  { id: "culture", label: "Culture" },
  { id: "other", label: "Other" },
];
const plannerLabels = ["Adventure", "Date", "Travelers", "Details"];
const todayISO = () => new Date().toISOString().split("T")[0];

/* ---------- scroll reveal ---------- */
function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) { items.forEach((i) => i.classList.add("is-visible")); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -50px 0px" });
  items.forEach((i) => io.observe(i));
}

/* ---------- itinerary filter chips ---------- */
function setupFilters() {
  const chips = document.querySelectorAll(".chip[data-filter]");
  const cards = document.querySelectorAll(".trip-card[data-cat]");
  if (!chips.length) return;
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const f = chip.dataset.filter;
      chips.forEach((c) => c.classList.toggle("is-active", c === chip));
      cards.forEach((card) => {
        const show = f === "all" || card.dataset.cat.split(" ").includes(f);
        card.hidden = !show;
      });
    });
  });
}

/* ---------- trip planner (4 steps -> WhatsApp) ---------- */
function setupPlanner() {
  const progress = document.getElementById("ppProgress");
  if (!progress) return;
  let st = { step: 0, adventure: "", date: "", travelers: 2, details: "" };

  const $ = (id) => document.getElementById(id);
  const grid = $("ppOptGrid"), dateEl = $("ppDate"), detailsEl = $("ppDetails");
  const back = $("ppBack"), next = $("ppNext"), fin = $("ppFinal");

  const canGo = () => (st.step === 0 ? !!st.adventure : st.step === 1 ? !!st.date : st.step === 2 ? st.travelers > 0 : true);

  function drawProgress() {
    progress.innerHTML = plannerLabels.map((label, i) => {
      const cls = i < st.step ? "done" : i === st.step ? "current" : "";
      const inner = i < st.step ? '<i class="fa-solid fa-check"></i>' : i + 1;
      const line = i < plannerLabels.length - 1 ? '<span class="pp-line"></span>' : "";
      return `<div class="pp-item ${cls}"><div class="pp-dot"><b>${inner}</b><span>${label}</span></div>${line}</div>`;
    }).join("");
  }
  function drawOptions() {
    grid.innerHTML = "";
    adventureTypes.forEach((t) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "opt" + (st.adventure === t.id ? " is-active" : "");
      b.textContent = t.label;
      b.addEventListener("click", () => { st.adventure = t.id; drawOptions(); nav(); });
      grid.appendChild(b);
    });
  }
  function nav() {
    const last = st.step === plannerLabels.length - 1;
    back.hidden = st.step === 0;
    next.hidden = last;
    fin.hidden = !last;
    next.disabled = !canGo();
  }
  function show() {
    document.querySelectorAll(".pp-step").forEach((s, i) => { s.hidden = i !== st.step; });
    drawProgress();
    nav();
  }
  function count() {
    $("ppCount").textContent = st.travelers;
    $("ppCountLabel").textContent = st.travelers === 1 ? "Traveler" : "Travelers";
  }
  function message() {
    const adv = adventureTypes.find((a) => a.id === st.adventure)?.label ?? "Not specified";
    return [
      "Hello Supreme Tanzania Safaris, I'd like to plan a trip to Tanzania.",
      "",
      `Adventure type: ${adv}`,
      `Travel date: ${st.date || "Not specified"}`,
      `Number of travelers: ${st.travelers}`,
      `Details: ${st.details || "None provided"}`,
    ].join("\n");
  }

  drawOptions(); show(); count();
  dateEl.min = todayISO();
  dateEl.addEventListener("change", (e) => { st.date = e.target.value; nav(); });
  detailsEl.addEventListener("input", (e) => { st.details = e.target.value; });
  $("ppDec").addEventListener("click", () => { st.travelers = Math.max(1, st.travelers - 1); count(); });
  $("ppInc").addEventListener("click", () => { st.travelers = Math.min(20, st.travelers + 1); count(); });
  back.addEventListener("click", () => { st.step = Math.max(0, st.step - 1); show(); });
  next.addEventListener("click", () => { if (canGo()) { st.step = Math.min(plannerLabels.length - 1, st.step + 1); show(); } });
  $("ppReset").addEventListener("click", () => {
    st = { step: 0, adventure: "", date: "", travelers: 2, details: "" };
    dateEl.value = ""; detailsEl.value = "";
    count(); drawOptions(); show();
  });
  $("ppSend").addEventListener("click", () => window.open(whatsappLink(message()), "_blank", "noopener,noreferrer"));
}

/* ---------- contact form -> WhatsApp (same message as before) ---------- */
function setupContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;
  const date = document.getElementById("contactDate");
  if (date) date.min = todayISO();
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = new FormData(form);
    const message = [
      "Hello Supreme Tanzania Safaris, I'd like to make an inquiry about your tourism services.",
      "",
      `Name: ${d.get("name") || "Not provided"}`,
      `Email: ${d.get("email") || "Not provided"}`,
      `Phone: ${d.get("phone") || "Not provided"}`,
      `Travel date: ${d.get("date") || "Not specified"}`,
      `Number of travelers: ${d.get("travelers") || "1"}`,
      `Adventure type: ${d.get("adventure") || "Safari"}`,
      `Message: ${d.get("message") || "None provided"}`,
    ].join("\n");
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
  });
}

/* ---------- carousels (reviews) ---------- */
function setupCarousels() {
  document.querySelectorAll("[data-carousel]").forEach((root) => {
    const scroller = root.querySelector(".snap");
    const step = () => Math.max(scroller.clientWidth * 0.8, 280);
    root.querySelector("[data-prev]")?.addEventListener("click", () => scroller.scrollBy({ left: -step(), behavior: "smooth" }));
    root.querySelector("[data-next]")?.addEventListener("click", () => scroller.scrollBy({ left: step(), behavior: "smooth" }));
  });
}

/* ---------- floating WhatsApp + back to top ---------- */
function setupFloating() {
  const panel = document.getElementById("waPanel");
  const toggle = document.getElementById("waToggle");
  const close = document.getElementById("waClose");
  if (toggle && panel) {
    toggle.addEventListener("click", () => panel.classList.toggle("open"));
    close?.addEventListener("click", () => panel.classList.remove("open"));
  }
  const top = document.getElementById("toTop");
  if (top) {
    const on = () => top.classList.toggle("show", window.scrollY > 600);
    on();
    window.addEventListener("scroll", on, { passive: true });
    top.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
  setupFilters();
  setupPlanner();
  setupContactForm();
  setupCarousels();
  setupFloating();
  setupReveal();
});
