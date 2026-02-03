import cors from 'cors';
import type { Application } from 'express';
import express from 'express';
import authRoutes from './routes/auth.route';

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

export default app;
