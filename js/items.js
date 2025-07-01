const selectTag = document.querySelector("#items-amount");
const itemsContainer = document.querySelector(".items-container");

let pageNumber = 1;
let itemsPerPage = 14;
let items_amount = 0;

// Wypełnienie selecta opcjami od 14 do 36
for (let i = 14; i <= 36; i += 1) {
  const option = document.createElement("option");
  option.value = i;
  option.textContent = i;
  selectTag.appendChild(option);
}

// Zmiana elementów na stronie po zmianie selecta
selectTag.addEventListener("change", () => {
  itemsPerPage = parseInt(selectTag.value);
  pageNumber = 1;
  itemsContainer.innerHTML = "";
  loadItems(pageNumber);
});

function loadItems(banner = true, page) {
  // Funkcja ładuje itemy poprzez api
  fetch(`https://brandstestowy.smallhost.pl/api/random?pageNumber=${page}`)
    .then((res) => {
      // Obsługa błędów
      if (!res.ok) {
        throw new Error(res);
      }
      return res.json();
    })
    .then((data) => {
      const items = data.data || [];

      items_amount = getItemCardCount();

      items.forEach((item, idx) => {
        // Wyświetlanie elementów
        const div = document.createElement("div");
        div.className = "item-card";
        div.innerHTML = `
          <img src="${item.image}" srcset="${
          item.image
        } 1x, ${item.image.replace(
          ".webp",
          "@2x.webp"
        )} 2x, ${item.image.replace(".webp", "@3x.webp")} 3x" alt="${
          item.text ? `Product: ${item.text}` : "Product image"
        }" loading="lazy" />
          <span class="badge id-badge">ID: ${
            item.id < 10 ? "0" + item.id : item.id
          }</span>
        `;

        // Utworzy pop-up danego elementu
        div.addEventListener("click", () => createPopup(item));

        // Wyświatlanie elementów do określanego limitu
        if (item.id > itemsPerPage) {
          return;
        }

        // Wyświetlenie baneru po 4. produkcie na mobile, po 5. na desktop
        const isMobile = window.innerWidth <= 768;
        if (idx === 5 && banner && !isMobile) {
          const bannerDiv = document.createElement("div");
          bannerDiv.className = "banner-card";
          bannerDiv.innerHTML = `
          <img src="assets/BANNER.webp" srcset="assets/BANNER.webp 1x, assets/BANNER@2x.webp 2x, assets/BANNER@3x.webp 3x" alt="Forma'Sint promotional banner" loading="lazy" />
      <div class="banner-content">
        <div class="banner-text">
            <p class="banner-title">FORMA’SINT.</p>
            <h2>You’ll look and feel like the champion.</h2>
        </div>
        <div class="banner-link">
            <a href='#'>CHECK THIS OUT</a>
            <img src="assets/chevron.webp" srcset="assets/chevron.webp 1x, assets/chevron@2x.webp 2x, assets/chevron@3x.webp 3x" alt="Check this out arrow icon" loading="lazy" />
        </div>
      </div>
    `;
          itemsContainer.appendChild(bannerDiv);
        }
        if (idx === 4 && banner && isMobile) {
          const bannerDiv = document.createElement("div");
          bannerDiv.className = "banner-card";
          bannerDiv.innerHTML = `
          <img src="assets/BANNER_Mobile.webp" srcset="assets/BANNER_Mobile.webp 1x, assets/BANNER_Mobile@2x.webp 2x, assets/BANNER_Mobile@3x.webp 3x" alt="Forma'Sint promotional banner" loading="lazy" />
      <div class="banner-content">
        <div class="banner-text">
            <p class="banner-title">FORMA’SINT.</p>
            <h2>You’ll look and feel like the champion.</h2>
        </div>
        <div class="banner-link">
            <a href='#'>CHECK THIS OUT</a>
            <img src="assets/chevron.webp" srcset="assets/chevron.webp 1x, assets/chevron@2x.webp 2x, assets/chevron@3x.webp 3x" alt="Check this out arrow icon" loading="lazy" />
        </div>
      </div>
    `;
          itemsContainer.appendChild(bannerDiv);
        }
        itemsContainer.appendChild(div);
      });
    })
    .catch((err) => {
      itemsContainer.innerHTML = "Błąd pobierania danych: " + err;
      console.error(err);
    });
}

// Załaduj strony na start
loadItems(pageNumber);

// Dynamiczne doładowanie elementów przy scrollu
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight &&
    items_amount < itemsPerPage
  ) {
    console.log("Ładowanie kolejnych elementów...");
    pageNumber++;
    loadItems(false, pageNumber);
  }
});

// Sprawdza ile jest elementów w kontenerze
function getItemCardCount() {
  return document.querySelectorAll(".items-container .item-card").length;
}

function createPopup(item) {
  // Funkcja tworzy pop-up danego elementu
  const oldPopup = document.querySelector(".item-popup");
  if (oldPopup) oldPopup.remove();

  const popup = document.createElement("div");
  popup.className = "item-popup";
  popup.innerHTML = `
    <div class="item-popup-overlay"></div>
    <div class="item-popup-content" role="dialog" aria-modal="true">
      <div class="item-popup-close" aria-label="Zamknij popup" role="button">
        <img src="assets/ICONS=CLOSE.webp" />
        <span>CLOSE</span>
      </div>
      <img src="${item.image}" srcset="${item.image} 1x, ${item.image.replace(
    ".webp",
    "@2x.webp"
  )} 2x, ${item.image.replace(".webp", "@3x.webp")} 3x" alt="${
    item.text ? `Product: ${item.text}` : "Product image"
  }" />
      <div class="item-popup-details">
        <p>ID: ${item.id < 10 ? "0" + item.id : item.id}</p>
      </div>
    </div>
  `;
  document.body.appendChild(popup);

  // Zamknięcie popupu po kliknięciu w overlay lub X
  popup.querySelector(".item-popup-overlay").onclick = closePopup;
  popup.querySelector(".item-popup-close").onclick = closePopup;
}

function closePopup() {
  // Zamknięcie pop-up'u
  const popup = document.querySelector(".item-popup");
  if (popup) popup.remove();
}
