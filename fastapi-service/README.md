# SkillScore FastAPI Service

A helper service for text extraction, AI orchestration, and Gemini communication for the SkillScore application.

## Features

- **File Upload & Text Extraction**: Support for PDF, DOCX, TXT, and image files (JPG, JPEG, PNG)
- **AI Integration**: Google Gemini API for question generation and content analysis
- **Authentication**: Supabase JWT validation
- **Modern Python**: Built with Python 3.11+ using modern type hints
- **Package Management**: Uses `uv` for fast dependency management

## Prerequisites

- Python 3.11 or higher
- [uv](https://github.com/astral-sh/uv) package manager
- Tesseract OCR (for image text extraction)

## Installation

1. **Install uv** (if not already installed):
   ```bash
   # On Windows
   powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
   
   # On macOS/Linux
   curl -LsSf https://astral.sh/uv/install.sh | sh
   ```

2. **Clone and setup the project**:
   ```bash
   cd fastapi-service
   uv sync
   ```

3. **Install Tesseract OCR**:
   - **Windows**: Download from [GitHub releases](https://github.com/UB-Mannheim/tesseract/wiki)
   - **macOS**: `brew install tesseract`
   - **Ubuntu/Debian**: `sudo apt-get install tesseract-ocr`

4. **Environment Configuration**:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

## Environment Variables

Required environment variables (see `.env.example`):

```env
# Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Google Gemini API
GEMINI_API_KEY=your_gemini_api_key

# JWT Secret (should match your Supabase JWT secret)
JWT_SECRET=your_jwt_secret
```

## Development

### Running the Server

```bash
# Development server with auto-reload
uv run uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Production server
uv run uvicorn main:app --host 0.0.0.0 --port 8000
```

### Development Tools

```bash
# Install development dependencies
uv sync --dev

# Code formatting
uv run black .
uv run isort .

# Linting
uv run flake8 .
uv run mypy .

# Testing
uv run pytest
```

### Adding Dependencies

```bash
# Add a new dependency
uv add package-name

# Add a development dependency
uv add --dev package-name

# Update dependencies
uv sync
```

## API Endpoints

### Health Check
- `GET /health` - Service health status
- `GET /` - Root endpoint

### File Upload & Text Extraction
- `POST /api/upload/file` - Upload and extract text from file
- `GET /api/upload/supported-formats` - Get supported file formats

### Question Generation (Coming Soon)
- `POST /api/questions/generate` - Generate questions from text
- `POST /api/questions/evaluate` - Evaluate user answers

## File Support

| Format | Extension | Description |
|--------|-----------|-------------|
| PDF | `.pdf` | Portable Document Format |
| Word | `.docx` | Microsoft Word Document |
| Text | `.txt` | Plain text files |
| Images | `.jpg`, `.jpeg`, `.png` | OCR text extraction |

## Architecture

```
fastapi-service/
├── app/
│   ├── core/           # Core configuration and utilities
│   │   ├── auth.py     # JWT authentication
│   │   ├── config.py   # Settings and configuration
│   │   └── utils.py    # Utility functions
│   ├── services/       # Business logic services
│   │   └── text_extraction.py
│   └── routers/        # API route handlers (coming soon)
├── main.py            # FastAPI application entry point
├── pyproject.toml     # Project configuration and dependencies
└── .env.example       # Environment variables template
```

## Performance Considerations

- **File Size Limit**: 10MB (configurable)
- **Request Timeout**: 30 seconds (configurable)
- **Supported Formats**: PDF, DOCX, TXT, JPG, JPEG, PNG
- **Text Processing**: Automatic cleaning and validation

## Security

- JWT token validation with Supabase
- File type validation and sanitization
- Input sanitization for all endpoints
- HTTPS enforcement in production
- No sensitive data logging

## Deployment

### Docker (Recommended)

```dockerfile
FROM python:3.11-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    && rm -rf /var/lib/apt/lists/*

# Install uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /bin/uv

# Copy project files
COPY . /app
WORKDIR /app

# Install dependencies
RUN uv sync --frozen

# Run the application
CMD ["uv", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Manual Deployment

```bash
# Install dependencies
uv sync --frozen

# Run with production settings
uv run uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

## Contributing

1. Follow the existing code style (Black, isort)
2. Add type hints for all functions
3. Write tests for new features
4. Update documentation as needed

## License

MIT License - see LICENSE file for details.