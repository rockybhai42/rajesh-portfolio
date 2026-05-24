import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";
const { Pool } = pg;




//configure env variables
dotenv.config();



//database connection 
const pool = new Pool({
  connectionString:process.env.DATABASE_URL,
  ssl:{
    rejectUnauthorized:false
  }
})








// appi initialize

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

app.use(
  cors({
    origin: "https://rajesh-portfolio-ecru-six.vercel.app"
  })
);


//test route 
app.get("/",(req, res)=>{
    res.send("server running successfully");
});

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM contacts ORDER BY id DESC"
    );

    res.json(result.rows);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Database connection failed"
    });
  }
});

//server

const port = process.env.PORT||5000; ;


app.post("/contacts", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    await pool.query(
      `
      INSERT INTO contacts(name, email, message)
      VALUES($1, $2, $3)
      `,
      [name, email, message]
    );

    res.json({
      success: true,
      message: "Message sent successfully"
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to save message"
    });
  }
});



app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "backend is running "
  });
});


app.listen(port,()=>{
    console.log(`server running on port ${port}`);
});
