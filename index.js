const liftOpenDoor = () => {
  gsap.to(liftLeftDoor, {
    x: "-100%",
    duration: 2,
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
    duration: 2,
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
    duration: 5,
    onComplete: () => {
      liftOpenDoor();
      flooranimationChecker();
      setTimeout(() => {
        gsap.to(liftBtns[floorRequestArrayIndex], {
          backgroundColor: "gray",
          zIndex: 1,
          opacity: 1,
          cursor: "pointer",
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
    Array.from(Floors).forEach((e, i) => {
      if (e.textContent === liftBtnsElemTarget.currentTarget.textContent) {
        floorRequestArray.push(i);
        gsap.to(liftBtns[i], {
          backgroundColor: "black",
          zIndex: 0,
          opacity: 0.5,
          cursor: "not-allowed",
        });
        if (!liftAnimate) {
          flooranimationChecker();
        }
      }
    });
  });
});
