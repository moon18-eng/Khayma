import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./src/config/db";


dotenv.config(); //to read .env file

const app = express();
app.use(cors());
app.use(express.json());


const createTables = async () => {
try {
await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255),
      );
    `);

  await pool.query(`
      CREATE TABLE IF NOT EXIST dishes (
        id SERIAL PRIMARY KEY,
        dish_name VARCHAR (255) UNIQUE NOT NULL,
        dish_price INT,
        dish _discription VARCHAR,
      );
    `);

  await pool.query(`
      CREATE TABLE IF NOT EXIST orders (
      );
    `);


console.log("Notes table created or already exists");
  } catch (err) {
console.error("Error creating table:", err.message);
  }
};


createTables();

app.get("/", (req, res) => res.send("Backend running!"));

app.listen(process.env.PORT || 5000, () => {
    console.log("Server started...");
});

