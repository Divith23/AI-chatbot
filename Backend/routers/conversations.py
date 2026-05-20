from fastapi import APIRouter
from bson import ObjectId
from database.mongodb import conversations_collection

from fastapi import Depends

from routers.dependencies import (get_current_user)

router = APIRouter()

@router.post("/conversation")
def create_conversation(
    current_user = Depends(get_current_user)
):
    conversation = {
        "user_id": current_user["user_id"],
        "title": "New Chat",
        "messages": []
    }
    result = conversations_collection.insert_one(conversation)
    return {"conversation_id": str(result.inserted_id)}

@router.get("/conversations")
def get_conversations(
    current_user = Depends(get_current_user),
    page: int = 1,
    limit: int = 10
):
    skip =(page-1)*limit
    conversations=[]

    cursor=(
        conversations_collection.find({"user_id": current_user["user_id"]}).skip(skip).limit(limit)
    )

    for conversation in cursor:
        conversations.append({
            "id": str(conversation["_id"]),
            "title": conversation.get("title", "Untitled Chat")
        })
    return {
        "conversations" : conversations
    }
    

@router.get("/conversation/{conversation_id}")
def get_conversation(conversation_id: str, current_user = Depends(get_current_user)):
    conversation = conversations_collection.find_one({"_id": ObjectId(conversation_id), "user_id": current_user["user_id"]})
    return {"messages": conversation["messages"]}

@router.delete("/conversation/{conversation_id}")
def delete_conversation(conversation_id: str, current_user = Depends(get_current_user)):
    conversations_collection.delete_one({"_id": ObjectId(conversation_id), "user_id": current_user["user_id"]})
    return {"message": "Conversation deleted"}
