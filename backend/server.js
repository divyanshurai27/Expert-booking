require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const mongoose = require("mongoose");
const { Server } = require("socket.io");

const expertRoutes = require("./routes/expertRoutes");
const bookingroutes = require("./routes/bookingroutes");
const errorHandler = require("./middleware/errorMiddleware");

// 1️⃣ Create Express app FIRST
const app = express();

// 2️⃣ Create HTTP server
const server = http.createServer(app);

// 3️⃣ Setup Socket.io
const io = new Server(server, {
  cors: { origin: "*" }
});

// 4️⃣ Middleware
app.use(cors());
app.use(express.json());

// 5️⃣ Attach io to requests
app.use((req, res, next) => {
  req.io = io;
  next();
});

// 6️⃣ Routes
app.use("/api/experts", expertRoutes);
app.use("/api/bookings", bookingroutes);

// 7️⃣ Error middleware
app.use(errorHandler);

// 8️⃣ Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// 9️⃣ Start server
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});