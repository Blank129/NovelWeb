import React from 'react';
import { Clock, ChevronRight } from 'lucide-react';
import { Novel } from '../App';

interface RecentUpdatesProps {
  onNovelSelect: (novel: Novel) => void;
}

const RecentUpdates: React.FC<RecentUpdatesProps> = ({ onNovelSelect }) => {
  const updates = [
    {
      novel: {
        id: '9',
        title: 'The Immortal Swordsman',
        author: 'Chen Dong',
        coverUrl: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'A legendary swordsman returns from death to seek revenge.',
        genre: ['Martial Arts', 'Revenge'],
        rating: 4.6,
        chapters: 892,
        status: 'ongoing' as const,
        lastUpdated: '15 minutes ago',
        views: 2847592,
        tags: ['Sword', 'Revenge', 'Immortal']
      },
      newChapter: 'Chapter 893: The Final Strike',
      updateTime: '15 minutes ago'
    },
    {
      novel: {
        id: '10',
        title: 'System Administrator',
        author: 'Code Master',
        coverUrl: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'A programmer gets a system that lets him admin reality.',
        genre: ['Sci-Fi', 'System'],
        rating: 4.4,
        chapters: 445,
        status: 'ongoing' as const,
        lastUpdated: '1 hour ago',
        views: 1923847,
        tags: ['System', 'Programming', 'OP MC']
      },
      newChapter: 'Chapter 446: Debugging Reality',
      updateTime: '1 hour ago'
    },
    {
      novel: {
        id: '11',
        title: 'Dragon Emperor Chronicles',
        author: 'Ancient Writer',
        coverUrl: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'The last dragon emperor awakens in a world that has forgotten dragons.',
        genre: ['Fantasy', 'Dragons'],
        rating: 4.5,
        chapters: 678,
        status: 'ongoing' as const,
        lastUpdated: '2 hours ago',
        views: 3156829,
        tags: ['Dragons', 'Empire', 'Ancient']
      },
      newChapter: 'Chapter 679: Return of the Dragons',
      updateTime: '2 hours ago'
    },
    {
      novel: {
        id: '12',
        title: 'Academy of Heroes',
        author: 'Hero Writer',
        coverUrl: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'Students train to become the next generation of heroes.',
        genre: ['Superhero', 'School'],
        rating: 4.3,
        chapters: 234,
        status: 'ongoing' as const,
        lastUpdated: '3 hours ago',
        views: 1847293,
        tags: ['Heroes', 'Academy', 'Powers']
      },
      newChapter: 'Chapter 235: Final Exam Battle',
      updateTime: '3 hours ago'
    }
  ];

  return (
    <section className="py-16 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="flex items-center space-x-2 text-blue-400 mb-2">
              <Clock className="h-5 w-5" />
              <span className="text-sm font-medium uppercase tracking-wide">Fresh Content</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Recent Updates
            </h2>
          </div>
          <button className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
            View All Updates →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {updates.map((update) => (
            <div
              key={update.novel.id}
              onClick={() => onNovelSelect(update.novel)}
              className="bg-gray-900 rounded-xl p-6 hover:bg-gray-700 transition-all duration-200 cursor-pointer group border border-gray-700 hover:border-gray-600"
            >
              <div className="flex items-start space-x-4">
                <img
                  src={update.novel.coverUrl}
                  alt={update.novel.title}
                  className="w-16 h-20 object-cover rounded-lg flex-shrink-0 group-hover:scale-105 transition-transform duration-200"
                />
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-blue-400 transition-colors truncate">
                    {update.novel.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-2">by {update.novel.author}</p>
                  
                  <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-3 mb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-400 font-medium text-sm">New Chapter</span>
                      <span className="text-gray-400 text-xs">{update.updateTime}</span>
                    </div>
                    <p className="text-white text-sm mt-1">{update.newChapter}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {update.novel.genre.slice(0, 2).map((genre) => (
                        <span key={genre} className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                          {genre}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center text-gray-400 group-hover:text-white transition-colors">
                      <span className="text-sm">Read more</span>
                      <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
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

export default RecentUpdates;