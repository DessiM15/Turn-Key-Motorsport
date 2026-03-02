import type { BlogPost } from '@/lib/types';

const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-001',
    slug: 'ls3-cam-swap-guide',
    title: 'The Complete LS3 Cam Swap Guide — What You Need to Know',
    excerpt: 'Everything from cam selection to break-in procedure. We walk through the entire LS3 cam swap process based on hundreds of installs in our shop.',
    content: `A cam swap is the single best modification you can make to an LS3 engine. It transforms the power curve, the sound, and the driving experience. But there is a lot to consider before you pull the trigger.

**Choosing the Right Cam**

The cam profile you choose depends on your goals. A streetable daily driver needs a different cam than a weekend warrior or track car. Key specs to understand:
- Duration at .050": Determines the RPM range where the cam makes power. More duration = higher RPM power.
- Lift: How far the valves open. More lift = more airflow = more power, but requires upgraded valve springs.
- Lobe Separation Angle (LSA): Affects idle quality and vacuum. Tighter LSA = choppier idle, worse vacuum.

For a street-driven LS3, we typically recommend 220-232 degrees duration at .050" with .580-.610" lift on a 112-114 LSA. This gives you great power from 3,000-6,500 RPM with a streetable idle.

**Supporting Mods**

A cam swap is not just the cam. You need:
1. Upgraded valve springs (the factory springs cannot handle aggressive profiles)
2. Hardened pushrods (stock pushrods flex under load)
3. New gaskets (head, valley cover, timing cover)
4. A professional tune (the factory calibration will not work with a new cam)

**The Break-In**

Proper break-in is critical. The cam and lifters need to mate correctly during the first 20 minutes of run time. We use zinc-fortified break-in oil and run the engine at 2,000-2,500 RPM for 20 minutes with no idling. After the break-in, we change the oil and begin the tuning process.

**Results You Can Expect**

On a bolt-on LS3 with intake, headers, exhaust, and our Stage 2 cam package, expect 480-520 RWHP. That is 80-100 HP over a fully bolted stock cam car. The sound difference alone is worth it.`,
    coverImage: 'gradient-red-dark',
    category: 'tech-tips',
    tags: ['LS3', 'cam swap', 'engine builds', 'how-to'],
    author: 'Turnkey Motorsports',
    publishedAt: '2025-12-15',
    readTime: '8 min read',
    relatedPostIds: ['blog-002', 'blog-003'],
    featured: true,
  },
  {
    id: 'blog-002',
    slug: 'best-mods-57-hemi',
    title: 'Top 5 Mods for Your 5.7L HEMI — Best Bang for Your Buck',
    excerpt: 'The 5.7L HEMI responds incredibly well to bolt-on modifications. Here are the top 5 mods that deliver the most power per dollar.',
    content: `The 5.7L HEMI is one of the most rewarding platforms to modify. It responds well to bolt-ons and there is a massive aftermarket supporting it. Here are our top 5 recommendations.

**1. Cold Air Intake ($350-$450)**
The factory airbox is restrictive. A quality cold air intake opens up the breathing and gives you 15-22 RWHP with an aggressive induction sound. No tune required on most kits.

**2. Mid-Muffler Delete or Cat-Back Exhaust ($200-$1,600)**
The factory exhaust on the 5.7L is very quiet. A mid-muffler delete for $200 wakes up the sound dramatically. If you want more, a full cat-back system with a resonator delete adds power and volume.

**3. Performance Tune ($400-$600)**
A custom tune on the 5.7L is where the real magic happens. A quality tune optimizes shift points, fuel tables, and spark timing for 30-40 RWHP. It also lets you disable MDS (Multi-Displacement System) if you want.

**4. Long Tube Headers ($1,000-$1,500)**
This is the biggest single bolt-on power adder. Long tube headers with a tune can add 40-60 RWHP. The sound improvement is massive. Budget for professional installation.

**5. Throttle Body Spacer + Intake Spacer ($100-$200)**
A budget mod that adds 5-10 HP by improving air velocity. Not life-changing but a cheap add-on when you are already doing other work.

**Combined Results**: Intake + headers + exhaust + tune = 80-120 RWHP gain on a 5.7L HEMI. That puts you in the 450-480 RWHP range — enough to gap stock Scat Packs.`,
    coverImage: 'gradient-orange-dark',
    category: 'tech-tips',
    tags: ['HEMI', '5.7L', 'bolt-ons', 'mods'],
    author: 'Turnkey Motorsports',
    publishedAt: '2025-11-28',
    readTime: '6 min read',
    relatedPostIds: ['blog-001', 'blog-004'],
  },
  {
    id: 'blog-003',
    slug: 'featured-build-scat-pack-640whp',
    title: 'Build Spotlight: Sarah\'s 640WHP Naturally Aspirated Scat Pack',
    excerpt: 'How we built a 392 HEMI to 640WHP on motor alone — forged internals, ported heads, and a tune that screams.',
    content: `Sarah came to us with a 2022 Dodge Charger Scat Pack and one goal: maximum naturally aspirated power. No supercharger, no turbo — just displacement, airflow, and fuel.

**The Build Plan**

We started with a complete teardown and inspection. The factory 392 block is strong but the rotating assembly needed to be upgraded for the RPM we planned to spin. Here is what went into this build:

- Forged 4340 crankshaft (factory stroke)
- Forged H-beam connecting rods with ARP 2000 bolts
- Forged pistons with custom compression ratio (11.2:1)
- CNC ported and polished cylinder heads (310 CFM intake)
- Custom-ground camshaft (aggressive NA profile)
- Long tube headers and full 3" exhaust with X-pipe
- 1000cc fuel injectors
- Dual fuel pump upgrade
- Custom flex-fuel tune (93 octane and E85 calibrations)

**The Results**

On E85, the 392 made **640 WHP and 610 lb-ft** on our chassis dyno. On 93 octane, it made 590 WHP. These are massive numbers for a naturally aspirated engine — most shops struggle to break 550 WHP without boost.

The key was the head work. Our CNC porting program flows 310 CFM at 28" of water on the intake side. Combined with the aggressive cam and high compression, the engine breathes like a race motor but idles like a stock car.

Sarah drives this car daily. It starts, idles, and runs perfectly. The only giveaway is the cam lope at idle and the fact that it sounds like a Top Fuel dragster at full throttle.`,
    coverImage: 'gradient-violet-dark',
    category: 'build-spotlights',
    tags: ['392 HEMI', 'Scat Pack', 'NA build', 'featured'],
    author: 'Turnkey Motorsports',
    publishedAt: '2025-11-10',
    readTime: '7 min read',
    relatedPostIds: ['blog-001', 'blog-002'],
    featured: true,
  },
  {
    id: 'blog-004',
    slug: 'e85-vs-93-octane',
    title: 'E85 vs 93 Octane — Is E85 Worth It for Your Build?',
    excerpt: 'E85 makes more power but uses more fuel. We break down the real-world pros and cons of switching to E85.',
    content: `E85 is one of the most popular topics in the performance world. It makes more power, it is cheaper per gallon, and it runs cooler. But is it right for your build? Let us break it down.

**What is E85?**

E85 is a fuel blend containing 85% ethanol and 15% gasoline. The high ethanol content gives it an effective octane rating around 105 — much higher than 93 octane pump gas.

**The Power Advantage**

E85 allows more aggressive tuning. The higher octane rating means you can run more ignition timing and boost (on forced induction cars) without detonation. Typical gains:
- Naturally aspirated: 5-8% more power over 93 octane
- Supercharged: 10-15% more power
- Turbocharged: 15-25% more power

On a 700HP supercharged car, that could mean 70-100+ extra HP just from the fuel change and retune.

**The Downsides**

1. **Fuel consumption**: E85 has about 30% less energy per gallon than gasoline. You will use roughly 30% more fuel.
2. **Availability**: Not every gas station carries E85. Plan your routes if you are daily driving on E85.
3. **Fuel system upgrades**: E85 is corrosive to some fuel system materials and requires more volume. You may need larger injectors and a fuel pump upgrade.
4. **Ethanol content varies**: The actual ethanol content can range from 51-83% depending on the station and season. A flex-fuel tune compensates for this automatically.

**Our Recommendation**

If you have a forced induction car and access to E85, it is absolutely worth it. The power gains are significant and the cooling effect helps engine longevity. For naturally aspirated cars, the gains are smaller but still noticeable — especially on high-compression builds.

We always recommend a flex-fuel tune so you can run either fuel seamlessly.`,
    coverImage: 'gradient-emerald-dark',
    category: 'tech-tips',
    tags: ['E85', 'fuel', 'tuning', 'tech'],
    author: 'Turnkey Motorsports',
    publishedAt: '2025-10-20',
    readTime: '6 min read',
    relatedPostIds: ['blog-001', 'blog-002'],
  },
];

export function getAllBlogPosts(): BlogPost[] {
  return BLOG_POSTS;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getFeaturedBlogPosts(): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.featured);
}

export function getRelatedBlogPosts(ids: string[]): BlogPost[] {
  return BLOG_POSTS.filter((p) => ids.includes(p.id));
}
