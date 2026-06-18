import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = Router();
const prisma = new PrismaClient();

const createSchema = z.object({
  clientName: z.string().min(1),
  company: z.string().optional(),
  position: z.string().optional(),
  content: z.string().min(1),
  rating: z.number().int().min(1).max(5).optional(),
  avatar: z.string().optional(),
  featured: z.boolean().optional(),
});

const updateSchema = createSchema.partial();

router.get('/', async (req: Request, res: Response) => {
  try {
    const { featured } = req.query;
    const where: Record<string, unknown> = {};
    if (featured !== undefined) where.featured = featured === 'true';
    const testimonials = await prisma.testimonial.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    res.json(testimonials);
  } catch (error) {
    console.error('Get testimonials error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', authenticate, validate(createSchema), async (req: Request, res: Response) => {
  try {
    const testimonial = await prisma.testimonial.create({ data: req.body });
    res.status(201).json(testimonial);
  } catch (error) {
    console.error('Create testimonial error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.patch('/:id', authenticate, validate(updateSchema), async (req: Request, res: Response) => {
  try {
    const existing = await prisma.testimonial.findUnique({ where: { id: req.params.id as string } });
    if (!existing) {
      res.status(404).json({ error: 'Testimonial not found' });
      return;
    }
    const testimonial = await prisma.testimonial.update({
      where: { id: req.params.id as string },
      data: req.body,
    });
    res.json(testimonial);
  } catch (error) {
    console.error('Update testimonial error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const existing = await prisma.testimonial.findUnique({ where: { id: req.params.id as string } });
    if (!existing) {
      res.status(404).json({ error: 'Testimonial not found' });
      return;
    }
    await prisma.testimonial.delete({ where: { id: req.params.id as string } });
    res.status(204).send();
  } catch (error) {
    console.error('Delete testimonial error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
