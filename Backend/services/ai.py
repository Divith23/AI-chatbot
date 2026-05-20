import os
from groq import Groq

groq_client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)
