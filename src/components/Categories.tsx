import React from 'react';
import { Sword, Heart, Zap, Crown, Shield, Sparkles, Globe, Users } from 'lucide-react';

const Categories: React.FC = () => {
  const categories = [
    { name: 'Action', icon: Sword, count: 2847, color: 'from-red-500 to-red-600' },
    { name: 'Romance', icon: Heart, count: 1923, color: 'from-pink-500 to-pink-600' },
    { name: 'Fantasy', icon: Sparkles, count: 3156, color: 'from-purple-500 to-purple-600' },
    { name: 'Martial Arts', icon: Shield, count: 1547, color: 'from-orange-500 to-orange-600' },
    { name: 'Sci-Fi', icon: Zap, count: 892, color: 'from-blue-500 to-blue-600' },
    { name: 'Historical', icon: Crown, count: 634, color: 'from-yellow-500 to-yellow-600' },
    { name: 'Adventure', icon: Globe, count: 2108, color: 'from-green-500 to-green-600' },
    { name: 'Slice of Life', icon: Users, count: 1245, color: 'from-teal-500 to-teal-600' },
  ];

  return (
    <section className="py-16 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Browse by Genre
          </h2>
          <p className="text-gray-400 text-lg">
            Find your favorite type of story from our extensive collection
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.name}
                className="group cursor-pointer transform hover:scale-105 transition-all duration-200"
              >
                <div className={`bg-gradient-to-br ${category.color} rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow`}>
                  <IconComponent className="h-8 w-8 text-white mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="text-white font-semibold text-sm mb-1">{category.name}</h3>
                  <p className="text-white/80 text-xs">{category.count} novels</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            View All Genres
          </button>
        </div>
      </div>
    </section>
  );
};

export default Categories;