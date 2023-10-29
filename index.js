import express from 'express'
const app = express();
const PORT = process.env.PORT || 5001
import pg from "pg";

const { Pool} = pg;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})
app.get("/", (req, res) => {
  res.json({ message: "ok" });
})
.get('/db/', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM test_table');
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
