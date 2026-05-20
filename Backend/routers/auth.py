from fastapi import APIRouter

from models.auth_schema import (SignupModel, LoginModel)

from database.mongodb import ( users_collection )

from services.auth_service import ( hash_password, verify_password, create_access_token )

router = APIRouter()

@router.post("/signup")
def signup(user: SignupModel):

    existing_user = users_collection.find_one({"email": user.email})

    if existing_user:
        return {"error": "User already exists"}
    
    hashed_password = hash_password(user.password)

    users_collection.insert_one({
        "username": user.username,
        "email": user.email,
        "password": hashed_password
    })

    return {
        "message": "User created successfully"
    }

@router.post("/login")
def login(user: LoginModel):

    existing_user = users_collection.find_one({"email": user.email})

    if not existing_user:
        return{
            "message": "Invalid email"
            }
    valid_password = verify_password(user.password, existing_user["password"])

    if not valid_password:
        return{
            "message": "Invalid password"
        }
    access_token = create_access_token({
        "user_id": str(existing_user["_id"])
    })

    return {
        "access_token": access_token
    }
        