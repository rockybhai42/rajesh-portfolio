import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";
import { Resend } from "resend";


dotenv.config();

const { Pool } = pg;

const app = express();

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

app.use(
  cors({
    origin: "https://rajesh-portfolio-ecru-six.vercel.app"
  })
);

app.use(express.json());

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

app.post("/admin-login", (req, res) => {
  const { password } = req.body;



  if (password === process.env.ADMIN_PASSWORD) {
    return res.json({
      success: true,
      message: "Login Successful"
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

app.get("/contacts", async (req, res) => {
  const password = req.headers["admin-password"];

  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized"
    });
  }

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

/* =========================
   SERVER
========================= */

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Running On Port ${port}`);
});