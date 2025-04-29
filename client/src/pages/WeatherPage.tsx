import React, { useState, useEffect, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, subDays } from 'date-fns';
import axios from 'axios';
import './WeatherPage.css';

interface WeatherData {
    dateDay: string;
    maxTemperature: number;
    minTemperature: number;
    avgTemperature: number;
}

const WeatherPage: React.FC = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const [startDate, setStartDate] = useState<string>(searchParams.get('from') || format(subDays(new Date(), 30), 'yyyy-MM-dd'));
    const [endDate, setEndDate] = useState<string>(searchParams.get('to') || format(new Date(), 'yyyy-MM-dd'));
    const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchWeatherData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:3058/api/weather?from=${startDate}&to=${endDate}`);
            setWeatherData(response.data.weather);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
        setLoading(false);
    }, [startDate, endDate]);

    useEffect(() => {
        fetchWeatherData();
    }, [fetchWeatherData]);

    const updateUrlParams = (from: string, to: string) => {
        const params = new URLSearchParams();
        params.set('from', from);
        params.set('to', to);
        window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
    };

    const handleDateChange = (type: 'start' | 'end', value: string) => {
        if (type === 'start') {
            setStartDate(value);
        } else {
            setEndDate(value);
        }
        updateUrlParams(type === 'start' ? value : startDate, type === 'end' ? value : endDate);
    };

    return (
        <div className="weather-container">
            <div className="date-selectors">
                <div className="date-input">
                    <label>Start Date</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => handleDateChange('start', e.target.value)}
                    />
                </div>
                <div className="date-input">
                    <label>End Date</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => handleDateChange('end', e.target.value)}
                    />
                </div>
            </div>

            {loading ? (
                <div className="loading-spinner">
                    <div className="spinner"></div>
                </div>
            ) : (
                <div className="chart-container">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={weatherData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="dateDay" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="maxTemperature" stroke="#8884d8" name="Max Temperature" />
                            <Line type="monotone" dataKey="minTemperature" stroke="#82ca9d" name="Min Temperature" />
                            {/* <Line type="monotone" dataKey="avgTemperature" stroke="#ffc658" name="Average Temperature" /> */}
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
};

export default WeatherPage; 