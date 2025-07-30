import { useEffect, useState } from 'react';
import { getPost, likePost, dislikePost } from '../../api/api';
import { useParams } from 'react-router-dom';
import Spinner from '../Spinner';
import CommentList from '../Comments/CommentList';
import { FaThumbsUp, FaThumbsDown, FaShareAlt } from 'react-icons/fa';

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPost = () => {
    getPost(id).then(res => {
      setPost(res.data);
      setLoading(false);
    });
  };

  useEffect(() => { fetchPost(); }, [id]);

  const handleLike = async () => {
    await likePost(id);
    fetchPost();
  };

  const handleDislike = async () => {
    await dislikePost(id);
    fetchPost();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Post link copied!');
  };

  if (loading) return <Spinner />;
  if (!post) return <div>Post not found</div>;

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-2xl font-bold">{post.title}</h2>
      {post.image && (
        <img src={post.image} alt="" className="w-full h-64 object-cover my-2 rounded" />
      )}
      <div className="text-gray-600 text-sm">
        By {post.author?.name} | {new Date(post.createdAt).toLocaleString()} | {post.views} views
      </div>
      <div className="my-2">{post.content}</div>
      <div className="flex items-center gap-6 mt-2">
        <button onClick={handleLike} className="flex items-center text-blue-600">
          <FaThumbsUp className="mr-1" /> {post.likes.length}
        </button>
        <button onClick={handleDislike} className="flex items-center text-red-600">
          <FaThumbsDown className="mr-1" /> {post.dislikes.length}
        </button>
        <button onClick={handleShare} className="flex items-center text-green-600">
          <FaShareAlt className="mr-1" /> Share
        </button>
      </div>
      <CommentList postId={id} />
    </div>
  );
}