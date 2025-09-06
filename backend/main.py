from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import List, Optional
import json
import os
from datetime import datetime

DATA_FILE = os.path.join(os.path.dirname(__file__), 'data.json')

def read_data():
    with open(DATA_FILE, 'r') as f:
        return json.load(f)

def write_data(data):
    with open(DATA_FILE, 'w') as f:
        json.dump(data, f, indent=2)

class User(BaseModel):
    user_id: int
    username: str
    email: EmailStr
    created_at: str

class UserCreate(BaseModel):
    username: str
    email: EmailStr

class Expense(BaseModel):
    expense_id: int
    user_id: int
    amount: float
    category: str
    merchant: Optional[str] = None
    transaction_date: str
    source: str

class ExpenseCreate(BaseModel):
    user_id: int
    amount: float
    category: str
    merchant: Optional[str] = None
    transaction_date: Optional[str] = None
    source: str

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/users/signup", response_model=User)
def create_user(user: UserCreate):
    data = read_data()
    if any(u['username'] == user.username for u in data['users']):
        raise HTTPException(status_code=400, detail="Username already registered")
    new_id = max([u['user_id'] for u in data['users']], default=0) + 1
    new_user = {
        "user_id": new_id,
        "username": user.username,
        "email": user.email,
        "created_at": datetime.utcnow().isoformat() + 'Z'
    }
    data['users'].append(new_user)
    write_data(data)
    return new_user

@app.post("/users/login", response_model=User)
def login_user(user: UserCreate):
    data = read_data()
    found = next((u for u in data['users'] if u['username'] == user.username and u['email'] == user.email), None)
    if not found:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    return found

@app.get("/users/{user_id}", response_model=User)
def get_user(user_id: int):
    data = read_data()
    found = next((u for u in data['users'] if u['user_id'] == user_id), None)
    if not found:
        raise HTTPException(status_code=404, detail="User not found")
    return found

@app.post("/expenses/manual/", response_model=Expense)
def create_expense(expense: ExpenseCreate):
    data = read_data()
    new_id = max([e['expense_id'] for e in data['expenses']], default=0) + 1
    new_expense = expense.dict()
    new_expense['expense_id'] = new_id
    new_expense['transaction_date'] = expense.transaction_date or datetime.utcnow().isoformat() + 'Z'
    data['expenses'].append(new_expense)
    write_data(data)
    return new_expense

@app.get("/expenses/{user_id}", response_model=List[Expense])
def get_expenses(user_id: int):
    data = read_data()
    return [e for e in data['expenses'] if e['user_id'] == user_id]
    return expenses
