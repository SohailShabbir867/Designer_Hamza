import mongoose from "mongoose";

const designSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: 120,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: 1000,
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    viewUrl: {
      type: String,
      trim: true,
      default: "",
    },
    technologies: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      enum: [
        "Branding",
        "Social Media",
        "Ebook",
        "Workbook",
        "Flyer",
        "Poster",
        "Brochure",
        "Company Profile",
        "Lead Magnet",
        "Planner",
        "Other",
      ],
      default: "Other",
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Design = mongoose.model("Design", designSchema);

export default Design;
