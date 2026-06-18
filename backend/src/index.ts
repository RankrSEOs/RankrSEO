import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import authRoutes from './routes/auth';
import leadsRoutes from './routes/leads';
import contactRoutes from './routes/contact';
import blogRoutes from './routes/blog';
import casesRoutes from './routes/cases';
import testimonialsRoutes from './routes/testimonials';
import portfolioRoutes from './routes/portfolio';

const app = express();

const isProduction = process.env.NODE_ENV === 'production';

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000' }));

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
app.use('/api/audit', leadsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/cases', casesRoutes);
app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/portfolio', portfolioRoutes);

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

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
app.listen(PORT, () => {
  console.log(`RankrSEO Backend running on port ${PORT} [${isProduction ? 'production' : 'development'}]`);
});

export default app;
