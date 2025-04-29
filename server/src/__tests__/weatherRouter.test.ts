import request from 'supertest';
import express from 'express';
import weatherRouter from '../api/weatherRouter';

describe('Weather Router Tests', () => {
    let app: express.Application;

    beforeAll(() => {
        app = express();
        app.use(express.json());
        app.use('/api/weather', weatherRouter);
    });

    describe('GET /api/weather', () => {
        it('should return 200 and weather data for valid date range', async () => {
            const response = await request(app)
                .get('/api/weather')
                .query({
                    from: '2024-01-01',
                    to: '2024-01-31',
                    city: 'New York'
                });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('weather');
            expect(Array.isArray(response.body.weather)).toBe(true);
        });

        it('should return 200 with default city when city is not provided', async () => {
            const response = await request(app)
                .get('/api/weather')
                .query({
                    from: '2024-01-01',
                    to: '2024-01-31'
                });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('weather');
        });

        it('should handle invalid date format', async () => {
            const response = await request(app)
                .get('/api/weather')
                .query({
                    from: 'invalid-date',
                    to: '2024-01-31'
                });

            expect(response.status).toBe(400);
        });

        it('should handle missing date parameters', async () => {
            const response = await request(app)
                .get('/api/weather');

            expect(response.status).toBe(400);
        });
    });
}); 