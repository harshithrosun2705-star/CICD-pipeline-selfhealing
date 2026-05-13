function login() {
  const email = document.getElementById("email")?.value;
  const password = document.getElementById("password")?.value;

  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  alert("Login successful");
  window.location.href = "dashboard.html";
}

function register() {
  alert("Registration successful");
  window.location.href = "dashboard.html";
}

function openTasks() {
  window.location.href = "task.html";
}

function openOrders() {
  window.location.href = "orders.html";
}

function goDashboard() {
  window.location.href = "dashboard.html";
}

function logout() {
  window.location.href = "index.html";
}

function addTask() {
  const input = document.getElementById("taskInput");
  const list = document.getElementById("taskList");

  if (input.value.trim() === "") {
    alert("Enter a task");
    return;
  }

  const li = document.createElement("li");
  li.textContent = input.value;
  list.appendChild(li);
  input.value = "";
}

function addOrder() {
  const input = document.getElementById("orderInput");
  const list = document.getElementById("orderList");

  if (input.value.trim() === "") {
    alert("Enter an order");
    return;
  }

  const li = document.createElement("li");
  li.textContent = input.value;
  list.appendChild(li);
  input.value = "";
}
