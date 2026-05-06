import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Lock,
  Upload,
  Trash2,
  Plus,
  X,
  Heart,
  Image as ImageIcon,
  LogOut,
  Loader2,
  Eye,
  Home,
  Link as LinkIcon,
} from "lucide-react";
import { API_BASE } from "../data/constants";

const CATEGORIES = [
  "Branding", "Social Media", "Ebook", "Workbook", "Flyer",
  "Poster", "Brochure", "Company Profile", "Lead Magnet", "Planner", "Other",
];

const TOOLS = [
  "Adobe Photoshop", "Adobe Illustrator", "Canva",
  "Adobe InDesign", "Figma", "CapCut", "Premiere Pro",
];

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Other",
    technologies: [],
    image: null,
    viewUrl: "",
  });

  useEffect(() => {
    const session = sessionStorage.getItem("admin_auth");
    if (session === "true") setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    if (isAuthenticated) fetchDesigns();
  }, [isAuthenticated]);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");
    try {
      const res = await fetch(`${API_BASE}/designs/auth/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setIsAuthenticated(true);
        sessionStorage.setItem("admin_auth", "true");
        sessionStorage.setItem("admin_password", password);
      } else {
        setAuthError("Invalid password. Access denied.");
      }
    } catch {
      setAuthError("Server unavailable. Make sure the backend is running.");
    } finally {
      setAuthLoading(false);
    }
  };

  const fetchDesigns = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/designs`);
      if (res.ok) setDesigns(await res.json());
    } catch (err) {
      console.error("Failed to fetch:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const toggleTech = (tech) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.includes(tech)
        ? prev.technologies.filter((t) => t !== tech)
        : [...prev.technologies, tech],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      setNotification({ type: "error", message: "Please upload an image" });
      return;
    }
    if (!formData.title.trim()) {
      setNotification({ type: "error", message: "Title is required" });
      return;
    }

    setUploading(true);
    const adminPassword = sessionStorage.getItem("admin_password");

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("technologies", JSON.stringify(formData.technologies));
    data.append("image", formData.image);
    data.append("viewUrl", formData.viewUrl);

    try {
      const res = await fetch(`${API_BASE}/designs`, {
        method: "POST",
        headers: { "x-admin-password": adminPassword },
        body: data,
      });
      if (res.ok) {
        setNotification({ type: "success", message: "Design posted successfully! 🎉" });
        setFormData({ title: "", description: "", category: "Other", technologies: [], image: null, viewUrl: "" });
        setPreviewImage(null);
        setShowForm(false);
        fetchDesigns();
      } else {
        const err = await res.json();
        setNotification({ type: "error", message: err.error || "Failed to post design" });
      }
    } catch {
      setNotification({ type: "error", message: "Upload failed. Check your connection." });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    const adminPassword = sessionStorage.getItem("admin_password");
    try {
      const res = await fetch(`${API_BASE}/designs/${id}`, {
        method: "DELETE",
        headers: { "x-admin-password": adminPassword },
      });
      if (res.ok) {
        setNotification({ type: "success", message: "Design deleted" });
        setDesigns((prev) => prev.filter((d) => d._id !== id));
        setDeleteConfirm(null);
      } else {
        setNotification({ type: "error", message: "Failed to delete" });
      }
    } catch {
      setNotification({ type: "error", message: "Delete failed" });
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    sessionStorage.removeItem("admin_password");
    setIsAuthenticated(false);
    setPassword("");
  };

  // ── Password Gate ──
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-dark">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-accent/[0.04] rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-accent/[0.03] rounded-full blur-[100px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 w-full max-w-md p-8 mx-4 border rounded-2xl bg-dark-100 border-dark-200"
        >
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-accent/10">
            <Lock className="w-8 h-8 text-accent" />
          </div>

          <h1 className="mb-2 text-2xl font-bold text-center text-white font-display">
            Studio Access
          </h1>
          <p className="mb-8 text-sm text-center text-gray-500">
            Enter your password to access the design dashboard
          </p>

          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setAuthError(""); }}
                placeholder="Enter password"
                className="w-full px-4 py-3.5 text-sm rounded-xl bg-dark border border-dark-200 text-white placeholder-gray-600 focus:border-accent transition-all duration-300"
                autoFocus
              />
              {authError && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-xs text-red-400"
                >
                  {authError}
                </motion.p>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={authLoading || !password}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center w-full gap-2 py-3.5 text-sm font-semibold text-white rounded-xl bg-accent hover:bg-accent-dark disabled:opacity-50 transition-all duration-300 font-display"
            >
              {authLoading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Verifying...</>
              ) : (
                <><Lock className="w-4 h-4" /> Access Dashboard</>
              )}
            </motion.button>
          </form>

          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center w-full gap-2 mt-4 text-sm text-gray-500 transition-colors hover:text-white"
          >
            <Home className="w-4 h-4" /> Back to Portfolio
          </button>
        </motion.div>
      </div>
    );
  }

  // ── Dashboard ──
  return (
    <div className="min-h-screen bg-dark admin-panel">
      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-4 right-4 z-[200] px-6 py-3 text-sm font-medium rounded-xl shadow-2xl ${
              notification.type === "success" ? "bg-green-500/90 text-white" : "bg-red-500/90 text-white"
            }`}
          >
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="sticky top-0 z-50 border-b bg-dark/95 backdrop-blur-md border-dark-200">
        <div className="flex items-center justify-between px-4 py-4 mx-auto sm:px-6 max-w-7xl">
          <div>
            <h1 className="text-lg font-bold text-white font-display sm:text-xl">
              <span className="text-accent">Design</span> Studio
            </h1>
            <p className="text-[10px] text-gray-600 sm:text-xs">
              {designs.length} design{designs.length !== 1 ? "s" : ""} published
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1.5 px-3 py-2 text-xs text-gray-400 transition-colors border rounded-lg sm:gap-2 sm:px-4 sm:text-sm border-dark-200 hover:text-white hover:border-accent/30"
            >
              <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> View Site
            </button>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white transition-all duration-300 rounded-lg sm:gap-2 sm:px-4 sm:text-sm bg-accent hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/25"
            >
              <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> New Design
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-2 py-2 text-sm text-gray-500 transition-colors sm:px-3 hover:text-red-400"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 mx-auto sm:px-6 sm:py-8 max-w-7xl">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 rounded-full border-accent border-t-transparent animate-spin" />
          </div>
        ) : designs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-accent/10">
              <ImageIcon className="w-10 h-10 text-accent" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-white font-display">No Designs Yet</h3>
            <p className="mb-6 text-sm text-gray-500">Click &quot;New Design&quot; to post your first creation</p>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-lg bg-accent hover:bg-accent-dark transition-all font-display"
            >
              <Plus className="w-4 h-4" /> Post Your First Design
            </button>
          </motion.div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6">
            {designs.map((design, index) => (
              <motion.div
                key={design._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="relative overflow-hidden transition-all duration-300 border group rounded-xl bg-dark-100 border-dark-200 hover:border-accent/30"
              >
                <div className="relative h-44 overflow-hidden sm:h-48">
                  <img
                    src={design.image.startsWith("http") ? design.image : `${API_BASE.replace('/api', '')}${design.image}`}
                    alt={design.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-3 sm:p-4">
                  <h4 className="mb-1 text-xs font-bold text-white truncate font-display sm:text-sm">
                    {design.title}
                  </h4>
                  <p className="mb-2 text-[10px] text-gray-500 line-clamp-2 sm:text-xs">
                    {design.description}
                  </p>
                  {design.viewUrl && (
                    <a
                      href={design.viewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mb-2 text-[10px] text-accent hover:underline sm:text-xs"
                    >
                      <LinkIcon size={10} /> View Link
                    </a>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-gray-500">
                      <Heart size={13} />
                      <span className="text-[10px] sm:text-xs">{design.likes}</span>
                    </div>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-accent/10 text-accent sm:text-[10px] sm:px-2">
                      {design.category}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setDeleteConfirm(design._id)}
                  className="absolute p-1.5 text-gray-400 transition-all duration-300 rounded-lg opacity-0 sm:p-2 top-2 right-2 bg-dark/80 backdrop-blur-sm hover:text-red-400 hover:bg-red-500/20 group-hover:opacity-100"
                >
                  <Trash2 size={13} />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="w-full max-w-sm p-6 border rounded-2xl bg-dark-100 border-dark-200"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="mb-2 text-lg font-bold text-white font-display">Delete Design?</h3>
              <p className="mb-6 text-sm text-gray-400">This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 text-sm font-medium text-gray-300 border rounded-lg border-dark-200 hover:text-white transition-colors">Cancel</button>
                <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2.5 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* New Design Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-4 bg-black/80 overflow-y-auto"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-2xl p-5 my-8 border sm:p-6 rounded-2xl bg-dark-100 border-dark-200 lg:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-5 sm:mb-6">
                <h2 className="text-lg font-bold text-white font-display sm:text-xl">Post New Design</h2>
                <button onClick={() => setShowForm(false)} className="p-2 text-gray-400 transition-colors rounded-lg hover:text-white hover:bg-dark-200">
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {/* Image Upload */}
                <div>
                  <label className="block mb-1.5 text-xs font-medium text-gray-300 sm:mb-2 sm:text-sm">Design Image *</label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="relative flex flex-col items-center justify-center p-6 border-2 border-dashed cursor-pointer sm:p-8 rounded-xl border-dark-200 hover:border-accent/40 transition-colors"
                  >
                    {previewImage ? (
                      <div className="relative">
                        <img src={previewImage} alt="Preview" className="object-contain rounded-lg max-h-40 sm:max-h-48" />
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setPreviewImage(null); setFormData((prev) => ({ ...prev, image: null })); }}
                          className="absolute p-1 text-white rounded-full -top-2 -right-2 bg-red-500/80 hover:bg-red-500"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-7 h-7 mb-2 text-gray-500 sm:w-8 sm:h-8" />
                        <p className="text-xs text-gray-400 sm:text-sm">Click to upload your design</p>
                        <p className="text-[10px] text-gray-600 sm:text-xs">JPG, PNG, WebP or GIF (max 10MB)</p>
                      </>
                    )}
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block mb-1.5 text-xs font-medium text-gray-300 sm:mb-2 sm:text-sm">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g. Modern Ebook Cover Design"
                    className="w-full px-4 py-3 text-sm rounded-xl"
                    maxLength={120}
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block mb-1.5 text-xs font-medium text-gray-300 sm:mb-2 sm:text-sm">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your design..."
                    rows={3}
                    className="w-full px-4 py-3 text-sm rounded-xl"
                    maxLength={1000}
                  />
                </div>

                {/* View Design URL */}
                <div>
                  <label className="block mb-1.5 text-xs font-medium text-gray-300 sm:mb-2 sm:text-sm">
                    <LinkIcon size={12} className="inline mr-1.5 mb-0.5" />
                    View Design URL
                  </label>
                  <input
                    type="url"
                    value={formData.viewUrl}
                    onChange={(e) => setFormData((prev) => ({ ...prev, viewUrl: e.target.value }))}
                    placeholder="https://example.com/my-design"
                    className="w-full px-4 py-3 text-sm rounded-xl"
                  />
                  <p className="mt-1 text-[10px] text-gray-600 sm:text-xs">Visitors will see a &quot;View Design&quot; button linking here</p>
                </div>

                {/* Category */}
                <div>
                  <label className="block mb-1.5 text-xs font-medium text-gray-300 sm:mb-2 sm:text-sm">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-3 text-sm rounded-xl"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Technologies */}
                <div>
                  <label className="block mb-1.5 text-xs font-medium text-gray-300 sm:mb-2 sm:text-sm">Tools Used</label>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {TOOLS.map((tool) => (
                      <button
                        key={tool}
                        type="button"
                        onClick={() => toggleTech(tool)}
                        className={`px-2.5 py-1.5 text-[10px] sm:text-xs font-medium rounded-lg transition-all duration-200 ${
                          formData.technologies.includes(tool)
                            ? "bg-accent text-white border border-accent"
                            : "bg-dark text-gray-400 border border-dark-200 hover:border-accent/30"
                        }`}
                      >
                        {tool}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={uploading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center w-full gap-2 py-3 text-sm font-semibold text-white sm:py-3.5 rounded-xl bg-accent hover:bg-accent-dark disabled:opacity-50 transition-all duration-300 font-display"
                >
                  {uploading ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Uploading...</>
                  ) : (
                    <><Upload className="w-4 h-4" /> Post Design</>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
