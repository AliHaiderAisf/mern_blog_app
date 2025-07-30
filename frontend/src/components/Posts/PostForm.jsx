import { useState } from 'react';
import { createPost } from '../../api/api';

export default function PostForm({ onPost }) {
  const [form, setForm] = useState({ title: '', content: '', image: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');

  const handleChange = e => {
    if (e.target.name === 'image') {
      setForm({ ...form, image: e.target.files[0] });
      setFileName(e.target.files[0]?.name || '');
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const data = new FormData();
    data.append('title', form.title);
    data.append('content', form.content);
    if (form.image) data.append('image', form.image);
    try {
      await createPost(data);
      setForm({ title: '', content: '', image: null });
      setFileName('');
      onPost();
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4 ">
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <input
        name="title"
        placeholder="Title"
        className="w-full mb-2 p-2 border rounded outline-none"
        value={form.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="content"
        placeholder="Content"
        className="w-full mb-2 p-2 border rounded outline-none"
        value={form.content}
        onChange={handleChange}
        required
      />
      <div className="flex flex-col items-center gap-2 mb-2">
        <label className="inline-block bg-[#ff9900] text-white py-2 rounded-full px-20 cursor-pointer hover:bg-orange-600">
          Choose Image
          <input
            type="file"
            name="image"
            accept="image/*"
            className="hidden"
            onChange={handleChange}
          />
        </label>
        {fileName && (
          <span className="text-sm text-gray-700">{fileName}</span>
        )}
        <button
          className="bg-black text-white px-[90px] py-2 rounded-full mt-2"
          disabled={loading}
        >
          {loading ? 'Posting...' : 'Create Post'}
        </button>
      </div>
    </form>
  );
}