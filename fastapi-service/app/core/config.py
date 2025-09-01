from pydantic_settings import BaseSettings
import os

class Settings(BaseSettings):
    # API Configuration
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "SkillScore API"
    
    # CORS Configuration
    ALLOWED_ORIGINS: list[str] = [
        "http://localhost:3000",
        "http://localhost:8081",  # Expo dev server
        "exp://localhost:8081",   # Expo protocol
        "https://localhost:8081", # HTTPS Expo
    ]
    
    # Supabase Configuration
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_ANON_KEY: str = os.getenv("SUPABASE_ANON_KEY", "")
    SUPABASE_SERVICE_ROLE_KEY: str = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")
    
    # Google Gemini Configuration
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    GEMINI_MODEL: str = "gemini-1.5-flash"
    
    # File Upload Configuration
    MAX_FILE_SIZE: int = 10 * 1024 * 1024  # 10MB
    ALLOWED_FILE_TYPES: list[str] = ["pdf", "docx", "txt", "jpg", "jpeg", "png"]
    UPLOAD_DIR: str = "uploads"
    
    # Text Extraction Configuration
    MAX_TEXT_LENGTH: int = 50000  # Maximum characters to extract
    
    # Question Generation Configuration
    DEFAULT_MCQ_COUNT: int = 3
    DEFAULT_SHORT_ANSWER_COUNT: int = 2
    MAX_QUESTIONS_PER_REQUEST: int = 10
    
    # Performance Configuration
    REQUEST_TIMEOUT: int = 30  # seconds
    GEMINI_TIMEOUT: int = 25   # seconds
    
    # Security Configuration
    JWT_SECRET_KEY: str = os.getenv("JWT_SECRET_KEY", "your-secret-key")
    JWT_ALGORITHM: str = "HS256"
    
    # Database Configuration
    DATABASE_TIMEOUT: int = 10  # seconds
    
    # Logging Configuration
    LOG_LEVEL: str = "INFO"
    
    class Config:
        env_file = ".env"
        case_sensitive = True

# Create settings instance
settings = Settings()

# Validation function
def validate_settings():
    """Validate that all required settings are present"""
    required_settings = [
        "SUPABASE_URL",
        "SUPABASE_ANON_KEY", 
        "GEMINI_API_KEY"
    ]
    
    missing_settings = []
    for setting in required_settings:
        if not getattr(settings, setting):
            missing_settings.append(setting)
    
    if missing_settings:
        raise ValueError(f"Missing required environment variables: {', '.join(missing_settings)}")
    
    return True