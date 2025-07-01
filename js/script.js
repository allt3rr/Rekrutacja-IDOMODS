// Zmiana logo po najechaniu myszką

const logo = document.querySelector(".logo-full");
const logoImg = logo.querySelector(".logo-image");

logo.addEventListener("mouseover", () => {
  logoImg.src = "assets/FORMA_ICON_Fill.webp";
});

logo.addEventListener("mouseout", () => {
  logoImg.src = "assets/FORMA_ICON.webp";
});

// Podświetlenie menu
document.querySelectorAll("ul li a").forEach((link) => {
  if (window.location.pathname.endsWith(link.getAttribute("href"))) {
    link.classList.add("active");
  }
});

// Włącz/wyłącz mobile menu
function toggleMobileMenu(toggle) {
  const mobileMenuContainer = document.getElementsByClassName(
    "mobile-menu-wrapper"
  )[0];

  if (toggle) {
    mobileMenuContainer.style.display = "flex";
    document.body.style.overflow = "hidden";
  } else {
    mobileMenuContainer.style.display = "none";
    document.body.style.overflow = "";
  }
}
