const liftFloors = document.querySelector(".lift-floors");
const liftBtn = document.querySelectorAll(".lift-btn");
const liftFloor = document.querySelectorAll(".floor");
const lift = document.querySelector(".lift");
liftBtn.forEach((e) => {
  e.addEventListener("click", (t) => {
    liftFloor.forEach((e) => {
      if (t.currentTarget.textContent === e.textContent) {
        gsap.to(lift, {
          top: e.getBoundingClientRect().top + "px",
          bottom: e.getBoundingClientRect().bottom + "px",
          duration: 4,
          ease: Power2.easeInOut,
        });
      }
    });
  });
});
