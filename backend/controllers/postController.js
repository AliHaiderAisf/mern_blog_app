import Post from '../models/Post.js';
import Comment from '../models/Comment.js';

// Create Post
export const createPost = async (req, res) => {
  const { title, content } = req.body;
  const image = req.file ? req.file.path : null; // Cloudinary returns .path as URL
  try {
    const post = new Post({
      title,
      content,
      image,
      author: req.user._id
    });
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Get Approved Posts (for users) with comments count
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({ status: 'approved' })
      .populate('author', 'name')
      .sort({ createdAt: -1 });

    // For each post, get comments count
    const postsWithComments = await Promise.all(
      posts.map(async (post) => {
        const commentsCount = await Comment.countDocuments({ post: post._id });
        return {
          ...post.toObject(),
          commentsCount,
        };
      })
    );

    res.json(postsWithComments);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Get Single Post (and increment views)
export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name');
    if (!post) return res.status(404).json({ msg: 'Post not found' });
    post.views += 1;
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Like Post
export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });
    if (post.likes.includes(req.user._id)) {
      post.likes.pull(req.user._id);
    } else {
      post.likes.push(req.user._id);
      post.dislikes.pull(req.user._id);
    }
    await post.save();
    res.json({ likes: post.likes.length, dislikes: post.dislikes.length });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Dislike Post
export const dislikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });
    if (post.dislikes.includes(req.user._id)) {
      post.dislikes.pull(req.user._id);
    } else {
      post.dislikes.push(req.user._id);
      post.likes.pull(req.user._id);
    }
    await post.save();
    res.json({ likes: post.likes.length, dislikes: post.dislikes.length });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Get Pending Posts (for admin)
export const getPendingPosts = async (req, res) => {
  try {
    const posts = await Post.find({ status: 'pending' }).populate('author', 'name');
    res.json(posts);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Approve Post (for admin)
export const approvePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
    res.json(post);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Reject Post (for admin)
export const rejectPost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
    res.json(post);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Get All Posts (for admin dashboard) - NO comments count
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'name').sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Delete Post (for admin dashboard)
export const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};