import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Admin from './pages/Admin';
import PostDetail from './components/Posts/PostDetail';

function App() {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return { ...payload, isAdmin: payload.isAdmin };
    } catch { return null; }
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <BrowserRouter>
      <nav className="bg-[#ff9900] text-white p-4 flex justify-between">
        <Link to="/" className="font-bold text-black">Blog App</Link>
        <div>
          {user && user.isAdmin && <Link to="/admin" className="mr-4">Admin</Link>}
          {user ? (
            <button onClick={handleLogout} className='text-black'>Logout</button>
          ) : (
            <>
              <Link to="/login" className="mr-2">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="*" element={<div className="p-8">404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;