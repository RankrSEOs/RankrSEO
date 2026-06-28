import { Router, Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma';
import { z } from 'zod';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = Router();

const createCaseSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  clientName: z.string().optional(),
  clientIndustry: z.string().optional(),
  problem: z.string().optional(),
  strategy: z.string().optional(),
  results: z.string().optional(),
  metrics: z.any().optional(),
  coverImage: z.string().optional(),
  screenshots: z.array(z.string()).optional(),
  published: z.boolean().optional(),
});

const updateCaseSchema = createCaseSchema.partial();

router.get('/', async (req: Request, res: Response) => {
  try {
    const { published } = req.query;
    const where: Prisma.CaseStudyWhereInput = { published: true };
    if (published !== undefined) where.published = published === 'true';
    const cases = await prisma.caseStudy.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    res.json(cases);
  } catch (error) {
    console.error('Get cases error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const study = await prisma.caseStudy.findUnique({
      where: { slug: req.params.slug as string },
    });
    if (!study || !study.published) {
      res.status(404).json({ error: 'Case study not found' });
      return;
    }
    res.json(study);
  } catch (error) {
    console.error('Get case error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', authenticate, validate(createCaseSchema), async (req: Request, res: Response) => {
  try {
    const study = await prisma.caseStudy.create({ data: req.body });
    res.status(201).json(study);
  } catch (error) {
    console.error('Create case error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.patch('/:id', authenticate, validate(updateCaseSchema), async (req: Request, res: Response) => {
  try {
    const existing = await prisma.caseStudy.findUnique({ where: { id: req.params.id as string } });
    if (!existing) {
      res.status(404).json({ error: 'Case study not found' });
      return;
    }
    const study = await prisma.caseStudy.update({
      where: { id: req.params.id as string },
      data: req.body,
    });
    res.json(study);
  } catch (error) {
    console.error('Update case error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const existing = await prisma.caseStudy.findUnique({ where: { id: req.params.id as string } });
    if (!existing) {
      res.status(404).json({ error: 'Case study not found' });
      return;
    }
    await prisma.caseStudy.delete({ where: { id: req.params.id as string } });
    res.status(204).send();
  } catch (error) {
    console.error('Delete case error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
