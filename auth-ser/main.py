from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from prometheus_client import Counter, generate_latest

app = FastAPI()

# CORS FIX
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

users = {}

REQUEST_COUNT = Counter("auth_requests_total", "Total Auth Requests")

class User(BaseModel):
    username: str
    password: str

@app.get("/")
def home():
    return {"message": "Auth Service Running"}

@app.post("/register")
def register(user: User):
    REQUEST_COUNT.inc()
    if user.username in users:
        return {"message": "User already exists"}
    users[user.username] = user.password
    return {"message": "User registered"}

@app.post("/login")
def login(user: User):
    REQUEST_COUNT.inc()
    if users.get(user.username) == user.password:
        return {"message": "Login successful"}
    return {"message": "Invalid credentials"}

@app.get("/metrics")
def metrics():
    return generate_latest()
