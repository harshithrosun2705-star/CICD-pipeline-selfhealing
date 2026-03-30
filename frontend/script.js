const BASE_AUTH = "http://localhost:8002";
const BASE_TASK = "http://localhost:8003";

async function register() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  await fetch(`${BASE_AUTH}/register`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({username, password})
  });

  alert("Registered!");
}

async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${BASE_AUTH}/login`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({username, password})
  });

  const data = await res.json();
  alert(data.message);
}

async function addTask() {
  const title = document.getElementById("task").value;

  await fetch(`${BASE_TASK}/tasks`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({title})
  });

  alert("Task added");
}

async function getTasks() {
  const res = await fetch(`${BASE_TASK}/tasks`);
  const data = await res.json();

  const list = document.getElementById("taskList");
  list.innerHTML = "";

  data.tasks.forEach(task => {
    const li = document.createElement("li");
    li.innerText = task[1];
    list.appendChild(li);
  });
}
