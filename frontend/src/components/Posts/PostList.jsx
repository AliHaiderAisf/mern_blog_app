import { useEffect, useState } from 'react';
import { getPosts } from '../../api/api';
import Spinner from '../Spinner';
import PostItem from './PostItem';
import ReactPaginate from 'react-paginate';

const POSTS_PER_PAGE = 16; // 4x4 grid

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    getPosts().then(res => {
      setPosts(res.data);
      setLoading(false);
    });
  }, []);

  const pageCount = Math.ceil(posts.length / POSTS_PER_PAGE);
  const offset = currentPage * POSTS_PER_PAGE;
  const currentPosts = posts.slice(offset, offset + POSTS_PER_PAGE);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <Spinner />;
  if (!posts.length) return <div>No posts found.</div>;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
        {currentPosts.map(post => <PostItem key={post._id} post={post} />)}
      </div>
      <div className="flex justify-center mt-[20vh] mb-10">
        <ReactPaginate
          previousLabel={'← Prev'}
          nextLabel={'Next →'}
          breakLabel={'...'}
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName={'flex gap-2'}
          pageClassName={'px-3 py-1 border rounded'}
          activeClassName={'pagination-active'}
          previousClassName={'px-3 py-1 border rounded'}
          nextClassName={'px-3 py-1 border rounded'}
          disabledClassName={'opacity-50'}
        />
      </div>
    </div>
  );
}