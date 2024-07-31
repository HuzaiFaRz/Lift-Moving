const liftOpenDoor = () => {
  gsap.to(liftLeftDoor, {
    x: "-100%",
    duration: 2,
    ease: Power1.easeInOut,
    onComplete: () => {
      gsap.to(liftLeftDoor, {
        x: 0,
        delay: 1,
        duration: 2,
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
        duration: 2,
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

const floorRequest = [];

Array.from(liftBtns).forEach((liftBtnsElem, liftBtnsIndex) => {
  liftBtnsElem.addEventListener("click", (liftBtnsElemTarget) => {
    Array.from(Floors).forEach((FloorsElem, FloorIndex) => {
      liftAnimate = true;
      floorRequest.push(FloorIndex);

      console.log(floorRequest);

      if (liftAnimate) {
        if (
          FloorsElem.textContent ===
          liftBtnsElemTarget.currentTarget.textContent
        ) {
          gsap.to(lift, {
            top: FloorsElem.getBoundingClientRect().top + "px",
            bottom: FloorsElem.getBoundingClientRect().bottom + "px",
            duration: 1,
          });
        }
      }
      liftAnimate = false;
    });
  });
});

// liftBtns.forEach((liftBtnElem) => {
//   liftBtnElem.addEventListener("click", (t) => {
//     liftFloorArray.push(t.currentTarget.textContent);

//     liftFloor.forEach((liftFloorElem) => {
//       if (t.currentTarget.textContent === liftFloorElem.textContent) {
//         gsap.to(lift, {
//           top: liftFloorElem.getBoundingClientRect().top + "px",
//           bottom: liftFloorElem.getBoundingClientRect().bottom + "px",
//           duration: 3,
//           ease: Power1.easeInOut,
//           onComplete: () => {
//             setTimeout(liftOpenDoor, 0);
//             setTimeout(liftCloseDoor, 2000);
//             // setTimeout(liftBtnVisible, 2500);
//             // console.log("complete 1");
//           },
//         });
//         // liftFloorArray.pop(t.currentTarget.textContent);
//         // liftBtnUnVisible();
//       }
//     });

//     // liftBtnElem.addEventListener("click", (t) => {
//     //   liftFloor.forEach((liftFloorElem) => {
//     //     if (t.currentTarget.textContent === liftFloorElem.textContent) {
//     //       gsap.to(lift, {
//     //         top: liftFloorElem.getBoundingClientRect().top + "px",
//     //         bottom: liftFloorElem.getBoundingClientRect().bottom + "px",
//     //         duration: 0,
//     //         ease: Power1.easeInOut,
//     //         onComplete: () => {
//     //           setTimeout(liftOpenDoor, 0);
//     //           setTimeout(liftCloseDoor, 2000);
//     //           // setTimeout(liftBtnVisible, 2500);
//     //           console.log("complete 2");
//     //         },
//     //       });
//     //       // liftBtnUnVisible();
//     //     }
//     //   });
//     // });
//   });
// });
