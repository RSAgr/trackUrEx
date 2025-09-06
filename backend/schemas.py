from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    pass

class User(UserBase):
    user_id: int
    created_at: datetime
    class Config:
        orm_mode = True

class ExpenseBase(BaseModel):
    amount: float
    category: str
    merchant: Optional[str] = None
    transaction_date: Optional[datetime] = None
    source: str

class ExpenseCreate(ExpenseBase):
    user_id: int

class Expense(ExpenseBase):
    expense_id: int
    user_id: int
    class Config:
        orm_mode = True
