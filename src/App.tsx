import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RankingPage from './pages/RankingPage';
import NovelDetailPage from './pages/NovelDetailPage';
import NovelReaderPage from './pages/NovelReaderPage';

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
        <Route path="/novel/:id" element={<NovelDetailPage />} />
        <Route path="/novel/:id/chapter/:chapter" element={<NovelReaderPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;