import express from 'express';
import auth from '../middlewares/authMiddleware.js';
import admin from '../middlewares/adminMiddleware.js';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: 'dem2mmdqy',
  api_key: '673262974351889',
  api_secret: 'pNe85QMbr-fAUT3U_pxVmxfG1x0',
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'blog_images',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});
const upload = multer({ storage });

import {
  createPost, getPosts, getPost, likePost, dislikePost,
  getPendingPosts, approvePost, rejectPost,
  getAllPosts, deletePost
} from '../controllers/postController.js';

const router = express.Router();

router.post('/', auth, upload.single('image'), createPost);
router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/:id/like', auth, likePost);
router.post('/:id/dislike', auth, dislikePost);

// Admin routes
router.get('/admin/pending', auth, admin, getPendingPosts);
router.put('/admin/approve/:id', auth, admin, approvePost);
router.put('/admin/reject/:id', auth, admin, rejectPost);

// **New admin routes**
router.get('/admin/all', auth, admin, getAllPosts);
router.delete('/admin/delete/:id', auth, admin, deletePost);

export default router;