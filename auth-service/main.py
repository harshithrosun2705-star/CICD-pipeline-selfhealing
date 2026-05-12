from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
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

users = {}

class User(BaseModel):
    username: str
    password: str

@app.get("/")
def home():
    return {"message": "Auth Service Running"}

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.post("/register")
def register(user: User):
    if user.username in users:
        return {"message": "User already exists"}

    users[user.username] = user.password
    return {"message": "User registered successfully"}

@app.post("/login")
def login(user: User):
    if users.get(user.username) == user.password:
        return {"message": "Login successful"}

    return {"message": "Invalid credentials"}
