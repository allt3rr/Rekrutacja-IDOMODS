const products = [
  {
    name: "Dark blue alpine climbing jacket",
    price: 300.0,
    image: "assets/slider/slider_products/product_photo_01.webp",
    bestseller: true,
    limitedEdition: false,
  },
  {
    name: "Orange helmet for alpine TOUNDRA",
    price: 300.0,
    image: "assets/slider/slider_products/product_photo_02.webp",
    bestseller: false,
    limitedEdition: true,
  },
  {
    name: "Grey alpine climbing jacket",
    price: 300.0,
    image: "assets/slider/slider_products/product_photo_03.webp",
    bestseller: false,
    limitedEdition: false,
  },
  {
    name: "Dark blue alpine climbing jacket",
    price: 300.0,
    image: "assets/slider/slider_products/product_photo_01.webp",
    bestseller: true,
    limitedEdition: false,
  },
  {
    name: "Orange helmet for alpine TOUNDRA",
    price: 300.0,
    image: "assets/slider/slider_products/product_photo_02.webp",
    bestseller: false,
    limitedEdition: true,
  },
  {
    name: "Grey alpine climbing jacket",
    price: 300.0,
    image: "assets/slider/slider_products/product_photo_03.webp",
    bestseller: false,
    limitedEdition: false,
  },
];

// Dodanie produktów do slidera
const wrapper = document.querySelector(".swiper-wrapper");

wrapper.innerHTML = "";

products.forEach((product) => {
  const slide = document.createElement("div");
  slide.classList.add("swiper-slide");
  slide.innerHTML = `
    <div class="slider-product-image">
        <img src="${product.image}" srcset="${
    product.image
  } 1x, ${product.image.replace(
    ".webp",
    "@2x.webp"
  )} 2x, ${product.image.replace(".webp", "@3x.webp")} 3x" alt="Product: ${
    product.name
  }" loading="lazy" />
    </div>
    <div class="product-info">
        <h2>${product.name}</h2>
        <p>€${product.price.toFixed(2)} EUR</p>
        ${
          product.bestseller
            ? '<span class="badge bestseller">Bestseller</span>'
            : ""
        }
        ${
          product.limitedEdition
            ? '<span class="badge limited">Limited Edition</span>'
            : ""
        }
    </div>
    <button class="btn btn-fav"><img src="assets/slider/FAV_FILL.webp" data-fav="false" alt="Add to favorites" loading="lazy" /></button>
    `;
  wrapper.appendChild(slide);
});

// Inicjalizajca Swipera
const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  slidesPerView: 1.3,
  spaceBetween: 20,
  slidesOffsetAfter: 70,
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    768: {
      slidesPerView: 3,
    },
    1280: {
      slidesPerView: 4,
    },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
    disabledClass: "swiper-button-disabled",
  },
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

// Możliwość dodania do polubionych
document.querySelectorAll(".btn-fav img").forEach((heart) => {
  heart.addEventListener("click", function () {
    const isFav = this.getAttribute("data-fav") === "true";
    if (isFav) {
      this.src = "assets/slider/FAV_FILL.webp";
      this.setAttribute("data-fav", "false");
    } else {
      this.src = "assets/slider/FAV_FILL_FULL.webp";
      this.setAttribute("data-fav", "true");
    }
  });
});
