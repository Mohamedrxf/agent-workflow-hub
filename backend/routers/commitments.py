from fastapi import APIRouter
from database import supabase
from models.commitment import CommitmentCreate, CommitmentUpdate

router = APIRouter(prefix="/api/commitments", tags=["commitments"])

@router.post("/")
async def create_commitment(data: CommitmentCreate):
    result = supabase.table("commitments").insert(
        data.dict()
    ).execute()
    return result.data[0]

@router.get("/")
async def get_commitments(meeting_id: str = None):
    query = supabase.table("commitments").select("*, meetings(title)")
    if meeting_id:
        query = query.eq("meeting_id", meeting_id)
    result = query.order("created_at", desc=True).execute()
    return result.data

@router.patch("/{commitment_id}")
async def update_commitment(commitment_id: str, data: CommitmentUpdate):
    result = supabase.table("commitments")\
        .update(data.dict(exclude_none=True))\
        .eq("id", commitment_id)\
        .execute()
    return result.data[0]