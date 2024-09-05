const cartContainer = document.getElementById("cart-container");
const productsContainer = document.getElementById("products-container");
const dessertCards = document.getElementById("dessert-card-container");
const cartBtn = document.getElementById("cart-btn");
const clearCartBtn = document.getElementById("clear-cart-btn");
const totalNumberOfItems = document.getElementById("total-items");
const cartSubTotal = document.getElementById("subtotal");
const cartTaxes = document.getElementById("taxes");
const cartTotal = document.getElementById("total");
const showHideCartSpan = document.getElementById("show-hide-cart");
let isCartShowing = false;

const products = [
  
    {
      id: 1,
      name: "バニラカップケーキ（6個入り）",
      price: 12.99,
      category: "カップケーキ",
  },
  {
      id: 2,
      name: "フレンチマカロン",
      price: 3.99,
      category: "マカロン",
  },
  {
      id: 3,
      name: "パンプキンカップケーキ",
      price: 3.99,
      category: "カップケーキ",
  },
  {
      id: 4,
      name: "チョコレートカップケーキ",
      price: 5.99,
      category: "カップケーキ",
  },
  {
      id: 5,
      name: "チョコレートプレッツェル（4個入り）",
      price: 10.99,
      category: "プレッツェル",
  },
  {
      id: 6,
      name: "ストロベリーアイスクリーム",
      price: 2.99,
      category: "アイスクリーム",
  },
  {
      id: 7,
      name: "チョコレートマカロン（4個入り）",
      price: 9.99,
      category: "マカロン",
  },
  {
      id: 8,
      name: "ストロベリープレッツェル",
      price: 4.99,
      category: "プレッツェル",
  },
  {
      id: 9,
      name: "バターペカンアイスクリーム",
      price: 2.99,
      category: "アイスクリーム",
  },
  {
      id: 10,
      name: "ロッキーロードアイスクリーム",
      price: 2.99,
      category: "アイスクリーム",
  },
  {
      id: 11,
      name: "バニラマカロン（5個入り）",
      price: 11.99,
      category: "マカロン",
  },
  {
      id: 12,
      name: "レモンカップケーキ（4個入り）",
      price: 12.99,
      category: "カップケーキ",
  },
]

products.forEach(
  ({ name, id, price, category }) => {
    dessertCards.innerHTML += `
      <div class="dessert-card">
        <h2>${name}</h2>
        <p class="dessert-price">¥${price}</p>
        <p class="product-category">カテゴリ： ${category}</p>
        <button 
          id="${id}" 
          class="btn add-to-cart-btn"> カートに追加
        </button>
      </div>
    `;
  }
);

class ShoppingCart {
  constructor() {
    this.items = [];
    this.total = 0;
    this.taxRate = 10;
  }

  addItem(id, products) {
    const product = products.find((item) => item.id === id);
    const { name, price } = product;
    this.items.push(product);

    const totalCountPerProduct = {};
    this.items.forEach((dessert) => {
      totalCountPerProduct[dessert.id] = (totalCountPerProduct[dessert.id] || 0) + 1;
    })

    const currentProductCount = totalCountPerProduct[product.id];
    const currentProductCountSpan = document.getElementById(`product-count-for-id${id}`);

    currentProductCount > 1 
      ? currentProductCountSpan.textContent = `${currentProductCount}x`
      : productsContainer.innerHTML += `
      <div id="dessert${id}" class="product">
        <p>
          <span class="product-count" id="product-count-for-id${id}"></span>${name}
        </p>
        <p>${price}</p>
      </div>
      `;
  }
  
  getCounts() {
    return this.items.length;
  }
  clearCart() {
    if (!this.items.length) {
      alert("ショッピングカートはすでに空です");
      return;
    }
  
    const isCartCleared = confirm(
      "ショッピングカートのすべてのアイテムをクリアしてもよろしいですか？"
    );

    if (isCartCleared) {
      this.items = [];
      this.total = 0;
      productsContainer.innerHTML = "";
      totalNumberOfItems.textContent = 0;
      cartSubTotal.textContent = 0;
      cartTaxes.textContent = 0;
      cartTotal.textContent = 0;
    }
  }

  calculateTaxes(amount) {
    return parseFloat(((this.taxRate / 100) * amount).toFixed(2));
  }

  calculateTotal() {
    const subTotal = this.items.reduce((total, item) => total + item.price, 0);
    const tax = this.calculateTaxes(subTotal);
    this.total = subTotal + tax;
    cartSubTotal.textContent = `¥${subTotal.toFixed(2)}`;
    cartTaxes.textContent = `¥${tax.toFixed(2)}`;
    cartTotal.textContent = `¥${this.total.toFixed(2)}`;
    return this.total;
  }
};

const cart = new ShoppingCart();
const addToCartBtns = document.getElementsByClassName("add-to-cart-btn");

[...addToCartBtns].forEach(
  (btn) => {
    btn.addEventListener("click", (event) => {
      cart.addItem(Number(event.target.id), products);
      totalNumberOfItems.textContent = cart.getCounts();
      cart.calculateTotal();
    })
  }
);

cartBtn.addEventListener("click", () => {
  isCartShowing = !isCartShowing;
  showHideCartSpan.textContent = isCartShowing ? "非表示" : "表示";
  cartContainer.style.display = isCartShowing ? "block" : "none";
});
clearCartBtn.addEventListener("click",cart.clearCart.bind(cart) );
