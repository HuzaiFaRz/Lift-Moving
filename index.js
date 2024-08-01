const liftOpenDoor = () => {
  gsap.to(liftLeftDoor, {
    x: "-100%",
    duration: 1,
    ease: Power1.easeInOut,
    onComplete: () => {
      gsap.to(liftLeftDoor, {
        x: 0,
        delay: 1,
        duration: 1,
        ease: Power1.easeInOut,
      });
    },
  });
  gsap.to(liftRightDoor, {
    x: "100%",
    duration: 1,
    ease: Power1.easeInOut,
    onComplete: () => {
      gsap.to(liftRightDoor, {
        x: 0,
        delay: 1,
        duration: 1,
        ease: Power1.easeInOut,
      });
    },
  });
};

const liftBtnVisible = () => {
  liftBtns.forEach((e) => {
    gsap.to(e, {
      cursor: "pointer",
      opacity: 1,
      zIndex: 1,
    });
  });
};

const liftBtnUnVisible = () => {
  liftBtns.forEach((e) => {
    gsap.to(e, {
      cursor: "default",
      opacity: 0.5,
      zIndex: -1,
    });
  });
};

const liftFloors = document.querySelector(".lift-floors");
const liftBtns = document.querySelectorAll(".lift-btn");
const Floors = document.querySelectorAll(".floor");
const lift = document.querySelector(".lift");
const liftLeftDoor = document.querySelector(".lift-left-door");
const liftRightDoor = document.querySelector(".lift-right-door");

let liftAnimate = false;

gsap.to(lift, {
  top: Floors[6].getBoundingClientRect().top + "px",
  duration: 0,
});

const floorRequestArray = [];

const flooranimationChecker = () => {
  if (floorRequestArray.length === 0) {
    liftAnimate = false;
    return;
  }

  liftAnimate = true;
  let floorRequestArrayIndex = floorRequestArray.shift();

  gsap.to(lift, {
    top: Floors[floorRequestArrayIndex].getBoundingClientRect().top + "px",
    duration: 1,
    onComplete: () => {
      liftOpenDoor();
      setTimeout(() => {
        flooranimationChecker();
        gsap.to(liftBtns[floorRequestArrayIndex], {
          backgroundColor: "gray",
        });
      }, 3000);
    },
  });
};
flooranimationChecker();

Array.from(liftBtns).forEach((liftBtnsElem) => {
  liftBtnsElem.addEventListener("click", (liftBtnsElemTarget) => {
    gsap.to(liftBtnsElem, {
      backgroundColor: "black",
    });

    const FloorsFinder = Array.from(Floors).findIndex((e) => {
      console.log(e.textContent);
      return e.textContent === liftBtnsElemTarget.currentTarget.textContent;
    });

    if (FloorsFinder || !FloorsFinder) {
      floorRequestArray.push(FloorsFinder);
      gsap.to(liftBtns[FloorsFinder], {
        backgroundColor: "black",
      });
      if (!liftAnimate) {
        flooranimationChecker();
      }
    }
  });
});
