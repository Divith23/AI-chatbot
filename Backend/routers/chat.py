from fastapi import APIRouter
from fastapi import Depends
from bson import ObjectId
from database.mongodb import conversations_collection
from models.schemas import Message
from services.ai import groq_client

from routers.dependencies import (get_current_user)

router = APIRouter()

@router.post("/chat/{conversation_id}")
def chat(conversation_id: str, message: Message, current_user = Depends(get_current_user)):
    conversation = conversations_collection.find_one({"_id": ObjectId(conversation_id), "user_id": current_user["user_id"]})

    if len(conversation["messages"]) == 0:
        conversations_collection.update_one(
            {"_id": ObjectId(conversation_id)},
            {"$set": {"title": message.text[:30]}}
        )

    conversations_collection.update_one(
        {"_id": ObjectId(conversation_id)},
        {"$push": {"messages": {"sender": "User", "text": message.text}}}
    )

    completion = groq_client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": "You are an expert in full stack development, with a focus on React, FastAPI, and database management. You are here to help the user build their own app and provide guidance."},
            {"role": "user", "content": message.text}
        ]
    )

    ai_reply = completion.choices[0].message.content

    conversations_collection.update_one(
        {"_id": ObjectId(conversation_id)},
        {"$push": {"messages": {"sender": "Bot", "text": ai_reply}}}
    )

    return {"reply": ai_reply}
