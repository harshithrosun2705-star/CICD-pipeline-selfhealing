from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
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
order_id = 1001

class Order(BaseModel):
    item: str

@app.get("/")
def home():
    return {"message": "Order Service Running"}

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.post("/orders")
def place_order(order: Order):
    global order_id

    new_order = {
        "id": order_id,
        "item": order.item,
        "status": "Placed"
    }

    orders.append(new_order)
    order_id += 1

    return {"message": "Order placed successfully", "order": new_order}

@app.get("/orders")
def get_orders():
    return orders
