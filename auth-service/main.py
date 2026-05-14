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

DB_NAME = "users.db"

class User(BaseModel):
    email: str
    password: str

def init_db():
    conn = sqlite3.connect(DB_NAME)
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
    conn = sqlite3.connect(DB_NAME)
    cur = conn.cursor()

    cur.execute("SELECT * FROM users WHERE email=?", (user.email,))
    existing = cur.fetchone()

    if existing:
        conn.close()
        return {"error": "User already exists"}

    cur.execute(
        "INSERT INTO users(email, password) VALUES (?, ?)",
        (user.email, user.password)
    )

    conn.commit()
    conn.close()

    return {"message": "Registration successful"}

@app.post("/login")
def login(user: User):
    conn = sqlite3.connect(DB_NAME)
    cur = conn.cursor()

    cur.execute(
        "SELECT * FROM users WHERE email=? AND password=?",
        (user.email, user.password)
    )

    existing = cur.fetchone()

    conn.close()

    if existing:
        return {
            "message": "Login successful",
            "email": user.email
        }

    return {"error": "Invalid email or password"}
