const liftFloors = document.querySelector(".lift-floors");
const liftBtn = document.querySelectorAll(".lift-btn");
const liftFloor = document.querySelectorAll(".floor");
const lift = document.querySelector(".lift");
const liftLeftDoor = document.querySelector(".lift-left-door");
const liftRightDoor = document.querySelector(".lift-right-door");

const liftOpenDoor = () => {
  gsap.to(liftLeftDoor, {
    x: "-100%",
    duration: 1,
    ease: Power1.easeInOut,
  });
  gsap.to(liftRightDoor, {
    x: "100%",
    duration: 1,
    ease: Power1.easeInOut,
  });
};

const liftCloseDoor = () => {
  gsap.to(liftLeftDoor, {
    x: 0,
    duration: 1,
    ease: Power1.easeInOut,
  });
  gsap.to(liftRightDoor, {
    x: 0,
    duration: 1,
    ease: Power1.easeInOut,
  });
};

const liftBtnVisible = () => {
  {
    liftBtn.forEach((e) => {
      gsap.to(e, {
        cursor: "pointer",
        opacity: 1,
        zIndex: 1,
      });
    });
  }
};

const liftBtnUnVisible = () => {
  {
    liftBtn.forEach((e) => {
      gsap.to(e, {
        cursor: "default",
        opacity: 0.5,
        zIndex: -1,
      });
    });
  }
};

liftBtn.forEach((liftBtnElem) => {
  liftBtnElem.addEventListener("click", (t) => {
    liftFloor.forEach((liftFloorElem) => {
      if (t.currentTarget.textContent === liftFloorElem.textContent) {
        gsap.to(lift, {
          top: liftFloorElem.getBoundingClientRect().top + "px",
          bottom: liftFloorElem.getBoundingClientRect().bottom + "px",
          duration: 3,
          ease: Power1.easeInOut,
          onComplete: () => {
            setTimeout(liftOpenDoor, 0);
            setTimeout(liftCloseDoor, 2000);
            setTimeout(liftBtnVisible, 2500);
          },
        });
        liftBtnUnVisible();
      }
    });
  });
});
