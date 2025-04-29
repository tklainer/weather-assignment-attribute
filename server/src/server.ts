import express from 'express';
import cors from 'cors';
import weatherRouter from './api/weatherRouter';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use('/api/weather', weatherRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
}); 