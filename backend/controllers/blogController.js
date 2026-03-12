import Blog from "../models/blogModel.js";

// @desc    Create a blog post
export const createBlog = async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json({ success: true, data: blog });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Get all blogs with pagination
// @desc    Get all blogs with pagination and category filtering
// @desc    Get all blogs with pagination and category filtering
export const getBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const category = req.query.category;

    // 1. ALWAYS fetch the main featured article (ignoring filters)
    const featuredBlog = await Blog.findOne({ featured: true })
      .populate("magazineRef", "name slug images")
      .sort({ publishedAt: -1 });

    // 2. Build the query object for the rest of the archive grid
    let query = {};
    if (category) {
      query.category = category;
    }

    // Optional but recommended: Prevent the featured article from duplicating in the grid below
    if (featuredBlog) {
      query._id = { $ne: featuredBlog._id };
    }

    // 3. Fetch the filtered/paginated articles
    const blogs = await Blog.find(query)
      .populate("magazineRef", "name slug images")
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Blog.countDocuments(query);

    // 4. Send the featured blog back as a separate piece of data
    res.json({
      featured: featuredBlog,
      blogs,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Get single blog & increment views
export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { slug: req.params.slug },
      { $inc: { views: 1 } },
      { new: true },
    ).populate("magazineRef");

    if (!blog) return res.status(404).json({ error: "Post not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Search blogs
export const searchBlogs = async (req, res) => {
  try {
    const { q } = req.query;
    const blogs = await Blog.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
      ],
    }).limit(10);
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Delete blog
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findOneAndDelete({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ error: "Post not found" });
    res.json({ success: true, message: "Archive entry removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
