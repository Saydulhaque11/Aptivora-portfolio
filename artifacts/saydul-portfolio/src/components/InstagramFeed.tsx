import { ArrowUpRight, Instagram, Play } from "lucide-react";
import { instagramPosts } from "@/lib/instagram/data";

function Reveal({ children }: { children: React.ReactNode }) {
  return <div className="reveal is-visible">{children}</div>;
}

export default function InstagramFeed() {
  return (
    <section
      id="instagram"
      className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 lg:px-10 lg:py-36"
    >
      <Reveal>
        <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
          <div>
            <p className="font-mono-custom text-[10px] uppercase tracking-[.18em] text-[hsl(var(--accent))]">
              10 / Social feed
            </p>

            <h2 className="mt-5 max-w-[480px] font-display text-4xl font-semibold leading-[1.02] tracking-[-.055em] sm:text-5xl">
              Built, shared,
              <br />
              <span className="text-[hsl(var(--primary))]">
                in motion.
              </span>
            </h2>
          </div>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-[500px] text-sm leading-7 text-[hsl(var(--muted-foreground))]">
              Short-form videos, automation ideas, and behind-the-scenes work
              shared through Instagram.
            </p>

            <a
              href="https://www.instagram.com/saydul.ai/"
              target="_blank"
              rel="noreferrer"
              className="group flex w-fit shrink-0 items-center gap-2 border-b-2 border-[hsl(var(--accent))] pb-2 text-xs font-bold uppercase tracking-[.12em]"
            >
              Follow on Instagram
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {instagramPosts.slice(0, 3).map((post, index) => (
          <Reveal key={post.id}>
            <a
              href={post.postUrl || "#"}
              target={post.postUrl ? "_blank" : undefined}
              rel={post.postUrl ? "noreferrer" : undefined}
              className="group block overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]"
              aria-label={
                post.postUrl
                  ? `Open ${post.title} on Instagram`
                  : `${post.title} Instagram post`
              }
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[hsl(var(--muted))]">
                {post.coverImage ? (
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Instagram className="h-12 w-12 text-[hsl(var(--muted-foreground))]" />
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />

                <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-3 py-2 text-white backdrop-blur-md">
                  {post.type === "video" ? (
                    <Play className="h-3.5 w-3.5 fill-current" />
                  ) : (
                    <Instagram className="h-3.5 w-3.5" />
                  )}

                  <span className="font-mono-custom text-[9px] uppercase tracking-[.14em]">
                    {post.type}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 text-white">
                  <div>
                    <p className="font-mono-custom text-[9px] uppercase tracking-[.14em] opacity-70">
                      0{index + 1} / Instagram
                    </p>

                    <h3 className="mt-2 font-display text-xl font-semibold leading-tight tracking-[-.03em]">
                      {post.title}
                    </h3>
                  </div>

                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>

              <div className="p-5">
                <p className="text-sm leading-6 text-[hsl(var(--muted-foreground))]">
                  {post.description}
                </p>

                <div className="mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em]">
                  View on Instagram
                  <ArrowUpRight className="h-3.5 w-3.5 text-[hsl(var(--accent))]" />
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}