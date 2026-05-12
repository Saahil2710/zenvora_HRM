import os
import shutil

from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse

from ResumeParser import universal_parser
from Extractor import build_json
from database import collection

app = FastAPI()

UPLOAD_DIR = "uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)


@app.post("/parse_resume")
async def parse_resume(file: UploadFile = File(...)):
    try:
        file_path = f"{UPLOAD_DIR}/{file.filename}"

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        extracted_text = universal_parser(file_path)

        parsed_data = build_json(extracted_text)

        parsed_data["raw_resume_text"] = extracted_text

        # Insert into database if available
        if collection is not None:
            result = collection.insert_one(parsed_data)
            parsed_data["_id"] = str(result.inserted_id)  # Convert ObjectId to string
        else:
            print("Warning: MongoDB not available. Data not stored in database.")

        return {
            "message": "Resume Parsed Successfully",
            "data": parsed_data
        }
    
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"error": str(e), "message": "Failed to parse resume"}
        )