import os
import uuid
import hashlib
import mimetypes
from fastapi import HTTPException, UploadFile
from app.core.config import settings
import logging

# Configure logging
logging.basicConfig(level=getattr(logging, settings.LOG_LEVEL))
logger = logging.getLogger(__name__)

def generate_file_id() -> str:
    """Generate a unique file ID"""
    return str(uuid.uuid4())

def generate_file_hash(content: bytes) -> str:
    """Generate SHA-256 hash of file content"""
    return hashlib.sha256(content).hexdigest()

def get_file_extension(filename: str) -> str:
    """Extract file extension from filename"""
    return filename.split('.')[-1].lower() if '.' in filename else ''

def validate_file_type(filename: str) -> bool:
    """Validate if file type is allowed"""
    extension = get_file_extension(filename)
    return extension in settings.ALLOWED_FILE_TYPES

def validate_file_size(file_size: int) -> bool:
    """Validate if file size is within limits"""
    return file_size <= settings.MAX_FILE_SIZE

def sanitize_filename(filename: str) -> str:
    """Sanitize filename for safe storage"""
    # Remove path separators and dangerous characters
    safe_chars = "-_.() abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    sanitized = ''.join(c for c in filename if c in safe_chars)
    
    # Limit length
    if len(sanitized) > 100:
        name, ext = os.path.splitext(sanitized)
        sanitized = name[:95] + ext
    
    return sanitized or "unnamed_file"

def create_upload_path(user_id: str, filename: str) -> str:
    """Create a safe upload path for the file"""
    file_id = generate_file_id()
    safe_filename = sanitize_filename(filename)
    return f"users/{user_id}/documents/{file_id}_{safe_filename}"

async def validate_upload_file(file: UploadFile) -> dict[str, any]:
    """Validate uploaded file and return file info"""
    if not file.filename:
        raise HTTPException(status_code=400, detail="No filename provided")
    
    # Validate file type
    if not validate_file_type(file.filename):
        raise HTTPException(
            status_code=400, 
            detail=f"File type not allowed. Supported types: {', '.join(settings.ALLOWED_FILE_TYPES)}"
        )
    
    # Read file content to validate size
    content = await file.read()
    await file.seek(0)  # Reset file pointer
    
    if not validate_file_size(len(content)):
        raise HTTPException(
            status_code=400,
            detail=f"File too large. Maximum size: {settings.MAX_FILE_SIZE / (1024*1024):.1f}MB"
        )
    
    # Get MIME type
    mime_type, _ = mimetypes.guess_type(file.filename)
    
    return {
        "filename": file.filename,
        "content_type": mime_type or file.content_type,
        "size": len(content),
        "extension": get_file_extension(file.filename),
        "hash": generate_file_hash(content)
    }

def format_error_response(error: Exception, context: str = "") -> dict[str, any]:
    """Format error response for consistent API responses"""
    error_msg = str(error)
    
    # Log the error
    logger.error(f"Error in {context}: {error_msg}", exc_info=True)
    
    # Map common errors to user-friendly messages
    error_map = {
        "Network request failed": "Unable to connect to external service. Please try again.",
        "Timeout": "Request timed out. Please try again with a smaller file.",
        "Invalid file format": "The uploaded file format is not supported.",
        "File too large": "The uploaded file is too large.",
        "Authentication failed": "Invalid or expired authentication token.",
        "Permission denied": "You don't have permission to perform this action."
    }
    
    user_message = error_map.get(error_msg, "An unexpected error occurred. Please try again.")
    
    return {
        "error": True,
        "message": user_message,
        "details": error_msg if settings.LOG_LEVEL == "DEBUG" else None,
        "context": context
    }

def truncate_text(text: str, max_length: int | None = None) -> str:
    """Truncate text to maximum length"""
    if max_length is None:
        max_length = settings.MAX_TEXT_LENGTH
    
    if len(text) <= max_length:
        return text
    
    # Try to truncate at word boundary
    truncated = text[:max_length]
    last_space = truncated.rfind(' ')
    
    if last_space > max_length * 0.8:  # If we can find a space in the last 20%
        return truncated[:last_space] + "..."
    else:
        return truncated + "..."

def extract_user_id_from_path(file_path: str) -> str | None:
    """Extract user ID from file path"""
    try:
        parts = file_path.split('/')
        if len(parts) >= 2 and parts[0] == 'users':
            return parts[1]
    except Exception:
        pass
    return None

def create_success_response(data: any, message: str = "Success") -> dict[str, any]:
    """Create standardized success response"""
    return {
        "success": True,
        "message": message,
        "data": data
    }

def validate_question_params(difficulty: str, count: int) -> dict[str, any]:
    """Validate question generation parameters"""
    valid_difficulties = ["easy", "medium", "hard"]
    
    if difficulty not in valid_difficulties:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid difficulty. Must be one of: {', '.join(valid_difficulties)}"
        )
    
    if count < 1 or count > settings.MAX_QUESTIONS_PER_REQUEST:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid question count. Must be between 1 and {settings.MAX_QUESTIONS_PER_REQUEST}"
        )
    
    return {"difficulty": difficulty, "count": count}

def clean_extracted_text(text: str) -> str:
    """Clean and normalize extracted text"""
    if not text:
        return ""
    
    # Remove excessive whitespace
    text = ' '.join(text.split())
    
    # Remove control characters
    text = ''.join(char for char in text if ord(char) >= 32 or char in '\n\t')
    
    # Truncate if too long
    text = truncate_text(text)
    
    return text.strip()