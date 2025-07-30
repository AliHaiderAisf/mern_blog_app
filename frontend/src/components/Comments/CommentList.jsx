import { useEffect, useState } from 'react';
import { getComments, addComment } from '../../api/api';
import { FaCommentDots } from 'react-icons/fa';

export default function CommentList({ postId }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchComments = () => {
    getComments(postId).then(res => setComments(res.data));
  };

  useEffect(() => { fetchComments(); }, [postId]);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    await addComment(postId, { content });
    setContent('');
    fetchComments();
    setLoading(false);
  };

  return (
    <div className="mt-4">
      <h4 className="font-bold mb-2 flex items-center">
        <FaCommentDots className="mr-2" /> Comments
      </h4>
      <form onSubmit={handleSubmit} className="mb-2">
        <textarea className="w-full p-2 border rounded" value={content}
          onChange={e => setContent(e.target.value)} placeholder="Add a comment..." required />
        <button className="bg-[#ff9900] text-black px-4 py-1 rounded mt-1" disabled={loading}>
          {loading ? 'Posting...' : 'Comment'}
        </button>
      </form>
      {comments.map(c => (
        <div key={c._id} className="border-b py-2">
          <div className="text-sm font-semibold">{c.user?.name}</div>
          <div className="text-gray-700">{c.content}</div>
          <div className="text-xs text-gray-500">{new Date(c.createdAt).toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
}