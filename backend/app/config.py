import os
from dotenv import load_dotenv

load_dotenv()

UPLOAD_DIR = "app/uploads"
AWS_REGION = os.getenv("AWS_REGION")
BEDROCK_MODEL = os.getenv("BEDROCK_MODEL")