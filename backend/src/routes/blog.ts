import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = Router();
const prisma = new PrismaClient();

const createPostSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().optional(),
  content: z.string().min(1),
  coverImage: z.string().optional(),
  authorName: z.string().optional(),
  authorImage: z.string().optional(),
  categoryId: z.string().optional(),
  tags: z.array(z.string()).optional(),
  published: z.boolean().optional(),
  featured: z.boolean().optional(),
});

const updatePostSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  excerpt: z.string().optional(),
  content: z.string().min(1).optional(),
  coverImage: z.string().optional(),
  authorName: z.string().optional(),
  authorImage: z.string().optional(),
  categoryId: z.string().nullable().optional(),
  tags: z.array(z.string()).optional(),
  published: z.boolean().optional(),
  featured: z.boolean().optional(),
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const { page = '1', limit = '10', category, tag, featured } = req.query;

    const pageNum = Math.max(1, parseInt(page as string, 10) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit as string, 10) || 10));
    const skip = (pageNum - 1) * limitNum;

    const where: Record<string, unknown> = { published: true };

    if (category && typeof category === 'string') {
      where.category = { slug: category };
    }

    if (tag && typeof tag === 'string') {
      where.tags = { has: tag };
    }

    if (featured === 'true') {
      where.featured = true;
    }

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        include: { category: true },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limitNum,
      }),
      prisma.blogPost.count({ where }),
    ]);

    res.json({
      posts,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error('Get blog posts error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug: req.params.slug as string },
      include: { category: true },
    });

    if (!post || !post.published) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }

    res.json(post);
  } catch (error) {
    console.error('Get blog post error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', authenticate, validate(createPostSchema), async (req: Request, res: Response) => {
  try {
    const post = await prisma.blogPost.create({ data: req.body });
    res.status(201).json(post);
  } catch (error) {
    console.error('Create blog post error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.patch('/:id', authenticate, validate(updatePostSchema), async (req: Request, res: Response) => {
  try {
    const existing = await prisma.blogPost.findUnique({ where: { id: req.params.id as string } });
    if (!existing) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }

    const post = await prisma.blogPost.update({
      where: { id: req.params.id as string },
      data: req.body,
    });

    res.json(post);
  } catch (error) {
    console.error('Update blog post error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const existing = await prisma.blogPost.findUnique({ where: { id: req.params.id as string } });
    if (!existing) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }

    await prisma.blogPost.delete({ where: { id: req.params.id as string } });
    res.status(204).send();
  } catch (error) {
    console.error('Delete blog post error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
