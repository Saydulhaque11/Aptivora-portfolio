import {
  BarChart3,
  BriefcaseBusiness,
  ChevronRight,
  FileText,
  Home,
  Image,
  Instagram,
  Layers3,
  LogOut,
  Menu,
  MessageSquareQuote,
  Settings,
  Sparkles,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

const sections = [
  { number: "01", name: "Hero", icon: Home },
  { number: "02", name: "About", icon: FileText },
  { number: "03", name: "Services", icon: Layers3 },
  { number: "04", name: "Solutions", icon: Sparkles },
  { number: "05", name: "Skills", icon: BarChart3 },
  { number: "06", name: "Work / Projects", icon: BriefcaseBusiness },
  { number: "07", name: "Process", icon: ChevronRight },
  { number: "08", name: "Why Aptivoro", icon: Sparkles },
  { number: "09", name: "Journey", icon: ChevronRight },
  { number: "10", name: "References", icon: MessageSquareQuote },
  { number: "11", name: "Instagram", icon: Instagram },
  { number: "12", name: "Resume", icon: FileText },
  { number: "13", name: "Contact", icon: MessageSquareQuote },
];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      {/* Mobile header */}
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-[hsl(var(--border))] bg-[hsl(var(--background))]/95 px-5 backdrop-blur lg:hidden">
        <div>
          <p className="font-display text-lg font-bold tracking-[-.04em]">
            Aptivoro
          </p>

          <p className="font-mono-custom text-[8px] uppercase tracking-[.16em] text-[hsl(var(--accent))]">
            Admin Panel
          </p>
        </div>

        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[hsl(var(--border))]"
          aria-label="Open admin menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </header>

      <div className="flex min-h-screen">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <button
            type="button"
            aria-label="Close admin menu"
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 flex w-[290px] flex-col border-r border-[hsl(var(--border))] bg-[hsl(var(--background))] transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-20 items-center justify-between border-b border-[hsl(var(--border))] px-6">
            <div>
              <p className="font-display text-xl font-bold tracking-[-.05em]">
                Aptivoro
              </p>

              <p className="mt-1 font-mono-custom text-[8px] uppercase tracking-[.18em] text-[hsl(var(--accent))]">
                Digital Systems & Automation
              </p>
            </div>

            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[hsl(var(--border))] lg:hidden"
              aria-label="Close admin menu"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="px-6 pb-4 pt-6">
            <p className="font-mono-custom text-[9px] uppercase tracking-[.18em] text-[hsl(var(--muted-foreground))]">
              Content Management
            </p>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 pb-5">
            <Link
              href="/admin"
              onClick={() => setSidebarOpen(false)}
              className="mb-2 flex w-full items-center gap-3 rounded-xl bg-[hsl(var(--primary))] px-4 py-3 text-left text-[hsl(var(--primary-foreground))]"
            >
              <BarChart3 className="h-4 w-4" />

              <span className="text-xs font-bold uppercase tracking-[.08em]">
                Dashboard
              </span>
            </Link>

            <div className="space-y-1">
              {sections.map((section) => {
                const Icon = section.icon;

                if (section.name === "Hero") {
                  return (
                    <Link
                      key={section.number}
                      href="/admin/hero"
                      onClick={() => setSidebarOpen(false)}
                      className="group flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left transition-colors hover:bg-[hsl(var(--muted))]"
                    >
                      <span className="w-6 font-mono-custom text-[8px] text-[hsl(var(--muted-foreground))]">
                        {section.number}
                      </span>

                      <Icon className="h-4 w-4 text-[hsl(var(--muted-foreground))] transition-colors group-hover:text-[hsl(var(--foreground))]" />

                      <span className="flex-1 text-xs font-medium">
                        {section.name}
                      </span>
                    </Link>
                  );
                }

                return (
                  <button
                    key={section.number}
                    type="button"
                    className="group flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left transition-colors hover:bg-[hsl(var(--muted))]"
                  >
                    <span className="w-6 font-mono-custom text-[8px] text-[hsl(var(--muted-foreground))]">
                      {section.number}
                    </span>

                    <Icon className="h-4 w-4 text-[hsl(var(--muted-foreground))] transition-colors group-hover:text-[hsl(var(--foreground))]" />

                    <span className="flex-1 text-xs font-medium">
                      {section.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </nav>

          <div className="border-t border-[hsl(var(--border))] p-4">
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-xs font-bold uppercase tracking-[.08em] transition-colors hover:bg-[hsl(var(--muted))]"
            >
              <Settings className="h-4 w-4" />
              Settings
            </button>

            <button
              type="button"
              className="mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-xs font-bold uppercase tracking-[.08em] text-red-500 transition-colors hover:bg-red-500/10"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </aside>

        {/* Main content */}
        <section className="min-w-0 flex-1">
          <div className="mx-auto max-w-[1400px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
            <div className="flex flex-col gap-5 border-b border-[hsl(var(--border))] pb-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono-custom text-[10px] uppercase tracking-[.18em] text-[hsl(var(--accent))]">
                  Aptivoro / Admin
                </p>

                <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-.055em] sm:text-5xl">
                  Dashboard
                </h1>

                <p className="mt-3 max-w-[600px] text-sm leading-6 text-[hsl(var(--muted-foreground))]">
                  Manage your website content, projects, social feed, and
                  digital systems from one place.
                </p>
              </div>

              <a
                href="/"
                className="w-fit rounded-xl border border-[hsl(var(--border))] px-5 py-3 text-xs font-bold uppercase tracking-[.1em] transition-colors hover:bg-[hsl(var(--muted))]"
              >
                View Website
              </a>
            </div>

            {/* Overview cards */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
                <p className="font-mono-custom text-[9px] uppercase tracking-[.15em] text-[hsl(var(--muted-foreground))]">
                  Website Sections
                </p>

                <p className="mt-4 font-display text-4xl font-semibold tracking-[-.05em]">
                  13
                </p>

                <p className="mt-2 text-xs text-[hsl(var(--muted-foreground))]">
                  Sections available for management
                </p>
              </div>

              <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
                <p className="font-mono-custom text-[9px] uppercase tracking-[.15em] text-[hsl(var(--muted-foreground))]">
                  Projects
                </p>

                <p className="mt-4 font-display text-4xl font-semibold tracking-[-.05em]">
                  13
                </p>

                <p className="mt-2 text-xs text-[hsl(var(--muted-foreground))]">
                  Current portfolio projects
                </p>
              </div>

              <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
                <p className="font-mono-custom text-[9px] uppercase tracking-[.15em] text-[hsl(var(--muted-foreground))]">
                  Instagram Posts
                </p>

                <p className="mt-4 font-display text-4xl font-semibold tracking-[-.05em]">
                  3
                </p>

                <p className="mt-2 text-xs text-[hsl(var(--muted-foreground))]">
                  Maximum 3 posts displayed
                </p>
              </div>

              <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
                <p className="font-mono-custom text-[9px] uppercase tracking-[.15em] text-[hsl(var(--muted-foreground))]">
                  System
                </p>

                <p className="mt-4 flex items-center gap-2 font-display text-2xl font-semibold tracking-[-.04em]">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  Ready
                </p>

                <p className="mt-2 text-xs text-[hsl(var(--muted-foreground))]">
                  Admin interface initialized
                </p>
              </div>
            </div>

            {/* Quick management */}
            <div className="mt-10">
              <div className="mb-5 flex items-end justify-between">
                <div>
                  <p className="font-mono-custom text-[9px] uppercase tracking-[.16em] text-[hsl(var(--accent))]">
                    Quick Management
                  </p>

                  <h2 className="mt-2 font-display text-2xl font-semibold tracking-[-.04em]">
                    Website content
                  </h2>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {sections.slice(0, 6).map((section) => {
                  const Icon = section.icon;

                  if (section.name === "Hero") {
                    return (
                      <Link
                        key={section.number}
                        href="/admin/hero"
                        className="group flex items-center gap-4 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]"
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--muted))]">
                          <Icon className="h-5 w-5" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="font-mono-custom text-[8px] uppercase tracking-[.14em] text-[hsl(var(--muted-foreground))]">
                            {section.number}
                          </p>

                          <p className="mt-1 text-sm font-bold">
                            {section.name}
                          </p>
                        </div>

                        <ChevronRight className="h-4 w-4 text-[hsl(var(--muted-foreground))] transition-transform group-hover:translate-x-1" />
                      </Link>
                    );
                  }

                  return (
                    <button
                      key={section.number}
                      type="button"
                      className="group flex items-center gap-4 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--muted))]">
                        <Icon className="h-5 w-5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="font-mono-custom text-[8px] uppercase tracking-[.14em] text-[hsl(var(--muted-foreground))]">
                          {section.number}
                        </p>

                        <p className="mt-1 text-sm font-bold">
                          {section.name}
                        </p>
                      </div>

                      <ChevronRight className="h-4 w-4 text-[hsl(var(--muted-foreground))] transition-transform group-hover:translate-x-1" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Media card */}
            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 sm:p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[hsl(var(--muted))]">
                  <Image className="h-5 w-5" />
                </div>

                <h3 className="mt-5 font-display text-xl font-semibold tracking-[-.035em]">
                  Media Library
                </h3>

                <p className="mt-2 max-w-md text-sm leading-6 text-[hsl(var(--muted-foreground))]">
                  Upload and manage images used across your website from your
                  phone or computer.
                </p>

                <button
                  type="button"
                  className="mt-6 rounded-xl border border-[hsl(var(--border))] px-5 py-3 text-xs font-bold uppercase tracking-[.1em]"
                >
                  Manage Media
                </button>
              </div>

              <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 sm:p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[hsl(var(--muted))]">
                  <Instagram className="h-5 w-5" />
                </div>

                <h3 className="mt-5 font-display text-xl font-semibold tracking-[-.035em]">
                  Social Feed
                </h3>

                <p className="mt-2 max-w-md text-sm leading-6 text-[hsl(var(--muted-foreground))]">
                  Add, edit, publish, hide, or delete your Instagram posts.
                  The latest 3 posts stay visible.
                </p>

                <button
                  type="button"
                  className="mt-6 rounded-xl border border-[hsl(var(--border))] px-5 py-3 text-xs font-bold uppercase tracking-[.1em]"
                >
                  Manage Instagram
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}