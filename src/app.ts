import cors from 'cors';
import express, { Application } from 'express';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import path from 'node:path';
import authRoutes from './routes/auth.routes';
import bankRoutes from './routes/bank.routes';
import categoryRoutes from './routes/category.routes';
import productsRoutes from './routes/product.routes';
import tranasctionRoutes from './routes/transaction.routes';

const app: Application = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(helmet());
app.use(limiter);
app.use(cors(corsOptions));
app.use(ExpressMongoSanitize());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/banks', bankRoutes);
app.use('/api/transactions', tranasctionRoutes);

export default app;
