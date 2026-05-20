import os
from pymongo import MongoClient

mongo_client = MongoClient(os.getenv("MONGODB_URL"))

db = mongo_client["chatbot_db"]
conversations_collection = db["conversations"]

users_collection = db["users"]

try:
    mongo_client.admin.command("ping")
    print("MongoDB Connected Successfully!")
except Exception as e:
    print(e)

