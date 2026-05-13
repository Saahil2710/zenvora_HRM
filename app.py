import os
import shutil

from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse

from ResumeParser import universal_parser
from Extractor import build_json
from database import collection

from fastapi import UploadFile

from Extractor import build_json

from JDExtractor import build_jd_json

app = FastAPI()

UPLOAD_DIR = "uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)


from RankingEngine import (
    generate_candidate_ranking
)


@app.post("/candidate_ranking")
async def candidate_ranking(
    resume: UploadFile,
    jd: UploadFile
):

    # -----------------------------
    # Parse Resume
    # -----------------------------

    resume_path = f"uploads/{resume.filename}"

    with open(resume_path, "wb") as f:
        f.write(await resume.read())

    resume_text = universal_parser(resume_path)

    resume_data = build_json(resume_text)

    # -----------------------------
    # Parse JD
    # -----------------------------

    jd_path = f"uploads/{jd.filename}"

    with open(jd_path, "wb") as f:
        f.write(await jd.read())

    jd_text = universal_parser(jd_path)

    jd_data = build_jd_json(jd_text)

    # -----------------------------
    # Generate Ranking
    # -----------------------------

    ranking_result = (
        generate_candidate_ranking(
            resume_data,
            jd_data,
            resume_text,
            jd_text
        )
    )

    return {
        "candidate_data": resume_data,
        "jd_data": jd_data,
        "ranking_result": ranking_result
    }


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