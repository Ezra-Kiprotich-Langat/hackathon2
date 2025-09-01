from fastapi import HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from supabase import create_client, Client
from app.core.config import settings
import jwt
import logging

logger = logging.getLogger(__name__)

# Initialize Supabase client
supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_ANON_KEY)

# Security scheme
security = HTTPBearer()

class AuthenticationError(Exception):
    """Custom authentication error"""
    pass

async def verify_jwt_token(token: str) -> dict[str, any]:
    """Verify JWT token with Supabase"""
    try:
        # Verify token with Supabase
        response = supabase.auth.get_user(token)
        
        if not response.user:
            raise AuthenticationError("Invalid token")
        
        return {
            "user_id": response.user.id,
            "email": response.user.email,
            "user_metadata": response.user.user_metadata or {},
            "app_metadata": response.user.app_metadata or {}
        }
    
    except Exception as e:
        logger.error(f"JWT verification failed: {str(e)}")
        raise AuthenticationError(f"Token verification failed: {str(e)}")

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> dict[str, any]:
    """Get current authenticated user from JWT token"""
    try:
        token = credentials.credentials
        user_data = await verify_jwt_token(token)
        return user_data
    
    except AuthenticationError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e),
            headers={"WWW-Authenticate": "Bearer"},
        )
    except Exception as e:
        logger.error(f"Authentication error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication failed",
            headers={"WWW-Authenticate": "Bearer"},
        )

async def get_optional_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(HTTPBearer(auto_error=False))
) -> dict[str, any] | None:
    """Get current user if authenticated, otherwise return None"""
    if not credentials:
        return None
    
    try:
        token = credentials.credentials
        user_data = await verify_jwt_token(token)
        return user_data
    except Exception:
        return None

def require_user_access(user_id: str, current_user: dict[str, any]) -> bool:
    """Check if current user has access to resources for the specified user_id"""
    if current_user["user_id"] != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied: You can only access your own resources"
        )
    return True

async def validate_supabase_connection() -> bool:
    """Validate connection to Supabase"""
    try:
        # Try to get the current session to test connection
        response = supabase.auth.get_session()
        return True
    except Exception as e:
        logger.error(f"Supabase connection failed: {str(e)}")
        return False

class AuthDependency:
    """Authentication dependency class for different auth requirements"""
    
    @staticmethod
    async def required(current_user: dict[str, any] = Depends(get_current_user)) -> dict[str, any]:
        """Require authentication"""
        return current_user
    
    @staticmethod
    async def optional(current_user: dict[str, any] | None = Depends(get_optional_user)) -> dict[str, any] | None:
        """Optional authentication"""
        return current_user

# Convenience instances
auth_required = AuthDependency.required
auth_optional = AuthDependency.optional