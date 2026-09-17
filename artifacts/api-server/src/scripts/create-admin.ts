import path from "path";
import { config } from "dotenv";
import bcrypt from "bcryptjs";
import { db } from "@workspace/db";
import { adminUsers } from "@workspace/db/schema";

config({
  path: path.resolve(process.cwd(), "../../.env"),
});

const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;

if (!email || !password) {
  throw new Error(
    "ADMIN_EMAIL and ADMIN_PASSWORD environment variables are required.",
  );
}

const passwordHash = await bcrypt.hash(password, 12);

const existing = await db.query.adminUsers.findFirst({
  where: (users, { eq }) => eq(users.email, email),
});

if (existing) {
  console.log(`Admin already exists: ${email}`);
  process.exit(0);
}

await db.insert(adminUsers).values({
  email,
  passwordHash,
});

console.log(`Admin created successfully: ${email}`);