import gsap from "gsap";

const navToggler = document.querySelector(".nav-toggler");
const menuOverlay = document.querySelector(".menu-overlay");
const menuOverlayBg = document.querySelector(".menu-overlay-bg");
const player = document.querySelector(".player");
const tapes = document.querySelectorAll(".tape");

const isMobile = window.matchMedia("(max-width: 1000px)").matches;

gsap.set(player, { yPercent: 300, rotation: 30 });
gsap.set(tapes, { yPercent: 325, rotation: 30 });

let isMenuOpen = false;

navToggler.addEventListener("click", () => {
  isMenuOpen = !isMenuOpen;
  isMenuOpen ? openTl.restart() : closeTl.restart();
});

const openTl = gsap.timeline({
  paused: true,
  defaults: { ease: "power3.out" },
});

openTl
  .to(
    menuOverlay,
    { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1 },
    0,
  )
  .to(menuOverlayBg, { y: "0%", duration: 1 }, 0);

openTl.to([player, ...tapes], { yPercent: 0, rotation: -15, duration: 1 }, 0.2);

openTl.to(tapes, { y: -175, rotation: 0, duration: 0.5 }, "-=0.5");

openTl.to(
  player,
  {
    yPercent: isMobile ? 200 : 175,
    rotation: 0,
    duration: 1,
    ease: "power2.inOut",
  },
  1.1,
);

openTl.to(
  tapes,
  {
    y: 0,
    xPercent: isMobile ? 0 : (i) => (i - 1.5) * 110,
    yPercent: isMobile ? (i) => -75 + i * 65 : 5,
    duration: 1,
    ease: "power3.inOut",
    stagger: 0.035,
  },
  "<",
);

const closeTl = gsap.timeline({
  paused: true,
  defaults: { ease: "power3.inOut" },
});

if (isMobile) {
  closeTl.to(
    tapes,
    {
      xPercent: 0,
      x: 0,
      y: 0,
      rotation: 0,
      yPercent: 250,
      duration: 1,
      overwrite: "auto",
    },
    0,
  );
} else {
  closeTl.to(
    tapes,
    {
      xPercent: 0,
      yPercent: 5,
      x: 0,
      y: 0,
      rotation: 0,
      duration: 0.65,
      stagger: 0.035,
      overwrite: "auto",
    },
    0,
  );

  closeTl.to(tapes, { yPercent: 250, duration: 1 }, "-=0.35");
}

closeTl.to(
  player,
  {
    keyframes: {
      yPercent: isMobile ? [200, 210, 200] : [175, 185, 175],
      rotation: [0, -4, 0],
      easeEach: "power2.inOut",
    },
    duration: 0.35,
  },
  isMobile ? "0.65" : "1",
);

closeTl.to([player, ...tapes], { yPercent: 300, duration: 0.5 }, "1.5");

closeTl
  .to(
    menuOverlay,
    {
      clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      duration: 0.75,
    },
    isMobile ? "-=0.5" : "-=0.35",
  )
  .to(menuOverlayBg, { y: "25%", duration: 0.75 }, "<");
