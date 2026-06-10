export function splash(width: number, height: number, keyword: string) {
  return `https://imagesplashh.vercel.app/api/image/${width}/${height}/${keyword}`;
}

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Results", href: "#results" },
  { label: "Free Workout", href: "#free-workout" },
  { label: "Contact", href: "#contact" },
] as const;

export const socialProof =
  "500+ clients transformed · 4.9★ rated · Featured in Women's Health";

export const trustBadges = [
  "NASM Certified",
  "100K+ Instagram Followers",
  "Featured on Fitfluencer Weekly",
  "Online Coaching Worldwide",
] as const;

export const aboutStats = [
  { value: "6+", label: "Years Coaching" },
  { value: "500+", label: "Clients Trained" },
  { value: "Worldwide", label: "Online & Remote" },
] as const;

export const methodSteps = [
  {
    step: "01",
    title: "Assess",
    description:
      "We start with your goals, schedule, training history, and what hasn't worked before. No generic templates — your plan begins with you.",
    icon: "clipboard",
  },
  {
    step: "02",
    title: "Plan",
    description:
      "I build a custom program around your life: workouts, nutrition guidance, and accountability that fits your real routine, not an ideal one.",
    icon: "chart",
  },
  {
    step: "03",
    title: "Transform",
    description:
      "Weekly check-ins, progress tracking, and plan adjustments keep you moving. Strength builds, confidence follows, and results stick.",
    icon: "star",
  },
] as const;

export const packages = [
  {
    name: "Kickstart",
    price: "Starting at $97/mo",
    description: "Perfect for self-starters who want structure and guidance.",
    features: [
      "Custom 4-week training plan",
      "Weekly check-ins via app",
      "Exercise demo library",
      "Nutrition basics & macro guide",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Transform",
    price: "Starting at $197/mo",
    description: "My most popular program for women ready to commit.",
    features: [
      "Fully personalized programming",
      "Bi-weekly video coaching calls",
      "Macro coaching & meal guidance",
      "24/7 DM support",
      "Progress photo reviews",
    ],
    cta: "Work With Me",
    popular: true,
  },
  {
    name: "Elite 1:1",
    price: "Starting at $397/mo",
    description: "Maximum accountability for serious transformation.",
    features: [
      "Daily accountability check-ins",
      "Weekly 1:1 video calls",
      "Custom meal guidance",
      "Priority support & adjustments",
      "Competition prep optional",
    ],
    cta: "Apply Now",
    popular: false,
  },
] as const;

export const clientResults = [
  {
    name: "Jessica M.",
    duration: "12 weeks",
    quote:
      "I finally stopped yo-yo dieting. Sara taught me to lift heavy, eat enough, and trust the process. Down 18 lbs and stronger than ever.",
    beforeImage: splash(400, 500, "yoga"),
    afterImage: splash(400, 500, "fitness"),
  },
  {
    name: "Amanda R.",
    duration: "16 weeks",
    quote:
      "As a busy mom of two, I thought fitness wasn't possible. Sara built workouts I could do in 30 minutes. I have energy again.",
    beforeImage: splash(400, 500, "running"),
    afterImage: splash(400, 500, "gym"),
  },
  {
    name: "Taylor K.",
    duration: "8 weeks",
    quote:
      "I was intimidated by the gym. Sara's coaching gave me confidence and proper form. I actually look forward to training now.",
    beforeImage: splash(400, 500, "stretch"),
    afterImage: splash(400, 500, "workout"),
  },
] as const;

export const testimonials = [
  {
    name: "Michelle D.",
    rating: 5,
    quote:
      "Sara doesn't just give you a plan — she actually cares about your progress. Every check-in felt personal, not automated. I've worked with trainers before, but this was different.",
    avatar: splash(100, 100, "portrait"),
  },
  {
    name: "Rachel S.",
    rating: 5,
    quote:
      "I signed up skeptical. Three months later, I'm deadlifting more than my husband and feel incredible in my skin. Sara's approach is real, not restrictive.",
    avatar: splash(100, 100, "woman"),
  },
  {
    name: "Priya N.",
    rating: 5,
    quote:
      "The Transform program was worth every penny. Having someone adjust my plan when life got crazy — travel, sick kids, stress — kept me from quitting like I always did.",
    avatar: splash(100, 100, "smile"),
  },
  {
    name: "Lauren B.",
    rating: 5,
    quote:
      "Sara's energy is contagious. Her Instagram drew me in, but her coaching kept me. I'm stronger, leaner, and actually enjoy working out for the first time.",
    avatar: splash(100, 100, "face"),
  },
] as const;

export const faqs = [
  {
    question: "Do I need a gym?",
    answer:
      "No. Most of my clients train at home with dumbbells and resistance bands. I'll build your program around whatever equipment you have access to — home, gym, or both.",
  },
  {
    question: "What if I'm a complete beginner?",
    answer:
      "You're in the right place. Programs are scaled to your level from day one. We focus on form, building confidence, and creating habits that stick before pushing intensity.",
  },
  {
    question: "How fast will I see results?",
    answer:
      "Most clients feel stronger and more energized within 2 weeks. Visible physical changes typically show in 6–8 weeks with consistent training and nutrition adherence.",
  },
  {
    question: "What equipment do I need?",
    answer:
      "At minimum, a set of dumbbells or resistance bands. A full gym is a bonus, not a requirement. I'll design around what you have and suggest affordable upgrades if needed.",
  },
  {
    question: "Is this only for weight loss?",
    answer:
      "Not at all. We focus on building strength, improving energy, and developing confidence. Fat loss often happens as a natural result, but it's never the only goal.",
  },
  {
    question: "How do online check-ins work?",
    answer:
      "You'll submit progress updates, photos, and notes through the coaching app. I review everything weekly and adjust your program based on how you're progressing and feeling.",
  },
] as const;

export const instagramTiles = [
  splash(400, 400, "fitness"),
  splash(400, 400, "gym"),
  splash(400, 400, "yoga"),
  splash(400, 400, "running"),
  splash(400, 400, "weights"),
  splash(400, 400, "workout"),
] as const;

export const images = {
  hero: splash(1200, 900, "gym"),
  about: splash(800, 1000, "female fitness trainer"),
  freeWorkout: splash(800, 1000, "workout"),
  og: "/opengraph-image",
} as const;

export const videoEmbedUrl = "https://www.youtube.com/embed/L_LUpnjgP9o";

export const scarcityMessage = "Only 5 coaching spots left this month";

export const brandTagline =
  "Strong looks good on you. Let's build it your way.";

export const footerTagline =
  "Built for real women. Real results. No shortcuts.";
