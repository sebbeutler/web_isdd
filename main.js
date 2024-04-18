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
// hiddenElements.forEach((el) => observer.observe(el));


// BLOB
const blobAnimation = KUTE.fromTo(
    '#blob1',
    { path: "#blob1" },
    { path: "#blob2" },
    { repeat: 999, duration: 9000, yoyo: true }
);
// blobAnimation.start();

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
        // circleAnimation.start();
    }
}

let section = document.querySelectorAll("section");
let menu = document.querySelectorAll("header nav a");

window.onscroll = () => {
  section.forEach((i) => {
    let top = window.scrollY;
    let offset = i.offsetTop - 150;
    let height = i.offsetHeight;
    let id = i.getAttribute("id");

    if (top >= offset && top < offset + height) {
      menu.forEach((link) => {
        link.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });
};

function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);

// To check the scroll position on page load
reveal();