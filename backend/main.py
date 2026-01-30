from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
from bs4 import BeautifulSoup
from typing import List
from sqlalchemy.orm import Session
from datetime import timedelta

# Import our modules
from database import engine, get_db, Base
from models import User
from schemas import UserCreate, UserLogin, UserResponse, Token
from auth import (
    get_password_hash,
    authenticate_user,
    create_access_token,
    get_current_user,
    ACCESS_TOKEN_EXPIRE_MINUTES
)

app = FastAPI(title="Security Portal API")

# Create database tables
try:
    Base.metadata.create_all(bind=engine)
except Exception as e:
    print("\n" + "="*60)
    print("❌ DATABASE CONNECTION ERROR")
    print("Could not connect to MySQL database.")
    print("Please ensure:")
    print("1. MySQL server is running")
    print("2. Database 'cyber_arena' exists")
    print("3. Credentials in database.py are correct")
    print(f"Error details: {e}")
    print("="*60 + "\n")


# allow local dev frontend to reach the API
app.add_middleware(
  CORSMiddleware,
  allow_origins=["http://localhost:5173"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

class CrawlRequest(BaseModel):
    url: str
    depth: int = 1

@app.get("/api/hello")
def hello():
    return {"message": "Hello from backend!!"}

# Authentication Endpoints
@app.post("/api/auth/signup", response_model=UserResponse)
def signup(user: UserCreate, db: Session = Depends(get_db)):
    """Register a new user"""
    # Check if user already exists
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    db_user = db.query(User).filter(User.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already taken")
    
    # Create new user
    hashed_password = get_password_hash(user.password)
    new_user = User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.post("/api/auth/login", response_model=Token)
def login(user: UserLogin, db: Session = Depends(get_db)):
    """Authenticate user and return JWT token"""
    db_user = authenticate_user(db, user.email, user.password)
    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Incorrect email or password"
        )
    
    # Create access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": db_user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/api/auth/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    """Get current authenticated user"""
    return current_user

@app.post("/api/crawl")
def crawl_url(request: CrawlRequest):
    try:
        # User-Agent header is often required to avoid 403s
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}
        response = requests.get(request.url, headers=headers, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        links = []
        for link in soup.find_all('a'):
            href = link.get('href')
            if href:
                # Basic filtering/normalization could go here
                if href.startswith('http'):
                    links.append(href)
                elif href.startswith('/'):
                     # Very simple join
                     base_url = request.url.rstrip('/')
                     links.append(f"{base_url}{href}")
        
        # Deduplicate
        unique_links = list(set(links))
        
        return {
            "url": request.url,
            "status": "success",
            "links_found": len(unique_links),
            "links": unique_links[:50] # Limit to 50 for this demo
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
