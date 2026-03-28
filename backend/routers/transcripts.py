from fastapi import APIRouter
from database import supabase
from models.transcript import TranscriptCreate
import httpx

router = APIRouter(prefix="/api/transcripts", tags=["transcripts"])

@router.post("/")
async def save_transcript(data: TranscriptCreate):
    # Save transcript
    result = supabase.table("transcripts").insert({
        "meeting_id": data.meeting_id,
        "raw_text": data.raw_text,
        "processed": False
    }).execute()

    # Trigger n8n webhook
    async with httpx.AsyncClient() as client:
        await client.post(
            "http://localhost:5678/webhook/transcript-ready",
            json={
                "meeting_id": data.meeting_id,
                "transcript": data.raw_text
            }
        )

    return {"status": "saved", "id": result.data[0]["id"]}

@router.get("/{meeting_id}")
async def get_transcript(meeting_id: str):
    result = supabase.table("transcripts")\
        .select("*")\
        .eq("meeting_id", meeting_id)\
        .execute()
    return result.data