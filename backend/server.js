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
      CREATE TABLE IF NOT EXIST dishes (
        id SERIAL PRIMARY KEY,
        dish_name VARCHAR (255) UNIQUE NOT NULL,
        dish_price INT,
        dish _discription VARCHAR,
        is_available BOOLEAN DEFAULT true
      );
    `); //hide dish on false

  await pool.query(`
      CREATE TABLE IF NOT EXIST orders (
        id SERIAL PRIMARY KEY,
        guest_name VARCHAR (255),
        guest_phone INT,
        guest_adress VARCHAR (255),
        status VARCHAR(255) DEFAULT 'Pending,
        Total_price INT,
        ordered_at TIMESTAMP DEFAULT NOW()
      );
    `);

  await pool.query(`
    
    CREATE TABLE IF NOT EXIST order_items (
      id SERIAL PRIMARY KEY,
      order_id INT REFERENCE orders(id) ON DELETE CASCADE,
      dish_id  INT REFERENCE dishes(id) ON DELETE RESTRICT,
      order_price INT  REFERENCE dishes(dish_price) RESTRICT,
      quantity INT NOT NULL
    )
    
    `)

  


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

