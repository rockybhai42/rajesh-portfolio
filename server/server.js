import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import * as mariadb from "mariadb";
//configure env variables
dotenv.config();

// appi initialize

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//database connection 
const pool = mariadb.createPool({
     host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  connectionLimit: 5
});


//test route 
app.get("/",(req, res)=>{
    res.send("server running successfully");
});

//database test
app.get("/test-db",async (req, res)=>{
    let connect;
  try{  
     connect = await pool.getConnection();
    const rows = await connect.query("select * from contacts");
   
    res.json(rows);
}catch(err){
    console.log(err);
    res.status(500).json({err:"database connection error"})
}finally{
    if(connect){
        connect.release();
    } 
}

})

//server

const port = process.env.PORT ;
app.listen(port,()=>{
    console.log(`server running on port ${port}`);
});

app.post("/contacts", async (req, res)=>{
    const {name, email, message} = req.body;
    try {
        const connect = await pool.getConnection();
        await connect.query(`insert into contacts(name, email, message) values(?,?,?)`, [name, email, message]);

        res.json({ success: true, message: "Contact added successfully" });
        connect.release();
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to add contact" });  
    }
})
