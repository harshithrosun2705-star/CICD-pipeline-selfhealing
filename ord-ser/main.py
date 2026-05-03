from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from prometheus_client import Counter, generate_latest

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

orders = []

REQUEST_COUNT = Counter("order_requests_total", "Total Order Requests")

class Order(BaseModel):
    item: str

@app.post("/order")
def create_order(order: Order):
    REQUEST_COUNT.inc()
    orders.append(order.item)
    return {"message": "Order placed"}

@app.get("/orders")
def get_orders():
    REQUEST_COUNT.inc()
    return {"orders": orders}

@app.get("/metrics")
def metrics():
    return generate_latest()
