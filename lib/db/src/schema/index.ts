import {
  boolean,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

/* =========================
   ADMIN USERS
========================= */

export const adminUsers = pgTable("admin_users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* =========================
   ADMIN SESSIONS
========================= */

export const adminSessions = pgTable("admin_sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  adminUserId: uuid("admin_user_id")
    .notNull()
    .references(() => adminUsers.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* =========================
   WEBSITE SECTIONS
========================= */

export const siteSections = pgTable("site_sections", {
  id: uuid("id").defaultRandom().primaryKey(),
  sectionKey: text("section_key").notNull().unique(),
  title: text("title").notNull(),
  content: jsonb("content").notNull(),
  isPublished: boolean("is_published").default(true).notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* =========================
   PROJECTS
========================= */

export const projects = pgTable("projects", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category"),
  tags: jsonb("tags"),
  url: text("url"),
  icon: text("icon"),
  tone: text("tone"),
  accent: text("accent"),
  detail: text("detail"),
  role: text("role"),
  stack: jsonb("stack"),
  sortOrder: integer("sort_order").default(0).notNull(),
  isPublished: boolean("is_published").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* =========================
   INSTAGRAM POSTS
========================= */

export const instagramPosts = pgTable("instagram_posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  coverImage: text("cover_image"),
  postUrl: text("post_url"),
  type: text("type").notNull(),
  isPublished: boolean("is_published").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* =========================
   MEDIA
========================= */

export const media = pgTable("media", {
  id: uuid("id").defaultRandom().primaryKey(),
  fileName: text("file_name").notNull(),
  fileUrl: text("file_url").notNull(),
  mimeType: text("mime_type"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});