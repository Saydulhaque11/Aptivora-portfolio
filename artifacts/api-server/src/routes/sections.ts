import { Router } from "express";
import { db } from "@workspace/db";
import { siteSections } from "@workspace/db/schema";
import { eq } from "drizzle-orm";

const router = Router();

const defaultHeroContent = {
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

router.get("/sections/hero", async (_req, res) => {
  try {
    const section = await db.query.siteSections.findFirst({
      where: (sections, { eq }) =>
        eq(sections.sectionKey, "hero"),
    });

    if (!section) {
      return res.json({
        sectionKey: "hero",
        title: "Hero Section",
        content: defaultHeroContent,
        isPublished: true,
      });
    }

    return res.json(section);
  } catch (error) {
    console.error("Get hero section error:", error);

    return res.status(500).json({
      error: "Failed to load hero section.",
    });
  }
});

router.put("/sections/hero", async (req, res) => {
  try {
    const {
      content,
      isPublished,
    } = req.body;

    if (!content || typeof content !== "object") {
      return res.status(400).json({
        error: "Hero content is required.",
      });
    }

    const existing = await db.query.siteSections.findFirst({
      where: (sections, { eq }) =>
        eq(sections.sectionKey, "hero"),
    });

    if (existing) {
      const [updated] = await db
        .update(siteSections)
        .set({
          content,
          isPublished:
            typeof isPublished === "boolean"
              ? isPublished
              : existing.isPublished,
          updatedAt: new Date(),
        })
        .where(eq(siteSections.id, existing.id))
        .returning();

      return res.json(updated);
    }

    const [created] = await db
      .insert(siteSections)
      .values({
        sectionKey: "hero",
        title: "Hero Section",
        content,
        isPublished:
          typeof isPublished === "boolean"
            ? isPublished
            : true,
      })
      .returning();

    return res.status(201).json(created);
  } catch (error) {
    console.error("Update hero section error:", error);

    return res.status(500).json({
      error: "Failed to save hero section.",
    });
  }
});

export default router;