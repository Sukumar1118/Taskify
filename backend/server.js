const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
const app = express();
const server = http.createServer(app);

connectDB();
app.use(cors());
app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tasks", require("./routes/tasks"));
app.get("/", (req, res) => res.send({ ok: true }));
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log("Server on", PORT));
