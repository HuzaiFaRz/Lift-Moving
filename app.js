// Function to animate the opening and closing of lift doors
const liftOpenDoor = () => {
  // Animate the left door to move left and hide
  gsap.to(liftLeftDoor, {
    x: "-100%", // Move the door completely to the left
    duration: 1.5, // Duration of the animation
    ease: Power1.easeInOut, // Easing function for smooth animation
    onComplete: () => {
      // After opening, animate the left door to close
      gsap.to(liftLeftDoor, {
        x: 0, // Move the door back to the original position
        delay: 1, // Delay before closing
        duration: 1.2, // Duration of the closing animation
        ease: Power1.easeInOut, // Easing function for smooth animation
      });
    },
  });
  // Animate the right door to move right and hide
  gsap.to(liftRightDoor, {
    x: "100%", // Move the door completely to the right
    duration: 1.5, // Duration of the animation
    ease: Power1.easeInOut, // Easing function for smooth animation
    onComplete: () => {
      // After opening, animate the right door to close
      gsap.to(liftRightDoor, {
        x: 0, // Move the door back to the original position
        delay: 1, // Delay before closing
        duration: 1.2, // Duration of the closing animation
        ease: Power1.easeInOut, // Easing function for smooth animation
      });
    },
  });
};

// Get references to DOM elements related to the lift
const liftFloors = document.querySelector(".lift-floors");
const liftBtns = document.querySelectorAll(".lift-btn");
const Floors = document.querySelectorAll(".floor");
const lift = document.querySelector(".lift");
const liftLeftDoor = document.querySelector(".lift-left-door");
const liftRightDoor = document.querySelector(".lift-right-door");

// Track if a lift button has been clicked
let liftBtnClickCheck = 0;
// Track if the lift is currently animating
let liftAnimate = false;

// Initialize lift position to match the top position of the 6th floor
gsap.to(lift, {
  top: Floors[5].getBoundingClientRect().top + "px", // Set the lift's top position to the 6th floor
  duration: 0, // No animation duration, set immediately
});

// Array to keep track of floor requests
const floorRequestArray = [];

// Function to handle the animation of the lift based on floor requests
const flooranimationChecker = (duration) => {
  // If there are no floor requests, stop animation
  if (floorRequestArray.length === 0) {
    liftAnimate = false;
    return;
  }

  // Set animation flag to true as there's a request to process
  liftAnimate = true;
  // Get the index of the next floor request
  let floorRequestArrayIndex = floorRequestArray.shift();

  // Animate the lift to move to the requested floor
  gsap.to(lift, {
    top: Floors[floorRequestArrayIndex].getBoundingClientRect().top + "px", // Move the lift to the requested floor
    duration: duration, // Duration of the animation
    ease: Power4.easeInOut, // Easing function for smooth animation
    onComplete: () => {
      // Once lift reaches the floor, open the doors
      liftOpenDoor();
      // After opening the doors, wait for 4 seconds before processing the next request
      setTimeout(() => {
        flooranimationChecker(4); // Check for new floor requests
        // Re-enable the button for the current floor
        gsap.to(liftBtns[floorRequestArrayIndex], {
          backgroundColor: "gray", // Change button color to gray
          zIndex: 1, // Set button to be above others
          opacity: 1, // Make button fully visible
          cursor: "pointer", // Set cursor to pointer
        });
      }, 4000);
    },
  });
};

// Start processing floor requests with an initial duration of 4 seconds
flooranimationChecker(4);

// Add click event listeners to each lift button
Array.from(liftBtns).forEach((liftBtnsElem) => {
  liftBtnsElem.addEventListener("click", (liftBtnsElemTarget) => {
    liftBtnClickCheck++; // Increment click check
    // Animate button background color to black
    gsap.to(liftBtnsElem, {
      backgroundColor: "black",
    });
    // Iterate over all floors to match the clicked button's text
    Array.from(Floors).forEach((e, i) => {
      if (e.textContent === liftBtnsElemTarget.currentTarget.textContent) {
        // Add the index of the requested floor to the request array
        floorRequestArray.push(i);
        // If it's the first click and the button corresponds to the 6th floor, process immediately
        if (liftBtnClickCheck === 1 && i === 5) {
          flooranimationChecker(1); // Animate lift with a duration of 1 second
          liftBtnClickCheck = 0; // Reset click check
        }
        // Disable the button for the requested floor
        gsap.to(liftBtns[i], {
          backgroundColor: "black", // Change button color to black
          zIndex: -1, // Send button behind others
          cursor: "not-allowed", // Change cursor to not-allowed
        });
        // If the lift is not animating, start processing requests
        if (!liftAnimate) {
          flooranimationChecker(4);
        }
      }
    });
  });
});

// Add mouse enter and leave event listeners to each lift button for hover effects
liftBtns.forEach((e) => {
  e.addEventListener("mouseenter", () => {
    // Change button color to black on mouse enter
    gsap.to(e, {
      duration: 0, // No animation duration, change immediately
      backgroundColor: "black",
    });
  });
  e.addEventListener("mouseleave", () => {
    // Change button color back to gray on mouse leave
    gsap.to(e, {
      duration: 0, // No animation duration, change immediately
      backgroundColor: "grey",
    });
  });
});
