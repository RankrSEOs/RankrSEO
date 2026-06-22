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
  const portfolioItems = [
    { slug: 'techflow-seo', title: 'TechFlow SaaS', category: 'SEO', description: 'Increased organic traffic by 340% for a B2B SaaS company through comprehensive technical SEO and content strategy.', clientName: 'TechFlow Inc.', tags: ['+340% Organic Traffic', 'Top 5 for 47 Keywords', '150% ROI in 6 months'], featured: true },
    { slug: 'greenleaf-web', title: 'GreenLeaf Organics', category: 'Web Design', description: 'Designed a modern, conversion-optimized e-commerce store that increased sales by 28% within the first quarter.', clientName: 'GreenLeaf Organics', tags: ['+28% Conversion Rate', '42% Lower Bounce Rate', 'A+ Accessibility Score'], featured: true },
    { slug: 'brickhouse-local', title: 'BrickHouse Realty', category: 'Local SEO', description: 'Dominated local search for a real estate agency, achieving #1 in Google Local Pack for 12 high-value terms.', clientName: 'BrickHouse Realty', tags: ['#1 in Local Pack (12 terms)', '+280% Leads from Google', '4.9★ Average Rating'], featured: true },
    { slug: 'quantum-ppc', title: 'Quantum Finance', category: 'PPC', description: 'Optimized Google Ads campaigns for a fintech startup, reducing CPA by 55% while scaling spend 3x.', clientName: 'Quantum Finance', tags: ['-55% Cost Per Acquisition', '3.2x ROAS', '12K+ Qualified Leads'], featured: true },
    { slug: 'sprout-content', title: 'Sprout Health', category: 'Content Marketing', description: 'Built a content engine that positioned Sprout Health as the authority in wellness, driving 200K monthly visitors.', clientName: 'Sprout Health', tags: ['200K Monthly Visitors', '450+ Keywords in Top 10', '8.5K Email Subscribers'], featured: true },
    { slug: 'nexus-seo', title: 'Nexus Enterprise', category: 'SEO', description: 'Enterprise-level SEO for a logistics company spanning 14 countries, achieving 180% organic growth.', clientName: 'Nexus Enterprise', tags: ['+180% Global Traffic', '#1 for 28 Country-Specific Terms', '3.2M Impressions/Month'], featured: true },
    { slug: 'urban-web', title: 'UrbanCart', category: 'Web Design', description: 'Full redesign and development of a marketplace platform with focus on UX and mobile-first experience.', clientName: 'UrbanCart', tags: ['+65% Mobile Conversion', '94 PageSpeed Score', 'Zero CLS'], featured: true },
    { slug: 'peak-local', title: 'Peak Fitness', category: 'Local SEO', description: 'Multi-location local SEO strategy for a fitness chain, driving foot traffic across 8 branches.', clientName: 'Peak Fitness', tags: ['+190% Direction Requests', '#1 for 23 Location Terms', '8 GBP Optimized'], featured: true },
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
