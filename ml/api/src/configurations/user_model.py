from fastapi import Depends, FastAPI, HTTPException, Request, Query

user_sessions = {}

def get_user_session(user_id: str = Query(...)):
    if not user_id:
        raise HTTPException(status_code=400, detail="User ID query parameter missing")
    if user_id not in user_sessions:
        user_sessions[user_id] = {}
    return user_sessions[user_id]
