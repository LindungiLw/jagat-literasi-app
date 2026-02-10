// script.js - Logika Filter dan Load Data

document.addEventListener("DOMContentLoaded", function () {
  loadArticles(); // Muat data saat halaman dibuka
  filterSelection("all"); // Tampilkan semua kategori di awal
});

// --- 1. Fungsi Memuat Data dari LocalStorage (Data Admin) ---
function loadArticles() {
  // Ambil data dari penyimpanan browser
  let articles = JSON.parse(localStorage.getItem("articles")) || [];
  let container = document.getElementById("content-container");

  // Cek apakah kita ada di halaman index yang punya container
  if (container && articles.length > 0) {
    // Balik urutan agar artikel terbaru muncul paling atas
    articles
      .slice()
      .reverse()
      .forEach((article) => {
        let card = document.createElement("div");
        // Tambahkan class kategori agar filter berfungsi
        card.className = `card ${article.kategori}`;

        card.innerHTML = `
                <div class="card-tag">${article.kategori.toUpperCase()}</div>
                <h3>${article.judul}</h3>
                <p>${article.deskripsi}</p>
                <a href="#" class="read-more">Baca Selengkapnya</a>
            `;

        // Masukkan ke dalam grid
        container.prepend(card);
      });
  }
}

// --- 2. Fungsi Filter Kategori (Tombol) ---
function filterSelection(category) {
  let cards = document.getElementsByClassName("card");

  if (category === "all") category = "";

  // Loop semua kartu
  for (let i = 0; i < cards.length; i++) {
    removeClass(cards[i], "hide"); // Reset dulu
    if (cards[i].className.indexOf(category) === -1) {
      addClass(cards[i], "hide"); // Sembunyikan jika tidak cocok
    }
  }

  // Update warna tombol aktif
  updateActiveButton(category === "" ? "all" : category);
}

// Helper: Tambah Class
function addClass(element, name) {
  let arr1 = element.className.split(" ");
  let arr2 = name.split(" ");
  for (let i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Helper: Hapus Class
function removeClass(element, name) {
  let arr1 = element.className.split(" ");
  let arr2 = name.split(" ");
  for (let i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

// Helper: Highlight Tombol
function updateActiveButton(targetCategory) {
  let btnContainer = document.querySelector(".category-nav");
  if (!btnContainer) return; // Stop jika tidak ada navigasi (misal di halaman login)

  let btns = btnContainer.getElementsByClassName("btn");
  for (let i = 0; i < btns.length; i++) {
    btns[i].classList.remove("active");
    // Logika sederhana untuk mencocokkan tombol yang diklik
    if (btns[i].getAttribute("onclick").includes(targetCategory)) {
      btns[i].classList.add("active");
    }
  }
}
