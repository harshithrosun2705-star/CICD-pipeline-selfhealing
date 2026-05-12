const AUTH_URL = "http://localhost:8002";
const TASK_URL = "http://localhost:8003";
const ORDER_URL = "http://localhost:8004";

async function registerUser(){

    const username=document.getElementById("username").value;
    const password=document.getElementById("password").value;

    const response=await fetch(`${AUTH_URL}/register`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({username,password})
    });

    const data=await response.json();

    document.getElementById("message").innerText=data.message;
}

async function loginUser(){

    const username=document.getElementById("username").value;
    const password=document.getElementById("password").value;

    const response=await fetch(`${AUTH_URL}/login`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({username,password})
    });

    const data=await response.json();

    if(data.message==="Login successful"){
        window.location.href="dashboard.html";
    }
    else{
        document.getElementById("message").innerText="Invalid credentials";
    }
}

function showSection(sectionId){

    document.getElementById("tasks-section").classList.add("hidden");
    document.getElementById("orders-section").classList.add("hidden");

    document.getElementById(sectionId).classList.remove("hidden");
}

async function addTask(){

    const task=document.getElementById("taskInput").value;

    await fetch(`${TASK_URL}/tasks`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({task})
    });

    loadTasks();
}

async function loadTasks(){

    const response=await fetch(`${TASK_URL}/tasks`);

    const tasks=await response.json();

    const taskList=document.getElementById("taskList");

    taskList.innerHTML="";

    tasks.forEach(t=>{

        const li=document.createElement("li");

        li.innerText=t.task;

        taskList.appendChild(li);
    });
}

async function placeOrder(){

    const item=document.getElementById("orderInput").value;

    await fetch(`${ORDER_URL}/orders`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({item})
    });

    loadOrders();
}

async function loadOrders(){

    const response=await fetch(`${ORDER_URL}/orders`);

    const orders=await response.json();

    const orderList=document.getElementById("orderList");

    orderList.innerHTML="";

    orders.forEach(o=>{

        const li=document.createElement("li");

        li.innerText=o.item;

        orderList.appendChild(li);
    });
}

function logoutUser(){

    window.location.href="index.html";
}

if(window.location.pathname.includes("dashboard")){

    loadTasks();
    loadOrders();
}
