import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg; //creating a variable called pool, Pool is the db shema, pool is the real thing we built
const pool = new Pool({
connectionString: process.env.DATABASE_URL,
ssl: {
rejectUnauthorized: false, 
  },
});


export default pool;

