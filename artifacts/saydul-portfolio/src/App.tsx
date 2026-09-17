import InstagramFeed from "@/components/InstagramFeed";
import { type FormEvent, type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import HeroManagement from "@/pages/admin/HeroManagement";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Building2,
  CalendarCheck2,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Clock3,
  Code2,
  Copy,
  DatabaseZap,
  ExternalLink,
  FileText,
  Github,
  HeartPulse,
  House,
  Instagram,
  Linkedin,
  Mail,
  Megaphone,
  Menu,
  MessageSquareText,
  Network,
  Palette,
  Phone,
  Rocket,
  Send,
  ShoppingCart,
  Sparkles,
  Store,
  UsersRound,
  Video,
  Workflow,
  X,
} from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

type IconType = typeof Bot;
type Project = {
  id: string;
  index: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  url: string;
  icon: IconType;
  tone: string;
  accent: string;
  detail: string;
  role: string;
  stack: string[];
};

const projects: Project[] = [
  {
    id: 'ai-email-automation',
    index: '01',
    category: 'AI automation',
    title: 'AI email automation',
    description: 'An AI automation workflow focused on email operations.',
    tags: ['AI automation', 'n8n', 'Email automation'],
    url: 'https://www.linkedin.com/posts/saydul-haque-sayeed-6a8a18368_aiautomation-n8n-emailautomation-activity-7499559609662074880-eXuG',
    icon: Bot,
    tone: 'bg-[#dceceb]',
    accent: 'text-[#096e6b]',
    detail: 'Project-specific context is limited to the available LinkedIn project post.',
    role: 'AI automation / n8n workflow development',
    stack: ['AI automation', 'n8n', 'Email automation'],
  },
  {
    id: 'n8n-workflow-automation',
    index: '02',
    category: 'n8n workflows',
    title: 'n8n workflow automation',
    description: 'An n8n automation workflow built around connected process steps.',
    tags: ['n8n', 'AI automation', 'Workflow automation'],
    url: 'https://www.linkedin.com/posts/saydul-haque-sayeed-6a8a18368_n8n-aiautomation-workflowautomation-activity-7493637314728841216-qBjn',
    icon: DatabaseZap,
    tone: 'bg-[#f4dfbd]',
    accent: 'text-[#9a5b1d]',
    detail: 'Project-specific context is limited to the available LinkedIn project post.',
    role: 'n8n workflow development',
    stack: ['n8n', 'AI automation', 'Workflow automation'],
  },
  {
    id: 'ai-workflow-automation',
    index: '03',
    category: 'AI automation',
    title: 'AI workflow automation',
    description: 'An AI-assisted workflow automation project built with n8n.',
    tags: ['AI automation', 'n8n', 'Workflow automation'],
    url: 'https://www.linkedin.com/posts/saydul-haque-sayeed-6a8a18368_aiautomation-n8n-workflowautomation-activity-7490119278642470912-xNdh',
    icon: ShoppingCart,
    tone: 'bg-[#f0d8d2]',
    accent: 'text-[#af4d3c]',
    detail: 'Project-specific context is limited to the available LinkedIn project post.',
    role: 'AI automation / workflow development',
    stack: ['AI automation', 'n8n', 'Workflow automation'],
  },
  {
    id: 'business-automation-intelligence',
    index: '04',
    category: 'Business automation',
    title: 'Business automation + intelligence',
    description: 'A business automation workflow connecting AI workflows with business intelligence.',
    tags: ['Business automation', 'AI workflows', 'Business intelligence'],
    url: 'https://www.linkedin.com/posts/saydul-haque-sayeed-6a8a18368_businessautomation-aiworkflows-businessintelligence-activity-7485006033828982784-3uQ7',
    icon: Code2,
    tone: 'bg-[#e2e1eb]',
    accent: 'text-[#575681]',
    detail: 'Project-specific context is limited to the available LinkedIn project post.',
    role: 'Business automation / AI workflow development',
    stack: ['Business automation', 'AI workflows', 'Business intelligence'],
  },
  {
    id: 'n8n-automation',
    index: '05',
    category: 'n8n workflows',
    title: 'n8n automation',
    description: 'An n8n automation project focused on repeatable workflow logic.',
    tags: ['n8n', 'Automation', 'AI automation'],
    url: 'https://www.linkedin.com/posts/saydul-haque-sayeed-6a8a18368_n8n-automation-aiautomation-activity-7482720203810701312-PN72',
    icon: Workflow,
    tone: 'bg-[#d9e5ed]',
    accent: 'text-[#28617d]',
    detail: 'Project-specific context is limited to the available LinkedIn project post.',
    role: 'n8n workflow development',
    stack: ['n8n', 'Automation', 'AI automation'],
  },
  {
    id: 'ai-agent-n8n',
    index: '06',
    category: 'AI agents',
    title: 'AI agent workflow',
    description: 'An AI agent automation workflow developed with n8n.',
    tags: ['AI automation', 'AI agent', 'n8n'],
    url: 'https://www.linkedin.com/posts/saydul-haque-sayeed-6a8a18368_aiautomation-aiagent-n8n-activity-7480374405982801920-5nJQ',
    icon: Bot,
    tone: 'bg-[#e4ded2]',
    accent: 'text-[#8b5d2d]',
    detail: 'Project-specific context is limited to the available LinkedIn project post.',
    role: 'AI agent development / n8n workflow development',
    stack: ['AI automation', 'AI agent', 'n8n'],
  },
  {
    id: 'ai-agent-automation',
    index: '07',
    category: 'AI agents',
    title: 'AI agent automation',
    description: 'An AI agent project exploring practical automation workflows.',
    tags: ['AI', 'AI agent', 'n8n'],
    url: 'https://www.linkedin.com/posts/saydul-haque-sayeed-6a8a18368_ai-aiagent-n8n-activity-7479987668995674112-sJK9',
    icon: Sparkles,
    tone: 'bg-[#e1e8dc]',
    accent: 'text-[#4b7851]',
    detail: 'Project-specific context is limited to the available LinkedIn project post.',
    role: 'AI agent development / automation',
    stack: ['AI', 'AI agent', 'n8n'],
  },
  {
    id: 'ai-automation-web',
    index: '08',
    category: 'Web development',
    title: 'AI automation web experience',
    description: 'A web development project connected to AI automation workflows.',
    tags: ['AI automation', 'n8n', 'Web development'],
    url: 'https://www.linkedin.com/posts/saydul-haque-sayeed-6a8a18368_aiautomation-n8n-lovabledev-activity-7478805199181160448-5aPT',
    icon: Code2,
    tone: 'bg-[#e2e1eb]',
    accent: 'text-[#575681]',
    detail: 'Project-specific context is limited to the available LinkedIn project post.',
    role: 'Web development / AI automation',
    stack: ['AI automation', 'n8n', 'Web development'],
  },
  {
    id: 'artificial-intelligence-automation',
    index: '09',
    category: 'AI automation',
    title: 'Applied AI automation',
    description: 'An AI automation project exploring applied artificial intelligence.',
    tags: ['AI', 'Artificial intelligence', 'AI automation'],
    url: 'https://www.linkedin.com/posts/saydul-haque-sayeed-6a8a18368_ai-artificialintelligence-aiautomation-activity-7477722474361667585-kHW3',
    icon: Sparkles,
    tone: 'bg-[#dceceb]',
    accent: 'text-[#096e6b]',
    detail: 'Project-specific context is limited to the available LinkedIn project post.',
    role: 'AI automation development',
    stack: ['AI', 'Artificial intelligence', 'AI automation'],
  },
  {
    id: 'workflow-automation',
    index: '10',
    category: 'n8n workflows',
    title: 'Workflow automation',
    description: 'An n8n workflow automation project for connected process logic.',
    tags: ['n8n', 'Automation', 'Workflow automation'],
    url: 'https://www.linkedin.com/posts/saydul-haque-sayeed-6a8a18368_n8n-automation-workflowautomation-activity-7476471204250296320-XLuS',
    icon: Workflow,
    tone: 'bg-[#f4dfbd]',
    accent: 'text-[#9a5b1d]',
    detail: 'Project-specific context is limited to the available LinkedIn project post.',
    role: 'n8n workflow development',
    stack: ['n8n', 'Automation', 'Workflow automation'],
  },
  {
    id: 'no-code-n8n-automation',
    index: '11',
    category: 'n8n workflows',
    title: 'No-code n8n automation',
    description: 'A no-code automation project built around n8n workflows.',
    tags: ['n8n', 'AI automation', 'No-code'],
    url: 'https://www.linkedin.com/posts/saydul-haque-sayeed-6a8a18368_n8n-aiautomation-nocode-activity-7474229557496315904-_nX9',
    icon: Workflow,
    tone: 'bg-[#d9e5ed]',
    accent: 'text-[#28617d]',
    detail: 'Project-specific context is limited to the available LinkedIn project post.',
    role: 'n8n workflow development / no-code automation',
    stack: ['n8n', 'AI automation', 'No-code'],
  },
  {
    id: 'ai-lead-qualification',
    index: '12',
    category: 'Lead qualification',
    title: 'AI lead qualification',
    description: 'An AI automation workflow focused on lead qualification.',
    tags: ['n8n', 'AI automation', 'Lead qualification'],
    url: 'https://www.linkedin.com/posts/saydul-haque-sayeed-6a8a18368_n8n-aiautomation-leadqualification-activity-7473251498660077568-wmWi',
    icon: DatabaseZap,
    tone: 'bg-[#f0d8d2]',
    accent: 'text-[#af4d3c]',
    detail: 'Project-specific context is limited to the available LinkedIn project post.',
    role: 'Lead management automation / n8n workflow development',
    stack: ['n8n', 'AI automation', 'Lead qualification'],
  },
  {
    id: 'ai-agents-automation',
    index: '13',
    category: 'AI agents',
    title: 'AI agents + automation',
    description: 'An AI agents project connected to an automation workflow.',
    tags: ['AI', 'AI agents', 'Automation'],
    url: 'https://www.linkedin.com/posts/saydul-haque-sayeed-6a8a18368_ai-aiagents-automation-activity-7472356082074554368-g1qb',
    icon: Bot,
    tone: 'bg-[#e1e8dc]',
    accent: 'text-[#4b7851]',
    detail: 'Project-specific context is limited to the available LinkedIn project post.',
    role: 'AI agent development / automation',
    stack: ['AI', 'AI agents', 'Automation'],
  },
];

const capabilities = [
  { label: 'AI & Business Automation', icon: Sparkles, note: 'Automations that have a place in the process.' },
  { label: 'Web Development', icon: Code2, note: 'Interfaces with a clear business purpose.' },
  { label: 'Mobile Apps', icon: Rocket, note: 'Useful digital products for customers and teams.' },
  { label: 'CRM & Sales Systems', icon: DatabaseZap, note: 'Connected records, follow-ups, and handoffs.' },
  { label: 'Design & Branding', icon: Palette, note: 'A consistent identity people can trust.' },
  { label: 'Video & Content', icon: Video, note: 'A repeatable system for showing the work.' },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.14 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${delay ? `reveal-delay-${delay}` : ''} ${className}`}>
      {children}
    </div>
  );
}

function Header({ onOpenMenu }: { onOpenMenu: () => void }) {
  const [active, setActive] = useState('home');
  const ids = ['home', 'services', 'work', 'solutions', 'about', 'process', 'journey', 'contact'];
  useEffect(() => {
    const update = () => {
      const current = ids.slice().reverse().find((id) => (document.getElementById(id)?.getBoundingClientRect().top ?? 999) <= 140);
      if (current) setActive(current);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty('--scroll-progress', `${max > 0 ? (window.scrollY / max) * 100 : 0}%`);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[hsl(var(--border)/.7)] bg-[hsl(var(--background)/.88)] backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between px-5 sm:px-8 lg:px-10">
        <button type="button" onClick={() => scrollToId('home')} data-testid="button-brand-home" className="group flex items-center gap-3 text-left">
          <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-[hsl(var(--background))] shadow-[4px_4px_0_hsl(var(--secondary))]">
  <img
    src="/images/logo.png"
    alt="Aptimexa Logo"
    className="h-full w-full object-contain"
  />
</span>
          <span><span className="block font-mono-custom text-[9px] font-bold uppercase tracking-[.15em] text-[hsl(var(--primary))]">Aptimexa</span><span className="block font-display text-[15px] font-bold tracking-[-.03em]">Saydul Haque Sayeed</span></span>
        </button>
        <nav aria-label="Primary navigation" className="hidden items-center gap-5 lg:flex">
          {[['home', 'Home'], ['services', 'Services'], ['work', 'Work'], ['solutions', 'Solutions'], ['about', 'About'], ['process', 'Process'], ['journey', 'Journey'], ['contact', 'Contact']].map(([id, label]) => (
            <button key={id} type="button" onClick={() => scrollToId(id)} data-testid={`button-nav-${id}`} className={`nav-link text-[11px] font-bold uppercase tracking-[.14em] ${active === id ? 'active' : ''}`}>
              {label}
            </button>
          ))}
        </nav>
        <button type="button" onClick={onOpenMenu} data-testid="button-open-menu" className="rounded-lg p-2 lg:hidden" aria-label="Open navigation">
          <Menu className="h-5 w-5" />
        </button>
        <button type="button" onClick={() => scrollToId('contact')} data-testid="button-header-contact" className="button-with-arrow hidden items-center gap-2 rounded-full bg-[hsl(var(--foreground))] px-4 py-2.5 text-[11px] font-bold uppercase tracking-[.12em] text-[hsl(var(--background))] transition-transform hover:-translate-y-0.5 lg:flex">
          Start a Project <ArrowUpRight className="button-arrow h-3.5 w-3.5" />
        </button>
      </div>
    </header>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const links = [['home', 'Home'], ['services', 'Services'], ['work', 'Work'], ['solutions', 'Solutions'], ['about', 'About'], ['process', 'Process'], ['journey', 'Journey'], ['contact', 'Contact']];
  return (
    <div className="fixed inset-0 z-50 bg-[hsl(var(--foreground)/.25)] md:hidden" onClick={onClose}>
      <div className="ml-auto flex h-full w-[min(88vw,360px)] flex-col bg-[hsl(var(--background))] p-6 shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between">
          <span className="font-display text-lg font-bold">Navigate</span>
          <button type="button" onClick={onClose} data-testid="button-close-menu" aria-label="Close navigation" className="rounded-lg p-2 hover:bg-[hsl(var(--muted))]"><X className="h-5 w-5" /></button>
        </div>
        <div className="mt-16 flex flex-col gap-6">
          {links.map(([id, label], index) => (
            <button key={id} type="button" onClick={() => { onClose(); scrollToId(id); }} data-testid={`button-mobile-nav-${id}`} className="flex items-baseline justify-between border-b border-[hsl(var(--border))] pb-4 text-left font-display text-3xl font-semibold">
              <span>{label}</span><span className="font-mono-custom text-xs text-[hsl(var(--muted-foreground))]">0{index + 1}</span>
            </button>
          ))}
        </div>
        <div className="mt-auto font-mono-custom text-xs text-[hsl(var(--muted-foreground))]">Aptimexa · digital systems &amp; automation</div>
      </div>
    </div>
  );
}

function Hero() {
  const [heroContent, setHeroContent] = useState({
    eyebrow: "Aptimexa / digital systems & automation",
    title: "We build",
    highlight: "digital systems",
    highlightAfter: "that work smarter.",
    description:
      "AI automation, websites, CRM systems, mobile apps, design, and content — connected into one practical digital ecosystem.",
    primaryCta: "Start a Project",
    primaryCtaLink: "#contact",
    secondaryCta: "Explore Our Work",
    secondaryCtaLink: "#work",
    tertiaryCta: "Book a Call",
    tertiaryCtaLink: "#contact",
  });

  useEffect(() => {
    async function loadHero() {
      try {
        const response = await fetch("/api/sections/hero", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) return;

        const data = await response.json();

        if (!data.content || data.isPublished === false) return;

        setHeroContent((current) => ({
          ...current,
          eyebrow: data.content.eyebrow ?? current.eyebrow,
          title: data.content.title ?? current.title,
          highlight: data.content.highlight ?? current.highlight,
          description: data.content.description ?? current.description,
          primaryCta: data.content.primaryCta ?? current.primaryCta,
          primaryCtaLink:
            data.content.primaryCtaLink ?? current.primaryCtaLink,
          secondaryCta:
            data.content.secondaryCta ?? current.secondaryCta,
          secondaryCtaLink:
            data.content.secondaryCtaLink ?? current.secondaryCtaLink,
        }));
      } catch (error) {
        console.error("Failed to load hero section:", error);
      }
    }

    loadHero();
  }, []);

  return (
    <section
      id="home"
      className="relative mx-auto min-h-[700px] max-w-[1240px] px-5 pb-20 pt-36 sm:px-8 lg:flex lg:min-h-[780px] lg:items-center lg:px-10 lg:pt-32"
    >
      <div className="absolute right-[9%] top-36 h-40 w-40 rounded-full bg-[hsl(var(--secondary)/.2)] blur-3xl" />

      <div className="relative z-10 max-w-[780px]">
        <div className="hero-load mb-7 flex items-center gap-3 font-mono-custom text-[10px] font-medium uppercase tracking-[.18em] text-[hsl(var(--primary))]">
          <span className="h-2 w-2 rounded-full bg-[hsl(var(--accent))]" />

          {heroContent.eyebrow}
        </div>

        <h1 className="hero-load-delay font-display text-[clamp(3.2rem,7.5vw,7.2rem)] font-semibold leading-[.88] tracking-[-.075em]">
  {heroContent.title}
  <br />
  <span className="text-[hsl(var(--primary))]">
    {heroContent.highlight}
  </span>
  <br />
  {heroContent.highlightAfter || "that work smarter."}
</h1>

        <div className="hero-load-delay-2 mt-9 grid max-w-[690px] gap-8 md:grid-cols-[1fr_240px] md:items-end">
          <p className="max-w-[510px] text-lg leading-8 text-[hsl(var(--muted-foreground))]">
            {heroContent.description}
          </p>

          <div className="grid grid-cols-2 gap-x-3 gap-y-3 sm:flex sm:flex-wrap sm:gap-4">
            <button
              type="button"
              onClick={() => scrollToId("contact")}
              data-testid="button-hero-start"
              className="button-with-arrow group flex w-fit items-center gap-3 rounded-full bg-[hsl(var(--foreground))] px-4 py-3 text-xs font-bold uppercase tracking-[.12em] text-[hsl(var(--background))] lg:hidden"
            >
              {heroContent.primaryCta}
              <ArrowUpRight className="button-arrow h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => scrollToId("work")}
              data-testid="button-hero-work"
              className="button-with-arrow group flex w-fit items-center gap-3 border-b-2 border-[hsl(var(--accent))] pb-2 text-sm font-bold"
            >
              {heroContent.secondaryCta}
              <ArrowDown className="button-arrow h-4 w-4 transition-transform group-hover:translate-y-1" />
            </button>

            <button
              type="button"
              onClick={() => scrollToId("contact")}
              data-testid="button-hero-book"
              className="col-start-2 row-start-2 flex w-fit items-center gap-2 border-b border-[hsl(var(--border))] pb-2 text-xs font-bold uppercase tracking-[.12em] text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))] sm:col-auto sm:row-auto"
            >
              {heroContent.tertiaryCta}
            </button>
          </div>
        </div>

        <p className="hero-load-delay-2 mt-8 font-mono-custom text-[10px] uppercase tracking-[.16em] text-[hsl(var(--muted-foreground))]">
          Saydul Haque Sayeed · Founder, Aptimexa
        </p>
      </div>

      <div className="hero-load-delay-2 relative mt-16 h-[310px] w-full max-w-[450px] lg:absolute lg:right-10 lg:top-[235px] lg:mt-0 lg:h-[410px]">
        <div className="absolute inset-0 rounded-[2rem] border border-[hsl(var(--border))] bg-[hsl(var(--card)/.7)] p-4 shadow-[var(--shadow-soft)]">
          <div className="flex items-center justify-between border-b border-[hsl(var(--border))] pb-3 font-mono-custom text-[9px] uppercase tracking-[.16em] text-[hsl(var(--muted-foreground))]">
            <span>personal systems map</span>
            <span className="text-[hsl(var(--accent))]">live / 01</span>
          </div>

          <div className="relative flex h-[calc(100%-36px)] items-center justify-center">
            <div className="absolute left-[13%] top-[29%] h-px w-[75%] rotate-[18deg] bg-[hsl(var(--primary)/.3)]" />

            <div className="absolute left-[22%] top-[55%] h-px w-[57%] -rotate-[19deg] bg-[hsl(var(--primary)/.3)]" />

            <div className="absolute left-[50%] top-[24%] h-[54%] w-px bg-[hsl(var(--primary)/.22)]" />

            <div className="float-orb absolute left-[37%] top-[29%] flex h-24 w-24 items-center justify-center rounded-full border border-[hsl(var(--primary)/.55)] bg-[hsl(var(--primary))] text-center text-[10px] font-bold uppercase leading-4 tracking-[.1em] text-[hsl(var(--primary-foreground))] shadow-[10px_10px_0_hsl(var(--secondary)/.7)]">
              AI
              <br />
              automation
            </div>

            {[
              { text: "n8n", x: "8%", y: "18%", icon: Workflow },
              { text: "REST", x: "67%", y: "12%", icon: Network },
              { text: "CRM", x: "5%", y: "67%", icon: DatabaseZap },
              { text: "web", x: "72%", y: "66%", icon: Code2 },
            ].map(({ text, x, y, icon: Icon }) => (
              <div
                key={text}
                className="absolute flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-2 text-[10px] font-bold uppercase tracking-[.12em] shadow-sm"
                style={{ left: x, top: y }}
              >
                <Icon className="h-3.5 w-3.5 text-[hsl(var(--accent))]" />

                {text}
              </div>
            ))}

            <span className="absolute bottom-2 left-1 font-mono-custom text-[9px] text-[hsl(var(--muted-foreground))]">
              connecting the useful dots
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
function MarqueeBand() {
  return (
    <div className="border-y border-[hsl(var(--foreground))] bg-[hsl(var(--primary))] py-4 text-[hsl(var(--primary-foreground))]">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-5 overflow-hidden px-5 sm:px-8 lg:px-10">
        <div className="flex min-w-max shrink-0 items-center gap-5 font-mono-custom text-[10px] font-medium uppercase tracking-[.16em]">
          {capabilities.map(({ label }, index) => (
            <span key={label} className="flex items-center gap-5">
              <span>{label}</span>
              {index < capabilities.length - 1 && (
                <span className="text-[hsl(var(--secondary))]">/</span>
              )}
            </span>
          ))}
        </div>
        <span className="hidden shrink-0 font-mono-custom text-[10px] opacity-60 sm:block">
          SH / Aptimexa
        </span>
      </div>
    </div>
  );
}

function About() {
  const infoCards = [
    ['01', '6 Core Services', 'Connected digital capabilities built around real business needs.'],
    ['02', '13+ Projects', 'A growing archive of practical systems, workflows, and digital experiences.'],
    ['03', '8 Target Industries', 'Solutions shaped for small businesses across different industries.'],
    ['04', 'Founder-Led', 'Every project is personally led by Saydul Haque Sayeed.'],
  ];

  return (
    <section id="about" className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 lg:px-10 lg:py-36">
      <Reveal>
        <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="font-mono-custom text-[10px] uppercase tracking-[.18em] text-[hsl(var(--accent))]">
              01 / About Aptimexa
            </p>

            <h2 className="mt-5 max-w-[500px] font-display text-4xl font-semibold leading-[1.02] tracking-[-.055em] sm:text-5xl">
              APTIMEXA HELPS BUSINESSES WORK SMARTER.
            </h2>
          </div>

          <div>
            <p className="max-w-[760px] text-[clamp(1.45rem,2.8vw,2.45rem)] leading-[1.24] tracking-[-.04em]">
              Aptimexa is a digital systems and automation agency founded by Saydul Haque Sayeed.
            </p>

            <p className="mt-7 max-w-[700px] text-base leading-8 text-[hsl(var(--muted-foreground))]">
              We help small businesses simplify their operations, build modern digital
              experiences, and connect the systems that keep their business moving —
              from automation and websites to CRM, mobile applications, design, and content.
            </p>

            <p className="mt-7 max-w-[700px] text-base leading-8 text-[hsl(var(--muted-foreground))]">
              I personally lead every project, combining technical problem-solving with
              a practical understanding of how businesses operate. Our goal is simple:
              build useful digital systems that solve real problems instead of adding
              unnecessary complexity.
            </p>

            <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--border))] sm:grid-cols-2">
              {infoCards.map(([number, title, description]) => (
                <div
                  key={number}
                  className="bg-[hsl(var(--card))] p-6 transition-colors hover:bg-[hsl(var(--muted)/.65)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono-custom text-[10px] uppercase tracking-[.14em] text-[hsl(var(--primary))]">
                      {number}
                    </span>

                    <span className="h-2 w-2 rounded-full bg-[hsl(var(--accent))]" />
                  </div>

                  <h3 className="mt-8 font-display text-xl font-semibold tracking-[-.035em]">
                    {title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[hsl(var(--muted-foreground))]">
                    {description}
                  </p>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => scrollToId('services')}
              className="button-with-arrow mt-9 flex items-center gap-2 border-b-2 border-[hsl(var(--accent))] pb-2 text-xs font-bold uppercase tracking-[.12em]"
            >
              Explore Services
              <ArrowRight className="button-arrow h-4 w-4" />
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
function Services() {
  const services = [
    ['01', 'AI & Business Automation', 'Connect repetitive operations with practical AI-assisted workflows.', ['AI-powered workflows', 'Business process automation', 'AI agents', 'Customer support automation', 'Lead automation', 'Email automation', 'E-commerce automation', 'Internal business automation'], 'Reduce repetitive work and connect business operations.', Bot],
    ['02', 'Web Development', 'Turn a website into a useful part of the business system.', ['Business websites', 'Landing pages', 'E-commerce websites', 'Web applications', 'Dashboards', 'API-connected websites', 'Conversion-focused digital experiences'], 'Turn a website into a useful business asset.', Code2],
    ['03', 'Mobile App Development', 'Shape business ideas into usable digital products for customers and teams.', ['Business apps', 'Customer-facing apps', 'Internal tools', 'Booking/order apps', 'MVP applications'], 'Turn business ideas into usable digital products.', Rocket],
    ['04', 'CRM & Sales Systems', 'Make leads, follow-ups, appointments, and customer records easier to move through.', ['Lead capture', 'Lead qualification', 'Sales pipelines', 'Follow-ups', 'Appointment systems', 'Customer management', 'Automated communication'], 'Keep leads organized and reduce missed follow-ups.', DatabaseZap],
    ['05', 'Design & Branding', 'Create a visual system that makes the business feel consistent and credible.', ['Brand identity', 'UI/UX design', 'Website design', 'Social media design', 'Marketing materials', 'Presentation design', 'Visual systems'], 'Create a consistent and credible brand.', Palette],
    ['06', 'Video & Content', 'Build a repeatable way to explain, promote, and show the work.', ['Short-form content', 'Promotional videos', 'Product videos', 'Motion graphics', 'Social media content', 'AI-assisted content production'], 'Build a repeatable content system.', Video],
  ] as const;
  return (
    <section id="services" className="bg-[hsl(var(--foreground))] px-5 py-24 text-[hsl(var(--background))] sm:px-8 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div><p className="font-mono-custom text-[10px] uppercase tracking-[.18em] text-[hsl(var(--secondary))]">02 / Aptimexa services</p><h2 className="mt-5 max-w-[700px] font-display text-5xl font-semibold leading-[.95] tracking-[-.06em] sm:text-7xl">Digital systems<br /><span className="text-[hsl(var(--secondary))]">for the real work.</span></h2></div>
            <p className="max-w-[350px] text-sm leading-6 text-[hsl(var(--background)/.58)]">Six connected capabilities for the space between a business need and a working system.</p>
          </div>
        </Reveal>
        <div className="mt-16 grid gap-4 md:grid-cols-2">
          {services.map(([number, title, description, serviceCapabilities, outcome, Icon], index) => (
            <Reveal key={title} delay={(index % 3) + 1}>
              <div className="group h-full rounded-2xl border border-[hsl(var(--background)/.17)] bg-[hsl(var(--background)/.035)] p-6 transition-transform hover:-translate-y-1 hover:bg-[hsl(var(--background)/.07)] sm:p-7">
                <div className="flex items-start justify-between gap-4"><div className="flex items-center gap-3"><Icon className="h-5 w-5 text-[hsl(var(--secondary))]" /><h3 className="font-display text-xl font-semibold tracking-[-.03em]">{title}</h3></div><span className="font-mono-custom text-[10px] text-[hsl(var(--background)/.42)]">{number}</span></div>
                <p className="mt-5 max-w-[480px] text-sm leading-6 text-[hsl(var(--background)/.62)]">{description}</p>
                <div className="mt-6 flex flex-wrap gap-2">{serviceCapabilities.map((capability) => <span key={capability} className="rounded-md border border-[hsl(var(--background)/.14)] px-2 py-1.5 font-mono-custom text-[9px] uppercase tracking-[.08em] text-[hsl(var(--background)/.55)]">{capability}</span>)}</div>
                <div className="mt-7 flex items-start gap-2 border-t border-[hsl(var(--background)/.14)] pt-5 text-sm leading-6 text-[hsl(var(--background)/.78)]"><CircleCheck className="mt-1 h-4 w-4 shrink-0 text-[hsl(var(--secondary))]" /><span><strong className="font-semibold">Outcome:</strong> {outcome}</span></div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal><button type="button" onClick={() => scrollToId('contact')} data-testid="button-services-contact" className="button-with-arrow mt-10 flex items-center gap-3 border-b border-[hsl(var(--secondary))] pb-2 text-xs font-bold uppercase tracking-[.14em]">Start a Project <ArrowRight className="button-arrow h-4 w-4" /></button></Reveal>
      </div>
    </section>
  );
}

function Solutions() {
  const industries = [
    ['E-commerce', 'Orders, customer communication, inventory, follow-ups, and operational workflows.', ShoppingCart],
    ['Real Estate', 'Lead capture, qualification, follow-up, and CRM systems.', House],
    ['Dental & Medical', 'Inquiry handling, appointment workflows, and customer communication.', HeartPulse],
    ['Marketing Agencies', 'Lead management, client workflows, and reporting systems.', Megaphone],
    ['Recruitment Agencies', 'Candidate workflows, job management, and communication systems.', UsersRound],
    ['Local Businesses', 'Website, lead capture, CRM, and automated communication.', Store],
    ['Startups', 'Websites, MVPs, automation, CRM, and connected digital systems.', Rocket],
    ['Other Small Businesses', 'Practical digital systems shaped around the way the business already works.', Building2],
  ] as const;
  return (
    <section id="solutions" className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 lg:px-10 lg:py-36">
      <Reveal>
        <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
          <div><p className="font-mono-custom text-[10px] uppercase tracking-[.18em] text-[hsl(var(--accent))]">03 / Solutions</p><h2 className="mt-5 max-w-[470px] font-display text-4xl font-semibold leading-[1.02] tracking-[-.055em] sm:text-5xl">Built for ambitious small businesses.</h2></div>
          <div><p className="max-w-[650px] text-lg leading-8 text-[hsl(var(--muted-foreground))]">Aptimexa can shape the digital system behind the business — without pretending to already have clients, case-study results, or a one-size-fits-all package.</p><div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--border))] sm:grid-cols-2">{industries.map(([industry, description, Icon], index) => <div key={industry} className="group bg-[hsl(var(--card))] p-5 transition-colors hover:bg-[hsl(var(--muted)/.7)]"><div className="flex items-center justify-between"><Icon className="h-5 w-5 text-[hsl(var(--primary))]" /><span className="font-mono-custom text-[10px] text-[hsl(var(--muted-foreground))]">0{index + 1}</span></div><h3 className="mt-8 font-display text-lg font-semibold">{industry}</h3><p className="mt-2 text-sm leading-6 text-[hsl(var(--muted-foreground))]">{description}</p></div>)}</div></div>
        </div>
      </Reveal>
    </section>
  );
}

function Skills() {
  const groups: Array<[string, string[]]> = [
    ['Automation', ['n8n Workflow Development', 'AI Workflow Automation', 'AI Agent Development', 'GoHighLevel Automation']],
    ['Integration', ['REST API & Webhook Integration', 'CRM & Lead Management Automation', 'Prompt Engineering']],
    ['Development', ['Website & Funnel Development', 'Python', 'Java', 'C++']],
    ['Productivity', ['Microsoft Office / Excel']],
  ];
  return (
    <section id="skills" className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
      <Reveal>
        <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
          <div><p className="font-mono-custom text-[10px] uppercase tracking-[.18em] text-[hsl(var(--accent))]">04 / Skills &amp; technology</p><h2 className="mt-5 max-w-[350px] font-display text-4xl font-semibold leading-[1.03] tracking-[-.055em] sm:text-5xl">The parts I like connecting.</h2></div>
          <div>
            <p className="max-w-[650px] text-lg leading-8 text-[hsl(var(--muted-foreground))]">My stack is less about collecting tools and more about understanding how they pass context between one another.</p>
             <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--border))] md:grid-cols-2 lg:grid-cols-4">
              {groups.map(([title, items]) => <div key={title} className="bg-[hsl(var(--card))] p-5"><p className="font-mono-custom text-[10px] uppercase tracking-[.14em] text-[hsl(var(--primary))]">{title}</p><div className="mt-8 space-y-3">{items.map((item) => <div key={item} className="flex items-start gap-2 text-sm"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[hsl(var(--accent))]" />{item}</div>)}</div></div>)}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function WhyAptimexa() {
  const { ref, visible } = useReveal();
  return (
    <section id="why-aptimexa" className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 lg:px-10 lg:py-36">
      <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''}`}>
        <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="font-mono-custom text-[10px] uppercase tracking-[.18em] text-[hsl(var(--accent))]">08 / Why Aptimexa</p>
            <h2 className="mt-5 max-w-[470px] font-display text-4xl font-semibold leading-[1.02] tracking-[-.055em] sm:text-5xl">Technology is only useful when it solves the right problem.</h2>
          </div>
          <div className="max-w-[650px]">
            <p className="text-[clamp(1.35rem,2.5vw,2.15rem)] leading-[1.3] tracking-[-.035em]">
              Aptimexa starts with the business problem, not the tool list.
            </p>
            <p className="mt-7 max-w-[550px] leading-7 text-[hsl(var(--muted-foreground))]">
              Understand the problem. Design the right system. Connect the moving parts. Build practical solutions. Focus on useful outcomes.
            </p>
          </div>
        </div>
        <div className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--border))] sm:grid-cols-2 lg:grid-cols-5">
          {['Understand the problem', 'Design the right system', 'Connect the moving parts', 'Build practical solutions', 'Focus on useful outcomes'].map((label, index) => (
            <div key={label} className="group bg-[hsl(var(--background))] p-5 transition-colors hover:bg-[hsl(var(--muted)/.65)]">
              <div className="flex items-center justify-between"><CircleCheck className="h-5 w-5 text-[hsl(var(--primary))]" /><span className="font-mono-custom text-[10px] text-[hsl(var(--muted-foreground))]">0{index + 1}</span></div>
              <h3 className="mt-12 font-display text-base font-semibold">{label}</h3>
              <p className="mt-2 text-xs leading-5 text-[hsl(var(--muted-foreground))]">A practical principle behind the way the system is shaped.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectArt({ project }: { project: Project }) {


  
  const Icon = project.icon;
  return (
    <div className={`project-art relative h-56 overflow-hidden ${project.tone}`}>
      <div className="absolute -right-8 -top-12 h-44 w-44 rounded-full border-[22px] border-[hsl(var(--background)/.52)]" />
      <div className="absolute -bottom-10 -left-8 h-36 w-36 rounded-full border-[16px] border-[hsl(var(--background)/.38)]" />
      <div className="absolute left-6 top-6 flex items-center gap-2 font-mono-custom text-[9px] uppercase tracking-[.16em] opacity-70"><span className="h-1.5 w-1.5 rounded-full bg-current" /> {project.category}</div>
      <div className={`absolute bottom-7 left-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-[hsl(var(--background)/.72)] ${project.accent}`}><Icon className="h-7 w-7" /></div>
      <div className="absolute bottom-7 right-7 font-mono-custom text-[10px] uppercase tracking-[.12em] opacity-60">archive / {project.index}</div>
    </div>
  );
}
function AptimexaAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hi! I'm the Aptimexa Assistant. I can help you understand our services, digital systems, and how we can improve your business.",
    },
  ]);

  const suggestions = [
    'What can Aptimexa build?',
    'Can you automate my business?',
    'What services do you offer?',
    'I want to start a project',
  ];

  const handleSend = async (text?: string) => {
  const value = (text ?? message).trim();

  if (!value) return;

  const userMessage = {
    role: 'user' as const,
    content: value,
  };

  setMessages((prev) => [...prev, userMessage]);
  setMessage('');

  try {
    const response = await fetch('/api/agent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: value,
        history: messages,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'AI request failed');
    }

    setMessages((prev) => [
      ...prev,
      {
        role: 'assistant' as const,
        content: data.answer,
      },
    ]);
  } catch (error) {
    console.error('Aptimexa Agent error:', error);

    setMessages((prev) => [
      ...prev,
      {
        role: 'assistant' as const,
        content:
          "I'm having trouble connecting to the AI system right now. Please try again in a moment.",
      },
    ]);
  }
};
  return (
    <>
      {/* Floating Agent Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open Aptimexa Assistant"
          className="fixed bottom-6 right-6 z-[90] flex items-center gap-3 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--foreground))] px-5 py-3.5 text-[hsl(var(--background))] shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--background)/.12)]">
            <Bot className="h-4 w-4" />
          </span>

          <span className="text-xs font-bold uppercase tracking-[.12em]">
            Ask Aptimexa
          </span>
        </button>
      )}

      {/* Agent Panel */}
      {isOpen && (
        <div className="fixed bottom-5 right-5 z-[90] flex w-[calc(100vw-40px)] max-w-[410px] flex-col overflow-hidden rounded-3xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] shadow-2xl">

          {/* Header */}
          <div className="flex items-center justify-between border-b border-[hsl(var(--border))] px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">
                <Bot className="h-5 w-5" />
              </div>

              <div>
                <p className="font-mono-custom text-[9px] uppercase tracking-[.16em] text-[hsl(var(--accent))]">
                  Aptimexa
                </p>

                <p className="mt-1 text-sm font-semibold">
                  Digital Systems Assistant
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close assistant"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] transition-colors hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2 border-b border-[hsl(var(--border))] px-5 py-3">
            <span className="h-2 w-2 rounded-full bg-[hsl(var(--secondary))]" />

            <span className="font-mono-custom text-[9px] uppercase tracking-[.13em] text-[hsl(var(--muted-foreground))]">
              Ready to help
            </span>
          </div>

          {/* Messages */}
          <div className="max-h-[430px] min-h-[300px] space-y-4 overflow-y-auto p-5">

            {messages.map((item, index) => (
              <div
                key={index}
                className={`flex ${
                  item.role === 'user'
                    ? 'justify-end'
                    : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                    item.role === 'user'
                      ? 'rounded-br-md bg-[hsl(var(--foreground))] text-[hsl(var(--background))]'
                      : 'rounded-bl-md bg-[hsl(var(--muted))] text-[hsl(var(--foreground))]'
                  }`}
                >
                  {item.content}
                </div>
              </div>
            ))}

            {/* Suggestions */}
            {messages.length === 1 && (
              <div className="pt-2">
                <p className="mb-3 font-mono-custom text-[9px] uppercase tracking-[.14em] text-[hsl(var(--muted-foreground))]">
                  Try asking
                </p>

                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => handleSend(suggestion)}
                      className="rounded-full border border-[hsl(var(--border))] px-3 py-2 text-[10px] font-semibold text-[hsl(var(--muted-foreground))] transition-all hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--foreground))]"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-[hsl(var(--border))] p-4">
            <div className="flex items-center gap-2 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--muted)/.45)] p-2">

              <input
                type="text"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    handleSend();
                  }
                }}
                placeholder="Ask about Aptimexa..."
                className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm outline-none placeholder:text-[hsl(var(--muted-foreground))]"
              />

              <button
                type="button"
                onClick={() => handleSend()}
                disabled={!message.trim()}
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--foreground))] text-[hsl(var(--background))] transition-colors hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>

            </div>

            <p className="mt-3 text-center font-mono-custom text-[8px] uppercase tracking-[.12em] text-[hsl(var(--muted-foreground))]">
              Aptimexa digital systems assistant
            </p>
          </div>
        </div>
      )}
    </>
  );
}


function Work({ onSelect }: { onSelect: (project: Project) => void }) {
  const [businessType, setBusinessType] = useState('');
  const [challenge, setChallenge] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [analyzed, setAnalyzed] = useState(false);

  const businessOptions = [
    'E-commerce',
    'Real Estate',
    'Dental / Medical',
    'Marketing Agency',
    'Recruitment Agency',
    'Local Business',
    'Startup',
    'Other',
  ];

  const challengeOptions = [
    'Too much manual work',
    'Slow lead follow-up',
    'Customer support takes too much time',
    'Sales process is not organized',
    'Different systems do not communicate',
    'Website / digital presence needs improvement',
    'I want to scale the business',
  ];

  const teamOptions = [
    '1–5 people',
    '6–20 people',
    '21–50 people',
    '50+ people',
  ];

  const canAnalyze = businessType && challenge && teamSize;

  const getRecommendation = () => {
    if (challenge === 'Slow lead follow-up') {
      return {
        title: 'Lead Response & Follow-up System',
        description:
          'Capture incoming leads, organize them automatically, trigger timely follow-ups, and keep your sales process moving without relying on manual reminders.',
        capabilities: [
          'Lead capture',
          'Automated follow-up',
          'Lead qualification',
          'Sales pipeline management',
        ],
      };
    }

    if (challenge === 'Customer support takes too much time') {
      return {
        title: 'AI-Powered Customer Support System',
        description:
          'Create a structured support experience that can handle common questions, route important conversations, and keep customer information organized.',
        capabilities: [
          'AI customer assistance',
          'Conversation routing',
          'Knowledge-based responses',
          'Support workflow automation',
        ],
      };
    }

    if (challenge === 'Sales process is not organized') {
      return {
        title: 'Sales & CRM System',
        description:
          'Turn scattered enquiries and follow-ups into one connected sales process with clear stages, automated actions, and better visibility.',
        capabilities: [
          'Lead organization',
          'Sales pipeline',
          'Automated tasks',
          'Customer lifecycle management',
        ],
      };
    }

    if (challenge === 'Different systems do not communicate') {
      return {
        title: 'Connected Digital System',
        description:
          'Connect the systems your business already uses so information can move between them automatically instead of being copied manually.',
        capabilities: [
          'System integration',
          'API connectivity',
          'Data synchronization',
          'Cross-platform workflows',
        ],
      };
    }

    if (challenge === 'Website / digital presence needs improvement') {
      return {
        title: 'Modern Digital Experience',
        description:
          'Build a professional digital presence designed around your customers, business goals, conversion journey, and future growth.',
        capabilities: [
          'Modern website',
          'Conversion-focused UX',
          'Responsive experience',
          'Digital system integration',
        ],
      };
    }

    if (challenge === 'I want to scale the business') {
      return {
        title: 'Scalable Business Operating System',
        description:
          'Identify repetitive processes and connect them into a scalable digital system that reduces operational friction as the business grows.',
        capabilities: [
          'Process automation',
          'Business workflows',
          'System integration',
          'Scalable digital infrastructure',
        ],
      };
    }

    return {
      title: 'Business Process Automation System',
      description:
        'Identify repetitive work, structure your processes, and connect the right digital systems to reduce manual effort and improve operational efficiency.',
      capabilities: [
        'Workflow automation',
        'AI-powered processes',
        'System integration',
        'Business process optimization',
      ],
    };
  };

  const recommendation = getRecommendation();

  const resetAnalyzer = () => {
    setBusinessType('');
    setChallenge('');
    setTeamSize('');
    setAnalyzed(false);
  };

  return (
    <section
      id="work"
      className="bg-[hsl(var(--muted)/.55)] px-5 py-24 sm:px-8 lg:px-10 lg:py-36"
    >
      <div className="mx-auto max-w-[1240px]">

        {/* Section Header */}
        <Reveal>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="font-mono-custom text-[10px] uppercase tracking-[.18em] text-[hsl(var(--accent))]">
                05 / Digital systems
              </p>

              <h2 className="mt-5 font-display text-5xl font-semibold leading-none tracking-[-.06em] sm:text-7xl">
                Work that
                <br />
                <span className="text-[hsl(var(--primary))]">
                  connects.
                </span>
              </h2>
            </div>

            <p className="max-w-[340px] text-sm leading-6 text-[hsl(var(--muted-foreground))]">
              Explore selected work, then discover what kind of digital system
              could make your own business work better.
            </p>
          </div>
        </Reveal>

        {/* Featured Work */}
        <Reveal delay={1}>
          <div className="mt-16">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-display text-2xl font-semibold tracking-[-.04em]">
                Featured Work
              </h3>

              <span className="font-mono-custom text-[10px] uppercase tracking-[.14em] text-[hsl(var(--muted-foreground))]">
                selected / 04
              </span>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              {projects.slice(0, 4).map((project) => (
                <div
                  key={project.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => onSelect(project)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      onSelect(project);
                    }
                  }}
                  data-testid={`card-featured-project-${project.id}`}
                  className="project-card group grid w-full overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-left sm:grid-cols-[.9fr_1.1fr]"
                >
                  <ProjectArt project={project} />

                  <div className="flex flex-col justify-between p-6">
                    <div>
                      <p className="font-mono-custom text-[10px] uppercase tracking-[.15em] text-[hsl(var(--accent))]">
                        Featured / {project.index}
                      </p>

                      <h4 className="mt-3 font-display text-2xl font-semibold tracking-[-.04em]">
                        {project.title}
                      </h4>

                      <p className="mt-3 text-sm leading-6 text-[hsl(var(--muted-foreground))]">
                        {project.description}
                      </p>
                    </div>

                    <div className="mt-8 flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          onSelect(project);
                        }}
                        className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em]"
                      >
                        Open case study

                        <ArrowUpRight className="h-4 w-4 text-[hsl(var(--accent))] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                      </button>

                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(event) => event.stopPropagation()}
                        data-testid={`link-featured-project-${project.id}`}
                        className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em] text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--primary))]"
                      >
                        View Project on LinkedIn

                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Business System Analyzer */}
        <Reveal delay={2}>
          <div className="mt-24 border-t border-[hsl(var(--border))] pt-12">

            {/* Analyzer Heading */}
            <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
              <div>
                <p className="font-mono-custom text-[10px] uppercase tracking-[.18em] text-[hsl(var(--accent))]">
                  06/ System analyzer
                </p>

                <h3 className="mt-4 font-display text-4xl font-semibold leading-[.95] tracking-[-.055em] sm:text-6xl">
                  What could your
                  <br />
                  business
                  <br />
                  <span className="text-[hsl(var(--primary))]">
                    automate?
                  </span>
                </h3>
              </div>

              <p className="max-w-[500px] text-sm leading-7 text-[hsl(var(--muted-foreground))]">
                Tell us a little about your business and the challenge you're
                facing. This interactive system will map your situation to a
                potential digital solution.
              </p>
            </div>

            {/* Analyzer Card */}
            <div className="mt-10 overflow-hidden rounded-3xl border border-[hsl(var(--border))] bg-[hsl(var(--background))]">

              {/* Top System Bar */}
              <div className="flex flex-col justify-between gap-4 border-b border-[hsl(var(--border))] px-6 py-5 sm:flex-row sm:items-center sm:px-8">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[hsl(var(--border))]">
                    <Bot className="h-4 w-4 text-[hsl(var(--primary))]" />
                  </span>

                  <div>
                    <p className="font-mono-custom text-[9px] uppercase tracking-[.16em] text-[hsl(var(--muted-foreground))]">
                      Aptimexa intelligence
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      Business system mapper
                    </p>
                  </div>
                </div>

                <span className="flex items-center gap-2 font-mono-custom text-[9px] uppercase tracking-[.14em] text-[hsl(var(--muted-foreground))]">
                  <span className="h-2 w-2 rounded-full bg-[hsl(var(--secondary))]" />
                  Interactive
                </span>
              </div>

              {!analyzed ? (
                <div className="grid gap-0 lg:grid-cols-[1fr_.9fr]">

                  {/* Form */}
                  <div className="p-6 sm:p-8 lg:border-r lg:border-[hsl(var(--border))]">
                    <div className="grid gap-7">

                      {/* Business Type */}
                      <div>
                        <label className="font-mono-custom text-[9px] uppercase tracking-[.16em] text-[hsl(var(--muted-foreground))]">
                          01 / Business type
                        </label>

                        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                          {businessOptions.map((option) => (
                            <button
                              key={option}
                              type="button"
                              onClick={() => setBusinessType(option)}
                              className={`rounded-xl border px-3 py-3 text-left text-xs font-semibold transition-all ${
                                businessType === option
                                  ? 'border-[hsl(var(--foreground))] bg-[hsl(var(--foreground))] text-[hsl(var(--background))]'
                                  : 'border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--foreground)/.4)] hover:text-[hsl(var(--foreground))]'
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Main Challenge */}
                      <div>
                        <label className="font-mono-custom text-[9px] uppercase tracking-[.16em] text-[hsl(var(--muted-foreground))]">
                          02 / Main challenge
                        </label>

                        <div className="mt-3 grid gap-2 sm:grid-cols-2">
                          {challengeOptions.map((option) => (
                            <button
                              key={option}
                              type="button"
                              onClick={() => setChallenge(option)}
                              className={`rounded-xl border px-4 py-3 text-left text-xs font-semibold transition-all ${
                                challenge === option
                                  ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]'
                                  : 'border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--foreground)/.4)] hover:text-[hsl(var(--foreground))]'
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Team Size */}
                      <div>
                        <label className="font-mono-custom text-[9px] uppercase tracking-[.16em] text-[hsl(var(--muted-foreground))]">
                          03 / Team size
                        </label>

                        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                          {teamOptions.map((option) => (
                            <button
                              key={option}
                              type="button"
                              onClick={() => setTeamSize(option)}
                              className={`rounded-xl border px-3 py-3 text-xs font-semibold transition-all ${
                                teamSize === option
                                  ? 'border-[hsl(var(--foreground))] bg-[hsl(var(--foreground))] text-[hsl(var(--background))]'
                                  : 'border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--foreground)/.4)] hover:text-[hsl(var(--foreground))]'
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Analyze Button */}
                      <button
                        type="button"
                        disabled={!canAnalyze}
                        onClick={() => setAnalyzed(true)}
                        className={`group mt-2 flex w-full items-center justify-center gap-3 rounded-full px-6 py-4 text-xs font-bold uppercase tracking-[.14em] transition-all ${
                          canAnalyze
                            ? 'bg-[hsl(var(--foreground))] text-[hsl(var(--background))] hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))]'
                            : 'cursor-not-allowed bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]'
                        }`}
                      >
                        Analyze my business

                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>

                  {/* Visual / Explanation */}
                  <div className="relative flex min-h-[420px] flex-col justify-between overflow-hidden bg-[hsl(var(--muted)/.45)] p-6 sm:p-8">

                    <div>
                      <p className="font-mono-custom text-[9px] uppercase tracking-[.16em] text-[hsl(var(--muted-foreground))]">
                        How it works
                      </p>

                      <p className="mt-4 max-w-[330px] text-sm leading-7 text-[hsl(var(--muted-foreground))]">
                        Your answers become a simple system map — helping
                        identify where automation, AI, integration, or digital
                        development could create the most value.
                      </p>
                    </div>

                    {/* System Map */}
                    <div className="relative mx-auto my-10 w-full max-w-[390px]">

                      <div className="grid gap-3">

                        <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] p-4">
                          <p className="font-mono-custom text-[8px] uppercase tracking-[.14em] text-[hsl(var(--accent))]">
                            Input
                          </p>

                          <p className="mt-2 text-sm font-semibold">
                            Your business
                          </p>
                        </div>

                        <div className="mx-auto h-8 w-px bg-[hsl(var(--border))]" />

                        <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] p-4">
                          <p className="font-mono-custom text-[8px] uppercase tracking-[.14em] text-[hsl(var(--accent))]">
                            Analyze
                          </p>

                          <p className="mt-2 text-sm font-semibold">
                            Find repetitive processes
                          </p>
                        </div>

                        <div className="mx-auto h-8 w-px bg-[hsl(var(--border))]" />

                        <div className="rounded-2xl border border-[hsl(var(--primary))] bg-[hsl(var(--primary))] p-4 text-[hsl(var(--primary-foreground))]">
                          <p className="font-mono-custom text-[8px] uppercase tracking-[.14em] opacity-70">
                            Output
                          </p>

                          <p className="mt-2 text-sm font-semibold">
                            Recommended digital system
                          </p>
                        </div>

                      </div>
                    </div>

                    <p className="font-mono-custom text-[9px] uppercase tracking-[.13em] text-[hsl(var(--muted-foreground))]">
                      No technical knowledge required
                    </p>
                  </div>
                </div>
              ) : (
                /* Analysis Result */
                <div className="p-6 sm:p-8">

                  <div className="grid gap-5 lg:grid-cols-[.8fr_1.2fr]">

                    {/* Result Intro */}
                    <div className="rounded-2xl bg-[hsl(var(--muted)/.5)] p-6 sm:p-7">
                      <p className="font-mono-custom text-[9px] uppercase tracking-[.16em] text-[hsl(var(--accent))]">
                        Analysis complete
                      </p>

                      <h4 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-[-.05em]">
                        Your business has a potential
                        <span className="text-[hsl(var(--primary))]">
                          {' '}
                          system opportunity.
                        </span>
                      </h4>

                      <div className="mt-7 border-t border-[hsl(var(--border))] pt-5">
                        <p className="font-mono-custom text-[8px] uppercase tracking-[.14em] text-[hsl(var(--muted-foreground))]">
                          Your inputs
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2">
                          <span className="rounded-full border border-[hsl(var(--border))] px-3 py-1.5 text-[10px] font-semibold">
                            {businessType}
                          </span>

                          <span className="rounded-full border border-[hsl(var(--border))] px-3 py-1.5 text-[10px] font-semibold">
                            {teamSize}
                          </span>
                        </div>

                        <p className="mt-4 text-xs leading-6 text-[hsl(var(--muted-foreground))]">
                          Main challenge: {challenge}
                        </p>
                      </div>
                    </div>

                    {/* Recommendation */}
                    <div className="rounded-2xl border border-[hsl(var(--border))] p-6 sm:p-7">

                      <div className="flex items-start justify-between gap-5">
                        <div>
                          <p className="font-mono-custom text-[9px] uppercase tracking-[.16em] text-[hsl(var(--accent))]">
                            Recommended direction
                          </p>

                          <h4 className="mt-3 font-display text-3xl font-semibold tracking-[-.05em]">
                            {recommendation.title}
                          </h4>
                        </div>

                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                      </div>

                      <p className="mt-5 max-w-[650px] text-sm leading-7 text-[hsl(var(--muted-foreground))]">
                        {recommendation.description}
                      </p>

                      <div className="mt-7 border-t border-[hsl(var(--border))] pt-6">
                        <p className="font-mono-custom text-[9px] uppercase tracking-[.15em] text-[hsl(var(--muted-foreground))]">
                          System capabilities
                        </p>

                        <div className="mt-4 grid gap-2 sm:grid-cols-2">
                          {recommendation.capabilities.map((item) => (
                            <div
                              key={item}
                              className="flex items-center gap-3 rounded-xl bg-[hsl(var(--muted)/.55)] px-4 py-3"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--secondary))]" />

                              <span className="text-xs font-semibold">
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <a
                          href="#contact"
                          className="group flex items-center justify-center gap-2 rounded-full bg-[hsl(var(--foreground))] px-6 py-3.5 text-xs font-bold uppercase tracking-[.13em] text-[hsl(var(--background))] transition-colors hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))]"
                        >
                          Discuss this system

                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </a>

                        <button
                          type="button"
                          onClick={resetAnalyzer}
                          className="rounded-full border border-[hsl(var(--border))] px-6 py-3.5 text-xs font-bold uppercase tracking-[.13em] text-[hsl(var(--muted-foreground))] transition-colors hover:border-[hsl(var(--foreground)/.4)] hover:text-[hsl(var(--foreground))]"
                        >
                          Start again
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Note */}
                  <div className="mt-6 flex items-center gap-3 border-t border-[hsl(var(--border))] pt-6">
                    <span className="h-2 w-2 rounded-full bg-[hsl(var(--secondary))]" />

                    <p className="font-mono-custom text-[9px] uppercase tracking-[.13em] text-[hsl(var(--muted-foreground))]">
                      This is an initial opportunity map — a deeper discovery
                      session determines the right architecture for your
                      business.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
function Journey() {
  const entries = [
    ['01', 'Project-based AI automation work', 'Hands-on technical experience', 'AI automation, AI agents, n8n workflow development, and connected systems are presented as project-based work.'],
    ['02', 'Hands-on web development', 'Practical technical experience', 'Modern websites, funnels, and interfaces are included as practical development work.'],
    ['03', 'AI Automation Engineer & Web Developer', 'Current professional positioning', 'A focused practice across AI workflow automation, integrations, and modern web development.'],
  ];
  return (
    <section id="journey" className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 lg:px-10 lg:py-36">
      <Reveal>
        <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
          <div><p className="font-mono-custom text-[10px] uppercase tracking-[.18em] text-[hsl(var(--accent))]">09 / Experience &amp; professional journey</p><h2 className="mt-5 max-w-[380px] font-display text-4xl font-semibold leading-[1.02] tracking-[-.055em] sm:text-5xl">The path is still being written.</h2><p className="mt-6 max-w-[320px] text-sm leading-6 text-[hsl(var(--muted-foreground))]">This is a clear home for the real timeline as the professional archive grows.</p></div>
          <div className="relative pl-8 sm:pl-12">
            <div className="timeline-line absolute bottom-5 left-[7px] top-2 w-px sm:left-[15px]" />
            <div className="space-y-12">
              {entries.map(([number, title, label, body]) => (
                <div key={number} className="relative grid gap-3 sm:grid-cols-[100px_1fr]">
                  <div className="absolute -left-[33px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-4 border-[hsl(var(--background))] bg-[hsl(var(--accent))] sm:-left-[41px]" />
                  <span className="font-mono-custom text-[10px] uppercase tracking-[.16em] text-[hsl(var(--muted-foreground))]">entry {number}</span>
                  <div><h3 className="font-display text-xl font-semibold tracking-[-.035em]">{title}</h3><p className="mt-2 font-mono-custom text-[10px] uppercase tracking-[.12em] text-[hsl(var(--accent))]">{label}</p><p className="mt-2 max-w-[430px] text-sm leading-6 text-[hsl(var(--muted-foreground))]">{body}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Education() {
  const education = [
    ['B.Sc. in Computer Science and Engineering', 'Leading University, Sylhet', '2024 – Present'],
    ['HSC — Science', 'Scholarshome Majortila College, Sylhet', '2021 – 2023'],
    ['SSC — Science', 'Barohal Ehia High School', '2019 – 2021'],
  ];
  return (
    <section id="education" className="bg-[hsl(var(--secondary)/.22)] px-5 py-24 sm:px-8 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <div className="grid gap-10 md:grid-cols-[.8fr_1.2fr] md:items-start">
            <div><p className="font-mono-custom text-[10px] uppercase tracking-[.18em] text-[hsl(var(--accent))]">07 / Education</p><h2 className="mt-5 font-display text-4xl font-semibold leading-[1.02] tracking-[-.055em] sm:text-5xl">The foundation<br />behind the work.</h2></div>
            <div className="divide-y divide-[hsl(var(--border))] rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background)/.65)]">
              {education.map(([degree, institution, dates], index) => (
                <div key={degree} className="grid gap-3 p-6 sm:grid-cols-[1fr_auto] sm:items-center sm:p-8">
                  <div><p className="font-mono-custom text-[10px] uppercase tracking-[.15em] text-[hsl(var(--accent))]">0{index + 1}</p><h3 className="mt-3 font-display text-xl font-semibold">{degree}</h3><p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">{institution}</p></div>
                  <span className="font-mono-custom text-[10px] uppercase tracking-[.12em] text-[hsl(var(--muted-foreground))]">{dates}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    ['01', 'DISCOVER', 'Understand the business, goals, challenges and current workflow.'],
    ['02', 'AUDIT', 'Analyze existing processes and identify bottlenecks and repetitive work.'],
    ['03', 'STRATEGIZE', 'Identify opportunities for automation, websites, CRM, AI or custom development.'],
    ['04', 'BUILD', 'Turn the strategy into practical systems, workflows, websites, applications or AI solutions.'],
    ['05', 'INTEGRATE', 'Connect relevant systems, APIs, CRM, website and communication channels.'],
    ['06', 'TEST', 'Test workflows, integrations, user flows and edge cases.'],
    ['07', 'LAUNCH', 'Deploy and hand over the completed system.'],
    ['08', 'SUPPORT', 'Provide ongoing optimization, maintenance and future improvements when required.'],
  ];
  const [activeStep, setActiveStep] = useState(0);
  return (
    <section id="process" className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
      <Reveal>
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div><p className="font-mono-custom text-[10px] uppercase tracking-[.18em] text-[hsl(var(--accent))]">07 / How we work</p><h2 className="mt-5 max-w-[380px] font-display text-4xl font-semibold leading-[1.02] tracking-[-.055em] sm:text-5xl">A calm route through complex work.</h2><p className="mt-6 max-w-[340px] text-sm leading-6 text-[hsl(var(--muted-foreground))]">Every system starts with context, moves through careful testing, and leaves room for the next useful improvement.</p></div>
          <div className="relative pl-8 sm:pl-12">
            <div className="timeline-line absolute bottom-5 left-[7px] top-2 w-px sm:left-[15px]" />
            <div className="space-y-3">
              {steps.map(([number, title, body], index) => <button type="button" key={number} onClick={() => setActiveStep(index)} onMouseEnter={() => setActiveStep(index)} onFocus={() => setActiveStep(index)} data-testid={`button-process-step-${number}`} className={`group relative block w-full rounded-xl border p-5 text-left transition-all ${activeStep === index ? 'border-[hsl(var(--primary)/.5)] bg-[hsl(var(--muted)/.65)] shadow-[var(--shadow-soft)]' : 'border-transparent bg-transparent hover:border-[hsl(var(--border))]'}`}><div className={`absolute -left-[33px] top-6 flex h-4 w-4 items-center justify-center rounded-full border-4 border-[hsl(var(--background))] transition-colors sm:-left-[41px] ${activeStep === index ? 'bg-[hsl(var(--accent))]' : 'bg-[hsl(var(--border))]'}`} /><div className="flex items-start gap-5"><span className="font-mono-custom text-[10px] text-[hsl(var(--accent))]">{number}</span><div className="flex-1"><div className="flex items-center justify-between gap-4"><h3 className="font-display text-xl font-semibold tracking-[-.035em]">{title}</h3><CalendarCheck2 className={`h-4 w-4 transition-colors ${activeStep === index ? 'text-[hsl(var(--primary))]' : 'text-[hsl(var(--muted-foreground))]'}`} /></div><p className="mt-2 max-w-[500px] text-sm leading-6 text-[hsl(var(--muted-foreground))]">{body}</p></div></div></button>)}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function References() {
  return (
    <section id="references" className="bg-[hsl(var(--muted)/.55)] px-5 py-24 sm:px-8 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-center">
            <div><p className="font-mono-custom text-[10px] uppercase tracking-[.18em] text-[hsl(var(--accent))]">11 / Testimonials &amp; references</p><h2 className="mt-5 max-w-[390px] font-display text-4xl font-semibold leading-[1.02] tracking-[-.055em] sm:text-5xl">Let the right people speak.</h2></div>
            <div className="rounded-2xl border border-dashed border-[hsl(var(--border))] bg-[hsl(var(--background)/.55)] p-7 sm:p-10"><MessageSquareText className="h-6 w-6 text-[hsl(var(--primary))]" /><p className="mt-8 max-w-[500px] font-display text-2xl leading-[1.25] tracking-[-.035em]">Testimonials and professional references will live here once they are available.</p><p className="mt-5 text-sm leading-6 text-[hsl(var(--muted-foreground))]">No quotes, names, companies, or outcomes have been added without source material.</p></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Resume() {
  const resumeFile = `${import.meta.env.BASE_URL}Saydul_Haque_Sayeed_CV(Update)_1788465350283.pdf`;
  return (
    <section id="resume" className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 lg:px-10 lg:py-28">
      <Reveal>
        <div className="flex flex-col justify-between gap-8 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-7 sm:p-10 lg:flex-row lg:items-center">
          <div><p className="font-mono-custom text-[10px] uppercase tracking-[.18em] text-[hsl(var(--accent))]">12 / Resume</p><h2 className="mt-4 font-display text-3xl font-semibold tracking-[-.05em] sm:text-4xl">A fuller professional record.</h2><p className="mt-3 max-w-[550px] text-sm leading-6 text-[hsl(var(--muted-foreground))]">Download Saydul’s current CV as supplied.</p></div>
          <a href={resumeFile} download="Saydul_Haque_Sayeed_CV(Update)_1788465350283.pdf" data-testid="link-resume-download" className="button-with-arrow flex w-fit shrink-0 items-center gap-3 rounded-full bg-[hsl(var(--primary))] px-5 py-3.5 text-xs font-bold uppercase tracking-[.12em] text-[hsl(var(--primary-foreground))] transition-transform hover:-translate-y-1">Download Resume <FileText className="button-arrow h-4 w-4" /></a>
        </div>
      </Reveal>
    </section>
  );
}

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [projectType, setProjectType] = useState('');
  const [website, setWebsite] = useState('');
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const copyEmail = async () => {
    await navigator.clipboard?.writeText('haquesaydul200411@gmail.com');
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, projectType, website }),
      });
      const data = (await response.json().catch(() => null)) as { message?: string } | null;

      if (!response.ok) {
        throw new Error(data?.message || 'Your message could not be delivered. Please try again.');
      }

      setSent(true);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'Your message could not be delivered. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <section id="contact" className="bg-[hsl(var(--foreground))] px-5 py-24 text-[hsl(var(--background))] sm:px-8 lg:px-10 lg:py-36">
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <div className="grid gap-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-24">
            <div>
              <p className="font-mono-custom text-[10px] uppercase tracking-[.18em] text-[hsl(var(--secondary))]">13 / Contact Aptimexa</p>
              <h2 className="mt-6 max-w-[620px] font-display text-[clamp(3.2rem,7vw,6.8rem)] font-semibold leading-[.9] tracking-[-.075em]">Have a system<br />worth <span className="text-[hsl(var(--secondary))]">untangling?</span></h2>
              <p className="mt-8 max-w-[430px] text-base leading-7 text-[hsl(var(--background)/.65)]">Tell Aptimexa what you’re building, where the repetition is, or what currently feels harder than it should.</p>
              <div className="mt-10 space-y-4 text-sm">
                <div className="flex items-center gap-3 text-[hsl(var(--background)/.9)]"><Mail className="h-4 w-4 text-[hsl(var(--secondary))]" /><a href="mailto:haquesaydul200411@gmail.com" data-testid="link-email" className="transition-colors hover:text-[hsl(var(--secondary))]">haquesaydul200411@gmail.com</a><button type="button" onClick={copyEmail} data-testid="button-copy-email" aria-label="Copy email address" className="ml-1 opacity-60 transition-opacity hover:opacity-100">{copied ? <Check className="h-3.5 w-3.5 text-[hsl(var(--secondary))]" /> : <Copy className="h-3.5 w-3.5" />}</button></div>
                <a href="tel:+8801616094323" data-testid="link-phone" className="flex items-center gap-3 text-[hsl(var(--background)/.72)] transition-colors hover:text-[hsl(var(--secondary))]"><Phone className="h-4 w-4 text-[hsl(var(--secondary))]" /> +8801616094323</a>
                <div className="flex items-center gap-3 text-[hsl(var(--background)/.55)]"><Clock3 className="h-4 w-4 text-[hsl(var(--secondary))]" /> Response time not provided</div>
              </div>
              <div className="mt-10 border-t border-[hsl(var(--background)/.16)] pt-6">
  <p className="font-mono-custom text-[10px] uppercase tracking-[.14em] text-[hsl(var(--background)/.42)]">
    Social links
  </p>

  <div className="mt-4 flex flex-wrap gap-2">
    <a
      href="https://www.linkedin.com/in/saydul-haque-sayeed-6a8a18368/"
      target="_blank"
      rel="noreferrer"
      data-testid="link-social-linkedin"
      className="flex items-center gap-2 rounded-full border border-[hsl(var(--background)/.2)] px-3 py-2 text-xs text-[hsl(var(--background)/.72)] transition-colors hover:border-[hsl(var(--secondary))] hover:text-[hsl(var(--secondary))]"
    >
      <Linkedin className="h-3.5 w-3.5" />
      LinkedIn
      <ExternalLink className="h-3 w-3 opacity-50" />
    </a>

    <a
      href="https://github.com/Saydulhaque11"
      target="_blank"
      rel="noreferrer"
      data-testid="link-social-github"
      className="flex items-center gap-2 rounded-full border border-[hsl(var(--background)/.2)] px-3 py-2 text-xs text-[hsl(var(--background)/.72)] transition-colors hover:border-[hsl(var(--secondary))] hover:text-[hsl(var(--secondary))]"
    >
      <Github className="h-3.5 w-3.5" />
      GitHub
      <ExternalLink className="h-3 w-3 opacity-50" />
    </a>

    <a
      href="https://www.instagram.com/saydul.ai/"
      target="_blank"
      rel="noreferrer"
      data-testid="link-social-instagram"
      className="flex items-center gap-2 rounded-full border border-[hsl(var(--background)/.2)] px-3 py-2 text-xs text-[hsl(var(--background)/.72)] transition-colors hover:border-[hsl(var(--secondary))] hover:text-[hsl(var(--secondary))]"
    >
      <Instagram className="h-3.5 w-3.5" />
      Instagram
      <ExternalLink className="h-3 w-3 opacity-50" />
    </a>
  </div>
</div>
            </div>
            <form onSubmit={submit} className="rounded-2xl border border-[hsl(var(--background)/.2)] bg-[hsl(var(--background)/.06)] p-6 sm:p-8">
              {sent ? (
                <div className="flex min-h-[320px] flex-col justify-center" aria-live="polite"><div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))]"><Check className="h-5 w-5" /></div><h3 className="font-display text-3xl font-semibold">Thanks — your message has been sent.</h3><p className="mt-3 max-w-[330px] text-sm leading-6 text-[hsl(var(--background)/.6)]">Your note has been delivered to Saydul’s inbox. He’ll be able to reply directly to your email address.</p><button type="button" onClick={() => { setSent(false); setName(''); setEmail(''); setMessage(''); setProjectType(''); setWebsite(''); setError(''); }} data-testid="button-send-another" className="mt-8 flex w-fit items-center gap-2 border-b border-[hsl(var(--secondary))] pb-1 text-xs font-bold uppercase tracking-[.13em]">Send another <ArrowRight className="h-3.5 w-3.5" /></button></div>
              ) : (
                <>
                  <div className="mb-8 flex items-center justify-between"><span className="font-mono-custom text-[10px] uppercase tracking-[.16em] text-[hsl(var(--background)/.5)]">start a thread</span><MessageSquareText className="h-5 w-5 text-[hsl(var(--secondary))]" /></div>
                   <label className="block"><span className="font-mono-custom text-[10px] uppercase tracking-[.12em] text-[hsl(var(--background)/.55)]">Your name</span><input required type="text" value={name} onChange={(event) => setName(event.target.value)} data-testid="input-contact-name" placeholder="Your name" maxLength={120} autoComplete="name" className="mt-3 w-full border-b border-[hsl(var(--background)/.25)] bg-transparent px-0 py-3 text-sm outline-none placeholder:text-[hsl(var(--background)/.3)] focus:border-[hsl(var(--secondary))]" /></label>
                   <label className="mt-8 block"><span className="font-mono-custom text-[10px] uppercase tracking-[.12em] text-[hsl(var(--background)/.55)]">Your email</span><input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} data-testid="input-contact-email" placeholder="you@company.com" maxLength={254} autoComplete="email" className="mt-3 w-full border-b border-[hsl(var(--background)/.25)] bg-transparent px-0 py-3 text-sm outline-none placeholder:text-[hsl(var(--background)/.3)] focus:border-[hsl(var(--secondary))]" /></label>
                   <label className="mt-8 block"><span className="font-mono-custom text-[10px] uppercase tracking-[.12em] text-[hsl(var(--background)/.55)]">Project type <span className="normal-case tracking-normal text-[hsl(var(--background)/.35)]">(optional)</span></span><select value={projectType} onChange={(event) => setProjectType(event.target.value)} data-testid="select-contact-project-type" className="mt-3 w-full border-b border-[hsl(var(--background)/.25)] bg-transparent px-0 py-3 text-sm outline-none focus:border-[hsl(var(--secondary))]"><option value="" className="text-[hsl(var(--foreground))]">Not sure yet</option><option value="AI & Automation" className="text-[hsl(var(--foreground))]">AI &amp; Automation</option><option value="Website" className="text-[hsl(var(--foreground))]">Website</option><option value="Mobile App" className="text-[hsl(var(--foreground))]">Mobile App</option><option value="CRM & Sales" className="text-[hsl(var(--foreground))]">CRM &amp; Sales</option><option value="Design & Branding" className="text-[hsl(var(--foreground))]">Design &amp; Branding</option><option value="Video & Content" className="text-[hsl(var(--foreground))]">Video &amp; Content</option></select></label>
                   <label className="sr-only" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} /></label>
                   <label className="mt-8 block"><span className="font-mono-custom text-[10px] uppercase tracking-[.12em] text-[hsl(var(--background)/.55)]">What are you thinking about?</span><textarea required value={message} onChange={(event) => setMessage(event.target.value)} data-testid="textarea-contact-message" placeholder="A workflow, an agent, a web experience..." rows={4} maxLength={5000} className="mt-3 w-full resize-none border-b border-[hsl(var(--background)/.25)] bg-transparent px-0 py-3 text-sm outline-none placeholder:text-[hsl(var(--background)/.3)] focus:border-[hsl(var(--secondary))]" /></label>
                   {error && <p role="alert" data-testid="status-contact-error" className="mt-5 rounded-lg border border-[hsl(var(--secondary)/.45)] bg-[hsl(var(--secondary)/.1)] px-3 py-3 text-xs leading-5 text-[hsl(var(--background)/.85)]">{error}</p>}
                   <button type="submit" disabled={submitting} data-testid="button-submit-contact" className="button-with-arrow mt-9 flex w-full items-center justify-between rounded-xl bg-[hsl(var(--secondary))] px-5 py-4 text-left text-xs font-bold uppercase tracking-[.12em] text-[hsl(var(--foreground))] transition-transform hover:-translate-y-1 disabled:cursor-wait disabled:opacity-60">{submitting ? 'Sending…' : 'Send a note'} <Send className="button-arrow h-4 w-4" /></button>
                   <p className="mt-4 text-[10px] leading-5 text-[hsl(var(--background)/.38)]">Your message is sent securely through the portfolio backend.</p>
                </>
              )}
            </form>
          </div>
        </Reveal>
        <footer className="mt-24 flex flex-col justify-between gap-6 border-t border-[hsl(var(--background)/.18)] pt-6 text-[10px] sm:flex-row sm:items-start">
          <span className="font-display text-sm font-bold">Aptimexa<span className="ml-2 font-mono-custom text-[10px] font-normal uppercase tracking-[.12em] text-[hsl(var(--secondary))]">by Saydul Haque Sayeed</span></span>
          <div className="flex flex-wrap gap-x-5 gap-y-2 font-mono-custom uppercase tracking-[.13em] text-[hsl(var(--background)/.45)]">
            {['Services', 'Work', 'Solutions', 'About', 'Contact'].map((label) => <button key={label} type="button" onClick={() => scrollToId(label.toLowerCase())} className="transition-colors hover:text-[hsl(var(--secondary))]">{label}</button>)}
          </div>
          <span className="font-mono-custom text-[hsl(var(--background)/.45)]">© 2026 Aptimexa</span>
        </footer>
      </div>
    </section>
  );
}

function CaseStudy({ project, onClose, onChange }: { project: Project; onClose: () => void; onChange: (project: Project) => void }) {
  const currentIndex = projects.findIndex((item) => item.id === project.id);
  const move = (direction: number) => onChange(projects[(currentIndex + direction + projects.length) % projects.length]);
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') move(1);
      if (event.key === 'ArrowLeft') move(-1);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKeyDown); };
  });
  const Icon = project.icon;
  return (
    <div className="case-overlay fixed inset-0 z-[60] overflow-y-auto bg-[hsl(var(--foreground)/.68)] p-3 backdrop-blur-sm sm:p-8" onClick={onClose}>
      <div className="case-panel mx-auto min-h-[calc(100dvh-24px)] max-w-[920px] overflow-hidden rounded-2xl bg-[hsl(var(--background))] shadow-2xl sm:min-h-0" onClick={(event) => event.stopPropagation()}>
        <div className={`relative flex min-h-[270px] items-end ${project.tone} p-6 sm:min-h-[340px] sm:p-10`}>
          <div className="absolute right-7 top-7 flex gap-2"><button type="button" onClick={() => move(-1)} data-testid="button-case-previous" aria-label="Previous case study" className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--background)/.75)] hover:bg-[hsl(var(--background))]"><ChevronLeft className="h-4 w-4" /></button><button type="button" onClick={() => move(1)} data-testid="button-case-next" aria-label="Next case study" className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--background)/.75)] hover:bg-[hsl(var(--background))]"><ChevronRight className="h-4 w-4" /></button><button type="button" onClick={onClose} data-testid="button-close-case-study" aria-label="Close case study" className="ml-2 flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--foreground))] text-[hsl(var(--background))]"><X className="h-4 w-4" /></button></div>
          <div className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-[hsl(var(--background)/.76)] ${project.accent}`}><Icon className="h-9 w-9" /></div>
          <div className="absolute bottom-8 right-10 hidden font-mono-custom text-[10px] uppercase tracking-[.15em] opacity-60 sm:block">case study / {project.index}</div>
        </div>
        <div className="p-6 sm:p-10">
           <div className="flex flex-wrap items-center gap-3 font-mono-custom text-[10px] uppercase tracking-[.16em] text-[hsl(var(--muted-foreground))]"><span className="text-[hsl(var(--accent))]">{project.category}</span><span>·</span><span>LinkedIn archive entry</span></div>
          <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-.06em] sm:text-6xl">{project.title}</h2>
          <p className="mt-5 max-w-[640px] text-lg leading-8 text-[hsl(var(--muted-foreground))]">{project.description}</p>
           <div className="mt-12 grid gap-4 border-y border-[hsl(var(--border))] py-8 sm:grid-cols-2">
             {[
               ['Problem', 'The source post does not provide a separate problem statement.'],
               ['Solution', project.description],
               ['Automation', `The source post identifies ${project.category} as the focus of this work.`],
               ['Tools', project.stack.join(' · ')],
               ['Outcome', project.detail],
               ['Proof', 'Source-backed project entry on LinkedIn.'],
             ].map(([label, value]) => <div key={label} className="rounded-xl bg-[hsl(var(--muted)/.55)] p-5"><p className="font-mono-custom text-[10px] uppercase tracking-[.13em] text-[hsl(var(--accent))]">{label}</p><p className="mt-3 text-sm leading-6 text-[hsl(var(--muted-foreground))]">{value}</p></div>)}
           </div>
           <a href={project.url} target="_blank" rel="noreferrer" data-testid={`link-case-study-${project.id}`} className="mt-8 flex w-fit items-center gap-2 rounded-full bg-[hsl(var(--foreground))] px-4 py-3 text-xs font-bold uppercase tracking-[.12em] text-[hsl(var(--background))] transition-transform hover:-translate-y-0.5">View Project on LinkedIn <ExternalLink className="h-3.5 w-3.5" /></a>
          <div className="mt-8 flex items-center justify-between"><button type="button" onClick={() => move(-1)} data-testid="button-case-previous-bottom" className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em]"><ChevronLeft className="h-4 w-4" /> Previous</button><span className="font-mono-custom text-[10px] text-[hsl(var(--muted-foreground))]">{String(currentIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span><button type="button" onClick={() => move(1)} data-testid="button-case-next-bottom" className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em]">Next <ChevronRight className="h-4 w-4" /></button></div>
        </div>
      </div>
    </div>
  );
}

function FinalCTA() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 pb-24 pt-8 sm:px-8 lg:px-10 lg:pb-36">
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl bg-[hsl(var(--secondary))] p-7 sm:p-12 lg:p-16">
          <div className="absolute -right-10 -top-24 h-64 w-64 rounded-full border-[32px] border-[hsl(var(--background)/.18)]" />
          <div className="relative max-w-[700px]">
            <p className="font-mono-custom text-[10px] uppercase tracking-[.18em] text-[hsl(var(--foreground)/.6)]">Let’s build something useful</p>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[.98] tracking-[-.06em] sm:text-6xl">Start with the messy part.</h2>
            <p className="mt-6 max-w-[540px] text-base leading-7 text-[hsl(var(--foreground)/.72)]">Tell Aptimexa what is repetitive, disconnected, unclear, or waiting to become a real product.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button type="button" onClick={() => scrollToId('contact')} data-testid="button-final-start" className="button-with-arrow flex items-center gap-3 rounded-full bg-[hsl(var(--foreground))] px-5 py-3 text-xs font-bold uppercase tracking-[.12em] text-[hsl(var(--background))]">Start a Project <ArrowUpRight className="button-arrow h-4 w-4" /></button>
              <button type="button" onClick={() => scrollToId('contact')} data-testid="button-final-call" className="flex items-center gap-2 rounded-full border border-[hsl(var(--foreground)/.35)] px-5 py-3 text-xs font-bold uppercase tracking-[.12em] text-[hsl(var(--foreground))]">Book a Call</button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  return (
    <div className="site-shell page-grain min-h-[100dvh]">
      <div className="progress-line" />
      <Header onOpenMenu={() => setMenuOpen(true)} />
      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
      <main>
        <Hero />
        <MarqueeBand />
        <About />
        <Services />
        <Solutions />
        <Skills />
        <Work onSelect={setSelectedProject} />
        <Process />
        <WhyAptimexa />
        <Journey />
        <InstagramFeed />
        <References />
        <Resume />
        <FinalCTA />
        <Contact />
      </main>
      {selectedProject && <CaseStudy project={selectedProject} onClose={() => setSelectedProject(null)} onChange={setSelectedProject} />}
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/admin/hero" component={HeroManagement} />
        <Route path="/" component={Home} />
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/admin/login" component={AdminLogin} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}
function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>

        <AptimexaAgent />

        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;