import { ArrowLeft, Eye, EyeOff, Save } from "lucide-react";
import { useEffect, useState } from "react";

const defaultForm = {
  eyebrow: "AI AUTOMATION BUILDER",
  title: "Building digital systems",
  highlight: "that work for you.",
  description:
    "I design AI-powered automation, websites, CRM systems, and digital experiences that help ambitious businesses operate smarter.",
  primaryCta: "Start a Project",
  primaryCtaLink: "#contact",
  secondaryCta: "View My Work",
  secondaryCtaLink: "#work",
};

export default function HeroManagement() {
  const [published, setPublished] = useState(true);
  const [form, setForm] = useState(defaultForm);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadHero() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/sections/hero", {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to load hero section.");
        }

        if (data.content) {
          setForm({
            eyebrow: data.content.eyebrow ?? defaultForm.eyebrow,
            title: data.content.title ?? defaultForm.title,
            highlight: data.content.highlight ?? defaultForm.highlight,
            description:
              data.content.description ?? defaultForm.description,
            primaryCta:
              data.content.primaryCta ?? defaultForm.primaryCta,
            primaryCtaLink:
              data.content.primaryCtaLink ?? defaultForm.primaryCtaLink,
            secondaryCta:
              data.content.secondaryCta ?? defaultForm.secondaryCta,
            secondaryCtaLink:
              data.content.secondaryCtaLink ??
              defaultForm.secondaryCtaLink,
          });
        }

        if (typeof data.isPublished === "boolean") {
          setPublished(data.isPublished);
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load hero section.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadHero();
  }, []);

  const updateField = (
    field: keyof typeof form,
    value: string,
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setMessage("");
    setError("");
  };

  async function handleSave() {
    try {
      setSaving(true);
      setMessage("");
      setError("");

      const response = await fetch("/api/sections/hero", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: form,
          isPublished: published,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save hero section.");
      }

      setMessage("Hero section saved successfully.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to save hero section.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <div className="mx-auto max-w-[1100px] px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
        {/* Header */}
        <div className="flex flex-col gap-5 border-b border-[hsl(var(--border))] pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[.1em] text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>

            <p className="font-mono-custom text-[10px] uppercase tracking-[.18em] text-[hsl(var(--accent))]">
              01 / Hero
            </p>

            <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-.055em] sm:text-5xl">
              Hero Section
            </h1>

            <p className="mt-3 max-w-[620px] text-sm leading-6 text-[hsl(var(--muted-foreground))]">
              Manage the main headline, description, and call-to-action
              buttons shown on your homepage.
            </p>
          </div>

          {/* Publish toggle */}
          <button
            type="button"
            onClick={() => {
              setPublished((value) => !value);
              setMessage("");
              setError("");
            }}
            className={`flex w-fit items-center gap-3 rounded-xl border px-4 py-3 text-xs font-bold uppercase tracking-[.1em] transition-colors ${
              published
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600"
                : "border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))]"
            }`}
          >
            {published ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeOff className="h-4 w-4" />
            )}

            {published ? "Published" : "Hidden"}
          </button>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="mt-10 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-8 text-sm text-[hsl(var(--muted-foreground))]">
            Loading hero content...
          </div>
        ) : (
          <>
            {/* Form */}
            <div className="mt-10 space-y-6">
              {/* Main content */}
              <section className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 sm:p-8">
                <div className="mb-7">
                  <p className="font-mono-custom text-[9px] uppercase tracking-[.16em] text-[hsl(var(--accent))]">
                    Main Content
                  </p>

                  <h2 className="mt-2 font-display text-2xl font-semibold tracking-[-.04em]">
                    Hero copy
                  </h2>
                </div>

                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="hero-eyebrow"
                      className="mb-2 block text-xs font-bold uppercase tracking-[.1em]"
                    >
                      Eyebrow
                    </label>

                    <input
                      id="hero-eyebrow"
                      value={form.eyebrow}
                      onChange={(e) =>
                        updateField("eyebrow", e.target.value)
                      }
                      className="w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-3 text-sm outline-none transition focus:border-[hsl(var(--primary))]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="hero-title"
                      className="mb-2 block text-xs font-bold uppercase tracking-[.1em]"
                    >
                      Main Title
                    </label>

                    <input
                      id="hero-title"
                      value={form.title}
                      onChange={(e) =>
                        updateField("title", e.target.value)
                      }
                      className="w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-3 text-sm outline-none transition focus:border-[hsl(var(--primary))]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="hero-highlight"
                      className="mb-2 block text-xs font-bold uppercase tracking-[.1em]"
                    >
                      Highlight Text
                    </label>

                    <input
                      id="hero-highlight"
                      value={form.highlight}
                      onChange={(e) =>
                        updateField("highlight", e.target.value)
                      }
                      className="w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-3 text-sm outline-none transition focus:border-[hsl(var(--primary))]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="hero-description"
                      className="mb-2 block text-xs font-bold uppercase tracking-[.1em]"
                    >
                      Description
                    </label>

                    <textarea
                      id="hero-description"
                      rows={5}
                      value={form.description}
                      onChange={(e) =>
                        updateField("description", e.target.value)
                      }
                      className="w-full resize-y rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-3 text-sm leading-6 outline-none transition focus:border-[hsl(var(--primary))]"
                    />
                  </div>
                </div>
              </section>

              {/* CTA */}
              <section className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 sm:p-8">
                <div className="mb-7">
                  <p className="font-mono-custom text-[9px] uppercase tracking-[.16em] text-[hsl(var(--accent))]">
                    Call To Action
                  </p>

                  <h2 className="mt-2 font-display text-2xl font-semibold tracking-[-.04em]">
                    Hero buttons
                  </h2>
                </div>

                <div className="grid gap-5 lg:grid-cols-2">
                  <div>
                    <label
                      htmlFor="primary-cta"
                      className="mb-2 block text-xs font-bold uppercase tracking-[.1em]"
                    >
                      Primary Button
                    </label>

                    <input
                      id="primary-cta"
                      value={form.primaryCta}
                      onChange={(e) =>
                        updateField("primaryCta", e.target.value)
                      }
                      className="w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-3 text-sm outline-none transition focus:border-[hsl(var(--primary))]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="primary-link"
                      className="mb-2 block text-xs font-bold uppercase tracking-[.1em]"
                    >
                      Primary Button Link
                    </label>

                    <input
                      id="primary-link"
                      value={form.primaryCtaLink}
                      onChange={(e) =>
                        updateField("primaryCtaLink", e.target.value)
                      }
                      className="w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-3 text-sm outline-none transition focus:border-[hsl(var(--primary))]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="secondary-cta"
                      className="mb-2 block text-xs font-bold uppercase tracking-[.1em]"
                    >
                      Secondary Button
                    </label>

                    <input
                      id="secondary-cta"
                      value={form.secondaryCta}
                      onChange={(e) =>
                        updateField("secondaryCta", e.target.value)
                      }
                      className="w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-3 text-sm outline-none transition focus:border-[hsl(var(--primary))]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="secondary-link"
                      className="mb-2 block text-xs font-bold uppercase tracking-[.1em]"
                    >
                      Secondary Button Link
                    </label>

                    <input
                      id="secondary-link"
                      value={form.secondaryCtaLink}
                      onChange={(e) =>
                        updateField("secondaryCtaLink", e.target.value)
                      }
                      className="w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-3 text-sm outline-none transition focus:border-[hsl(var(--primary))]"
                    />
                  </div>
                </div>
              </section>

              {/* Save */}
              <div className="flex flex-col items-end gap-3 border-t border-[hsl(var(--border))] pt-6">
                {message && (
                  <p className="text-sm text-emerald-600">
                    {message}
                  </p>
                )}

                {error && (
                  <p className="text-sm text-red-600">
                    {error}
                  </p>
                )}

                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-6 py-3.5 text-xs font-bold uppercase tracking-[.1em] text-[hsl(var(--primary-foreground))] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Save className="h-4 w-4" />
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}