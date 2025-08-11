# Survey Platform Backend API

A Laravel-based REST API for a customer satisfaction survey platform with admin dashboard capabilities.

## Features

- 📋 20 Customer satisfaction survey questions (Multiple choice, Text input, Numeric scale)
- 🔐 Admin authentication using Laravel Sanctum
- 📊 Dashboard statistics with chart data (Pie charts, Radar chart)
- 🔗 UUID-based response URLs for privacy
- ✅ Comprehensive validation for survey submissions
- 🚀 RESTful API design
- 🛡️ CORS configured for frontend communication

## Requirements

- PHP >= 8.1
- Composer
- MySQL >= 5.7
- Node.js >= 16 (for Laravel Mix if needed)

## Installation

### 1. Clone and Install Dependencies

```bash
cd backend
composer install
```

### 2. Environment Configuration

Copy the `.env.example` file and configure your database:

```bash
cp .env.example .env
```

Update the following in `.env`:

```env
APP_NAME="Survey Platform"
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=survey_platform
DB_USERNAME=your_username
DB_PASSWORD=your_password

SANCTUM_STATEFUL_DOMAINS=localhost:5173,localhost:3000
SESSION_DOMAIN=localhost
```

### 3. Generate Application Key

```bash
php artisan key:generate
```

### 4. Database Setup

Create the database in MySQL:

```sql
CREATE DATABASE survey_platform;
```

Run migrations and seeders:

```bash
php artisan migrate
php artisan db:seed
```

This will:
- Create all necessary tables
- Seed 20 customer satisfaction questions
- Create default admin user:
  - Email: `admin@survey.com`
  - Password: `admin123`

### 5. Sanctum Configuration

Publish Sanctum configuration:

```bash
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
```

### 6. Start the Development Server

```bash
php artisan serve
```

The API will be available at `http://localhost:8000`

## API Endpoints

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/questions` | Get all survey questions |
| GET | `/api/v1/questions/{id}` | Get specific question |
| POST | `/api/v1/responses` | Submit survey response |
| GET | `/api/v1/responses/{token}` | View response by token |
| POST | `/api/v1/admin/login` | Admin login |
| GET | `/api/health` | Health check |

### Protected Admin Endpoints (Requires Authentication)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/admin/logout` | Admin logout |
| GET | `/api/v1/admin/me` | Get current admin user |
| GET | `/api/v1/admin/dashboard` | Dashboard statistics |
| GET | `/api/v1/admin/questionnaire` | All questions with stats |
| GET | `/api/v1/admin/responses` | All survey responses |

## API Usage Examples

### 1. Get Survey Questions

```bash
curl http://localhost:8000/api/v1/questions
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "question_text": "What is your email address?",
      "type": "B",
      "options": null
    },
    {
      "id": 2,
      "question_text": "How satisfied are you with our product/service overall?",
      "type": "A",
      "options": ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"]
    }
    // ... more questions
  ],
  "message": "Questions retrieved successfully"
}
```

### 2. Submit Survey Response

```bash
curl -X POST http://localhost:8000/api/v1/responses \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "answers": [
      {"question_id": 1, "answer": "user@example.com"},
      {"question_id": 2, "answer": "Very Satisfied"},
      {"question_id": 3, "answer": "Excellent"},
      // ... all 20 answers
    ]
  }'
```

Response:
```json
{
  "success": true,
  "message": "Survey response submitted successfully",
  "data": {
    "token": "550e8400-e29b-41d4-a716-446655440000",
    "response_url": "/response/550e8400-e29b-41d4-a716-446655440000"
  }
}
```

### 3. Admin Login

```bash
curl -X POST http://localhost:8000/api/v1/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@survey.com",
    "password": "admin123"
  }'
```

- Admin login page is at `/administration` on the frontend.

## Frontend Integration

- React frontend connects via Axios to these endpoints.
- For development, sample JSON data is available in `frontend/src/data/`.

## Survey Question Types

### Type A - Multiple Choice
Questions with predefined options that users select from.

### Type B - Text Input
Open-ended questions allowing text responses (max 255 characters).

### Type C - Numeric Scale
Rating questions on a scale of 1-5.

## Dashboard Charts

The admin dashboard provides the following visualizations:

1. **Pie Charts** (Questions 6, 7, 10):
   - Purchase Frequency
   - Recommendation Likelihood
   - Product Category

2. **Radar Chart** (Questions 11-15):
   - Ease of Use
   - Product Features
   - Delivery Speed
   - Website Experience
   - Price Competitiveness

## Testing

Run PHPUnit tests:

```bash
php artisan test
```

Run specific test suites:

```bash
php artisan test --filter QuestionApiTest
php artisan test --filter ResponseApiTest
php artisan test --filter AdminApiTest
```

## Security

- Admin routes protected by Sanctum authentication
- UUID tokens for response URLs (no sequential IDs)
- Rate limiting on submission endpoints
- CORS configured for specific frontend domains
- Input validation and sanitization
- SQL injection prevention via Eloquent ORM

## Troubleshooting

### Database Connection Issues

Ensure MySQL is running and credentials in `.env` are correct:

```bash
php artisan config:clear
php artisan cache:clear
```

### CORS Issues

Check that your frontend URL is listed in:
- `config/cors.php` - allowed_origins
- `.env` - SANCTUM_STATEFUL_DOMAINS

### Authentication Issues

Clear application caches:

```bash
php artisan config:clear
php artisan route:clear
php artisan cache:clear
```

## Production Deployment

1. Set environment to production:
   ```env
   APP_ENV=production
   APP_DEBUG=false
   ```

2. Optimize for production:
   ```bash
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   php artisan optimize
   ```

3. Set up queue worker for background jobs (if needed):
   ```bash
   php artisan queue:work
   ```

4. Configure web server (Apache/Nginx) to point to `public/` directory

## License

This project is proprietary software.

## Support

For issues or questions, please contact the development team.
```bash
php artisan config:clear
php artisan cache:clear
```

### CORS Issues

Check that your frontend URL is listed in:
- `config/cors.php` - allowed_origins
- `.env` - SANCTUM_STATEFUL_DOMAINS

### Authentication Issues

Clear application caches:

```bash
php artisan config:clear
php artisan route:clear
php artisan cache:clear
```

## Production Deployment

1. Set environment to production:
   ```env
   APP_ENV=production
   APP_DEBUG=false
   ```

2. Optimize for production:
   ```bash
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   php artisan optimize
   ```

3. Set up queue worker for background jobs (if needed):
   ```bash
   php artisan queue:work
   ```

4. Configure web server (Apache/Nginx) to point to `public/` directory

## License

This project is proprietary software.

## Support

For issues or questions, please contact the development team.
