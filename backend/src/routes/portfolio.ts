import { Router, Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma';
import { z } from 'zod';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = Router();

const createSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  category: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  tags: z.array(z.string()).optional(),
  clientName: z.string().optional(),
  completionDate: z.string().datetime().transform(v => new Date(v)).optional(),
  liveUrl: z.string().optional(),
  featured: z.boolean().optional(),
});

const updateSchema = createSchema.partial();

router.get('/', async (req: Request, res: Response) => {
  try {
    const { category, featured } = req.query;
    const where: Prisma.PortfolioWhereInput = {};
    if (category && typeof category === 'string') where.category = category;
    if (featured !== undefined) where.featured = featured === 'true';
    const items = await prisma.portfolio.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    res.json(items);
  } catch (error) {
    console.error('Get portfolio error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const item = await prisma.portfolio.findUnique({
      where: { slug: String(req.params.slug) },
    });
    if (!item) {
      res.status(404).json({ error: 'Portfolio item not found' });
      return;
    }
    res.json(item);
  } catch (error) {
    console.error('Get portfolio item error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', authenticate, validate(createSchema), async (req: Request, res: Response) => {
  try {
    const item = await prisma.portfolio.create({ data: req.body });
    res.status(201).json(item);
  } catch (error) {
    console.error('Create portfolio error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.patch('/:id', authenticate, validate(updateSchema), async (req: Request, res: Response) => {
  try {
    const existing = await prisma.portfolio.findUnique({ where: { id: String(req.params.id) } });
    if (!existing) {
      res.status(404).json({ error: 'Portfolio item not found' });
      return;
    }
    const item = await prisma.portfolio.update({
      where: { id: String(req.params.id) },
      data: req.body,
    });
    res.json(item);
  } catch (error) {
    console.error('Update portfolio error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const existing = await prisma.portfolio.findUnique({ where: { id: String(req.params.id) } });
    if (!existing) {
      res.status(404).json({ error: 'Portfolio item not found' });
      return;
    }
    await prisma.portfolio.delete({ where: { id: String(req.params.id) } });
    res.status(204).send();
  } catch (error) {
    console.error('Delete portfolio error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
