from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from prometheus_fastapi_instrumentator import Instrumentator

app = FastAPI(title="Task Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Instrumentator().instrument(app).expose(app)

tasks = []
task_id = 1

class Task(BaseModel):
    task: str

@app.get("/")
def home():
    return {"message": "Task Service Running"}

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.post("/tasks")
def add_task(task: Task):
    global task_id

    new_task = {
        "id": task_id,
        "task": task.task
    }

    tasks.append(new_task)
    task_id += 1

    return {"message": "Task added successfully", "task": new_task}

@app.get("/tasks")
def get_tasks():
    return tasks
