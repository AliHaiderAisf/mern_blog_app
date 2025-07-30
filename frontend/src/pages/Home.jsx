import PostForm from '../components/Posts/PostForm';
import PostList from '../components/Posts/PostList';

export default function Home({ user }) {
  return (
    <div className="max-w-6xl mx-auto mt-6">
      {user && !user.isAdmin && <PostForm onPost={() => window.location.reload()} />}
      <PostList />
    </div>
  );
}