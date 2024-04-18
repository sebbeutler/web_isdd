const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const slidesContainer = document.querySelector(".slides-container");
const slides = document.querySelectorAll(".slides-container img");

const totalSlides = slides.length;
let currentIndex = 0;

// Fonction pour passer à la diapositive suivante
function nextSlide() {
  goToSlide(currentIndex + 1);
}

// Fonction pour passer à la diapositive précédente
function prevSlide() {
  goToSlide(currentIndex - 1);
}

// Écouteurs d'événements pour les boutons de navigation
prevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);

// Fonction pour afficher une diapositive spécifique
function goToSlide(index) {
  slides[currentIndex].classList.remove("active");

  // Gérer les index négatifs
  if (index < 0) {
    index = totalSlides - 1;
  }
  // Gérer les index supérieurs au nombre total de diapositives
  else if (index >= totalSlides) {
    index = 0;
  }

  slides[index].classList.add("active");
  currentIndex = index;

  // Défilement de la liste des diapositives
  const slideWidth = slides[0].offsetWidth;
  slidesContainer.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
}

// Affichage initial de la première diapositive
slides[currentIndex].classList.add("active");

// Timer pour passer automatiquement à la diapositive suivante toutes les 3 secondes
setInterval(nextSlide, 5000);