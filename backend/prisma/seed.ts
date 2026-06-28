import { PrismaClient, Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

function json(val: Record<string, unknown>): Prisma.InputJsonValue {
  return val as Prisma.InputJsonValue;
}

async function main() {
  console.log('Seeding database...\n');

  // 1. Admin User
  const email = 'admin@rankrseo.com';
  if (!(await prisma.user.findUnique({ where: { email } }))) {
    await prisma.user.create({
      data: { name: 'Amit Kumar', email, password: await bcrypt.hash('admin123', 12), role: 'ADMIN' },
    });
    console.log('✓ Admin user: admin@rankrseo.com / admin123');
  } else {
    console.log('→ Admin user already exists');
  }

  // 2. Case Studies
  const caseStudies = [
    {
      slug: 'techflow-seo', title: 'TechFlow Solutions',
      clientIndustry: 'B2B SaaS', clientName: 'TechFlow Inc.',
      problem: 'TechFlow was struggling with low organic visibility despite having a solid product. They ranked on page 3 for most high-value keywords.',
      strategy: 'We implemented a comprehensive SEO strategy including technical fixes, content overhaul, and strategic link building.',
      results: 'Achieved #1 rankings for 50+ keywords with 340% traffic growth and 280% more leads.',
      metrics: json({ traffic: '+340%', leads: '+280%', rankings: 'Page 1 for 50+ keywords', timeframe: '6 months', metricBefore: 45, metricAfter: 98 }),
      published: true,
    },
    {
      slug: 'greenleaf-web', title: 'GreenLeaf Organics',
      clientIndustry: 'E-Commerce', clientName: 'GreenLeaf Organics',
      problem: 'GreenLeaf had an outdated website with poor conversion rates and zero organic traffic strategy.',
      strategy: 'We redesigned their website with SEO-first architecture, optimized product pages, and launched a content marketing strategy.',
      results: '410% traffic increase with 320% more leads, dominating 30+ product keywords on Page 1.',
      metrics: json({ traffic: '+410%', leads: '+320%', rankings: 'Page 1 for 30+ product keywords', timeframe: '8 months', metricBefore: 30, metricAfter: 95 }),
      published: true,
    },
    {
      slug: 'brickhouse-local', title: 'BrickHouse Realty',
      clientIndustry: 'Real Estate', clientName: 'BrickHouse Realty',
      problem: 'BrickHouse was invisible in local search results and losing potential clients to competitors with optimized GBP listings.',
      strategy: 'We optimized their Google Business Profile, built local citations, managed reviews, and created localized content.',
      results: 'Top 3 rankings for 20+ local searches with 190% more traffic and 250% more leads.',
      metrics: json({ traffic: '+190%', leads: '+250%', rankings: 'Top 3 for 20+ local searches', timeframe: '4 months', metricBefore: 20, metricAfter: 85 }),
      published: true,
    },
  ];

  for (const cs of caseStudies) {
    await prisma.caseStudy.upsert({
      where: { slug: cs.slug },
      update: cs,
      create: cs,
    });
  }
  console.log(`✓ ${caseStudies.length} case studies`);

  // 3. Testimonials
  const testimonials = [
    { clientName: 'Sarah Johnson', company: 'TechFlow Solutions', position: 'CEO', content: 'RankrSEO transformed our online presence. Within 6 months, our organic traffic grew by 340% and we are now ranking on page 1 for 50+ keywords. Amit and his team are truly exceptional.', rating: 5, featured: true },
    { clientName: 'Michael Chen', company: 'GreenLeaf Organics', position: 'Founder', content: 'Working with RankrSEO was the best investment we made for our business. They built us a stunning website and our leads increased by 280% in the first quarter alone.', rating: 5, featured: true },
    { clientName: 'Emily Rodriguez', company: 'BrickHouse Realty', position: 'Marketing Director', content: 'The local SEO expertise at RankrSEO is unmatched. Our Google Business Profile now appears in the top 3 for 20+ local searches, and we have seen a 190% increase in phone calls.', rating: 5, featured: true },
    { clientName: 'David Park', company: 'DataStream Analytics', position: 'CTO', content: 'Amit\'s technical SEO knowledge is world-class. He identified and fixed critical issues that were holding our site back. Our Core Web Vitals scores went from 45 to 98 in just weeks.', rating: 5, featured: true },
  ];

  for (const t of testimonials) {
    const existing = await prisma.testimonial.findFirst({ where: { clientName: t.clientName } });
    if (!existing) await prisma.testimonial.create({ data: t });
  }
  console.log(`✓ ${testimonials.length} testimonials`);

  // 4. Portfolio Items
  // Delete old fictional items, upsert real team projects
  await prisma.portfolio.deleteMany({
    where: { slug: { in: ['techflow-seo', 'greenleaf-web', 'brickhouse-local', 'quantum-ppc', 'sprout-content', 'nexus-seo', 'urban-web', 'peak-local', 'guru'] } },
  });
  const portfolioItems = [
    { slug: 'excompany', title: 'ExCompany', category: 'Corporate', description: 'Professional corporate website for a business consulting firm — full SEO, performance optimization, and ongoing search visibility management.', clientName: 'ExCompany', tags: ['Website Development', 'Technical SEO', 'On Page SEO', 'Performance Optimization', 'Search Visibility Improvements'], liveUrl: 'https://www.excompany.in/', featured: true },
    { slug: 'zubilo-studio', title: 'Zubilo Studio', category: 'Web Design', description: 'Brand-first creative studio website with custom animations, bold visuals, SEO strategy, and technical content optimization.', clientName: 'Zubilo Studio', tags: ['Website Development', 'SEO Strategy', 'Technical SEO', 'Content Optimization', 'Search Engine Visibility'], liveUrl: 'https://www.zubilo.studio/', featured: true },
    { slug: 'scrapco', title: 'ScrapCo', category: 'Web Development', description: 'Scrap pickup marketplace connecting households, shops, and factories with verified vendors — technical SEO and architecture planning.', clientName: 'ScrapCo', tags: ['Product Website Development', 'Technical SEO', 'Search Optimization', 'Website Architecture Planning', 'Performance Improvements'], liveUrl: 'https://www.scrapco.app/', featured: true },
    { slug: 'ezdry', title: 'EZ Dry', category: 'Web Design', description: 'Laundry service platform with online booking, location-based service areas, local SEO, and business visibility optimization.', clientName: 'EZ Dry', tags: ['Website Design', 'Website Development', 'Local SEO', 'Technical SEO', 'Business Visibility Optimization'], liveUrl: 'https://www.ezdry.in/', featured: true },
    { slug: 'pogotunes', title: 'PogoTunes', category: 'Web Development', description: 'Kids\' learning platform with 500+ educational videos, 50+ interactive games, UI/UX design, and SEO foundation setup.', clientName: 'PogoTunes', tags: ['Website Development', 'UI/UX Design', 'Technical Optimization', 'SEO Foundation Setup', 'Multi-Language Content'], liveUrl: 'https://pogotunes.vercel.app/', featured: true },
    { slug: 'saferaahia', title: 'Safe Raahia', category: 'Web Development', description: 'Social initiative safety website with performance optimization, technical SEO, and content structure planning.', clientName: 'Safe Raahia', tags: ['Website Development', 'Performance Optimization', 'Technical SEO', 'Content Structure Planning', 'Social Initiative'], liveUrl: 'https://saferaahia.netlify.app/', featured: true },
    { slug: 'rankrseo', title: 'RankrSEO', category: 'Full Service', description: 'Complete agency website — design, development, SEO strategy, branding, UI/UX, and conversion optimization.', clientName: 'RankrSEO', tags: ['Complete Design & Development', 'SEO Strategy', 'Content Strategy', 'Branding & UI/UX', 'Conversion Optimization'], liveUrl: 'https://rankrseo.vercel.app', featured: true },
  ];

  for (const p of portfolioItems) {
    await prisma.portfolio.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }
  console.log(`✓ ${portfolioItems.length} portfolio items`);

  // 5. Blog Categories
  const categories = [
    { name: 'SEO', slug: 'seo' },
    { name: 'Local SEO', slug: 'local-seo' },
    { name: 'Web Design', slug: 'web-design' },
    { name: 'PPC', slug: 'ppc' },
    { name: 'Content Marketing', slug: 'content-marketing' },
    { name: 'Technical SEO', slug: 'technical-seo' },
    { name: 'Link Building', slug: 'link-building' },
    { name: 'Social Media', slug: 'social-media' },
  ];

  for (const c of categories) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: c,
      create: c,
    });
  }
  console.log(`✓ ${categories.length} categories`);

  console.log('\n✅ Seed complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
