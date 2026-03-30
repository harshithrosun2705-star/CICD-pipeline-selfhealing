from fastapi import FastAPI
from pydantic import BaseModel
import sqlite3

app = FastAPI()

# DB Connection
conn = sqlite3.connect("users.db", check_same_thread=False)
cursor = conn.cursor()

# Create Table
cursor.execute("""
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT
)
""")
conn.commit()

# Request Model
class User(BaseModel):
    username: str
    password: str

# Register API
@app.post("/register")
def register(user: User):
    cursor.execute(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        (user.username, user.password)
    )
    conn.commit()
    return {"message": "User registered"}

# Login API
@app.post("/login")
def login(user: User):
    cursor.execute(
        "SELECT * FROM users WHERE username=? AND password=?",
        (user.username, user.password)
    )
    result = cursor.fetchone()

    if result:
        return {"message": "Login success"}
    else:
        return {"message": "Invalid credentials"}
