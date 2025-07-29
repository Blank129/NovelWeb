import React from 'react';
import { Play, Star, TrendingUp } from 'lucide-react';
import { Novel } from '../App';

interface HeroProps {
  onNovelSelect: (novel: Novel) => void;
}

const Hero: React.FC<HeroProps> = ({ onNovelSelect }) => {
  const featuredNovel: Novel = {
    id: '1',
    title: 'The Legend of the Northern Blade',
    author: 'Woo-Gak',
    coverUrl: 'https://images.pexels.com/photos/694740/pexels-photo-694740.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'When the world was plunged into darkness martial artists gathered to form the Northern Heavenly Sect. With the hope of humanity on their shoulders, they managed to drive the darkness away.',
    genre: ['Action', 'Martial Arts', 'Adventure'],
    rating: 4.8,
    chapters: 156,
    status: 'ongoing',
    lastUpdated: '2 hours ago',
    views: 2847592,
    tags: ['Cultivation', 'Strong MC', 'Revenge']
  };

  return (
    <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-blue-500/20"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-orange-400">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm font-medium uppercase tracking-wide">Featured Novel</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
              {featuredNovel.title}
            </h1>
            
            <p className="text-lg text-gray-300 leading-relaxed max-w-lg">
              {featuredNovel.description}
            </p>
            
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-white font-medium">{featuredNovel.rating}</span>
                <span className="text-gray-400">({featuredNovel.views.toLocaleString()} views)</span>
              </div>
              <div className="text-gray-400">
                {featuredNovel.chapters} Chapters
              </div>
              <div className="px-2 py-1 bg-green-600 text-green-100 rounded text-xs font-medium">
                {featuredNovel.status.toUpperCase()}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {featuredNovel.genre.map((genre) => (
                <span key={genre} className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">
                  {genre}
                </span>
              ))}
            </div>
            
            <div className="flex items-center space-x-4 pt-4">
              <button 
                onClick={() => onNovelSelect(featuredNovel)}
                className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
              >
                <Play className="h-5 w-5" />
                <span>Start Reading</span>
              </button>
              <button className="flex items-center space-x-2 border border-gray-600 hover:border-gray-500 px-6 py-3 rounded-lg font-medium transition-colors">
                <span>Add to Library</span>
              </button>
            </div>
          </div>
          
          {/* Cover Image */}
          <div className="relative">
            <div className="relative transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <img
                src={featuredNovel.coverUrl}
                alt={featuredNovel.title}
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 bg-gray-800 border border-gray-700 rounded-xl p-4 shadow-xl">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-bold text-lg">{featuredNovel.rating}</div>
                  <div className="text-gray-400 text-sm">Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;