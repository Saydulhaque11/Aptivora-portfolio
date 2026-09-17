import { Router } from "express";
import bcrypt from "bcryptjs";
import { db } from "@workspace/db";
import { adminUsers } from "@workspace/db/schema";

const router = Router();

router.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required.",
      });
    }

    const admin = await db.query.adminUsers.findFirst({
      where: (users, { eq }) => eq(users.email, email.toLowerCase()),
    });

    if (!admin) {
      return res.status(401).json({
        error: "Invalid email or password.",
      });
    }

    const passwordValid = await bcrypt.compare(
      password,
      admin.passwordHash,
    );

    if (!passwordValid) {
      return res.status(401).json({
        error: "Invalid email or password.",
      });
    }

    req.session.adminUserId = admin.id;

    return res.json({
      success: true,
      user: {
        id: admin.id,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);

    return res.status(500).json({
      error: "Login failed.",
    });
  }
});

router.post("/auth/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({
        error: "Logout failed.",
      });
    }

    res.clearCookie("connect.sid");

    return res.json({
      success: true,
    });
  });
});

router.get("/auth/me", async (req, res) => {
  try {
    if (!req.session.adminUserId) {
      return res.status(401).json({
        authenticated: false,
      });
    }

    const admin = await db.query.adminUsers.findFirst({
      where: (users, { eq }) =>
        eq(users.id, req.session.adminUserId!),
    });

    if (!admin) {
      req.session.destroy(() => {});
      return res.status(401).json({
        authenticated: false,
      });
    }

    return res.json({
      authenticated: true,
      user: {
        id: admin.id,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Auth check error:", error);

    return res.status(500).json({
      error: "Authentication check failed.",
    });
  }
});

export default router;