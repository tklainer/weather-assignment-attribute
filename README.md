# Weather Visualization Application

A full-stack application for visualizing weather data using React, Node.js, and SQLite.

## Project Structure

```
weather-assignment-attribute/
├── client/                 # React frontend application
│   ├── src/               # Source files
│   ├── public/            # Static files
│   └── package.json       # Frontend dependencies
│
├── server/                # Node.js backend application
│   ├── src/              # Source files
│   │   ├── api/          # API routes
│   │   ├── db/           # Database files
│   │   └── __tests__/    # Test files
│   └── package.json      # Backend dependencies
│
└── README.md             # This file
```

## Features

- Interactive weather data visualization
- Date range selection with URL persistence
- Temperature trends display (max, min, average)
- RESTful API with SQLite database
- Comprehensive test coverage

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- SQLite3

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd weather-assignment-attribute
```

2. Install  dependencies:
```bash
npm run install-packages
```



## Running the Application

1. Start the server:
```bash
npm run server 
```
The server will run on http://localhost:3058

2. Start the client:
```bash
npm run client
```
The client will run on http://localhost:3050

3. Open your browser and navigate to:
```
http://localhost:3050
```

## API Documentation

The server provides the following endpoint:

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

## Testing

To run tests for the server:
```bash
cd server
npm test
```

## Development

- Client: React with TypeScript, Recharts for visualization
- Server: Node.js with Express, SQLite for data storage
- Testing: Jest for server tests

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 