// SCROLL SHOW/HIDE
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));


// BLOB
const blobAnimation = KUTE.fromTo(
  '#blob1',
  { path: "#blob1" },
  { path: "#blob2" },
  { repeat: 999, duration: 9000, yoyo: true }
);
blobAnimation.start();

// GRADIENT
// Get all the initial and final circles
const initialCircles = document.querySelectorAll('circle[id^="circle"]');
const finalCircles = document.querySelectorAll('circle[id^="final"]');

// Make sure we have the same number of initial and final circles
if (initialCircles.length !== finalCircles.length) {
  console.error('Mismatch in number of initial and final circles');
} else {
  // Loop through each pair of circles
  for (let i = 0; i < initialCircles.length; i++) {
    // Get the initial and final positions
    const initialX = initialCircles[i].getAttribute('cx');
    const initialY = initialCircles[i].getAttribute('cy');
    const finalX = finalCircles[i].getAttribute('cx');
    const finalY = finalCircles[i].getAttribute('cy');

    // Create the animation
    const circleAnimation = KUTE.fromTo(
      initialCircles[i],
      { attr: { cx: initialX, cy: initialY } },
      { attr: { cx: finalX, cy: finalY } },
      { repeat: 999, duration: 9000, yoyo: true }
    );
    circleAnimation.start();
  }
}


// NAVIGATION BAR
const mobileNav = document.querySelector(".hamburger");
const navbar = document.querySelector(".menubar");

mobileNav.addEventListener("click", () => {
  navbar.classList.toggle("active");
  mobileNav.classList.toggle("hamburger-active");
});
