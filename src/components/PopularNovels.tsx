import React from 'react';
import { Star, TrendingUp, Eye } from 'lucide-react';
import { Novel } from '../App';

interface PopularNovelsProps {
  onNovelSelect: (novel: Novel) => void;
}

const PopularNovels: React.FC<PopularNovelsProps> = ({ onNovelSelect }) => {
  const novels: Novel[] = [
    {
      id: '6',
      title: 'Demon Slayer Academy',
      author: 'Koyoharu Gotouge',
      coverUrl: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Young warriors train to become demon slayers in this action-packed academy story.',
      genre: ['Action', 'Supernatural', 'School'],
      rating: 4.4,
      chapters: 189,
      status: 'ongoing',
      lastUpdated: '6 hours ago',
      views: 1847293,
      tags: ['Demons', 'Training', 'Brotherhood']
    },
    {
      id: '7',
      title: 'Cultivation Chronicles',
      author: 'Er Gen',
      coverUrl: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Follow the journey of a young cultivator as he rises through the ranks to achieve immortality.',
      genre: ['Cultivation', 'Xianxia', 'Adventure'],
      rating: 4.3,
      chapters: 1247,
      status: 'ongoing',
      lastUpdated: '12 hours ago',
      views: 3247851,
      tags: ['Immortality', 'Power', 'Revenge']
    },
    {
      id: '8',
      title: 'Magic Academy Elite',
      author: 'J.K. Sterling',
      coverUrl: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'A young mage discovers ancient secrets while attending the most prestigious magic academy.',
      genre: ['Magic', 'School', 'Mystery'],
      rating: 4.2,
      chapters: 234,
      status: 'ongoing',
      lastUpdated: '1 day ago',
      views: 1923847,
      tags: ['Magic School', 'Ancient Secrets', 'Friendship']
    }
  ];

  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="flex items-center space-x-2 text-orange-400 mb-2">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm font-medium uppercase tracking-wide">Trending Now</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Most Popular
            </h2>
          </div>
          <button className="text-orange-400 hover:text-orange-300 font-medium transition-colors">
            View All →
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {novels.map((novel, index) => (
            <div
              key={novel.id}
              onClick={() => onNovelSelect(novel)}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
            >
              <div className="flex">
                <div className="flex-shrink-0 relative">
                  <img
                    src={novel.coverUrl}
                    alt={novel.title}
                    className="w-32 h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded">
                    #{index + 1}
                  </div>
                </div>
                
                <div className="flex-1 p-6">
                  <h3 className="text-white font-bold text-xl mb-2 group-hover:text-orange-400 transition-colors">
                    {novel.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">by {novel.author}</p>
                  
                  <div className="flex items-center space-x-4 mb-3 text-sm">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-white">{novel.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-400">
                      <Eye className="h-4 w-4" />
                      <span>{Math.floor(novel.views / 1000)}K views</span>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      novel.status === 'ongoing' ? 'bg-green-600 text-green-100' :
                      novel.status === 'completed' ? 'bg-blue-600 text-blue-100' :
                      'bg-yellow-600 text-yellow-100'
                    }`}>
                      {novel.status.toUpperCase()}
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                    {novel.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {novel.genre.map((genre) => (
                      <span key={genre} className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                        {genre}
                      </span>
                    ))}
                  </div>
                  
                  <div className="text-sm text-gray-400">
                    {novel.chapters} chapters • Updated {novel.lastUpdated}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularNovels;