const AUTH = "http://localhost:8002";
const TASK = "http://localhost:8003";
const ORDER = "http://localhost:8004";

// LOGIN
async function login() {
  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;

  const res = await fetch(`${AUTH}/login?username=${u}&password=${p}`, {
    method: "POST"
  });

  const data = await res.json();

  if (data.message === "Login successful") {
    localStorage.setItem("user", u);
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("message").innerText = "Login Failed";
  }
}

// REGISTER
async function register() {
  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;

  await fetch(`${AUTH}/register?username=${u}&password=${p}`, {
    method: "POST"
  });

  alert("Registered successfully");
}

// TASK
async function addTask() {
  const task = document.getElementById("taskInput").value;

  await fetch(`${TASK}/add-task?task=${task}`, { method: "POST" });
  alert("Task added");
}

async function getTasks() {
  const res = await fetch(`${TASK}/tasks`);
  const data = await res.json();

  const list = document.getElementById("taskList");
  list.innerHTML = "";

  data.tasks.forEach(t => {
    const li = document.createElement("li");
    li.innerText = t;
    list.appendChild(li);
  });
}

// ORDER
async function createOrder() {
  const item = document.getElementById("orderInput").value;

  await fetch(`${ORDER}/create-order?item=${item}`, { method: "POST" });
  alert("Order created");
}

async function getOrders() {
  const res = await fetch(`${ORDER}/orders`);
  const data = await res.json();

  const list = document.getElementById("orderList");
  list.innerHTML = "";

  data.orders.forEach(o => {
    const li = document.createElement("li");
    li.innerText = o;
    list.appendChild(li);
  });
}

// LOGOUT
function logout() {
  localStorage.removeItem("user");
  window.location.href = "index.html";
}
