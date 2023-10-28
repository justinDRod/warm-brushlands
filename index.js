import express from 'express'
const app = express();
const PORT = process.env.PORT || 5001
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
