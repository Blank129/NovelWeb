import React from 'react';
import { Star, Eye, Clock } from 'lucide-react';
import { Novel } from '../App';

interface FeaturedNovelsProps {
  onNovelSelect: (novel: Novel) => void;
}

const FeaturedNovels: React.FC<FeaturedNovelsProps> = ({ onNovelSelect }) => {
  const novels: Novel[] = [
    {
      id: '2',
      title: 'Solo Leveling',
      author: 'Chugong',
      coverUrl: 'https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'E-rank hunter Jinwoo Sung has no money, no talent, and no prospects to speak of—until he\'s selected by a mysterious System.',
      genre: ['Action', 'Fantasy', 'Adventure'],
      rating: 4.9,
      chapters: 270,
      status: 'completed',
      lastUpdated: '1 day ago',
      views: 5247892,
      tags: ['Leveling', 'System', 'OP MC']
    },
    {
      id: '3',
      title: 'Omniscient Reader',
      author: 'Sing Shong',
      coverUrl: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Dokja was the sole reader of a web novel for years. When the novel becomes reality, he\'s the only one who knows how the world will end.',
      genre: ['Fantasy', 'Apocalypse', 'Drama'],
      rating: 4.7,
      chapters: 551,
      status: 'completed',
      lastUpdated: '3 days ago',
      views: 3891247,
      tags: ['Apocalypse', 'Smart MC', 'Unique']
    },
    {
      id: '4',
      title: 'The Beginning After The End',
      author: 'TurtleMe',
      coverUrl: 'https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'King Grey is unrivaled in a world governed by martial ability, until he\'s reborn into a new world filled with magic and monsters.',
      genre: ['Fantasy', 'Reincarnation', 'Magic'],
      rating: 4.6,
      chapters: 420,
      status: 'ongoing',
      lastUpdated: '5 hours ago',
      views: 2983741,
      tags: ['Reincarnation', 'Magic', 'Academy']
    },
    {
      id: '5',
      title: 'Tower of God',
      author: 'SIU',
      coverUrl: 'https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Bam enters the Tower to chase after his dear friend Rachel, but to climb the Tower he will need to fight others.',
      genre: ['Action', 'Fantasy', 'Adventure'],
      rating: 4.5,
      chapters: 580,
      status: 'ongoing',
      lastUpdated: '1 week ago',
      views: 4156829,
      tags: ['Tower', 'Friendship', 'Complex Plot']
    }
  ];

  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Featured Novels
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover the most popular and highly-rated novels that readers can't stop talking about
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {novels.map((novel) => (
            <div
              key={novel.id}
              onClick={() => onNovelSelect(novel)}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
            >
              <div className="relative">
                <img
                  src={novel.coverUrl}
                  alt={novel.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-3 right-3">
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    novel.status === 'ongoing' ? 'bg-green-600 text-green-100' :
                    novel.status === 'completed' ? 'bg-blue-600 text-blue-100' :
                    'bg-yellow-600 text-yellow-100'
                  }`}>
                    {novel.status.toUpperCase()}
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex items-center justify-between text-white text-sm">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span>{novel.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{Math.floor(novel.views / 1000)}K</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-orange-400 transition-colors line-clamp-2">
                  {novel.title}
                </h3>
                <p className="text-gray-400 text-sm mb-2">by {novel.author}</p>
                <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                  {novel.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {novel.genre.slice(0, 2).map((genre) => (
                    <span key={genre} className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                      {genre}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>{novel.chapters} chapters</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{novel.lastUpdated}</span>
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

export default FeaturedNovels;