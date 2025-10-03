import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './page/HomePage';
import RankingPage from './page/RankingPage';
import NovelDetailPage from './page/NovelDetailPage';
import NovelReaderPage from './page/NovelReaderPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';


export interface Novel {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  description: string;
  genre: string[];
  rating: number;
  chapters: number;
  status: 'ongoing' | 'completed' | 'hiatus';
  lastUpdated: string;
  views: number;
  tags: string[];
}

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/novel/:title" element={<NovelDetailPage />} />
        <Route path="/novel/:title/chapter/:chapter" element={<NovelReaderPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;