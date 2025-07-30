import Comment from '../models/Comment.js';

export const addComment = async (req, res) => {
  const { content } = req.body;
  try {
    const comment = new Comment({
      post: req.params.postId,
      user: req.user._id,
      content
    });
    await comment.save();
    res.json(comment);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId, status: 'approved' })
      .populate('user', 'name')
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).send('Server error');
  }
};