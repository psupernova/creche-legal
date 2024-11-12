import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CityPage from './pages/CityPage';
import NeighborhoodPage from './pages/NeighborhoodPage';
import BlogPost from './pages/BlogPost';
import AllPosts from './pages/AllPosts';
import Sitemap from './pages/Sitemap';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cidade/:citySlug" element={<CityPage />} />
        <Route path="/cidade/:citySlug/:neighborhood" element={<NeighborhoodPage />} />
        <Route path="/blog" element={<AllPosts />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/sitemap.xml" element={<Sitemap />} />
      </Routes>
    </div>
  );
}

export default App;