import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedNovels from './components/FeaturedNovels';
import Categories from './components/Categories';
import PopularNovels from './components/PopularNovels';
import RecentUpdates from './components/RecentUpdates';
import Footer from './components/Footer';
import NovelReader from './components/NovelReader';
import NovelDetail from './components/NovelDetail';

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
  const [currentView, setCurrentView] = useState<'home' | 'novel' | 'reader'>('home');
  const [selectedNovel, setSelectedNovel] = useState<Novel | null>(null);
  const [currentChapter, setCurrentChapter] = useState(1);

  const handleNovelSelect = (novel: Novel) => {
    setSelectedNovel(novel);
    setCurrentView('novel');
  };

  const handleStartReading = (novel: Novel, chapter: number = 1) => {
    setSelectedNovel(novel);
    setCurrentChapter(chapter);
    setCurrentView('reader');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedNovel(null);
  };

  const handleBackToNovel = () => {
    if (selectedNovel) {
      setCurrentView('novel');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header onBackToHome={handleBackToHome} />
      
      {currentView === 'home' && (
        <>
          <Hero onNovelSelect={handleNovelSelect} />
          <FeaturedNovels onNovelSelect={handleNovelSelect} />
          <Categories />
          <PopularNovels onNovelSelect={handleNovelSelect} />
          <RecentUpdates onNovelSelect={handleNovelSelect} />
        </>
      )}

      {currentView === 'novel' && selectedNovel && (
        <NovelDetail 
          novel={selectedNovel} 
          onStartReading={handleStartReading}
          onBackToHome={handleBackToHome}
        />
      )}

      {currentView === 'reader' && selectedNovel && (
        <NovelReader 
          novel={selectedNovel}
          chapter={currentChapter}
          onBackToNovel={handleBackToNovel}
          onChapterChange={setCurrentChapter}
        />
      )}

      {currentView === 'home' && <Footer />}
    </div>
  );
}

export default App;