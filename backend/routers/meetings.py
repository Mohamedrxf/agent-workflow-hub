from fastapi import APIRouter, HTTPException
from database import supabase
from models.meeting import MeetingCreate, MeetingUpdate

router = APIRouter(prefix="/api/meetings", tags=["meetings"])

@router.post("/")
async def create_meeting(data: MeetingCreate, user_id: str):
    result = supabase.table("meetings").insert({
        **data.dict(),
        "user_id": user_id,
        "status": "scheduled"
    }).execute()
    return result.data[0]

@router.get("/")
async def get_meetings(user_id: str):
    result = supabase.table("meetings")\
        .select("*")\
        .eq("user_id", user_id)\
        .order("created_at", desc=True)\
        .execute()
    return result.data

@router.patch("/{meeting_id}")
async def update_meeting(meeting_id: str, data: MeetingUpdate):
    result = supabase.table("meetings")\
        .update(data.dict(exclude_none=True))\
        .eq("id", meeting_id)\
        .execute()
    return result.data[0]