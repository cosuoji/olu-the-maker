import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, required: true }, // For clean SEO URLs
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String }], // Array of URLs (Cloudinary/S3)
    category: {
      type: String,
      enum: ["Shoe", "Magazine", "Accessory"],
      required: true,
    },

    // NEW: Status for "Limited Edition" or "Archive" labels
    status: {
      type: String,
      enum: ["Available", "Pre-Order", "Sold Out", "Archived"],
      default: "Available",
    },

    // Shoe Specifics
    shoeDetails: {
      style: [{ type: String }], // Changed to Array
      material: [{ type: String }], // Changed to Array
      color: [{ type: String }], // Changed to Array
      construction: [{ type: String }], // Changed to Array
      soles: [{ type: String }], // Changed to Array
      last: [{ type: String }], // Changed to Array
      sizes: [Number],
      width: [{ type: String }], // Changed to Array
      isBespoke: { type: Boolean, default: false },
      leadTime: { type: String, default: "4-6 weeks" },
    },

    // Magazine Specifics
    magazineDetails: {
      issueNumber: { type: Number },
      pages: { type: Number }, // New
      month: { type: String }, // New (e.g., "September")
      year: { type: Number }, // New (e.g., 2026)
      isDigital: { type: Boolean, default: false },
      fileUrl: { type: String },
      coverImage: { type: String },
      excerpt: { type: String },

      // Linked to your Blog model
      articles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Blog",
        },
      ],
    },

    stock: { type: Number, default: 0 },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
    // This allows the frontend to easily check if it's a magazine or shoe
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Virtual to check if item is currently in stock
productSchema.virtual("isAvailable").get(function () {
  return this.stock > 0 || this.shoeDetails.isBespoke;
});

const Product = mongoose.model("Product", productSchema);
export default Product;
