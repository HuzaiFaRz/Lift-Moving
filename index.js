const liftFloors = document.querySelector(".lift-floors");
const liftBtn = document.querySelectorAll(".lift-btn");
const liftFloor = document.querySelectorAll(".floor");
const lift = document.querySelector(".lift");
const liftLeftDoor = document.querySelector(".lift-left-door");
const liftRightDoor = document.querySelector(".lift-right-door");
liftBtn.forEach((e) => {
  e.addEventListener("click", (t) => {
    liftFloor.forEach((e) => {
      if (t.currentTarget.textContent === e.textContent) {
        gsap.to(lift, {
          top: e.getBoundingClientRect().top + "px",
          bottom: e.getBoundingClientRect().bottom + "px",
          duration: 1,
          ease: Power2.easeInOut,
        });
        let liftOpenDoor = setInterval(() => {
          gsap.to(liftLeftDoor, {
            x: "-100%",
            duration: 1,
            ease: Power2.easeInOut,
          });
          gsap.to(liftRightDoor, {
            x: "100%",
            duration: 1,
            ease: Power2.easeInOut,
          });
          setInterval(() => {
            gsap.to(liftLeftDoor, {
              x: 0,
              duration: 1,
              ease: Power2.easeInOut,
            });
            gsap.to(liftRightDoor, {
              x: 0,
              duration: 1,
              ease: Power2.easeInOut,
            });
          }, 2000);
          clearInterval(liftOpenDoor);
        }, 1000);
      }
    });
  });
});
