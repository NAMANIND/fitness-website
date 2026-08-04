export function splash(width: number, height: number, keyword: string) {
  return `https://imagesplashh.vercel.app/api/image/${width}/${height}/${keyword}`;
}

export const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Programs", href: "/#programs" },
  { label: "Shop", href: "/#shop" },
  { label: "Supplements", href: "/#supplements" },
  { label: "Contact", href: "/#contact" },
] as const;

export const footerNavLinks = [
  { label: "Shop", href: "/#shop" },
  { label: "Programs", href: "/#programs" },
  { label: "Supplements", href: "/#supplements" },
  { label: "About", href: "/#about" },
] as const;

export const footerLegalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
] as const;

export const aboutStats = [
  { value: "6+", label: "Years Coaching" },
  { value: "500+", label: "Clients Trained" },
  { value: "Worldwide", label: "Online & Remote" },
] as const;

export const aboutContent = {
  eyebrow: "About Sara",
  heading: "Your Fitness Coach,",
  headingAccent: "Not Another Influencer",
  paragraphs: [
    "Sara Fiorvento is a Sydney based fitness coach on a mission to make strength simple, sustainable, and achievable for everyone. Blending the power of powerlifting with the artistry of bodybuilding, Sara's programs are built on one belief: strength is a foundation, not a finish line. Master the basics, train with intention, and the results follow.",
    "With a community of hundreds of thousands, Sara is known for keeping it real, no filters, no shortcuts, just proven training and genuine support.",
  ],
  tagline: "Ready to feel unstoppable? You're in the right place.",
} as const;

export const exercisePrograms = [
  {
    title: "LVLUP 2026",
    description:
      "A 6 week, high-energy program designed to push you further, build more strength and take your fitness to the next level.",
    image: splash(400, 600, "gym fitness woman"),
    isNew: true,
    theme: "night",
    cta: "Start Now",
  },
  {
    title: "HIIT 20M",
    description:
      "Short, intense sessions that torch calories and build endurance — perfect when you're tight on time.",
    image: splash(400, 600, "hiit workout"),
    isNew: false,
    theme: "day",
    cta: "Start Now",
  },
  {
    title: "Strength Builder",
    description:
      "Progressive lifting plans focused on building real strength with proper form and smart programming.",
    image: splash(400, 600, "strength training"),
    isNew: false,
    theme: "night",
    cta: "Start Now",
  },
  {
    title: "Core & Burn",
    description:
      "Targeted core work and full-body burn sessions for beginners ready to build a solid foundation.",
    image: splash(400, 600, "core workout"),
    isNew: false,
    theme: "day",
    cta: "Start Now",
  },
  {
    title: "Full Body Flow",
    description:
      "Balanced training that hits every muscle group — strength, mobility, and conditioning in one.",
    image: splash(400, 600, "full body workout"),
    isNew: false,
    theme: "night",
    cta: "Start Now",
  },
  {
    title: "Glute Lab",
    description:
      "Glute-focused programming to build shape, strength, and power without neglecting the rest of your training.",
    image: splash(400, 600, "leg workout"),
    isNew: true,
    theme: "day",
    cta: "Start Now",
  },
] as const;

export const packages = [
  {
    name: "Annual",
    price: "$10/mo.",
    billing: "$119.99 billed annually",
    description: "Best value — billed once per year.",
    featured: true,
    badge: "50% OFF",
  },
  {
    name: "Quarterly",
    price: "$16.66/mo.",
    billing: "$49.99 billed quarterly",
    description: "Billed every three months.",
    featured: false,
    badge: null,
  },
  {
    name: "Monthly",
    price: "$19.99/mo.",
    billing: "$19.99 billed monthly",
    description: "Flexible month-to-month billing.",
    featured: false,
    badge: null,
  },
] as const;

export const clientResults = [
  {
    name: "Jessica M.",
    weeks: "12 Weeks",
    quote:
      "I finally stopped yo-yo dieting. Sara taught me to lift heavy, eat enough, and trust the process. Down 18 lbs and stronger than ever.",
    beforeImage: splash(400, 500, "yoga"),
    afterImage: splash(400, 500, "fitness"),
  },
  {
    name: "Amanda R.",
    weeks: "16 Weeks",
    quote:
      "As a busy mom of two, I thought fitness wasn't possible. Sara built workouts I could do in 30 minutes. I have energy again.",
    beforeImage: splash(400, 500, "running"),
    afterImage: splash(400, 500, "gym"),
  },
  {
    name: "Taylor K.",
    weeks: "10 Weeks",
    quote:
      "I was intimidated by the gym. Sara's coaching gave me confidence and proper form. I actually look forward to training now.",
    beforeImage: splash(400, 500, "stretch"),
    afterImage: splash(400, 500, "workout"),
  },
] as const;

export const credibilityItems = [
  "Commonwealth Powerlifting Medalist",
  "BCPA Medalist",
  "CPU Medalist",
  "350K+ Instagram Followers",
] as const;

export const shopItems = [
  { image: splash(400, 600, "fitness apparel"), alt: "Fitness leggings and sports top" },
  { image: splash(400, 600, "gym wear"), alt: "Athletic wear set" },
  { image: splash(400, 600, "workout clothes"), alt: "Workout outfit" },
] as const;

export const shopCtaUrl = "https://www.youngla.com/";

export const supplementItems = [
  {
    video: "/videos/supplements/reel-1.mp4",
    poster: splash(720, 1280, "protein supplement"),
    alt: "Sara's supplement reel — protein and recovery",
    instagramUrl: "https://www.instagram.com/reels/DZn-BDkzDlS/",
  },
  {
    video: "/videos/supplements/reel-2.mp4",
    poster: splash(720, 1280, "vitamins"),
    alt: "Sara's supplement reel — daily vitamins",
    instagramUrl: "https://www.instagram.com/reels/DbB4EsuTlUv/",
  },
  {
    video: "/videos/supplements/reel-3.mp4",
    poster: splash(720, 1280, "supplements"),
    alt: "Sara's supplement reel — fitness supplements",
    instagramUrl: "https://www.instagram.com/reels/DaWIpVxTaU8/",
  },
] as const;

export const supplementCtaUrl =
  "https://ehplabs.com.au/?utm_campaign=kol&platform=grin&link_id=2062501&token=8uMA6JmUUQdfhroSeHyMtC7DtvK6R03b&contact_id=a38c9a33-fcaa-4332-8909-875e9569ccf8&attribution_window=30";

export const instagramTiles = [
  splash(400, 400, "fitness"),
  splash(400, 400, "gym"),
  splash(400, 400, "yoga"),
  splash(400, 400, "running"),
  splash(400, 400, "weights"),
  splash(400, 400, "workout"),
] as const;

export const images = {
  hero: "/images/hero.png",
  about: splash(800, 1000, "female fitness trainer"),
  og: "/opengraph-image",
} as const;

export const heroContent = {
  heading: {
    line1: "Strong Looks Good",
    accent: "On You.",
    line2: "Let's Build It Your",
    line3: "Way.",
  },
  subtext:
    "I'm Sara - online coach for individuals who are done with cookie-cutter plans. Real programming. Real accountability. Real life included.",
  primaryCta: { label: "View My Programs", href: "/#programs" },
  secondaryCta: { label: "Get a Free Workout" },
  socialProof: "50+ clients transformed · 4.9★ rated",
} as const;

export const brandTagline =
  "Strong looks good on you. Let's build it your way.";

export const footerTagline =
  "Built for real women. Real results. No shortcuts.";

export const shopPromoCode = "SEZZY";
export const shopDiscount = "20% OFF EVERYTHING";

export const scarcityMessage = "Only 5 coaching spots left this month";

export const sectionCopy = {
  programs: {
    subheading:
      "Expert-designed workout programs for every body and fitness level.",
  },
  pricing: {
    subheading:
      "Hurry up! Only few spots left.",
  },
  finalCta: {
    subheading:
      "Spots fill fast. If you're serious about building strength, confidence, and a body that matches your ambition — let's talk.",
  },
} as const;
