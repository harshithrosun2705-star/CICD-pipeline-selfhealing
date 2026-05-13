const AUTH_URL = "http://localhost:8002";
const TASK_URL = "http://localhost:8003";
const ORDER_URL = "http://localhost:8004";

// REGISTER USER
async function registerUser() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
        document.getElementById("message").innerText = "Please enter username and password";
        return;
    }

    try {
        const response = await fetch(`${AUTH_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        document.getElementById("message").innerText = data.message;

        if (
            data.message &&
            data.message.toLowerCase().includes("registered")
        ) {
            localStorage.setItem("username", username);
            window.location.href = "dashboard.html";
        }

    } catch (error) {
        document.getElementById("message").innerText = "Auth service not reachable";
        console.log(error);
    }
}

// LOGIN USER
async function loginUser() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
        document.getElementById("message").innerText = "Please enter username and password";
        return;
    }

    try {
        const response = await fetch(`${AUTH_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (
            data.message &&
            data.message.toLowerCase().includes("login successful")
        ) {
            localStorage.setItem("username", username);
            window.location.href = "dashboard.html";
        } else {
            document.getElementById("message").innerText = data.message || "Invalid credentials";
        }

    } catch (error) {
        document.getElementById("message").innerText = "Auth service not reachable";
        console.log(error);
    }
}

// SHOW TASK OR ORDER SECTION
function showSection(sectionId) {
    document.getElementById("tasks-section").classList.add("hidden");
    document.getElementById("orders-section").classList.add("hidden");

    document.getElementById(sectionId).classList.remove("hidden");
}

// ADD TASK / APPOINTMENT
async function addTask() {
    const task = document.getElementById("taskInput").value.trim();

    if (!task) {
        alert("Enter appointment or health task");
        return;
    }

    await fetch(`${TASK_URL}/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ task })
    });

    document.getElementById("taskInput").value = "";
    loadTasks();
}

// LOAD TASKS
async function loadTasks() {
    const response = await fetch(`${TASK_URL}/tasks`);
    const tasks = await response.json();

    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach(t => {
        const li = document.createElement("li");
        li.innerText = t.task;
        taskList.appendChild(li);
    });
}

// PLACE ORDER
async function placeOrder() {
    const item = document.getElementById("orderInput").value.trim();

    if (!item) {
        alert("Enter medicine or lab request");
        return;
    }

    await fetch(`${ORDER_URL}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ item })
    });

    document.getElementById("orderInput").value = "";
    loadOrders();
}

// LOAD ORDERS
async function loadOrders() {
    const response = await fetch(`${ORDER_URL}/orders`);
    const orders = await response.json();

    const orderList = document.getElementById("orderList");
    orderList.innerHTML = "";

    orders.forEach(o => {
        const li = document.createElement("li");
        li.innerText = `${o.item} - ${o.status || "Placed"}`;
        orderList.appendChild(li);
    });
}

// LOGOUT
function logoutUser() {
    localStorage.removeItem("username");
    window.location.href = "index.html";
}

// AUTO LOAD DASHBOARD DATA
if (window.location.pathname.includes("dashboard")) {
    loadTasks();
    loadOrders();
}
