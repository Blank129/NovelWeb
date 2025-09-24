import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import FeaturedNovels from '../components/FeaturedNovels';
import Categories from '../components/Categories';
import PopularNovels from '../components/PopularNovels';
import RecentUpdates from '../components/RecentUpdates';
import { Novel } from '../App';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleNovelSelect = (novel: Novel) => {
    navigate(`/novel/${novel.id}`);
  };

  return (
    <>
      <Hero onNovelSelect={handleNovelSelect} />
      <FeaturedNovels onNovelSelect={handleNovelSelect} />
      <Categories />
      <PopularNovels onNovelSelect={handleNovelSelect} />
      <RecentUpdates onNovelSelect={handleNovelSelect} />
    </>
  );
};

export default HomePage;