from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
from bs4 import BeautifulSoup
from typing import List

app = FastAPI(title="Security Portal API")

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
