require("dotenv").config(); // Load env first!

const express = require("express");
const cors = require("cors");
const { connection } = require("./config/config");
const { userRoute } = require("./route/user.route");
const { authenticate } = require("./middleware/authenticate.middleware");
const { teacherRouter } = require("./route/teacher.router");
const { slotRoute } = require("./route/slot.route");

const app = express();
const port = process.env.PORT || 5000; // Must be named exactly PORT for Render

// Middleware
app.use(cors());
app.use(express.json());

// Base route
app.get("/", (req, res) => {
  res.send("Welcome to Tutor API");
});

// Routes
app.use(userRoute);
app.use(authenticate); // Protect routes after this
app.use("/teacher", teacherRouter);
app.use(slotRoute);

// Start server
app.listen(port, async () => {
  try {
    await connection;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
  console.log("Server listening on port", port);
});
