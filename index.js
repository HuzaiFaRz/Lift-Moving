const liftFloors = document.querySelector(".lift-floors");
const liftBtn = document.querySelectorAll(".lift-btn");
const liftFloor = document.querySelectorAll(".floor");
const lift = document.querySelector(".lift");
const liftLeftDoor = document.querySelector(".lift-left-door");
const liftRightDoor = document.querySelector(".lift-right-door");
let btnClickCheck = 0;
gsap.to(lift, {
  top: liftFloor[6].getBoundingClientRect().top + "px",
  duration: 0,
});

const floorsArray = [
  liftFloor[0].textContent,
  liftFloor[1].textContent,
  liftFloor[2].textContent,
  liftFloor[3].textContent,
  liftFloor[4].textContent,
  liftFloor[5].textContent,
  liftFloor[6].textContent,
];

const liftBtnsArray = [
  liftBtn[0].textContent,
  liftBtn[1].textContent,
  liftBtn[2].textContent,
  liftBtn[3].textContent,
  liftBtn[4].textContent,
  liftBtn[5].textContent,
  liftBtn[6].textContent,
];

for (let index = 0; index < floorsArray.length; index++) {
  console.log(index);
}

console.log(this);

for (let index = 0; index < liftBtnsArray.length; index++) {
  console.log(index);
}

let index = 0;

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
  liftBtn.forEach((e) => {
    gsap.to(e, {
      cursor: "pointer",
      opacity: 1,
      zIndex: 1,
    });
  });
};

const liftBtnUnVisible = () => {
  liftBtn.forEach((e) => {
    gsap.to(e, {
      cursor: "default",
      opacity: 0.5,
      zIndex: -1,
    });
  });
};

liftBtn.forEach((liftBtnElem) => {
  liftBtnElem.addEventListener("click", (t) => {
    btnClickCheck++;
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
            console.log("complete 1");
          },
        });
        liftBtnUnVisible();
      }
    });
    liftBtnElem.addEventListener("click", (t) => {
      liftFloor.forEach((liftFloorElem) => {
        if (t.currentTarget.textContent === liftFloorElem.textContent) {
          gsap.to(lift, {
            top: liftFloorElem.getBoundingClientRect().top + "px",
            bottom: liftFloorElem.getBoundingClientRect().bottom + "px",
            duration: 0,
            ease: Power1.easeInOut,
            onComplete: () => {
              setTimeout(liftOpenDoor, 0);
              setTimeout(liftCloseDoor, 2000);
              setTimeout(liftBtnVisible, 2500);
              console.log("complete 2");
            },
          });
          liftBtnUnVisible();
        }
      });
    });
  });
});
