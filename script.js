/* ============ WHATSAPP CONFIG (mirrors src/lib/whatsapp.ts) ============ */
const PHONE_NUMBER = "255784749895"; // WhatsApp: +255 784 749 895

function whatsappLink(message) {
  return `https://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${encodeURIComponent(message)}`;
}

const WHATSAPP_MESSAGES = {
  hero: "Hello Supreme Tanzania Safaris, I'm interested in exploring Tanzania. I'd like to know more about your adventures.",
  safari: "Hello Supreme Tanzania Safaris, I'm interested in booking a safari. Please send me more information.",
  mountain: "Hello Supreme Tanzania Safaris, I'm interested in mountain adventures. Please send me more information.",
  coastal: "Hello Supreme Tanzania Safaris, I'd like to explore the Tanzanian coast. Please share details.",
  culture: "Hello Supreme Tanzania Safaris, I'm interested in cultural experiences. Please share details.",
  booking: "Hello Supreme Tanzania Safaris, I'd like to plan a trip to Tanzania. Can you help me?",
  contact: "Hello Supreme Tanzania Safaris, I'd like to make an inquiry about your tourism services.",
  cta: "Hello Supreme Tanzania Safaris, I'm ready to plan my Tanzania adventure. Let's get started!",
  destination: (name) => `Hello Supreme Tanzania Safaris, I'd like to know more about visiting ${name}. Can you share details?`,
};

const COMPANY = {
  name: "Supreme Tanzania Safaris",
  location: "Dar es Salaam, Tanzania",
  phoneDisplay: "+255 767 201 113",
  phoneIntl: "+255767201113",
};

/* ============ DATA (mirrors src/data/site.ts) ============ */
const adventures = [
  {
    id: "safari",
    icon: "paw-print",
    emoji: "🦁",
    title: "Safari Adventures",
    shortDesc: "Explore Tanzania's spectacular wildlife and national parks.",
    description: "Journey into the heart of Tanzania's world-famous national parks. Witness the Great Migration in the Serengeti, spot the Big Five in the Ngorongoro Crater, and marvel at massive elephant herds in Tarangire. Our safari experiences are led by expert guides who know exactly where to find the wildlife.",
    highlights: ["Serengeti Great Migration", "Big Five in Ngorongoro Crater", "Tarangire elephant herds", "Expert local guides"],
    image: "https://images.pexels.com/photos/39034105/pexels-photo-39034105.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    alt: "Lions resting on grass in the Serengeti, Tanzania",
    ctaLabel: "Plan My Safari",
    messageKey: "safari",
  },
  {
    id: "mountain",
    icon: "mountain",
    emoji: "🏔️",
    title: "Mountain Adventures",
    shortDesc: "Experience breathtaking landscapes and unforgettable mountain journeys.",
    description: "Conquer the roof of Africa. Whether you dream of summiting Mount Kilimanjaro or trekking through the dramatic landscapes of the Eastern Arc Mountains, we create mountain adventures for every skill level. Professional guides, safe routes, and unforgettable views await.",
    highlights: ["Mount Kilimanjaro summit", "Multi-day guided treks", "Acclimatization-focused routes", "Professional mountain guides"],
    image: "https://images.pexels.com/photos/31121292/pexels-photo-31121292.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    alt: "Mount Kilimanjaro with its snowy peak against a clear blue sky in Tanzania",
    ctaLabel: "Start Exploring",
    messageKey: "mountain",
  },
  {
    id: "coastal",
    icon: "palmtree",
    emoji: "🌴",
    title: "Coastal Escapes",
    shortDesc: "Discover Tanzania's beautiful coastline, beaches and island experiences.",
    description: "Relax on the white-sand beaches of Zanzibar, explore the historic streets of Stone Town, or sail on a traditional dhow at sunset. Tanzania's coastline and islands offer the perfect blend of relaxation, culture, and adventure after your safari.",
    highlights: ["Zanzibar white-sand beaches", "Stone Town historic tours", "Dhow sunset cruises", "Snorkeling & diving"],
    image: "https://images.pexels.com/photos/36468248/pexels-photo-36468248.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    alt: "White sand beach and azure ocean in Zanzibar, Tanzania",
    ctaLabel: "Explore the Coast",
    messageKey: "coastal",
  },
  {
    id: "culture",
    icon: "users",
    emoji: "🌍",
    title: "Cultural Experiences",
    shortDesc: "Connect with Tanzania's people, traditions and authentic local experiences.",
    description: "Go beyond the tourist trail and connect with the heart of Tanzania. Visit Maasai villages, learn traditional crafts, taste authentic Tanzanian cuisine, and experience the warmth and hospitality of local communities. These are the moments that make a journey unforgettable.",
    highlights: ["Maasai village visits", "Traditional craft workshops", "Authentic Tanzanian cuisine", "Local community experiences"],
    image: "https://images.pexels.com/photos/35724710/pexels-photo-35724710.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    alt: "Vibrant Maasai group in traditional attire with scenic Tanzanian backdrop",
    ctaLabel: "Discover Culture",
    messageKey: "culture",
  },
];

const destinations = [
  { id: "serengeti", name: "Serengeti", tagline: "The Great Migration", description: "Endless plains teeming with wildlife. Witness millions of wildebeest and zebras on their epic annual migration.", image: "https://images.pexels.com/photos/13242021/pexels-photo-13242021.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", alt: "A herd of African elephants roam the savanna in the Serengeti" },
  { id: "ngorongoro", name: "Ngorongoro", tagline: "The Eighth Wonder", description: "A vast volcanic crater hosting one of the densest concentrations of wildlife in Africa, including the legendary Big Five.", image: "https://images.pexels.com/photos/30630770/pexels-photo-30630770.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", alt: "Panoramic view of Ngorongoro Crater in Tanzania" },
  { id: "tarangire", name: "Tarangire", tagline: "Land of Giants", description: "Ancient baobab trees and massive elephant herds define this lesser-known gem of Tanzania's northern circuit.", image: "https://images.pexels.com/photos/28359728/pexels-photo-28359728.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", alt: "A herd of African elephants grazing under a large baobab tree" },
  { id: "zanzibar", name: "Zanzibar", tagline: "Spice Island Paradise", description: "Turquoise waters, powdery white sand, and the rich history of Stone Town make Zanzibar the perfect island escape.", image: "https://images.pexels.com/photos/8765693/pexels-photo-8765693.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", alt: "Aerial photograph of Nungwi Beach, Zanzibar at sunset" },
  { id: "kilimanjaro", name: "Mount Kilimanjaro", tagline: "Roof of Africa", description: "Africa's highest peak. A once-in-a-lifetime trek through five climate zones to the summit at 5,895 meters.", image: "https://images.pexels.com/photos/5109704/pexels-photo-5109704.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", alt: "Aerial view of Mount Kilimanjaro's snow-capped peak surrounded by clouds" },
  { id: "dsm", name: "Dar es Salaam", tagline: "Haven of Peace", description: "Tanzania's vibrant coastal city. Bustling markets, beautiful beaches, and a lively waterfront.", image: "https://images.pexels.com/photos/15434536/pexels-photo-15434536.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", alt: "Aerial view of Dar es Salaam's cityscape and coastline" },
];

const benefits = [
  { id: "local", icon: "map-pin", title: "Local Knowledge", description: "Discover Tanzania with people who understand the destination, the culture, and the land." },
  { id: "authentic", icon: "compass", title: "Authentic Experiences", description: "Experience Tanzania beyond the typical tourist route, with genuine local connections." },
  { id: "personalized", icon: "route", title: "Personalized Adventures", description: "Trips designed around your interests, pace, and travel goals — not a one-size-fits-all package." },
  { id: "trusted", icon: "shield-check", title: "Trusted Service", description: "Professional support from planning to adventure, with safety and satisfaction at the core." },
];

/* ============ RENDER HELPER ============ */
function el(html) {
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}

/* ============ ADVENTURES ============ */
function renderAdventures() {
  const wrap = document.getElementById("adventuresGrid");
  adventures.forEach((adv, idx) => {
    const card = el(`
      <article class="reveal group relative overflow-hidden rounded-3xl shadow-lg cursor-pointer bg-sand-900" style="transition-delay:${idx * 0.1}s">
        <div class="relative h-80 overflow-hidden">
          <img src="${adv.image}" alt="${adv.alt}" loading="lazy" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div class="absolute inset-0 bg-gradient-to-t from-savanna-900/95 via-savanna-900/40 to-transparent"></div>
        </div>
        <div class="absolute inset-0 flex flex-col justify-end p-6 text-white">
          <h3 class="font-display text-xl font-bold mb-1.5">${adv.title}</h3>
          <p class="text-sm text-white/85 leading-relaxed line-clamp-2 mb-4">${adv.shortDesc}</p>
          <div class="flex items-center gap-2 text-sand-200 font-semibold text-sm group-hover:gap-3 transition-all">
            ${adv.ctaLabel}
            <i data-lucide="arrow-right" class="h-4 w-4"></i>
          </div>
        </div>
      </article>
    `);
    card.addEventListener("click", () => openAdventureModal(adv));
    wrap.appendChild(card);
  });
}

function openAdventureModal(adv) {
  document.getElementById("modalImg").src = adv.image;
  document.getElementById("modalImg").alt = adv.alt;
  document.getElementById("modalTitle").textContent = adv.title;
  document.getElementById("modalDesc").textContent = adv.description;

  const list = document.getElementById("modalHighlights");
  list.innerHTML = "";
  adv.highlights.forEach((h) => {
    list.appendChild(el(`
      <li class="flex items-center gap-3 text-sand-700">
        <span class="flex items-center justify-center h-6 w-6 rounded-full bg-savanna-100 text-savanna-700 shrink-0">
          <i data-lucide="check" class="h-3.5 w-3.5"></i>
        </span>
        ${h}
      </li>
    `));
  });

  document.getElementById("modalWaLink").href = whatsappLink(WHATSAPP_MESSAGES[adv.messageKey]);

  const modal = document.getElementById("adventureModal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";
  lucide.createIcons();
}

function closeAdventureModal() {
  const modal = document.getElementById("adventureModal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.style.overflow = "";
}

function setupAdventureModal() {
  document.getElementById("modalCloseBtn").addEventListener("click", closeAdventureModal);
  document.getElementById("modalCloseBtn2").addEventListener("click", closeAdventureModal);
  document.getElementById("adventureModal").addEventListener("click", (e) => {
    if (e.target.id === "adventureModal") closeAdventureModal();
  });
}

/* ============ DESTINATIONS ============ */
function renderDestinations() {
  const wrap = document.getElementById("destScroll");
  destinations.forEach((dest) => {
    wrap.appendChild(el(`
      <article class="reveal snap-start shrink-0 w-[300px] sm:w-[360px] group relative overflow-hidden rounded-3xl shadow-lg bg-sand-900">
        <div class="relative h-96 overflow-hidden">
          <img src="${dest.image}" alt="${dest.alt}" loading="lazy" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div class="absolute inset-0 bg-gradient-to-t from-savanna-900/95 via-savanna-900/30 to-transparent"></div>
        </div>
        <div class="absolute inset-0 flex flex-col justify-end p-6 text-white">
          <span class="text-xs uppercase tracking-[0.2em] text-sand-200 font-semibold">${dest.tagline}</span>
          <h3 class="mt-1 font-display text-2xl font-bold">${dest.name}</h3>
          <p class="mt-2 text-sm text-white/85 leading-relaxed line-clamp-3">${dest.description}</p>
          <a href="${whatsappLink(WHATSAPP_MESSAGES.destination(dest.name))}" target="_blank" rel="noopener noreferrer" class="mt-4 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-whatsapp hover:bg-whatsapp-dark text-white text-sm font-semibold shadow-lg transition-all hover:scale-[1.03]">
            <i data-lucide="message-circle" class="h-4 w-4"></i>
            Ask About This Destination
          </a>
        </div>
      </article>
    `));
  });
}

function setupDestinationsCarousel() {
  const scrollEl = document.getElementById("destScroll");
  const scroll = (dir) => {
    const amount = scrollEl.clientWidth * 0.8;
    scrollEl.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };
  document.getElementById("destPrev").addEventListener("click", () => scroll("left"));
  document.getElementById("destNext").addEventListener("click", () => scroll("right"));
}

/* ============ WHY CHOOSE US ============ */
function renderBenefits() {
  const wrap = document.getElementById("benefitsGrid");
  benefits.forEach((b, idx) => {
    wrap.appendChild(el(`
      <div class="reveal group p-7 rounded-3xl bg-savanna-800/50 backdrop-blur border border-savanna-700/50 hover:bg-savanna-700/50 transition-all duration-300 hover:-translate-y-1.5" style="transition-delay:${idx * 0.1}s">
        <div class="flex items-center justify-center h-14 w-14 rounded-2xl bg-savanna-600 text-white mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform">
          <i data-lucide="${b.icon}" class="h-7 w-7"></i>
        </div>
        <h3 class="font-display text-xl font-bold text-white mb-2.5">${b.title}</h3>
        <p class="text-sm text-sand-200 leading-relaxed">${b.description}</p>
      </div>
    `));
  });
}

/* ============ SCROLL REVEAL ============ */
function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );
  items.forEach((item) => observer.observe(item));
}

/* ============ ADVENTURE OPTIONS (Contact form + Trip Planner) ============ */
const adventureTypes = [
  { id: "safari", label: "Safari" },
  { id: "mountain", label: "Mountain" },
  { id: "beach", label: "Beach" },
  { id: "culture", label: "Culture" },
  { id: "other", label: "Other" },
];
const plannerStepsLabels = ["Adventure", "Date", "Travelers", "Details"];

/* ============ TRIP PLANNER ============ */
let plannerState = { step: 0, adventure: "", date: "", travelers: 2, details: "" };

function renderPlannerProgress() {
  const wrap = document.getElementById("plannerProgress");
  wrap.innerHTML = "";
  plannerStepsLabels.forEach((label, i) => {
    const isDone = i < plannerState.step;
    const isCurrent = i === plannerState.step;
    const circleClasses = isDone
      ? "bg-savanna-600 text-white"
      : isCurrent
      ? "bg-savanna-700 text-white ring-4 ring-savanna-200"
      : "bg-sand-200 text-sand-500";
    const labelClasses = i <= plannerState.step ? "text-savanna-700" : "text-sand-400";
    const item = el(`
      <div class="flex items-center flex-1 last:flex-none">
        <div class="flex flex-col items-center gap-1.5">
          <span class="flex items-center justify-center h-9 w-9 rounded-full text-sm font-bold transition-all ${circleClasses}">
            ${isDone ? '<i data-lucide="check" class="h-4 w-4"></i>' : i + 1}
          </span>
          <span class="text-xs font-medium hidden sm:block ${labelClasses}">${label}</span>
        </div>
        ${i < plannerStepsLabels.length - 1 ? `<div class="flex-1 h-0.5 mx-2 rounded ${i < plannerState.step ? "bg-savanna-500" : "bg-sand-200"}"></div>` : ""}
      </div>
    `);
    wrap.appendChild(item);
  });
  lucide.createIcons();
}

function renderPlannerAdventureGrid() {
  const wrap = document.getElementById("plannerAdventureGrid");
  wrap.innerHTML = "";
  adventureTypes.forEach((t) => {
    const active = plannerState.adventure === t.id;
    const btn = el(`
      <button class="px-4 py-4 rounded-2xl font-semibold text-sm transition-all ${
        active ? "bg-savanna-600 text-white shadow-lg scale-[1.02]" : "bg-white text-sand-700 border-2 border-sand-200 hover:border-savanna-400"
      }">${t.label}</button>
    `);
    btn.addEventListener("click", () => {
      plannerState.adventure = t.id;
      renderPlannerAdventureGrid();
      updatePlannerNav();
    });
    wrap.appendChild(btn);
  });
}

function plannerCanProceed() {
  if (plannerState.step === 0) return plannerState.adventure !== "";
  if (plannerState.step === 1) return plannerState.date !== "";
  if (plannerState.step === 2) return plannerState.travelers > 0;
  return true;
}

function updatePlannerNav() {
  const backBtn = document.getElementById("plannerBackBtn");
  const nextBtn = document.getElementById("plannerNextBtn");
  const finalBtns = document.getElementById("plannerFinalBtns");

  backBtn.classList.toggle("hidden", plannerState.step === 0);

  const isLastStep = plannerState.step === plannerStepsLabels.length - 1;
  nextBtn.classList.toggle("hidden", isLastStep);
  finalBtns.classList.toggle("hidden", !isLastStep);
  finalBtns.classList.toggle("flex", isLastStep);
  nextBtn.disabled = !plannerCanProceed();
}

function showPlannerStep() {
  document.querySelectorAll(".planner-step").forEach((s, i) => {
    s.classList.toggle("hidden", i !== plannerState.step);
  });
  renderPlannerProgress();
  updatePlannerNav();
}

function plannerBuildMessage() {
  const advLabel = adventureTypes.find((a) => a.id === plannerState.adventure)?.label ?? "Not specified";
  return [
    "Hello Supreme Tanzania Safaris, I'd like to plan a trip to Tanzania.",
    "",
    `Adventure type: ${advLabel}`,
    `Travel date: ${plannerState.date || "Not specified"}`,
    `Number of travelers: ${plannerState.travelers}`,
    `Details: ${plannerState.details || "None provided"}`,
  ].join("\n");
}

function setupTripPlanner() {
  renderPlannerAdventureGrid();
  showPlannerStep();

  document.getElementById("plannerDate").addEventListener("change", (e) => {
    plannerState.date = e.target.value;
    updatePlannerNav();
  });

  document.getElementById("plannerDecBtn").addEventListener("click", () => {
    plannerState.travelers = Math.max(1, plannerState.travelers - 1);
    updatePlannerTravelersDisplay();
  });
  document.getElementById("plannerIncBtn").addEventListener("click", () => {
    plannerState.travelers = Math.min(20, plannerState.travelers + 1);
    updatePlannerTravelersDisplay();
  });

  document.getElementById("plannerDetails").addEventListener("input", (e) => {
    plannerState.details = e.target.value;
  });

  document.getElementById("plannerBackBtn").addEventListener("click", () => {
    plannerState.step = Math.max(0, plannerState.step - 1);
    showPlannerStep();
  });
  document.getElementById("plannerNextBtn").addEventListener("click", () => {
    if (plannerCanProceed()) {
      plannerState.step = Math.min(plannerStepsLabels.length - 1, plannerState.step + 1);
      showPlannerStep();
    }
  });
  document.getElementById("plannerResetBtn").addEventListener("click", () => {
    plannerState = { step: 0, adventure: "", date: "", travelers: 2, details: "" };
    document.getElementById("plannerDate").value = "";
    document.getElementById("plannerDetails").value = "";
    updatePlannerTravelersDisplay();
    renderPlannerAdventureGrid();
    showPlannerStep();
  });
  document.getElementById("plannerSubmitBtn").addEventListener("click", () => {
    window.open(whatsappLink(plannerBuildMessage()), "_blank", "noopener,noreferrer");
  });

  document.getElementById("plannerDate").min = new Date().toISOString().split("T")[0];
}

function updatePlannerTravelersDisplay() {
  document.getElementById("plannerTravelersCount").textContent = plannerState.travelers;
  document.getElementById("plannerTravelersLabel").textContent = plannerState.travelers === 1 ? "Traveler" : "Travelers";
}

/* ============ CONTACT FORM ============ */
function setupContactForm() {
  const travelersSelect = document.getElementById("contactTravelers");
  for (let n = 1; n <= 10; n++) {
    travelersSelect.appendChild(el(`<option value="${n}">${n} ${n === 1 ? "Traveler" : "Travelers"}</option>`));
  }
  travelersSelect.value = "1";

  const adventureSelect = document.getElementById("contactAdventure");
  adventureTypes.forEach((a) => {
    adventureSelect.appendChild(el(`<option value="${a.label}">${a.label}</option>`));
  });
  adventureSelect.value = "Safari";

  document.getElementById("contactDate").min = new Date().toISOString().split("T")[0];

  document.getElementById("contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const message = [
      "Hello Supreme Tanzania Safaris, I'd like to make an inquiry about your tourism services.",
      "",
      `Name: ${data.get("name") || "Not provided"}`,
      `Email: ${data.get("email") || "Not provided"}`,
      `Phone: ${data.get("phone") || "Not provided"}`,
      `Travel date: ${data.get("date") || "Not specified"}`,
      `Number of travelers: ${data.get("travelers") || "1"}`,
      `Adventure type: ${data.get("adventure") || "Safari"}`,
      `Message: ${data.get("message") || "None provided"}`,
    ].join("\n");
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
  });
}

/* ============ FLOATING WHATSAPP ============ */
function setupFloatingWhatsApp() {
  const wrap = document.getElementById("floatingWa");
  const panel = document.getElementById("floatingWaPanel");
  const toggle = document.getElementById("floatingWaToggle");
  const closeBtn = document.getElementById("floatingWaCloseBtn");
  let expanded = false;

  const onScroll = () => {
    const visible = window.scrollY > 300;
    wrap.classList.toggle("translate-y-0", visible);
    wrap.classList.toggle("opacity-100", visible);
    wrap.classList.toggle("translate-y-20", !visible);
    wrap.classList.toggle("opacity-0", !visible);
    wrap.classList.toggle("pointer-events-none", !visible);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  toggle.addEventListener("click", () => {
    expanded = !expanded;
    panel.classList.toggle("hidden", !expanded);
  });
  closeBtn.addEventListener("click", () => {
    expanded = false;
    panel.classList.add("hidden");
  });
}

/* ============ BACK TO TOP ============ */
function setupBackToTop() {
  const btn = document.getElementById("backToTop");
  const onScroll = () => {
    const visible = window.scrollY > 600;
    btn.classList.toggle("translate-y-0", visible);
    btn.classList.toggle("opacity-100", visible);
    btn.classList.toggle("translate-y-20", !visible);
    btn.classList.toggle("opacity-0", !visible);
    btn.classList.toggle("pointer-events-none", !visible);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* ============ REVIEWS CAROUSEL ============ */
function setupReviewsCarousel() {
  const scroller = document.getElementById("revScroll");
  if (!scroller) return;
  const step = () => Math.max(scroller.clientWidth * 0.8, 280);
  document.getElementById("revPrev").addEventListener("click", () => scroller.scrollBy({ left: -step(), behavior: "smooth" }));
  document.getElementById("revNext").addEventListener("click", () => scroller.scrollBy({ left: step(), behavior: "smooth" }));
}

/* ============ INIT ============ */
/* Each setup only runs if its section exists on the page, so this one
   script.js can be shared by every page without throwing errors. */
document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  if (document.getElementById("plannerProgress")) setupTripPlanner();
  if (document.getElementById("contactForm")) setupContactForm();
  if (document.getElementById("floatingWa")) setupFloatingWhatsApp();
  if (document.getElementById("backToTop")) setupBackToTop();
  setupReviewsCarousel();

  if (window.lucide) lucide.createIcons();
  setupReveal();
});
