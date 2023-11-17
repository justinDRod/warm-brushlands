import express from 'express';
const app = express();
const PORT = process.env.PORT || 5001;
import { createClient } from 'redis';

const client = createClient({
  url: process.env.REDIS_TLS_URL,
  socket: {
    tls: true,
    rejectUnauthorized: false
  }

});
client.on('error', err => console.log('Redis Client Error', err));
await client.connect();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/", (req, res) => {
  res.json({ message: "ok" });
})
.get('/db', async (req, res) => {
  const value = await client.get("key");
  res.json(value);
})
.post('/db/:value', async(req, res) => {
  await client.set('key', req.params.value);
  res.json({message: "complete"});
});
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
