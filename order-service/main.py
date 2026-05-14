from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from prometheus_fastapi_instrumentator import Instrumentator

app = FastAPI(title="Order Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Instrumentator().instrument(app).expose(app)

orders = []

class Order(BaseModel):
    email: str
    product_name: str
    price: int

@app.get("/")
def home():
    return {"service": "Order Service running"}

@app.post("/orders")
def create_order(order: Order):
    new_order = {
        "id": len(orders) + 1,
        "email": order.email,
        "product_name": order.product_name,
        "price": order.price,
        "status": "Order Placed"
    }
    orders.append(new_order)
    return new_order

@app.get("/orders")
def get_orders():
    return orders
