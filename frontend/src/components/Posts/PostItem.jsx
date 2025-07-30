import { Link } from 'react-router-dom';
import { FaThumbsUp, FaThumbsDown, FaCommentDots } from 'react-icons/fa';

export default function PostItem({ post }) {
  return (
    <div className="bg-white rounded shadow p-3 flex flex-col h-64 min-h-[16rem] max-h-64">
      <Link to={`/post/${post._id}`}>
        <h3 className="text-lg font-bold line-clamp-2">{post.title}</h3>
      </Link>
      {post.image && (
        <img
          src={post.image}
          alt=""
          className="w-full h-28 object-cover my-2 rounded"
        />
      )}
      <div className="text-gray-600 text-xs mb-1">
        By {post.author?.name} | {new Date(post.createdAt).toLocaleDateString()}
      </div>
      <div className="flex-1 overflow-hidden text-sm text-gray-700 line-clamp-3">
        {post.content}
      </div>
      <div className="flex items-center gap-4 mt-2">
        <span className="flex items-center text-blue-600 text-sm">
          <FaThumbsUp className="mr-1" /> {post.likes.length}
        </span>
        <span className="flex items-center text-red-600 text-sm">
          <FaThumbsDown className="mr-1" /> {post.dislikes.length}
        </span>
        <span className="flex items-center text-gray-600 text-sm">
          <FaCommentDots className="mr-1" /> {post.commentsCount || 0}
        </span>
      </div>
    </div>
  );
}