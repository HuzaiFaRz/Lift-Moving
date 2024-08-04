// Function to animate the lift doors opening and closing
const liftOpenDoor = () => {
  // Animate the left door sliding open to the left by 100% of its width
  gsap.to(liftLeftDoor, {
    x: "-100%", // Move left door to the left
    duration: 1.5, // Animation duration
    ease: Power1.easeInOut, // Easing function for smooth animation
    onComplete: () => {
      // Callback function when the animation completes
      // Animate the left door sliding back to its original position
      gsap.to(liftLeftDoor, {
        x: 0, // Move left door back to original position
        delay: 1, // Delay before starting the reverse animation
        duration: 1.2, // Duration of the reverse animation
        ease: Power1.easeInOut, // Easing function for smooth animation
      });
    },
  });

  // Animate the right door sliding open to the right by 100% of its width
  gsap.to(liftRightDoor, {
    x: "100%", // Move right door to the right
    duration: 1.5, // Animation duration
    ease: Power1.easeInOut, // Easing function for smooth animation
    onComplete: () => {
      // Callback function when the animation completes
      // Animate the right door sliding back to its original position
      gsap.to(liftRightDoor, {
        x: 0, // Move right door back to original position
        delay: 1, // Delay before starting the reverse animation
        duration: 1.2, // Duration of the reverse animation
        ease: Power1.easeInOut, // Easing function for smooth animation
      });
    },
  });
};

// Select the lift floors container element
const liftFloors = document.querySelector(".lift-floors");
// Select all lift button elements
const liftBtns = document.querySelectorAll(".lift-btn");
// Select all floor elements
const Floors = document.querySelectorAll(".floor");
// Select the lift container element
const lift = document.querySelector(".lift");
// Select the left door of the lift
const liftLeftDoor = document.querySelector(".lift-left-door");
// Select the right door of the lift
const liftRightDoor = document.querySelector(".lift-right-door");

// Variable to track whether the lift is currently animating
let liftAnimate = false;

// Initialize the lift position to the top of the 6th floor (index 5)
gsap.to(lift, {
  top: Floors[5].getBoundingClientRect().top + "px", // Set lift's top position
  duration: 0, // Instant move
});

// Array to keep track of floor requests
const floorRequestArray = [];

// Function to handle lift animations based on floor requests
const flooranimationChecker = (duration) => {
  // If there are no floor requests, stop the lift animation
  if (floorRequestArray.length === 0) {
    liftAnimate = false; // Set lift animation flag to false
    return; // Exit the function
  }

  liftAnimate = true; // Set lift animation flag to true
  let floorRequestArrayIndex = floorRequestArray.shift(); // Get the next floor request

  // Animate the lift to move to the requested floor
  gsap.to(lift, {
    top: Floors[floorRequestArrayIndex].getBoundingClientRect().top + "px", // Move lift to requested floor
    duration: duration, // Duration of the animation
    ease: Power4.easeInOut, // Easing function for smooth animation
    onComplete: () => {
      // Callback function when the animation completes
      liftOpenDoor(); // Open the lift doors
      setTimeout(() => {
        // Delay before processing the next request
        flooranimationChecker(4); // Continue processing the next request
        // Re-enable the button for the floor that has been reached
        gsap.to(liftBtns[floorRequestArrayIndex], {
          backgroundColor: "gray", // Change button color to gray
          zIndex: 1, // Adjust stacking order
          opacity: 1, // Set button opacity
          cursor: "pointer", // Change cursor to pointer
        });
      }, 4000); // Delay of 4 seconds before re-enabling the button
    },
  });
};

// Start the floor animation checker with a default duration of 4 seconds
flooranimationChecker(4);

// Add event listeners to each lift button
Array.from(liftBtns).forEach((liftBtnsElem) => {
  liftBtnsElem.addEventListener("click", (liftBtnsElemTarget) => {
    // Animate the button color change on click
    gsap.to(liftBtnsElem, {
      backgroundColor: "black", // Change button color to black
    });

    // Iterate through each floor to find the corresponding floor index
    Array.from(Floors).forEach((e, i) => {
      if (e.textContent === liftBtnsElemTarget.currentTarget.textContent) {
        // Check if the button corresponds to the floor
        floorRequestArray.push(i); // Add the floor index to the request array
        if (i === 5) {
          // Special case if the requested floor is the 6th floor (index 5)
          flooranimationChecker(1); // Start animation with a shorter duration
        }
        // Disable the button and change its appearance
        gsap.to(liftBtns[i], {
          backgroundColor: "black", // Change button color to black
          zIndex: -1, // Adjust stacking order
          cursor: "not-allowed", // Change cursor to not-allowed
        });
        // If the lift is not animating, start the animation
        if (!liftAnimate) {
          flooranimationChecker(4); // Start animation with a default duration
        }
      }
    });
  });
});

// Add event listeners for mouse enter and leave events on lift buttons
liftBtns.forEach((e) => {
  e.addEventListener("mouseenter", () => {
    // Change button color on mouse enter
    gsap.to(e, {
      duration: 0, // Instant color change
      backgroundColor: "black", // Change button color to black
    });
  });
  e.addEventListener("mouseleave", () => {
    // Change button color back on mouse leave
    gsap.to(e, {
      duration: 0, // Instant color change
      backgroundColor: "grey", // Change button color to grey
    });
  });
});
