// Toggle class active untuk hamburger menu
const navbarNav = document.querySelector(".navbar-nav");
// ketika hamburger menu di klik
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// Toggle class active untuk search form
const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");

document.querySelector("#search-button").onclick = (e) => {
  searchForm.classList.toggle("active");
  searchBox.focus();
  e.preventDefault();
};

// Toggle class active untuk shopping cart
const shoppingCart = document.querySelector(".shopping-cart");
document.querySelector("#shopping-cart-button").onclick = (e) => {
  shoppingCart.classList.toggle("active");
  e.preventDefault();
};

// klik diluar untuk menghilangkan
const hamburger = document.querySelector("#hamburger-menu");
const sb = document.querySelector("#search-button");
const sc = document.querySelector("#shopping-cart-button");

document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
  if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove("active");
  }
  if (!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove("active");
  }
});

// Modal Box
const itemDetailModal = document.querySelector("#item-detail-modal");
const itemDetailButton = document.querySelector(".item-detail-button");

itemDetailButton.onclick = (e) => {
  itemDetailModal.style.display = "flex";
  e.preventDefault();
};

// klik tombol close
document.querySelector(".modal .close-icon").onclick = (e) => {
  itemDetailModal.style.display = "none";
  e.preventDefault();
};

// klik diluar modal
const modal = document.querySelector("#item-detail-modal");
window.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
};
// WhatsApp Contact Form Handler
document.addEventListener("DOMContentLoaded", function () {
  const whatsappNumber = "6281219750186";

  // Ambil form kontak
  const contactForm = document.querySelector("#contact form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Mencegah form submit default

      // Ambil nilai dari input fields
      const nameInput = contactForm.querySelector('input[placeholder="nama"]');
      const emailInput = contactForm.querySelector(
        'input[placeholder="email"]'
      );
      const phoneInput = contactForm.querySelector(
        'input[placeholder="no hp"]'
      );

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const phone = phoneInput.value.trim();

      // Validasi input
      if (!name) {
        alert("Mohon masukkan nama Anda");
        nameInput.focus();
        return;
      }

      if (!email) {
        alert("Mohon masukkan email Anda");
        emailInput.focus();
        return;
      }

      if (!isValidEmail(email)) {
        alert("Mohon masukkan email yang valid");
        emailInput.focus();
        return;
      }

      if (!phone) {
        alert("Mohon masukkan nomor HP Anda");
        phoneInput.focus();
        return;
      }

      // Buat pesan WhatsApp
      const message = createWhatsAppMessage(name, email, phone);

      // Buka WhatsApp dengan pesan
      sendToWhatsApp(whatsappNumber, message);

      // Reset form setelah submit
      contactForm.reset();

      // Tampilkan pesan sukses
      showSuccessMessage();
    });
  }
});

// Fungsi untuk membuat pesan WhatsApp
function createWhatsAppMessage(name, email, phone) {
  const message = `Halo Kopi Pagi! 👋

Saya ingin menghubungi Anda:

*Nama:* ${name}
*Email:* ${email}
*No. HP:* ${phone}

Saya tertarik dengan produk-produk kopi Anda dan ingin mengetahui lebih lanjut.

Terima kasih! ☕`;

  return message;
}

// Fungsi untuk mengirim ke WhatsApp
function sendToWhatsApp(phoneNumber, message) {
  // Encode pesan untuk URL
  const encodedMessage = encodeURIComponent(message);

  // Buat URL WhatsApp
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  // Buka WhatsApp di tab baru
  window.open(whatsappURL, "_blank");
}

// Fungsi validasi email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Fungsi untuk menampilkan pesan sukses
function showSuccessMessage() {
  // Buat elemen notifikasi
  const notification = document.createElement("div");
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 1000;
        font-family: 'Poppins', sans-serif;
        animation: slideIn 0.3s ease-out;
    `;

  notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <span>✅</span>
            <span>Pesan berhasil dikirim ke WhatsApp!</span>
        </div>
    `;

  // Tambahkan CSS animation
  const style = document.createElement("style");
  style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;

  if (!document.querySelector("#whatsapp-notification-style")) {
    style.id = "whatsapp-notification-style";
    document.head.appendChild(style);
  }

  // Tambahkan notifikasi ke halaman
  document.body.appendChild(notification);

  // Hapus notifikasi setelah 3 detik
  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease-out";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Fungsi alternatif untuk tombol dengan onclick (opsional)
function sendContactMessage() {
  const nameInput = document.querySelector(
    '#contact input[placeholder="nama"]'
  );
  const emailInput = document.querySelector(
    '#contact input[placeholder="email"]'
  );
  const phoneInput = document.querySelector(
    '#contact input[placeholder="no hp"]'
  );

  const name = nameInput?.value.trim() || "";
  const email = emailInput?.value.trim() || "";
  const phone = phoneInput?.value.trim() || "";

  if (!name || !email || !phone) {
    alert("Mohon lengkapi semua field");
    return;
  }

  if (!isValidEmail(email)) {
    alert("Mohon masukkan email yang valid");
    return;
  }

  const whatsappNumber = "6281219750186";
  const message = createWhatsAppMessage(name, email, phone);

  sendToWhatsApp(whatsappNumber, message);

  // Reset form
  nameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";

  showSuccessMessage();
}
