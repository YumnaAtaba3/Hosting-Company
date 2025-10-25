
//swiper for hero section
const swiper = new Swiper(".heroSwiper", {
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
  effect: "slide",
});

//swiper for features section
  const featureSwiper = new Swiper(".featureSwiper", {
    slidesPerView: 4,
    spaceBetween: 30,
    loop: true,
    navigation: {
      nextEl: ".feature-next",
      prevEl: ".feature-prev",
    },
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    breakpoints: {
      992: { slidesPerView: 4 },
      768: { slidesPerView: 2 },
      0: { slidesPerView: 1 },
    },
  });

  //nav underline tab
    document.addEventListener("DOMContentLoaded", () => {
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
    });


    //drawer
drawerBtn.addEventListener("click", () => {
  mobileDrawer.classList.remove("d-none");
  mobileDrawer.classList.add("show");
});

closeDrawer.addEventListener("click", () => {
  mobileDrawer.classList.remove("show");
  mobileDrawer.classList.add("d-none");
});

