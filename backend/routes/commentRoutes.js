import express from 'express';
import auth from '../middlewares/authMiddleware.js';
import { addComment, getComments } from '../controllers/commentController.js';

const router = express.Router();

router.post('/:postId', auth, addComment);
router.get('/:postId', getComments);

export default router;