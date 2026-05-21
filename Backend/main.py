from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import conversations, chat
from routers.auth import (router as auth_router)



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://ai-chatbot-sigma-six-30.vercel.app/"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(conversations.router)
app.include_router(chat.router)
app.include_router(auth_router)
