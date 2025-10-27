let translations = { en: {}, ar: {} };
let heroSwiper;


async function loadTranslations() {
  try {
    const res = await fetch("locales/translations.json");
    translations = await res.json();
  } catch (error) {
    console.error("Failed to load translations:", error);
  }
}


function translatePage(lang) {
  if (!translations[lang]) return;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) el.textContent = translations[lang][key];
  });

  document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  document.documentElement.setAttribute("lang", lang);

  const rtlLink = document.getElementById("bootstrap-rtl");
  if (rtlLink) rtlLink.disabled = lang !== "ar";

  localStorage.setItem("lang", lang);

  initHeroSwiper();
  initFeatureSwiper();
}

// Initialize Hero Swiper
function initHeroSwiper() {
  const isRTL = document.documentElement.getAttribute("dir") === "rtl";

  if (heroSwiper) heroSwiper.destroy(true, true);

  heroSwiper = new Swiper(".heroSwiper", {
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    speed: 800,
    rtl: isRTL,
    effect: "slide",
  });
}

// Initialize Features Swiper
let featureSwiper;

function initFeatureSwiper() {
  const isRTL = document.documentElement.getAttribute("dir") === "rtl";

  // Destroy existing swiper before creating a new one
  if (featureSwiper) {
    featureSwiper.destroy(true, true);
  }

  featureSwiper = new Swiper(".featureSwiper", {
    slidesPerView: 4,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".feature-next",
      prevEl: ".feature-prev",
    },
    breakpoints: {
      1200: { slidesPerView: 4, spaceBetween: 30 },
      992: { slidesPerView: 3, spaceBetween: 25 },
      768: { slidesPerView: 2, spaceBetween: 20 },
      0: { slidesPerView: 1, spaceBetween: 10 },
    },
    rtl: isRTL,
  });
}

// Pricing Tabs
function initPricingTabs() {
  const basicTab = document.getElementById("basic-tab");
  const premiumTab = document.getElementById("premium-tab");
  const basicPlans = document.getElementById("basic-plans");
  const premiumPlans = document.getElementById("premium-plans");

  function showBasic() {
    basicPlans.classList.remove("d-none");
    premiumPlans.classList.add("d-none");
    basicTab.classList.add("active");
    premiumTab.classList.remove("active");
  }

  function showPremium() {
    premiumPlans.classList.remove("d-none");
    basicPlans.classList.add("d-none");
    premiumTab.classList.add("active");
    basicTab.classList.remove("active");
  }

  showBasic();

  basicTab.addEventListener("click", showBasic);
  premiumTab.addEventListener("click", showPremium);
}

// Mobile Drawer
function initDrawer() {
  const drawerBtn = document.getElementById("drawerBtn");
  const closeDrawer = document.getElementById("closeDrawer");
  const mobileDrawer = document.getElementById("mobileDrawer");

  drawerBtn.addEventListener("click", () => {
    mobileDrawer.classList.remove("d-none");
    mobileDrawer.classList.add("show");
  });

  closeDrawer.addEventListener("click", () => {
    mobileDrawer.classList.remove("show");
    mobileDrawer.classList.add("d-none");
  });
}


document.addEventListener("DOMContentLoaded", async () => {
  await loadTranslations();

  let currentLang = localStorage.getItem("lang") || "en";
  translatePage(currentLang);


  const langBtn = document.getElementById("langToggle");
  if (langBtn) {
    langBtn.textContent = currentLang.toUpperCase();
    langBtn.addEventListener("click", () => {
      currentLang = currentLang === "en" ? "ar" : "en";
      translatePage(currentLang);
      langBtn.textContent = currentLang.toUpperCase();
    });
  }


  initHeroSwiper();
  initFeatureSwiper();
  initPricingTabs();
  initDrawer();
});


document.addEventListener("DOMContentLoaded", () => {
  const toggleSwitch = document.getElementById("switch");

 
  const priceElements = document.querySelectorAll(".pricing-card h2");
  const originalPrices = Array.from(priceElements).map((el) => {
    return parseFloat(el.textContent.replace(/[^0-9.]/g, ""));
  });

  toggleSwitch.addEventListener("change", () => {
    priceElements.forEach((el, idx) => {
      let price = originalPrices[idx];
      if (toggleSwitch.checked) {
        
        let discountedPrice = (price * 12 * 0.8).toFixed(2); 
        el.innerHTML = `$${discountedPrice}<span class="fs-6 fw-normal"> /year</span>`;
      } else {
        
        el.innerHTML = `$${originalPrices[idx].toFixed(
          2
        )}<span class="fs-6 fw-normal"> /month</span>`;
      }
    });
  });
});