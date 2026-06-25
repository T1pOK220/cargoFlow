import app from "./index.js";
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Node сервер запущено http://localhost:${PORT}`);
  console.log("`CORS дозволено для: http://localhost:5173`")
});