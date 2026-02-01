import cors from 'cors';
import express, { Express } from 'express';

const app: Express = express();

app.use(cors());
app.use(express.json());

export default app;
