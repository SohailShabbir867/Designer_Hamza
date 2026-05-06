import { Router } from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import path from "path";
import Design from "../models/Design.js";

const router = Router();

// ── Cloudinary config ──
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ── Multer config with Cloudinary ──
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "designer_hamza",
    allowed_formats: ["jpg", "png", "jpeg", "webp", "gif", "svg", "avif"],
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB max
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
      image: req.file.path, // Cloudinary secure URL
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

    // Remove the image from Cloudinary
    if (design.image && design.image.includes("cloudinary.com")) {
      // Extract public ID from URL: e.g., https://res.cloudinary.com/.../designer_hamza/filename.jpg
      const parts = design.image.split("/");
      const filename = parts.pop().split(".")[0];
      const folder = parts.pop();
      const publicId = `${folder}/${filename}`;
      
      await cloudinary.uploader.destroy(publicId);
    }

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
