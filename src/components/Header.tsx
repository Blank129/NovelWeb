import React, { useState } from 'react';
import { Search, Menu, X, Book, User, Bookmark, Settings } from 'lucide-react';

interface HeaderProps {
  onBackToHome: () => void;
}

const Header: React.FC<HeaderProps> = ({ onBackToHome }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer hover:text-orange-400 transition-colors"
            onClick={onBackToHome}
          >
            <Book className="h-8 w-8 text-orange-500" />
            <span className="text-xl font-bold">NovelFire</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="hover:text-orange-400 transition-colors">Home</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Browse</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Genres</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Rankings</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Latest</a>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search novels..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
              <Bookmark className="h-5 w-5" />
            </button>
            <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
              <Settings className="h-5 w-5" />
            </button>
            <button className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg transition-colors">
              <User className="h-4 w-4" />
              <span>Login</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-gray-700 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-700">
            <div className="flex flex-col space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search novels..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-orange-500"
                />
              </div>
              
              {/* Mobile Navigation */}
              <nav className="flex flex-col space-y-3">
                <a href="#" className="hover:text-orange-400 transition-colors">Home</a>
                <a href="#" className="hover:text-orange-400 transition-colors">Browse</a>
                <a href="#" className="hover:text-orange-400 transition-colors">Genres</a>
                <a href="#" className="hover:text-orange-400 transition-colors">Rankings</a>
                <a href="#" className="hover:text-orange-400 transition-colors">Latest</a>
              </nav>

              {/* Mobile User Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                <div className="flex items-center space-x-4">
                  <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                    <Bookmark className="h-5 w-5" />
                  </button>
                  <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                    <Settings className="h-5 w-5" />
                  </button>
                </div>
                <button className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg transition-colors">
                  <User className="h-4 w-4" />
                  <span>Login</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;