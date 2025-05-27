document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Arabica Blend", img: "b1.jpg", price: 20000 },
      { id: 2, name: "Robusta Brazil", img: "2.jpg", price: 25000 },
      { id: 3, name: "Primo Passo", img: "3.jpg", price: 40000 },
      { id: 4, name: "Aceh Gayo", img: "4.jpg", price: 30000 },
      { id: 5, name: "Sumatra Mandheling", img: "5.jpg", price: 50000 },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      const cartItem = this.items.find((item) => item.id === newItem.id);

      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
      } else {
        this.items = this.items.map((item) => {
          if (item.id === newItem.id) {
            item.quantity++;
            item.total = item.price * item.quantity;
          }
          return item;
        });
      }

      this.quantity++;
      this.total += newItem.price;
    },
    remove(id) {
      const cartItem = this.items.find((item) => item.id === id);
      if (!cartItem) return;

      if (cartItem.quantity > 1) {
        this.items = this.items.map((item) => {
          if (item.id === id) {
            item.quantity--;
            item.total = item.price * item.quantity;
          }
          return item;
        });
      } else {
        this.items = this.items.filter((item) => item.id !== id);
      }

      this.quantity--;
      this.total -= cartItem.price;
    },
  });
});

// Validasi Form dan Tombol Checkout
const checkoutButton = document.querySelector(".checkout-button");
checkoutButton.disabled = true;

const form = document.querySelector("#checkoutForm");

form.addEventListener("keyup", function () {
  let allFilled = true;
  for (let i = 0; i < form.elements.length; i++) {
    if (
      form.elements[i].type !== "submit" &&
      form.elements[i].value.trim() === ""
    ) {
      allFilled = false;
      break;
    }
  }

  checkoutButton.disabled = !allFilled;
  checkoutButton.classList.toggle("disabled", !allFilled);
});

// Proses Checkout dan Kirim Data ke Backend
checkoutButton.addEventListener("click", async function (e) {
  e.preventDefault();

  const formData = new FormData(form);
  const data = new URLSearchParams(formData);

  try {
    const response = await fetch("php/placeOrder.php", {
      method: "POST",
      body: data,
    });

    const token = await response.text();
    // console.log("Transaction token:", token);
    window.snap.pay(token);
  } catch (err) {
    console.error("Error saat mengirim data:", err.message);
  }
});

// Format Pesan WhatsApp
const formatMessage = (obj) => {
  const items = JSON.parse(obj.items)
    .map((item) => `${item.name} (${item.quantity} x ${rupiah(item.total)})`)
    .join("\n");

  return `Data Customer
Nama: ${obj.name}
Email: ${obj.email}
No HP: ${obj.phone}

Data Pesanan
${items}
TOTAL: ${rupiah(obj.total)}
Terima Kasih.`;
};

// Konversi Angka ke Format Rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
