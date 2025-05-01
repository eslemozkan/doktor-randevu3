import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BlogList from './pages/BlogList';
import BlogForm from './pages/BlogForm';

function App() {
  const [activeComponent, setActiveComponent] = useState('randevular');

  return (
    <Router>
      <div className="min-h-screen w-full bg-gradient-to-br from-[#EFF5FB] to-white flex">
        {/* Sol Menü */}
        <div className="w-80 bg-white shadow-lg p-8">
          <h1 className="text-3xl font-bold text-[#1E2E62] mb-10 text-center">Admin Panel</h1>
          <nav className="space-y-3">
            <button
              onClick={() => setActiveComponent('randevular')}
              className={`w-full text-left px-6 py-3 rounded-xl transition-all duration-300 ${
                activeComponent === 'randevular'
                  ? 'bg-gradient-to-r from-[#1E2E62] to-[#394C8C] text-white shadow-md'
                  : 'text-[#1E2E62] hover:bg-[#EFF5FB]'
              }`}
            >
              Randevular
            </button>
            <button
              onClick={() => setActiveComponent('videolar')}
              className={`w-full text-left px-6 py-3 rounded-xl transition-all duration-300 ${
                activeComponent === 'videolar'
                  ? 'bg-gradient-to-r from-[#1E2E62] to-[#394C8C] text-white shadow-md'
                  : 'text-[#1E2E62] hover:bg-[#EFF5FB]'
              }`}
            >
              Videolar
            </button>
            <Link
              to="/blogs"
              onClick={() => setActiveComponent('blog')}
              className={`w-full text-left px-6 py-3 rounded-xl transition-all duration-300 ${
                activeComponent === 'blog'
                  ? 'bg-gradient-to-r from-[#1E2E62] to-[#394C8C] text-white shadow-md'
                  : 'text-[#1E2E62] hover:bg-[#EFF5FB]'
              }`}
            >
              Blog Yazıları
            </Link>
          </nav>
        </div>

        {/* Ana İçerik */}
        <div className="flex-1 p-10">
          <Routes>
            <Route path="/blogs" element={<BlogList />} />
            <Route path="/blogs/new" element={<BlogForm />} />
            <Route path="/blogs/edit/:id" element={<BlogForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App; 