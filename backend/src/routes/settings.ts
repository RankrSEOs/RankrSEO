import { Router, Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma';
import { z } from 'zod';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = Router();

router.get('/', authenticate, async (_req: Request, res: Response) => {
  try {
    const settings = await prisma.setting.findMany();
    const map: Record<string, unknown> = {};
    for (const s of settings) {
      map[s.key] = s.value;
    }
    res.json(map);
  } catch (error) {
    console.error('Get settings error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const updateSchema = z.record(z.string(), z.any());

router.put('/', authenticate, validate(updateSchema), async (req: Request, res: Response) => {
  try {
    const entries = req.body as Record<string, Prisma.InputJsonValue>;
    const results: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(entries)) {
      const setting = await prisma.setting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      });
      results[key] = setting.value;
    }
    res.json(results);
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
