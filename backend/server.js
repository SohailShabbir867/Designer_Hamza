import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import connectDB from "./config/db.js";
import designRoutes from "./routes/designs.js";
import contactRoutes from "./routes/contact.js";

const app = express();
const PORT = process.env.PORT || 5000;

// ── Connect to MongoDB ──
await connectDB();

// ── Middleware ──
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Serve uploaded images statically ──
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// ── API Routes ──
app.use("/api/designs", designRoutes);
app.use("/api/contact", contactRoutes);

// ── Health check & Root ──
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.get("/", (_req, res) => {
  res.send("Designer Hamza API is running perfectly! 🚀");
});

// ── Start ──
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
