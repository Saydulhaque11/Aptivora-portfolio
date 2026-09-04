import { type FormEvent, type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[hsl(var(--primary))] text-sm font-bold text-[hsl(var(--primary-foreground))] shadow-[4px_4px_0_hsl(var(--secondary))]">SH</span>
          <span><span className="block font-mono-custom text-[9px] font-bold uppercase tracking-[.15em] text-[hsl(var(--primary))]">Automexa</span><span className="block font-display text-[15px] font-bold tracking-[-.03em]">Saydul Haque Sayeed</span></span>
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
        <div className="mt-auto font-mono-custom text-xs text-[hsl(var(--muted-foreground))]">Automexa · digital systems &amp; automation</div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="relative mx-auto min-h-[700px] max-w-[1240px] px-5 pb-20 pt-36 sm:px-8 lg:flex lg:min-h-[780px] lg:items-center lg:px-10 lg:pt-32">
      <div className="absolute right-[9%] top-36 h-40 w-40 rounded-full bg-[hsl(var(--secondary)/.2)] blur-3xl" />
      <div className="relative z-10 max-w-[780px]">
        <div className="hero-load mb-7 flex items-center gap-3 font-mono-custom text-[10px] font-medium uppercase tracking-[.18em] text-[hsl(var(--primary))]">
          <span className="h-2 w-2 rounded-full bg-[hsl(var(--accent))]" /> Automexa / digital systems &amp; automation
        </div>
        <h1 className="hero-load-delay font-display text-[clamp(3.7rem,9vw,8.6rem)] font-semibold leading-[.88] tracking-[-.075em]">
          We build<br /><span className="text-[hsl(var(--primary))]">digital systems</span><br />that work smarter.
        </h1>
        <div className="hero-load-delay-2 mt-9 grid max-w-[690px] gap-8 md:grid-cols-[1fr_240px] md:items-end">
          <p className="max-w-[510px] text-lg leading-8 text-[hsl(var(--muted-foreground))]">
            AI automation, websites, CRM systems, mobile apps, design, and content — connected into one practical digital ecosystem.
          </p>
          <div className="flex flex-wrap gap-4">
            <button type="button" onClick={() => scrollToId('contact')} data-testid="button-hero-start" className="button-with-arrow group flex w-fit items-center gap-3 rounded-full bg-[hsl(var(--foreground))] px-4 py-3 text-xs font-bold uppercase tracking-[.12em] text-[hsl(var(--background))]">Start a Project <ArrowUpRight className="button-arrow h-4 w-4" /></button>
            <button type="button" onClick={() => scrollToId('work')} data-testid="button-hero-work" className="button-with-arrow group flex w-fit items-center gap-3 border-b-2 border-[hsl(var(--accent))] pb-2 text-sm font-bold">Explore Our Work <ArrowDown className="button-arrow h-4 w-4 transition-transform group-hover:translate-y-1" /></button>
            <button type="button" onClick={() => scrollToId('contact')} data-testid="button-hero-book" className="flex w-fit items-center gap-2 border-b border-[hsl(var(--border))] pb-2 text-xs font-bold uppercase tracking-[.12em] text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]">Book a Call</button>
          </div>
        </div>
        <p className="hero-load-delay-2 mt-8 font-mono-custom text-[10px] uppercase tracking-[.16em] text-[hsl(var(--muted-foreground))]">Saydul Haque Sayeed · Founder, Automexa</p>
      </div>
      <div className="hero-load-delay-2 relative mt-16 h-[310px] w-full max-w-[450px] lg:absolute lg:right-10 lg:top-[235px] lg:mt-0 lg:h-[410px]">
        <div className="absolute inset-0 rounded-[2rem] border border-[hsl(var(--border))] bg-[hsl(var(--card)/.7)] p-4 shadow-[var(--shadow-soft)]">
          <div className="flex items-center justify-between border-b border-[hsl(var(--border))] pb-3 font-mono-custom text-[9px] uppercase tracking-[.16em] text-[hsl(var(--muted-foreground))]">
            <span>personal systems map</span><span className="text-[hsl(var(--accent))]">live / 01</span>
          </div>
          <div className="relative flex h-[calc(100%-36px)] items-center justify-center">
            <div className="absolute left-[13%] top-[29%] h-px w-[75%] rotate-[18deg] bg-[hsl(var(--primary)/.3)]" />
            <div className="absolute left-[22%] top-[55%] h-px w-[57%] -rotate-[19deg] bg-[hsl(var(--primary)/.3)]" />
            <div className="absolute left-[50%] top-[24%] h-[54%] w-px bg-[hsl(var(--primary)/.22)]" />
            <div className="float-orb absolute left-[37%] top-[29%] flex h-24 w-24 items-center justify-center rounded-full border border-[hsl(var(--primary)/.55)] bg-[hsl(var(--primary))] text-center text-[10px] font-bold uppercase leading-4 tracking-[.1em] text-[hsl(var(--primary-foreground))] shadow-[10px_10px_0_hsl(var(--secondary)/.7)]">AI<br />automation</div>
            {[
              { text: 'n8n', x: '8%', y: '18%', icon: Workflow },
              { text: 'REST', x: '67%', y: '12%', icon: Network },
              { text: 'CRM', x: '5%', y: '67%', icon: DatabaseZap },
              { text: 'web', x: '72%', y: '66%', icon: Code2 },
            ].map(({ text, x, y, icon: Icon }) => (
              <div key={text} className="absolute flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-2 text-[10px] font-bold uppercase tracking-[.12em] shadow-sm" style={{ left: x, top: y }}>
                <Icon className="h-3.5 w-3.5 text-[hsl(var(--accent))]" /> {text}
              </div>
            ))}
            <span className="absolute bottom-2 left-1 font-mono-custom text-[9px] text-[hsl(var(--muted-foreground))]">connecting the useful dots</span>
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
          {capabilities.map(({ label }, index) => <span key={label} className="flex items-center gap-5"><span>{label}</span>{index < capabilities.length - 1 && <span className="text-[hsl(var(--secondary))]">/</span>}</span>)}
        </div>
        <span className="hidden shrink-0 font-mono-custom text-[10px] opacity-60 sm:block">SH / Automexa</span>
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 lg:px-10 lg:py-36">
      <Reveal>
        <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="font-mono-custom text-[10px] uppercase tracking-[.18em] text-[hsl(var(--accent))]">01 / About Saydul</p>
            <h2 className="mt-5 max-w-[430px] font-display text-4xl font-semibold leading-[1.02] tracking-[-.055em] sm:text-5xl">Built by a technical mind. Designed around real business problems.</h2>
          </div>
          <div>
            <p className="max-w-[760px] text-[clamp(1.45rem,2.8vw,2.45rem)] leading-[1.24] tracking-[-.04em]">Hi, I’m Saydul — an AI Automation Engineer &amp; Web Developer focused on building practical digital systems.</p>
            <p className="mt-7 max-w-[700px] text-base leading-8 text-[hsl(var(--muted-foreground))]">I work across AI automation, AI agents, workflow systems, CRM automation, web development, APIs, integrations, and business process automation. Automexa is the broader digital systems practice around that work — built to help small businesses connect the moving parts instead of collecting disconnected tools.</p>
             <div className="mt-9 flex flex-wrap gap-2">
               {['AI automation', 'AI agents', 'Workflow systems', 'CRM automation', 'Web development', 'APIs & integrations'].map((label) => <span key={label} className="rounded-full border border-[hsl(var(--border))] px-3 py-2 font-mono-custom text-[10px] uppercase tracking-[.1em] text-[hsl(var(--muted-foreground))]">{label}</span>)}
            </div>
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
            <div><p className="font-mono-custom text-[10px] uppercase tracking-[.18em] text-[hsl(var(--secondary))]">02 / Automexa services</p><h2 className="mt-5 max-w-[700px] font-display text-5xl font-semibold leading-[.95] tracking-[-.06em] sm:text-7xl">Digital systems<br /><span className="text-[hsl(var(--secondary))]">for the real work.</span></h2></div>
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
          <div><p className="max-w-[650px] text-lg leading-8 text-[hsl(var(--muted-foreground))]">Automexa can shape the digital system behind the business — without pretending to already have clients, case-study results, or a one-size-fits-all package.</p><div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--border))] sm:grid-cols-2">{industries.map(([industry, description, Icon], index) => <div key={industry} className="group bg-[hsl(var(--card))] p-5 transition-colors hover:bg-[hsl(var(--muted)/.7)]"><div className="flex items-center justify-between"><Icon className="h-5 w-5 text-[hsl(var(--primary))]" /><span className="font-mono-custom text-[10px] text-[hsl(var(--muted-foreground))]">0{index + 1}</span></div><h3 className="mt-8 font-display text-lg font-semibold">{industry}</h3><p className="mt-2 text-sm leading-6 text-[hsl(var(--muted-foreground))]">{description}</p></div>)}</div></div>
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

function WhyAutomexa() {
  const { ref, visible } = useReveal();
  return (
    <section id="why-automexa" className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 lg:px-10 lg:py-36">
      <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''}`}>
        <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="font-mono-custom text-[10px] uppercase tracking-[.18em] text-[hsl(var(--accent))]">08 / Why Automexa</p>
            <h2 className="mt-5 max-w-[470px] font-display text-4xl font-semibold leading-[1.02] tracking-[-.055em] sm:text-5xl">Technology is only useful when it solves the right problem.</h2>
          </div>
          <div className="max-w-[650px]">
            <p className="text-[clamp(1.35rem,2.5vw,2.15rem)] leading-[1.3] tracking-[-.035em]">
              Automexa starts with the business problem, not the tool list.
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

function Work({ onSelect }: { onSelect: (project: Project) => void }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'AI & Automation', 'AI Agents', 'Business Systems', 'Web / Digital'];
  const filterCategories: Record<string, string[]> = {
    'AI & Automation': ['AI automation', 'n8n workflows'],
    'AI Agents': ['AI agents'],
    'Business Systems': ['Business automation', 'Lead qualification'],
    'Web / Digital': ['Web development'],
  };
  const visibleProjects = useMemo(() => activeFilter === 'All' ? projects : projects.filter((project) => filterCategories[activeFilter]?.includes(project.category)), [activeFilter]);
  return (
    <section id="work" className="bg-[hsl(var(--muted)/.55)] px-5 py-24 sm:px-8 lg:px-10 lg:py-36">
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="font-mono-custom text-[10px] uppercase tracking-[.18em] text-[hsl(var(--accent))]">05 / Work archive</p>
               <h2 className="mt-5 font-display text-5xl font-semibold leading-none tracking-[-.06em] sm:text-7xl">Work that<br /><span className="text-[hsl(var(--primary))]">connects.</span></h2>
            </div>
             <p className="max-w-[340px] text-sm leading-6 text-[hsl(var(--muted-foreground))]">A focused archive of systems, workflows, and interfaces built through Saydul’s hands-on technical practice.</p>
          </div>
        </Reveal>
        <Reveal delay={1}>
          <div className="mt-16">
             <div className="mb-5 flex items-center justify-between"><h3 className="font-display text-2xl font-semibold tracking-[-.04em]">Featured Work</h3><span className="font-mono-custom text-[10px] uppercase tracking-[.14em] text-[hsl(var(--muted-foreground))]">selected / 04</span></div>
             <div className="grid gap-5 lg:grid-cols-2">
               {projects.slice(0, 4).map((project) => (
                 <div key={project.id} role="button" tabIndex={0} onClick={() => onSelect(project)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') onSelect(project); }} data-testid={`card-featured-project-${project.id}`} className="project-card group grid w-full overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-left sm:grid-cols-[.9fr_1.1fr]">
                  <ProjectArt project={project} />
                    <div className="flex flex-col justify-between p-6"><div><p className="font-mono-custom text-[10px] uppercase tracking-[.15em] text-[hsl(var(--accent))]">Featured / {project.index}</p><h4 className="mt-3 font-display text-2xl font-semibold tracking-[-.04em]">{project.title}</h4><p className="mt-3 text-sm leading-6 text-[hsl(var(--muted-foreground))]">{project.description}</p></div><div className="mt-8 flex flex-wrap items-center gap-4"><button type="button" onClick={(event) => { event.stopPropagation(); onSelect(project); }} className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em]">Open case study <ArrowUpRight className="h-4 w-4 text-[hsl(var(--accent))] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></button><a href={project.url} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()} data-testid={`link-featured-project-${project.id}`} className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em] text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--primary))]">View Project on LinkedIn <ExternalLink className="h-3.5 w-3.5" /></a></div></div>
                 </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={2}>
          <div className="mt-20 flex flex-col justify-between gap-5 border-t border-[hsl(var(--border))] pt-8 sm:flex-row sm:items-end">
             <div><p className="font-mono-custom text-[10px] uppercase tracking-[.18em] text-[hsl(var(--accent))]">All Work</p><h3 className="mt-3 font-display text-3xl font-semibold tracking-[-.05em]">Explore All Work.</h3></div>
            <p className="max-w-[310px] text-sm leading-6 text-[hsl(var(--muted-foreground))]">Filter by the kind of system or surface you want to explore.</p>
          </div>
        </Reveal>
        <Reveal delay={1}>
          <div className="mt-12 flex flex-wrap gap-2" role="tablist" aria-label="Filter work archive">
            {filters.map((filter) => (
              <button key={filter} type="button" onClick={() => setActiveFilter(filter)} data-testid={`button-filter-${filter.toLowerCase().replaceAll(' ', '-')}`} role="tab" aria-selected={activeFilter === filter} className={`filter-pill rounded-full border px-4 py-2 text-xs font-semibold ${activeFilter === filter ? 'border-[hsl(var(--foreground))] bg-[hsl(var(--foreground))] text-[hsl(var(--background))]' : 'border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--foreground)/.5)]'}`}>{filter}</button>
            ))}
          </div>
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {visibleProjects.map((project, index) => (
            <Reveal key={project.id} delay={(index % 3) + 1}>
               <div role="button" tabIndex={0} onClick={() => onSelect(project)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') onSelect(project); }} data-testid={`card-project-${project.id}`} className="project-card group block w-full overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-left">
                <ProjectArt project={project} />
                <div className="p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div><p className="font-mono-custom text-[10px] uppercase tracking-[.16em] text-[hsl(var(--muted-foreground))]">{project.index} — {project.category}</p><h3 className="mt-3 font-display text-2xl font-semibold tracking-[-.04em]">{project.title}</h3></div>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[hsl(var(--border))] transition-colors group-hover:bg-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))]"><ArrowUpRight className="h-4 w-4" /></span>
                  </div>
                  <p className="mt-4 max-w-[420px] text-sm leading-6 text-[hsl(var(--muted-foreground))]">{project.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">{project.tags.map((tag) => <span key={tag} className="rounded-md bg-[hsl(var(--muted))] px-2 py-1 font-mono-custom text-[9px] uppercase tracking-[.08em] text-[hsl(var(--muted-foreground))]">{tag}</span>)}</div>
                    <a href={project.url} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()} data-testid={`link-project-${project.id}`} className="mt-7 flex w-fit items-center gap-2 border-b border-[hsl(var(--accent))] pb-1 text-xs font-bold uppercase tracking-[.12em] transition-colors hover:text-[hsl(var(--primary))]">View Project on LinkedIn <ExternalLink className="h-3.5 w-3.5" /></a>
                </div>
               </div>
            </Reveal>
          ))}
        </div>
         <Reveal>
           <div className="mt-10 flex items-center gap-3 border-t border-[hsl(var(--border))] pt-6 font-mono-custom text-[10px] uppercase tracking-[.14em] text-[hsl(var(--muted-foreground))]"><span className="h-2 w-2 rounded-full bg-[hsl(var(--secondary))]" /> Project descriptions are intentionally limited to the information available in each LinkedIn post.</div>
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
          <div><p className="font-mono-custom text-[10px] uppercase tracking-[.18em] text-[hsl(var(--accent))]">06 / Experience &amp; professional journey</p><h2 className="mt-5 max-w-[380px] font-display text-4xl font-semibold leading-[1.02] tracking-[-.055em] sm:text-5xl">The path is still being written.</h2><p className="mt-6 max-w-[320px] text-sm leading-6 text-[hsl(var(--muted-foreground))]">This is a clear home for the real timeline as the professional archive grows.</p></div>
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
            <div><p className="font-mono-custom text-[10px] uppercase tracking-[.18em] text-[hsl(var(--accent))]">09 / Testimonials &amp; references</p><h2 className="mt-5 max-w-[390px] font-display text-4xl font-semibold leading-[1.02] tracking-[-.055em] sm:text-5xl">Let the right people speak.</h2></div>
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
          <div><p className="font-mono-custom text-[10px] uppercase tracking-[.18em] text-[hsl(var(--accent))]">10 / Resume</p><h2 className="mt-4 font-display text-3xl font-semibold tracking-[-.05em] sm:text-4xl">A fuller professional record.</h2><p className="mt-3 max-w-[550px] text-sm leading-6 text-[hsl(var(--muted-foreground))]">Download Saydul’s current CV as supplied.</p></div>
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
              <p className="font-mono-custom text-[10px] uppercase tracking-[.18em] text-[hsl(var(--secondary))]">12 / Contact Automexa</p>
              <h2 className="mt-6 max-w-[620px] font-display text-[clamp(3.2rem,7vw,6.8rem)] font-semibold leading-[.9] tracking-[-.075em]">Have a system<br />worth <span className="text-[hsl(var(--secondary))]">untangling?</span></h2>
              <p className="mt-8 max-w-[430px] text-base leading-7 text-[hsl(var(--background)/.65)]">Tell Automexa what you’re building, where the repetition is, or what currently feels harder than it should.</p>
              <div className="mt-10 space-y-4 text-sm">
                <div className="flex items-center gap-3 text-[hsl(var(--background)/.9)]"><Mail className="h-4 w-4 text-[hsl(var(--secondary))]" /><a href="mailto:haquesaydul200411@gmail.com" data-testid="link-email" className="transition-colors hover:text-[hsl(var(--secondary))]">haquesaydul200411@gmail.com</a><button type="button" onClick={copyEmail} data-testid="button-copy-email" aria-label="Copy email address" className="ml-1 opacity-60 transition-opacity hover:opacity-100">{copied ? <Check className="h-3.5 w-3.5 text-[hsl(var(--secondary))]" /> : <Copy className="h-3.5 w-3.5" />}</button></div>
                <a href="tel:+8801616094323" data-testid="link-phone" className="flex items-center gap-3 text-[hsl(var(--background)/.72)] transition-colors hover:text-[hsl(var(--secondary))]"><Phone className="h-4 w-4 text-[hsl(var(--secondary))]" /> +8801616094323</a>
                <div className="flex items-center gap-3 text-[hsl(var(--background)/.55)]"><Clock3 className="h-4 w-4 text-[hsl(var(--secondary))]" /> Response time not provided</div>
              </div>
              <div className="mt-10 border-t border-[hsl(var(--background)/.16)] pt-6">
                <p className="font-mono-custom text-[10px] uppercase tracking-[.14em] text-[hsl(var(--background)/.42)]">Social links</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <a href="https://www.linkedin.com/in/saydul-haque-sayeed-6a8a18368/" target="_blank" rel="noreferrer" data-testid="link-social-linkedin" className="flex items-center gap-2 rounded-full border border-[hsl(var(--background)/.2)] px-3 py-2 text-xs text-[hsl(var(--background)/.72)] transition-colors hover:border-[hsl(var(--secondary))] hover:text-[hsl(var(--secondary))]"><Linkedin className="h-3.5 w-3.5" /> LinkedIn <ExternalLink className="h-3 w-3 opacity-50" /></a>
                  <a href="https://github.com/Saydulhaque11" target="_blank" rel="noreferrer" data-testid="link-social-github" className="flex items-center gap-2 rounded-full border border-[hsl(var(--background)/.2)] px-3 py-2 text-xs text-[hsl(var(--background)/.72)] transition-colors hover:border-[hsl(var(--secondary))] hover:text-[hsl(var(--secondary))]"><Github className="h-3.5 w-3.5" /> GitHub <ExternalLink className="h-3 w-3 opacity-50" /></a>
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
          <span className="font-display text-sm font-bold">Automexa<span className="ml-2 font-mono-custom text-[10px] font-normal uppercase tracking-[.12em] text-[hsl(var(--secondary))]">by Saydul Haque Sayeed</span></span>
          <div className="flex flex-wrap gap-x-5 gap-y-2 font-mono-custom uppercase tracking-[.13em] text-[hsl(var(--background)/.45)]">
            {['Services', 'Work', 'Solutions', 'About', 'Contact'].map((label) => <button key={label} type="button" onClick={() => scrollToId(label.toLowerCase())} className="transition-colors hover:text-[hsl(var(--secondary))]">{label}</button>)}
          </div>
          <span className="font-mono-custom text-[hsl(var(--background)/.45)]">© 2026 Automexa</span>
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
            <p className="mt-6 max-w-[540px] text-base leading-7 text-[hsl(var(--foreground)/.72)]">Tell Automexa what is repetitive, disconnected, unclear, or waiting to become a real product.</p>
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
        <WhyAutomexa />
        <Journey />
        <Education />
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
        <Route path="/" component={Home} />
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
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;