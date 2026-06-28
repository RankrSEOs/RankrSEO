import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { prisma } from './lib/prisma';

import authRoutes from './routes/auth';
import leadsRoutes from './routes/leads';
import contactRoutes from './routes/contact';
import blogRoutes from './routes/blog';
import casesRoutes from './routes/cases';
import testimonialsRoutes from './routes/testimonials';
import portfolioRoutes from './routes/portfolio';
import categoriesRoutes from './routes/categories';
import settingsRoutes from './routes/settings';

const app = express();

const isProduction = process.env.NODE_ENV === 'production';

app.use(helmet());
const corsOrigin = process.env.CORS_ORIGIN || (isProduction ? '' : 'http://localhost:3000');
if (isProduction && !process.env.CORS_ORIGIN) {
  console.error('FATAL: CORS_ORIGIN environment variable is required in production');
  process.exit(1);
}
app.use(cors({ origin: corsOrigin }));

app.use(isProduction ? morgan('combined') : morgan('dev'));

app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.json({
    service: 'RankrSEO Backend',
    status: 'running',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      api: '/api',
      docs: 'https://rankrseo.com',
    },
  });
});

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    service: 'RankrSEO Backend',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

app.use('/api/auth', authRoutes);
app.use('/api/leads', leadsRoutes);

app.use('/api/contact', contactRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/cases', casesRoutes);
app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/settings', settingsRoutes);

app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (!isProduction) {
    console.error(err.stack);
  }
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`RankrSEO Backend running on port ${PORT} [${isProduction ? 'production' : 'development'}]`);
});

function gracefulShutdown(signal: string) {
  console.log(`Received ${signal}, shutting down gracefully...`);
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

export default app;
