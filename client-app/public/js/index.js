var toTopButton = document.getElementById("to-top-button");
var carouselDot = document.getElementById("carousel-tailwind-dot");

window.onscroll = function () {
  if (
    document.body.scrollTop > 200 ||
    document.documentElement.scrollTop > 200
  ) {
    toTopButton.classList.remove("hidden");
  } else {
    toTopButton.classList.add("hidden");
  }
}; 

function goToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
