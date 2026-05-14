const AUTH_API = "http://localhost:8002";
const PRODUCT_API = "http://localhost:8003";
const ORDER_API = "http://localhost:8004";

let currentUser = localStorage.getItem("cloudmart_user");

window.onload = function () {
  if (currentUser) {
    showDashboard();
  }
};

async function register() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  try {
    const res = await fetch(`${AUTH_API}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.message) {
      alert("Registration successful. Now login.");
    } else {
      alert(data.error || "Registration failed");
    }
  } catch (error) {
    alert("Auth service is not reachable");
    console.log(error);
  }
}

async function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  try {
    const res = await fetch(`${AUTH_API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.message) {
      currentUser = email;
      localStorage.setItem("cloudmart_user", email);
      showDashboard();
    } else {
      alert(data.error || "Invalid login");
    }
  } catch (error) {
    alert("Auth service is not reachable");
    console.log(error);
  }
}

function showDashboard() {
  document.getElementById("loginPage").classList.add("hidden");
  document.getElementById("appPage").classList.remove("hidden");

  document.getElementById("userEmail").innerText = currentUser;
  document.getElementById("sideUser").innerText = currentUser;

  loadProducts();
  loadOrders();
}

async function loadProducts() {
  try {
    const res = await fetch(`${PRODUCT_API}/products`);
    const products = await res.json();

    document.getElementById("productCount").innerText = products.length;

    const box = document.getElementById("products");
    box.innerHTML = "";

    products.forEach(product => {
      box.innerHTML += `
        <div class="product-card">
          <div class="emoji">${product.emoji || "📦"}</div>
          <h3>${product.name}</h3>
          <p>${product.category}</p>
          <h2>₹${product.price}</h2>
          <button onclick="placeOrder('${product.name}', ${product.price})">
            Buy Now
          </button>
        </div>
      `;
    });
  } catch (error) {
    console.log(error);
    document.getElementById("products").innerHTML =
      "<p>Product service is not reachable.</p>";
  }
}

async function placeOrder(productName, price) {
  try {
    await fetch(`${ORDER_API}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: currentUser,
        product_name: productName,
        price: price
      })
    });

    alert("Order placed successfully");
    loadOrders();
  } catch (error) {
    alert("Order service is not reachable");
    console.log(error);
  }
}

async function loadOrders() {
  try {
    const res = await fetch(`${ORDER_API}/orders`);
    const orders = await res.json();

    const myOrders = orders.filter(order => order.email === currentUser);

    document.getElementById("orderCount").innerText = myOrders.length;

    const box = document.getElementById("orders");
    box.innerHTML = "";

    if (myOrders.length === 0) {
      box.innerHTML = "<p>No orders yet.</p>";
      return;
    }

    myOrders.forEach(order => {
      box.innerHTML += `
        <div class="order-card">
          <b>${order.product_name}</b>
          <span>₹${order.price}</span>
          <p>${order.status}</p>
        </div>
      `;
    });
  } catch (error) {
    console.log(error);
    document.getElementById("orders").innerHTML =
      "<p>Order service is not reachable.</p>";
  }
}

function logout() {
  localStorage.removeItem("cloudmart_user");
  location.reload();
}
