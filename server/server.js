import app from "./index.js";
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Node сервер запущено http://localhost:${PORT}`);
  console.log("`React сервер запущено: http://localhost:5173`")
});