from fastapi import FastAPI
from pydantic import BaseModel
import sqlite3

app = FastAPI()

conn = sqlite3.connect("tasks.db", check_same_thread=False)
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT
)
""")
conn.commit()

class Task(BaseModel):
    title: str

@app.post("/tasks")
def add_task(task: Task):
    cursor.execute("INSERT INTO tasks (title) VALUES (?)", (task.title,))
    conn.commit()
    return {"message": "Task added"}

@app.get("/tasks")
def get_tasks():
    cursor.execute("SELECT * FROM tasks")
    data = cursor.fetchall()
    return {"tasks": data}
