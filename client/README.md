# Weather App Client

A React-based client application for visualizing weather data using Recharts.

## Features

- Interactive date range selection
- Temperature visualization with line charts
- URL-based date persistence
- Responsive design

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

## Available Scripts

- `npm start` - Runs the app in development mode on port 3050
- `npm build` - Builds the app for production
- `npm lint` - Runs ESLint to check for code issues

## Usage

1. Start the development server:
```bash
npm start
```

2. Open your browser and navigate to:
```
http://localhost:3050
```

3. Select date range using the date pickers
4. View temperature data in the interactive chart

## Dependencies

- React
- Recharts (for data visualization)
- Axios (for API calls)
- date-fns (for date manipulation)

## Project Structure

```
client/
├── src/
│   ├── pages/
│   │   └── WeatherPage.tsx    # Main weather visualization component
│   ├── App.tsx                # Root component
│   ├── index.tsx              # Entry point
│   └── index.css              # Global styles
└── package.json
``` 