from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import wikipediaapi
from typing import List, Optional, Dict
from pydantic import BaseModel
import logging
import requests
import random
from datetime import datetime, timedelta
from functools import lru_cache
import time

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Wikipedia API with a more specific user agent
wiki = wikipediaapi.Wikipedia(
    language='en',
    extract_format=wikipediaapi.ExtractFormat.WIKI,
    user_agent='PhraseWisdomBridge/1.0 (Educational Research Tool)'
)

# Rate limiting configuration
RATE_LIMIT = 50  # requests per minute
rate_limit_dict: Dict[str, List[datetime]] = {}

class Section(BaseModel):
    title: str
    content: str
    level: int

class WikiResponse(BaseModel):
    title: str
    summary: str
    content: str
    url: str
    sections: List[Section]
    image_url: Optional[str] = None
    last_modified: Optional[str] = None
    categories: List[str] = []
    language_links: List[str] = []

def check_rate_limit(ip: str) -> bool:
    now = datetime.now()
    minute_ago = now - timedelta(minutes=1)
    
    # Clean old entries
    if ip in rate_limit_dict:
        rate_limit_dict[ip] = [dt for dt in rate_limit_dict[ip] if dt > minute_ago]
    else:
        rate_limit_dict[ip] = []
    
    # Check limit
    if len(rate_limit_dict[ip]) >= RATE_LIMIT:
        return False
    
    # Add new request timestamp
    rate_limit_dict[ip].append(now)
    return True

@lru_cache(maxsize=100)
def get_article_image(title: str) -> Optional[str]:
    """Get the main image for an article with caching."""
    try:
        api_url = "https://en.wikipedia.org/w/api.php"
        params = {
            "action": "query",
            "format": "json",
            "titles": title,
            "prop": "pageimages|imageinfo",
            "pithumbsize": 800,  # Larger image size
            "piprop": "thumbnail|original"
        }
        
        response = requests.get(api_url, params=params, timeout=5)
        response.raise_for_status()
        data = response.json()
        
        pages = data.get("query", {}).get("pages", {})
        if pages:
            page = next(iter(pages.values()))
            if "thumbnail" in page:
                return page["thumbnail"]["source"]
    except Exception as e:
        logger.error(f"Error fetching image for {title}: {str(e)}")
    return None

@lru_cache(maxsize=50)
def get_article_categories(title: str) -> List[str]:
    """Get categories for an article with caching."""
    try:
        api_url = "https://en.wikipedia.org/w/api.php"
        params = {
            "action": "query",
            "format": "json",
            "titles": title,
            "prop": "categories",
            "cllimit": "50"
        }
        
        response = requests.get(api_url, params=params, timeout=5)
        response.raise_for_status()
        data = response.json()
        
        categories = []
        pages = data.get("query", {}).get("pages", {})
        if pages:
            page = next(iter(pages.values()))
            for cat in page.get("categories", []):
                cat_title = cat["title"].replace("Category:", "")
                categories.append(cat_title)
        return categories
    except Exception as e:
        logger.error(f"Error fetching categories for {title}: {str(e)}")
        return []

def get_article_sections(page: wikipediaapi.WikipediaPage) -> List[Section]:
    """Get sections with improved error handling."""
    sections = []
    try:
        for section in page.sections:
            if section.title and section.text:  # Only add non-empty sections
                sections.append(Section(
                    title=section.title,
                    content=section.text,
                    level=section.level
                ))
    except Exception as e:
        logger.error(f"Error processing sections: {str(e)}")
    return sections

@app.get("/api/random-article", response_model=WikiResponse)
async def get_random_article():
    try:
        max_retries = 3
        for attempt in range(max_retries):
            try:
                # Get random article
                api_url = "https://en.wikipedia.org/w/api.php"
                params = {
                    "action": "query",
                    "format": "json",
                    "list": "random",
                    "rnlimit": "1",
                    "rnnamespace": "0"
                }
                
                response = requests.get(api_url, params=params, timeout=5)
                response.raise_for_status()
                data = response.json()
                
                if "query" not in data or "random" not in data["query"]:
                    raise Exception("Invalid response format from Wikipedia API")
                
                random_article = data["query"]["random"][0]
                title = random_article["title"]
                
                # Get full article content
                page = wiki.page(title)
                if not page.exists():
                    continue  # Try another random article
                
                # Get additional metadata
                image_url = get_article_image(title)
                categories = get_article_categories(title)
                
                return WikiResponse(
                    title=page.title,
                    summary=page.summary,
                    content=page.text,
                    url=page.fullurl,
                    sections=get_article_sections(page),
                    image_url=image_url,
                    last_modified=page.touched,
                    categories=categories,
                    language_links=[lang for lang in page.langlinks.keys()]
                )
            except Exception as e:
                if attempt == max_retries - 1:
                    raise
                logger.warning(f"Retry {attempt + 1}/{max_retries} failed: {str(e)}")
                time.sleep(1)  # Wait before retry
                continue
                
    except Exception as e:
        logger.error(f"Error fetching random article: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Failed to fetch article from Wikipedia. Please try again later."
        )

@app.get("/api/search/{query}", response_model=List[WikiResponse])
async def search_articles(query: str, limit: Optional[int] = 5):
    try:
        # First get search results
        api_url = "https://en.wikipedia.org/w/api.php"
        params = {
            "action": "query",
            "format": "json",
            "list": "search",
            "srsearch": query,
            "srlimit": str(limit),
            "srqiprofile": "popular_inclinks_pv"  # Prioritize popular articles
        }
        
        response = requests.get(api_url, params=params, timeout=5)
        response.raise_for_status()
        data = response.json()
        
        results = []
        for item in data.get("query", {}).get("search", []):
            try:
                title = item["title"]
                page = wiki.page(title)
                if page.exists():
                    # Get additional metadata
                    image_url = get_article_image(title)
                    categories = get_article_categories(title)
                    
                    results.append(WikiResponse(
                        title=page.title,
                        summary=page.summary,
                        content=page.text,
                        url=page.fullurl,
                        sections=get_article_sections(page),
                        image_url=image_url,
                        last_modified=page.touched,
                        categories=categories,
                        language_links=[lang for lang in page.langlinks.keys()]
                    ))
            except Exception as e:
                logger.error(f"Error processing search result {title}: {str(e)}")
                continue
        
        return results
    except Exception as e:
        logger.error(f"Error searching articles: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Failed to search Wikipedia articles. Please try again later."
        )

@app.get("/api/article/{title}", response_model=WikiResponse)
async def get_article(title: str):
    try:
        page = wiki.page(title)
        if not page.exists():
            raise HTTPException(
                status_code=404,
                detail=f"Article '{title}' not found"
            )
        
        # Get additional metadata
        image_url = get_article_image(title)
        categories = get_article_categories(title)
        
        return WikiResponse(
            title=page.title,
            summary=page.summary,
            content=page.text,
            url=page.fullurl,
            sections=get_article_sections(page),
            image_url=image_url,
            last_modified=page.touched,
            categories=categories,
            language_links=[lang for lang in page.langlinks.keys()]
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching article {title}: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Failed to fetch article. Please try again later."
        )