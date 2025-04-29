import { Router, Request, Response } from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const runQuery = async (query: string, params: any[] = []) => {
    const db = await open({
        filename: './src/db/weather.sqlite',
        driver: sqlite3.Database,
    });

    const statement = await db.prepare(query);
    const rows = await statement.all(params);
    await statement.finalize();
    await db.close();
    return rows;
};

const validateDate = (date: string): boolean => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(date)) return false;
    
    const d = new Date(date);
    return d instanceof Date && !isNaN(d.getTime());
};

const getWeather = async (req: Request, res: Response) => {
    const { city = 'New York', from, to } = req.query;

    if (!from || !to) {
        return res.status(400).json({ error: 'Missing required parameters: from and to dates are required' });
    }

    if (!validateDate(from as string) || !validateDate(to as string)) {
        return res.status(400).json({ error: 'Invalid date format. Please use YYYY-MM-DD' });
    }

    try {
        const weather = await runQuery(
            'SELECT date(t.time) as dateDay, max(t.temperature) as maxTemperature, min(t.temperature) as minTemperature, avg(t.temperature) as avgTemperature FROM main.temperature_hourly t WHERE t.city = ? AND t.time BETWEEN ? AND ? GROUP BY date(t.time)',
            [city, from, to]
        );
        res.json({ weather });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const router = Router();
router.get('/', getWeather);

export default router;
