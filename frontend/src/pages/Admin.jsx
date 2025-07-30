import { useEffect, useState } from 'react';
import { getAllPosts, deletePost, approvePost, rejectPost } from '../api/api';
import Spinner from '../components/Spinner';
import { FaEye, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Admin() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = () => {
    getAllPosts().then(res => {
      setPosts(res.data);
      setLoading(false);
    });
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleDelete = async id => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await deletePost(id);
      fetchPosts();
    }
  };

  const handleApprove = async id => {
    await approvePost(id);
    fetchPosts();
  };

  const handleReject = async id => {
    await rejectPost(id);
    fetchPosts();
  };

  if (loading) return <Spinner />;

  return (
    <div className="max-w-3xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <div className="mb-4">
        <span className="font-semibold">Total Posts:</span> {posts.length}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Author</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post._id} className="border-b">
                <td className="py-2 px-4">{post.title}</td>
                <td className="py-2 px-4">{post.author?.name}</td>
                <td className="py-2 px-4 capitalize">{post.status}</td>
                <td className="py-2 px-4">{new Date(post.createdAt).toLocaleString()}</td>
                <td className="py-2 px-4">
                  <div className="flex gap-6"> {/* gap-6 for large gap */}
                    <Link to={`/post/${post._id}`} className="text-blue-600 flex items-center" title="View">
                      <FaEye />
                    </Link>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="text-red-600 flex items-center"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                    {post.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleApprove(post._id)}
                          className="text-green-600 flex items-center"
                          title="Approve"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={() => handleReject(post._id)}
                          className="text-yellow-600 flex items-center"
                          title="Reject"
                        >
                          <FaTimes />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}