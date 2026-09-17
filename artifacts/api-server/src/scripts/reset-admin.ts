import bcrypt from "bcryptjs";
import { db } from "@workspace/db";
import { adminUsers } from "@workspace/db/schema";
import { eq } from "drizzle-orm";

async function main() {
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    throw new Error("ADMIN_PASSWORD is not set");
  }

  const hash = await bcrypt.hash(password, 12);

  await db
    .update(adminUsers)
    .set({ passwordHash: hash })
    .where(eq(adminUsers.email, "haquesaydul200411@gmail.com"));

  console.log("Admin password updated successfully");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});