import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = Router();
const prisma = new PrismaClient();

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().optional(),
  budget: z.string().optional(),
});

router.post('/', validate(contactSchema), async (req: Request, res: Response) => {
  try {
    const message = await prisma.contactMessage.create({ data: req.body });
    res.status(201).json(message);
  } catch (error) {
    console.error('Create contact message error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const { read } = req.query;

    const where: Record<string, unknown> = {};

    if (read !== undefined) {
      where.read = read === 'true';
    }

    const messages = await prisma.contactMessage.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    res.json(messages);
  } catch (error) {
    console.error('Get contact messages error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
