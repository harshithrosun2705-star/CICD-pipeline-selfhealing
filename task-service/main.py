from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from prometheus_fastapi_instrumentator import Instrumentator

app = FastAPI(title="Product Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Instrumentator().instrument(app).expose(app)

products = [
    {"id": 1, "name": "Cloud Headphones", "price": 1999, "category": "Electronics"},
    {"id": 2, "name": "DevOps Hoodie", "price": 1499, "category": "Fashion"},
    {"id": 3, "name": "Wireless Keyboard", "price": 999, "category": "Accessories"},
    {"id": 4, "name": "Smart Watch", "price": 2499, "category": "Electronics"},
]

@app.get("/")
def home():
    return {"service": "Product Service running"}

@app.get("/products")
def get_products():
    return products
