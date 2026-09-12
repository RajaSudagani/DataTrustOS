import os

class Settings:
    PROJECT_NAME: str = "DataTrustOS Enterprise Platform"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./datatrustos.db")
    SECRET_KEY: str = os.getenv("SECRET_KEY", "super-secret-enterprise-datatrust-key-2026")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24

settings = Settings()
