from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3
from prometheus_fastapi_instrumentator import Instrumentator

app = FastAPI(title="Auth Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Instrumentator().instrument(app).expose(app)

class User(BaseModel):
    email: str
    password: str

def init_db():
    conn = sqlite3.connect("users.db")
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE,
            password TEXT
        )
    """)
    conn.commit()
    conn.close()

init_db()

@app.get("/")
def home():
    return {"service": "Auth Service running"}

@app.post("/register")
def register(user: User):
    try:
        conn = sqlite3.connect("users.db")
        cur = conn.cursor()
        cur.execute("INSERT INTO users(email, password) VALUES (?, ?)", (user.email, user.password))
        conn.commit()
        conn.close()
        return {"message": "Registration successful"}
    except:
        return {"error": "User already exists"}

@app.post("/login")
def login(user: User):
    conn = sqlite3.connect("users.db")
    cur = conn.cursor()
    cur.execute("SELECT * FROM users WHERE email=? AND password=?", (user.email, user.password))
    data = cur.fetchone()
    conn.close()

    if data:
        return {"message": "Login successful", "email": user.email}
    return {"error": "Invalid email or password"}
