import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";
import { Resend } from "resend";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";


dotenv.config();

const { Pool } = pg;

const app = express();

app.set("trust proxy", 1);

// resend client

const resend = new Resend(process.env.RESEND_API_KEY);

/* =========================
   DATABASE
========================= */

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

/* =========================
   EMAIL SERVICE
========================= */

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   }
// });

// transporter.verify((error) => {
//   if (error) {
//     console.log("Email Error:", error);
//   } else {
//     console.log("Email Service Ready");
//   }
// });

/* =========================
   MIDDLEWARES
========================= */

const allowedOriginPatterns = [
  /^https:\/\/rajesh-portfolio-ecru-six\.vercel\.app$/,
  /^https:\/\/rajesh-portfolio-[a-z0-9]+-rockybhai42s-projects\.vercel\.app$/
];

app.use(
  cors({
    origin: (origin, callback) => {
      // no origin = same-origin/non-browser request (curl, health checks, etc.)
      if (!origin) return callback(null, true);

      const isAllowed = allowedOriginPatterns.some((pattern) =>
        pattern.test(origin)
      );

      callback(null, isAllowed);
    }
  })
);

app.use(express.json());

/* =========================
   ADMIN AUTH
========================= */

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many login attempts. Try again later."
  }
});

function requireAdminAuth(req, res, next) {
  const authHeader = req.headers["authorization"] || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized"
    });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Session expired, please log in again"
    });
  }
}

/* =========================
   HOME ROUTE
========================= */

app.get("/", (req, res) => {
  res.send("Server Running Successfully");
});

/* =========================
   HEALTH CHECK
========================= */

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Backend is running"
  });
});

/* =========================
   ADMIN LOGIN
========================= */

app.post("/admin-login", loginLimiter, (req, res) => {
  const { password } = req.body;

  if (password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "24h"
    });

    return res.json({
      success: true,
      message: "Login Successful",
      token
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid Password"
  });
});

/* =========================
   CONTACT FORM
========================= */

app.post("/contacts", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    await pool.query(
      `
      INSERT INTO contacts(name, email, message)
      VALUES($1, $2, $3)
      `,
      [name, email, message]
    );

    try {
      await resend.emails.send({
       from: "onboarding@resend.dev",
        to: process.env.EMAIL_USER,
        subject: "New Portfolio Contact",
        html: `
      <h2>New Portfolio Contact</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p>${message}</p>
    `
      });
    } catch (emailError) {
      console.log("Email Error:", emailError);
    }
    res.json({
      success: true,
      message: "Message Sent Successfully"
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed To Save Message"
    });
  }
});

/* =========================
   GET ALL CONTACTS
========================= */

app.get("/contacts", requireAdminAuth, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT *
      FROM contacts
      ORDER BY id DESC
    `);

    res.json(result.rows);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Database Error"
    });
  }
});




//delete contact route can be added here in future if needed

app.delete("/contacts/:id", requireAdminAuth, async (req, res) => {

  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid contact id"
    });
  }

  try {
    const result = await pool.query(
      `
  DELETE FROM contacts
  WHERE id = $1
  RETURNING id
  `,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Contact not found"
      });
    }

    res.json({
      success: true,
      message: "Contact deleted successfully"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to delete contact"
    });
  }



});

/* =========================
   SERVER
========================= */

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Running On Port ${port}`);
});