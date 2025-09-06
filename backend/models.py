from sqlalchemy import Column, Integer, String, DECIMAL, TIMESTAMP, ForeignKey, CheckConstraint
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    user_id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

class Expense(Base):
    __tablename__ = 'expenses'
    expense_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.user_id', ondelete='CASCADE'), nullable=False)
    amount = Column(DECIMAL(10, 2), nullable=False)
    category = Column(String(50), nullable=False)
    merchant = Column(String(100))
    transaction_date = Column(TIMESTAMP(timezone=True), server_default=func.now(), nullable=False)
    source = Column(String(10), nullable=False)
    __table_args__ = (
        CheckConstraint("source IN ('manual', 'sms')", name='check_source'),
    )
