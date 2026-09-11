import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pkg from "pg";


dotenv.config();
const { Pool } = pkg;
const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
user: process.env.DB_USER,
host: process.env.DB_HOST,
database: process.env.DB_NAME,
password: process.env.DB_PASS,
port: process.env.DB_PORT,
});


// Run CREATE TABLE once when server starts
const createTable = async () => {
try {
await pool.query(`
      CREATE TABLE IF NOT EXISTS notes (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        content TEXT
      );
    `);

console.log("Notes table created or already exists");
  } catch (err) {
console.error("Error creating table:", err.message);
  }
};


createTable();
app.get("/", (req, res) => res.send("Backend running!"));
app.listen(process.env.PORT || 5000, () => {
    console.log("Server started...");
});

