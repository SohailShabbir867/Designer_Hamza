import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import Design from "../models/Design.js";

const router = Router();

// ── Multer config — store uploaded images in /uploads ──
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const dir = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB max
  fileFilter: (_req, file, cb) => {
    const allowedExts = /jpeg|jpg|png|webp|gif|bmp|svg|tiff|avif/;
    const allowedMimes = /^image\//;
    const ext = allowedExts.test(path.extname(file.originalname).toLowerCase());
    const mime = allowedMimes.test(file.mimetype);
    if (ext || mime) return cb(null, true);
    cb(new Error("Only image files are allowed (jpg, png, webp, gif, svg, etc.)"));
  },
});

// Helper to handle multer errors gracefully
const handleUpload = (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  });
};

// ── Auth middleware — checks admin password ──
const requireAdmin = (req, res, next) => {
  const password = req.headers["x-admin-password"];
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Unauthorized — invalid password" });
  }
  next();
};

// ── GET /api/designs — Public: fetch all designs ──
router.get("/", async (_req, res) => {
  try {
    const designs = await Design.find().sort({ createdAt: -1 });
    res.json(designs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/designs/:id — Public: fetch single design ──
router.get("/:id", async (req, res) => {
  try {
    const design = await Design.findById(req.params.id);
    if (!design) return res.status(404).json({ error: "Design not found" });
    res.json(design);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /api/designs — Admin: create new design ──
router.post("/", requireAdmin, handleUpload, async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "Image is required" });

    const { title, description, technologies, category, viewUrl } = req.body;

    const design = await Design.create({
      title,
      description,
      image: `/uploads/${req.file.filename}`,
      viewUrl: viewUrl || "",
      technologies: technologies
        ? JSON.parse(technologies)
        : [],
      category: category || "Other",
    });

    res.status(201).json(design);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ── DELETE /api/designs/:id — Admin: delete a design ──
router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const design = await Design.findById(req.params.id);
    if (!design) return res.status(404).json({ error: "Design not found" });

    // Remove the image file
    const imgPath = path.join(process.cwd(), design.image);
    if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);

    await Design.findByIdAndDelete(req.params.id);
    res.json({ message: "Design deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /api/designs/:id/like — Public: like a design ──
router.post("/:id/like", async (req, res) => {
  try {
    const design = await Design.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    if (!design) return res.status(404).json({ error: "Design not found" });
    res.json({ likes: design.likes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /api/auth/verify — Verify admin password ──
router.post("/auth/verify", (req, res) => {
  const { password } = req.body;
  if (password === process.env.ADMIN_PASSWORD) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, error: "Invalid password" });
  }
});

export default router;
