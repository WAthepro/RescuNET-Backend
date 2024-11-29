from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests
import logging
from fastapi.middleware.cors import CORSMiddleware

# Enable logging
logging.basicConfig(level=logging.INFO)

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for testing. Restrict in production.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

AKASH_CHAT_API = "https://chatapi.akash.network/api/v1/chat/completions"
API_KEY = "sk-Ov5sqUFEnLgwIFkAnea5VA"  # Replace with your actual API key


class QueryRequest(BaseModel):
    """Request schema for user input"""
    query: str
    context: str = ""  # Optional context for enhanced response


@app.post("/ask")
def ask_query(request: QueryRequest):
    """
    Send a query to Akash Chat API and get a user-friendly response.
    """
    logging.info(f"Received query: {request.query}")
    headers = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}
    data = {
        "model": "Meta-Llama-3-1-8B-Instruct-FP8",  # Chosen LLM
        "messages": [
            {"role": "user", "content": request.query}
        ]
    }

    try:
        response = requests.post(AKASH_CHAT_API, headers=headers, json=data)
        response.raise_for_status()  # Raise an error for HTTP codes 4xx/5xx
        api_response = response.json()
        logging.info(f"API Response: {api_response}")

        # Extract assistant's response
        assistant_reply = api_response["choices"][0]["message"]["content"]
        return {"response": assistant_reply}

    except requests.exceptions.RequestException as e:
        logging.error(f"Error during API request: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {str(e)}"
        )

    except KeyError as e:
        logging.error(f"KeyError: Missing expected key in API response: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"API response structure error: {str(e)}"
        )

