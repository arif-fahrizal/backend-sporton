import cors from 'cors';
import express, { Application } from 'express';
import path from 'node:path';
import authRoutes from './routes/auth.route';
import categoryRoutes from './routes/category.routes';
import productsRoutes from './routes/product.routes';

const app: Application = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productsRoutes);

export default app;
