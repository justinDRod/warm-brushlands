import express from 'express';
const app = express();
const PORT = process.env.PORT || 5001;
import { createClient } from 'redis';

const client = createClient({
  url: process.env.REDIS_URL,
  socket: {
    tls: true,
    rejectUnauthorized: false
  }

});
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/", (req, res) => {
  res.json({ message: "ok" });
})
.get('/db/', async (req, res) => {
  const value = await client.get("key");
  res.json(value);
});
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
