"use client"

import React, { useEffect, useState } from "react";
import NextImage from "next/image";
import { motion, easeOut } from "framer-motion";
import {
  Moon,
  Sun,
  Github,
  Linkedin,
  Globe,
  ExternalLink,
  Menu,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Code2,
  Calendar,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReTooltip,
} from "recharts";

// ----- Data (customize me!) -----
const NAV = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const PROJECTS = [
  {
    title: "Fly Spy — Citizen Science Mobile App",
    desc: "React Native + Firebase app (iOS/Android) to log GPS-tagged *D. elegans* fly sightings in real time for an international research effort.",
    tags: ["React Native", "TypeScript", "Firebase", "Google Maps", "Expo"],
    link: "https://apps.apple.com/us/app/flyspy/id6744664303",
    image: "/projects/img-6.png",
    badge: "50+ Users",
  },
  {
    title: "EcoFinder — Sustainable AI Shopping Assistant",
    desc: "Chrome extension using GPT-4 to suggest eco-friendly alternatives on major retailers in real time. 1st Place (Environmental Sustainability), WiCS HopperHacks.",
    tags: ["React", "TypeScript", "OpenAI API", "Webpack", "Axios"],
    link: "https://devpost.com/software/ecofinder-se360j",
    image: "/projects/img-7.png",
    badge: "1st Place",
  },
  {
    title: "Wolfie AI Tutor — SAT Assistant",
    desc: "Multi-LLM (GPT-4o, Grok, Gemini) tutor for question breakdowns, walkthroughs, and similar problems. Focus on accuracy, style, and latency. First place at NLP Final Showcase",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Supabase", "LLMs"],
    link: "https://github.com/dkadur/ai-tutor/",
    image: "/projects/img-9.png",
    badge: "1st Place",
  },
  {
    title: "Code Assist — Smart EMS Assistant",
    desc: "Smart LifePak-integrated assistant that guides EMTs through cardiac arrest protocols with real-time voice/visual prompts and automatic event logging. Healthcare Innovation Challenge Winner",
    tags: ["Streamlit", "Python", "Open AI Whisper", "Open AI GPT-3.5-turbo", "NLP"],
    link: "https://codeassist-wmvrzovflqmmcd5gclkwud.streamlit.app/",
    image: "/projects/img-8.png",
    badge: "1st Place",
  },  
  {
    title: "Fingerprinting Ultraonic Sensors",
    desc: "Machine learning model developed to be able to identify ultrasonic sensors based on their distance and electrical readings.",
    tags: ["Python", "PyTorch", "Scikit-Learn", "NumPy", "Pandas", "Arduino"],
    link: "https://github.com/srivaths-ravva/Sensor-Fingerprinting",
    image: "/projects/img-2.png",
    badge: "Published",
  },
  {
    title: "Snack Shack — Inventory Management App",
    desc: "Pantry tracking app using OpenAI Vision API to automatically recognize and update items.",
    tags: ["Vercel", "Next.js", "Firebase", "React.js", "TypeScript", "OpenAI Vision API", "Material UI"],
    link: "https://snack-shack.vercel.app/",
    image: "/projects/img-5.png",
  },
  {
    title: "Takuzu — Online Puzzle Games",
    desc: "Online puzzle game with similiar rules to Sudoku.",
    tags: ["React.js", "Bootstrap CSS", "Firebase"],
    link: "https://anthonyfabius.github.io/Takuzu/",
    image: "/projects/img-1.jpg",
  },
  {
    title: "Stock Market Vizualizer",
    desc: "Real-time web scraper and vizualizer of stock market data provided by NASDAQ.",
    tags: ["Python", "Selenium", "Chrome Web Driver", "Pandas", "Plotly"],
    link: "https://github.com/srivaths-ravva/StockMarketApp",
    image: "/projects/img-3.png",
  },
  {
    title: "Lua Video Games",
    desc: "Video Games built with Lua based on Harvard's CS50G course.",
    tags: ["Lua", "Love2D"],
    link: "https://github.com/srivaths-ravva/Lua-Projects",
    image: "/projects/img-4.png",
  },
]

const EXPERIENCE = [
  {
    role: "Software Engineering Intern",
    org: "Estée Lauder Companies Inc.",
    period: "Jun 2025 — Aug 2025",
    location: "New York City, NY",
    image: "estee.jpeg",
    bullets: [
      "Developed 2 internal Agentic AI chatbots with Microsoft Copilot, reducing file retrieval time by 70%.",
      "Built CI/CD data pipeline from MongoDB to Microsoft Dataverse via Azure and Power Automate.",
      "Leveraged Copilot's RAG-like logic to create robust data relations and context across 9,000+ points.",
      "Integrated chatbot into full-stack web app (React, Express, Node.js) supporting 1,100+ internal users.",
      "Containerized app with Docker and deployed to Kubernetes for scalable hosting in Azure."
    ],
  },
  {
    role: "Machine Learning Researcher",
    org: "Tennessee Tech University",
    period: "May 2024 — Aug 2024",
    location: "Cookeville, TN",
    image: "tennessee.png",
    bullets: [
      "Developed 2 fingerprinting methods for ultrasonic sensors to increase hardware security.",
      "Classified 8 sensors using supervised ML models (Decision Tree (DT), Multilayer Perceptron (MLP).",
      "Trained models on 22,000 points of distance data (features: %error, variance, kurtosis, skew).",
      "Published scientific journal for IEEE Southeast Conference 2025.",
      "Achieved 87% Multilayer Perceptron model accuracy, 85% precision, and 70% recall."
    ],
  },
  {
    role: "Teaching Assistant",
    org: "Stony Brook University.",
    period: "Aug 2023 — May 2024",
    location: "Stony Brook, NY",
    image: "sbu.jpeg",
    bullets: [
      "Ran lab sessions to help students learn Object Oriented Programming.",
      "Proctored and graded labs, projects, midterm exams, and final exams.",
    ],
  },
  {
    role: "IT Technician",
    org: "Stony Brook University",
    period: "Aug 2022 — Jan 2024",
    location: "Stony Brook, NY",
    image: "sbu.jpeg",
    bullets: [
      "Offered customer support/services to staff and students to troubleshoot computers, mobile devices, and printers",
      "Supported computers across campus by pushing updates and patches through Quest KACE Management System",
      "Assisted customers by managing tickets through TeamDynamix. ",
      "Maintained Scala Systems across campus by updating/troubleshooting software.",
    ],
  },
  {
    role: "Data Analyst Intern",
    org: "Sciegen Pharmaceuticals Inc.",
    period: "Jul 2022 — Sep 2022",
    location: "Hauppauge, NY",
    image: "sciegen.jpeg",
    bullets: [
      "Automated data entry in Excel with custom Python script, resulting in 600% faster calculations.",
      "Developed Python script to automate verification of contracts across 20+ customer companies."
    ],
  },
];

const RADAR_DATA = [
  { skill: "Frontend", value: 100 },
  { skill: "Backend", value: 95 },
  { skill: "DevOps", value: 60 },
  { skill: "Data Science", value: 75 },
  { skill: "Mobile", value: 90 },
  { skill: "ML/AI", value: 85 },
];

// ----- Helpers -----
const fade = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: easeOut },
};

function useThemeToggle() {
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "dark";
    setTheme(saved);
    document.documentElement.classList.toggle("dark", saved === "dark");
  }, []);
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };
  return { theme, toggle };
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="max-w-3xl mx-auto text-center mb-10">
      {eyebrow && (
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
          <Sparkles className="w-4 h-4" /> {eyebrow}
        </div>
      )}
      <h2 className="mt-2 text-3xl md:text-4xl font-semibold leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-muted-foreground text-base md:text-lg">{subtitle}</p>
      )}
    </div>
  );
}

function GlassBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(50%_50%_at_50%_10%,#000_20%,transparent_70%)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(1500px_800px_at_10%_-10%,hsl(260,100%,70%),transparent),radial-gradient(1200px_700px_at_90%_0%,hsl(200,100%,60%),transparent)] opacity-30 dark:opacity-40" />
      <div className="absolute inset-0 backdrop-blur-[1px]" />
    </div>
  );
}

function Navbar({ onContactClick }: { onContactClick: () => void }) {
  const { theme, toggle } = useThemeToggle();
  const [open, setOpen] = useState(false);

  const NavLinks = () => (
    <ul className="flex flex-col md:flex-row gap-10 md:gap-20 items-start md:items-center">
      {NAV.map((n) => (
        <li key={n.id}>
          <a
            href={`#${n.id}`}
            className="text-base text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setOpen(false)}
          >
            {n.label}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <header className="sticky top-0 z-50 supports-[backdrop-filter]:bg-background/60 bg-background/80 backdrop-blur border-b">
      <nav className="container mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        <a href="#home" className="inline-flex items-center gap-2">
          <div className="size-8 rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500" />
          <span className="font-semibold tracking-tight">Srivaths Ravva</span>
        </a>

        <div className="hidden md:block">
          <NavLinks />
        </div>

        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
                  {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Toggle theme</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button className="hidden md:inline-flex" onClick={onContactClick}>
            Let&apos;s talk <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="mt-8 space-y-8">
                <NavLinks />
                <div className="flex gap-3">
                  <Button onClick={onContactClick} className="flex-1">Contact</Button>
                  <Button variant="outline" onClick={toggle} className="flex-1">
                    {theme === "dark" ? "Light" : "Dark"} mode
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}

function Hero({ onContactClick }: { onContactClick: () => void }) {
  return (
    <section id="home" className="relative overflow-hidden border-b">
      <GlassBackground />
      <div className="container mx-auto px-4 md:px-6 py-20 md:py-28">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
          {/* LEFT: text */}
          <motion.div {...fade} className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-semibold leading-tight tracking-tight">
              Hey! I&apos;m Srivaths Ravva
            </h1>
            
            <p className="mt-4 text-lg md:text-xl text-muted-foreground">
              Full-stack engineer specializing in AI/ML to build performant web, mobile, and AI products. 
            </p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
              {/* White button */}
              <Button onClick={onContactClick} className="w-full bg-white text-black border border-black hover:bg-gray-100">
                <a href="#contact">Start a project</a>
              </Button>
              <Button asChild className="w-full bg-black text-white hover:bg-gray-800">
                <a target="_blank" href="/documents/Resume.pdf">See My Resume</a>
              </Button>
              <Button asChild className="w-full bg-purple-600 text-white hover:bg-purple-700">
                <a target="_blank" href="/documents/Paper.pdf">See My Publication</a>
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-100 w-100 lg:h-100 lg:w-100 rounded-full overflow-hidden shadow-xl ring-2 ring-indigo-500 flex-shrink-0"
          >
            <NextImage
              src="/pfp.jpg"
              alt="Srivaths — profile"
              fill
              priority
              sizes="256px"
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="container mx-auto px-4 md:px-6 py-16 md:py-24">
      <SectionHeading eyebrow="Featured work" title="Projects" subtitle="A selection of recent builds and experiments." />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((p, i) => (
          <motion.div key={p.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
            <Card className="overflow-hidden group">
              <div className="relative aspect-video overflow-hidden">
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="block h-full w-full">
                  <NextImage
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                    priority={i < 3}
                  />                
                </a>
                {p.badge && (
                  <Badge
                    variant="secondary"
                    className="pointer-events-none absolute top-2 right-2 z-10 bg-yellow-500 text-white shadow-md px-4 py-2 text-xl rounded-md border border-yellow-600 border-2"
                  >
                    {p.badge}
                  </Badge>
                )}
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-xl font-semibold tracking-tight">{p.title}</h3>
                  <div className="flex items-center gap-2">
                      <Button key={p.link} variant="ghost" size="icon" asChild>
                        <a href={p.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink size={16} />
                        </a>
                      </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>{p.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Badge key={t} variant="outline">{t}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild>
                  <a href="#" className="inline-flex items-center">Learn more <ChevronRight className="ml-1 h-4 w-4"/></a>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="container mx-auto px-4 md:px-6 py-16 md:py-24 border-y">
      <SectionHeading eyebrow="Track record" title="Experience" subtitle="Roles where I learned to ship with taste and rigor." />
      <div className="space-y-6 max-w-4xl mx-auto">
        {EXPERIENCE.map((e, idx) => (
          <Card key={idx}>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="relative h-15 w-15 overflow-hidden ring-1 ring-black/5 bg-white">
                      <NextImage
                        src={`/experience/${e.image}`}
                        alt={`${e.org} logo`}
                        fill
                        sizes="40px"
                        className="object-contain p-1"
                        priority={idx === 0}
                      />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{e.role} · {e.org}</h3>
                    <div className="text-muted-foreground text-sm inline-flex items-center gap-3">
                      <span className="inline-flex items-center gap-1"><Calendar size={16}/> {e.period}</span>
                      <span className="opacity-30">•</span>
                      <span className="inline-flex items-center gap-1"><MapPin size={16}/> {e.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                {e.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="container mx-auto px-4 md:px-6 py-16 md:py-24">
      <SectionHeading eyebrow="Toolbox" title="Skills" subtitle="Breadth with depth where it matters." />
      <Card>
        <CardHeader>
          <h3 className="font-semibold text-lg inline-flex items-center gap-2"><Code2 size={18}/> Technical profile</h3>
        </CardHeader>
        <CardContent>
          <div className="h-72 w-full text-xl">
            <ResponsiveContainer>
              <RadarChart data={RADAR_DATA} outerRadius="80%">
                <PolarGrid />
                <PolarAngleAxis dataKey="skill" />
                <Radar dataKey="value" />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {["TypeScript", "JavaScript", "React", "Next.js", "Express.js", "Tailwind", "Material UI", 
        "PostgreSQL", "Prisma", "Supabase", "Firebase", "Docker", "HTML", "CSS", "Python", "PyTorch",
        "Pandas", "NumPy", "Scikit-Learn", "Java", "C", "SQL", "React Native", "Flutter", "Dart", "Swift",
        "Kubernetes", "Azure", "Copilot Studio"].map((t) => (
          <Badge key={t} variant="outline" className="justify-center py-2">{t}</Badge>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData(e.currentTarget);
    // 👇 These keys must match the `name` props below
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      company: String(fd.get("company") || ""),
      message: String(fd.get("message") || ""),
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);
    if (res.ok) setSent(true);
    else alert("Error sending email");
  };

  return (
    <section id="contact" className="container mx-auto px-4 md:px-6 py-16 md:py-24">
      <SectionHeading eyebrow="Let's build" title="Contact" subtitle="Tell me about your idea, timeline, and goals." />
      <Card className="w-full">
        <CardHeader>
          <h3 className="font-semibold text-lg">Project inquiry</h3>
        </CardHeader>
        <CardContent>
          {sent ? (
            <div className="text-green-600 dark:text-green-400">Thanks! I&apos;ll reply within 24 hours.</div>
          ) : (
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm">Name</label>
                  <Input id="name" name="name" placeholder="Jane Doe" required />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm">Email</label>
                  <Input id="email" name="email" type="email" placeholder="jane@company.com" required />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label htmlFor="company" className="text-sm">Company</label>
                  <Input id="company" name="company" placeholder="Acme Inc." />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label htmlFor="message" className="text-sm">Project brief</label>
                  <Textarea id="message" name="message" placeholder="A few sentences…" className="min-h-32" required />
                </div>
                <div className="flex items-center justify-between md:col-span-2">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <a href="https://github.com/srivaths-ravva" target="_blank" className="inline-flex items-center gap-1 hover:text-foreground">
                      <Github size={18} /> GitHub
                    </a>
                    <a href="https://linkedin.com/in/srivaths-ravva" target="_blank" className="inline-flex items-center gap-1 hover:text-foreground">
                      <Linkedin size={18} /> LinkedIn
                    </a>
                  </div>
                  <div>
                    <Button type="submit" disabled={loading}>
                      {loading ? "Sending…" : "Send message"}
                    </Button>
                  </div>
                </div>
              </form>
          )}
        </CardContent>
      </Card>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 md:px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground">© {new Date().getFullYear()} Srivaths Ravva. All rights reserved.</div>
      </div>
    </footer>
  );
}

// ----- Main App -----
export default function Portfolio() {
  // Smooth scroll for in-page anchors
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => { document.documentElement.style.scrollBehavior = "auto"; };
  }, []);

  const onContactClick = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-indigo-500/20">
      <Navbar onContactClick={onContactClick} />
      <main>
        <Hero onContactClick={onContactClick} />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}