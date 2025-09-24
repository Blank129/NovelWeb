import React, { useState } from 'react';
import { Star, Eye, TrendingUp, Crown, Medal, Award, ChevronLeft, Filter } from 'lucide-react';
import { Novel } from '../App';

interface RankingPageProps {
  onNovelSelect: (novel: Novel) => void;
  onBackToHome: () => void;
}

const RankingPage: React.FC<RankingPageProps> = ({ onNovelSelect, onBackToHome }) => {
  const [activeCategory, setActiveCategory] = useState<'popular' | 'rating' | 'trending' | 'completed'>('popular');
  const [timeFilter, setTimeFilter] = useState<'daily' | 'weekly' | 'monthly' | 'all'>('weekly');

  const categories = [
    { id: 'popular', label: 'Most Popular', icon: Eye },
    { id: 'rating', label: 'Highest Rated', icon: Star },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'completed', label: 'Completed', icon: Award }
  ];

  const timeFilters = [
    { id: 'daily', label: 'Daily' },
    { id: 'weekly', label: 'Weekly' },
    { id: 'monthly', label: 'Monthly' },
    { id: 'all', label: 'All Time' }
  ];

  // Sample ranking data
  const getRankingData = () => {
    const baseNovels: Novel[] = [
      {
        id: '1',
        title: 'Solo Leveling',
        author: 'Chugong',
        coverUrl: 'https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'E-rank hunter Jinwoo Sung has no money, no talent, and no prospects to speak of—until he\'s selected by a mysterious System.',
        genre: ['Action', 'Fantasy', 'Adventure'],
        rating: 4.9,
        chapters: 270,
        status: 'completed',
        lastUpdated: '1 day ago',
        views: 8247892,
        tags: ['Leveling', 'System', 'OP MC']
      },
      {
        id: '2',
        title: 'The Beginning After The End',
        author: 'TurtleMe',
        coverUrl: 'https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'King Grey is unrivaled in a world governed by martial ability, until he\'s reborn into a new world filled with magic and monsters.',
        genre: ['Fantasy', 'Reincarnation', 'Magic'],
        rating: 4.8,
        chapters: 420,
        status: 'ongoing',
        lastUpdated: '5 hours ago',
        views: 7983741,
        tags: ['Reincarnation', 'Magic', 'Academy']
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
        views: 6891247,
        tags: ['Apocalypse', 'Smart MC', 'Unique']
      },
      {
        id: '4',
        title: 'Tower of God',
        author: 'SIU',
        coverUrl: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'Bam enters the Tower to chase after his dear friend Rachel, but to climb the Tower he will need to fight others.',
        genre: ['Action', 'Fantasy', 'Adventure'],
        rating: 4.6,
        chapters: 580,
        status: 'ongoing',
        lastUpdated: '1 week ago',
        views: 5156829,
        tags: ['Tower', 'Friendship', 'Complex Plot']
      },
      {
        id: '5',
        title: 'The Legend of the Northern Blade',
        author: 'Woo-Gak',
        coverUrl: 'https://images.pexels.com/photos/694740/pexels-photo-694740.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'When the world was plunged into darkness martial artists gathered to form the Northern Heavenly Sect.',
        genre: ['Action', 'Martial Arts', 'Adventure'],
        rating: 4.8,
        chapters: 156,
        status: 'ongoing',
        lastUpdated: '2 hours ago',
        views: 4847592,
        tags: ['Cultivation', 'Strong MC', 'Revenge']
      },
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
        views: 3847293,
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
        views: 2923847,
        tags: ['Magic School', 'Ancient Secrets', 'Friendship']
      },
      {
        id: '9',
        title: 'The Immortal Swordsman',
        author: 'Chen Dong',
        coverUrl: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'A legendary swordsman returns from death to seek revenge.',
        genre: ['Martial Arts', 'Revenge'],
        rating: 4.6,
        chapters: 892,
        status: 'ongoing',
        lastUpdated: '15 minutes ago',
        views: 2847592,
        tags: ['Sword', 'Revenge', 'Immortal']
      },
      {
        id: '10',
        title: 'System Administrator',
        author: 'Code Master',
        coverUrl: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'A programmer gets a system that lets him admin reality.',
        genre: ['Sci-Fi', 'System'],
        rating: 4.4,
        chapters: 445,
        status: 'ongoing',
        lastUpdated: '1 hour ago',
        views: 2723847,
        tags: ['System', 'Programming', 'OP MC']
      }
    ];

    // Sort based on active category
    switch (activeCategory) {
      case 'popular':
        return baseNovels.sort((a, b) => b.views - a.views);
      case 'rating':
        return baseNovels.sort((a, b) => b.rating - a.rating);
      case 'trending':
        return baseNovels.sort((a, b) => {
          const aHours = parseFloat(a.lastUpdated.split(' ')[0]);
          const bHours = parseFloat(b.lastUpdated.split(' ')[0]);
          return aHours - bHours;
        });
      case 'completed':
        return baseNovels.filter(novel => novel.status === 'completed');
      default:
        return baseNovels;
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-6 w-6 text-yellow-400" />;
    if (rank === 2) return <Medal className="h-6 w-6 text-gray-400" />;
    if (rank === 3) return <Award className="h-6 w-6 text-amber-600" />;
    return <span className="text-2xl font-bold text-gray-400">#{rank}</span>;
  };

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
    if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-500';
    if (rank === 3) return 'bg-gradient-to-r from-amber-400 to-amber-600';
    if (rank <= 10) return 'bg-gradient-to-r from-orange-500 to-orange-600';
    return 'bg-gradient-to-r from-gray-600 to-gray-700';
  };

  const rankedNovels = getRankingData();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={onBackToHome}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </button>
            
            <h1 className="text-xl font-bold">Novel Rankings</h1>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-400">Filter</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    activeCategory === category.id
                      ? 'bg-orange-600 text-white shadow-lg'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{category.label}</span>
                </button>
              );
            })}
          </div>

          {/* Time Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Time Period:</span>
            {timeFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setTimeFilter(filter.id as any)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  timeFilter === filter.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Top 3 Podium */}
        {rankedNovels.length >= 3 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">Top 3 Champions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {/* 2nd Place */}
              <div className="order-1 md:order-1">
                <div
                  onClick={() => onNovelSelect(rankedNovels[1])}
                  className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-6 text-center cursor-pointer hover:scale-105 transition-all duration-300 shadow-xl border-2 border-gray-500"
                >
                  <div className="relative mb-4">
                    <img
                      src={rankedNovels[1].coverUrl}
                      alt={rankedNovels[1].title}
                      className="w-24 h-32 object-cover rounded-lg mx-auto shadow-lg"
                    />
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-gray-300 to-gray-500 rounded-full p-2">
                      <Medal className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">{rankedNovels[1].title}</h3>
                  <p className="text-gray-400 text-sm mb-2">by {rankedNovels[1].author}</p>
                  <div className="flex items-center justify-center space-x-2 text-sm">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span>{rankedNovels[1].rating}</span>
                    <span className="text-gray-400">•</span>
                    <span>{Math.floor(rankedNovels[1].views / 1000)}K views</span>
                  </div>
                </div>
              </div>

              {/* 1st Place */}
              <div className="order-2 md:order-2">
                <div
                  onClick={() => onNovelSelect(rankedNovels[0])}
                  className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl p-6 text-center cursor-pointer hover:scale-105 transition-all duration-300 shadow-2xl border-2 border-yellow-400 transform md:-translate-y-4"
                >
                  <div className="relative mb-4">
                    <img
                      src={rankedNovels[0].coverUrl}
                      alt={rankedNovels[0].title}
                      className="w-28 h-36 object-cover rounded-lg mx-auto shadow-lg"
                    />
                    <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full p-3">
                      <Crown className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="font-bold text-xl mb-2 line-clamp-2 text-white">{rankedNovels[0].title}</h3>
                  <p className="text-yellow-100 text-sm mb-2">by {rankedNovels[0].author}</p>
                  <div className="flex items-center justify-center space-x-2 text-sm text-white">
                    <Star className="h-4 w-4 text-white fill-current" />
                    <span>{rankedNovels[0].rating}</span>
                    <span>•</span>
                    <span>{Math.floor(rankedNovels[0].views / 1000)}K views</span>
                  </div>
                </div>
              </div>

              {/* 3rd Place */}
              <div className="order-3 md:order-3">
                <div
                  onClick={() => onNovelSelect(rankedNovels[2])}
                  className="bg-gradient-to-br from-amber-600 to-amber-700 rounded-2xl p-6 text-center cursor-pointer hover:scale-105 transition-all duration-300 shadow-xl border-2 border-amber-500"
                >
                  <div className="relative mb-4">
                    <img
                      src={rankedNovels[2].coverUrl}
                      alt={rankedNovels[2].title}
                      className="w-24 h-32 object-cover rounded-lg mx-auto shadow-lg"
                    />
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full p-2">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-2 line-clamp-2 text-white">{rankedNovels[2].title}</h3>
                  <p className="text-amber-100 text-sm mb-2">by {rankedNovels[2].author}</p>
                  <div className="flex items-center justify-center space-x-2 text-sm text-white">
                    <Star className="h-4 w-4 text-white fill-current" />
                    <span>{rankedNovels[2].rating}</span>
                    <span>•</span>
                    <span>{Math.floor(rankedNovels[2].views / 1000)}K views</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Full Ranking List */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Complete Rankings</h2>
          <div className="space-y-4">
            {rankedNovels.map((novel, index) => {
              const rank = index + 1;
              return (
                <div
                  key={novel.id}
                  onClick={() => onNovelSelect(novel)}
                  className={`bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-all duration-200 cursor-pointer group border-l-4 ${
                    rank <= 3 ? 'border-orange-500' : 'border-gray-600'
                  }`}
                >
                  <div className="flex items-center space-x-6">
                    {/* Rank */}
                    <div className="flex-shrink-0">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center ${getRankBadgeColor(rank)}`}>
                        {rank <= 3 ? getRankIcon(rank) : <span className="text-xl font-bold text-white">#{rank}</span>}
                      </div>
                    </div>

                    {/* Cover */}
                    <div className="flex-shrink-0">
                      <img
                        src={novel.coverUrl}
                        alt={novel.title}
                        className="w-16 h-20 object-cover rounded-lg group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>

                    {/* Novel Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-orange-400 transition-colors line-clamp-1">
                        {novel.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-2">by {novel.author}</p>
                      <p className="text-gray-300 text-sm mb-3 line-clamp-2">{novel.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {novel.genre.slice(0, 3).map((genre) => (
                          <span key={genre} className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                            {genre}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex-shrink-0 text-right">
                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex items-center space-x-2">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="font-semibold">{novel.rating}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Eye className="h-4 w-4 text-blue-400" />
                          <span className="text-sm">{Math.floor(novel.views / 1000)}K</span>
                        </div>
                        <div className={`px-2 py-1 rounded text-xs font-medium ${
                          novel.status === 'ongoing' ? 'bg-green-600 text-green-100' :
                          novel.status === 'completed' ? 'bg-blue-600 text-blue-100' :
                          'bg-yellow-600 text-yellow-100'
                        }`}>
                          {novel.status.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            Load More Rankings
          </button>
        </div>
      </div>
    </div>
  );
};

export default RankingPage;