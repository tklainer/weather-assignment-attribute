# Weather App Server

A Node.js server that provides weather data from a SQLite database.

## Features

- RESTful API endpoints for weather data
- SQLite database integration
- CORS support
- Date range filtering

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- SQLite3

## Installation

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

## Available Scripts

- `npm start` - Starts the server on port 3058
- `npm test` - Runs tests (if any)

## API Endpoints

### GET /api/weather

Retrieves weather data for a specified date range.

Query Parameters:
- `from` (required): Start date in YYYY-MM-DD format
- `to` (required): End date in YYYY-MM-DD format
- `city` (optional): City name (defaults to 'New York')

Example Request:
```
GET http://localhost:3058/api/weather?from=2024-01-01&to=2024-01-31&city=New%20York
```

Response:
```json
{
    "weather": [
        {
            "dateDay": "2024-01-01",
            "maxTemperature": 10.5,
            "minTemperature": 5.2,
            "avgTemperature": 7.8
        },
        // ... more days
    ]
}
```

## Dependencies

- Express.js (web framework)
- SQLite3 (database)
- sqlite (SQLite wrapper)
- cors (Cross-Origin Resource Sharing)

## Project Structure

```
server/
├── src/
│   ├── api/
│   │   └── weatherRouter.ts    # Weather API routes
│   ├── db/
│   │   └── weather.sqlite      # SQLite database
│   └── server.ts               # Server entry point
└── package.json
```

## Database Schema

The SQLite database contains a table `temperature_hourly` with the following columns:
- `time`: Timestamp
- `city`: City name
- `temperature`: Temperature value 