import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X, Book, User, Bookmark, Settings, LogOut, Clock } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../app/store';
import { signOut } from '../features/auth/authSlice';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleRankingClick = () => {
    navigate('/ranking');
  };

  const handleGenresClick = () => {
    navigate('/genres');
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleHistoryClick = () => {
    if (user) {
      navigate('/history');
    } else {
      navigate('/login');
    }
  };

  const handleLogout = async () => {
    await dispatch(signOut());
    setShowUserMenu(false);
    navigate('/');
  };

  // Don't show header on reader pages
  if (location.pathname.includes('/chapter/')) {
    return null;
  }

  return (
    <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer hover:text-orange-400 transition-colors"
            onClick={handleLogoClick}
          >
            <Book className="h-8 w-8 text-orange-500" />
            <span className="text-xl font-bold">NovelFire</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={handleHomeClick} className="hover:text-orange-400 transition-colors">Home</button>
            <a href="#" className="hover:text-orange-400 transition-colors">Browse</a>
            <button
              onClick={handleGenresClick}
              className="hover:text-orange-400 transition-colors"
            >
              Genres
            </button>
            <button
              onClick={handleRankingClick}
              className="hover:text-orange-400 transition-colors"
            >
              Rankings
            </button>
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
            {user ? (
              <>
                <button
                  onClick={handleHistoryClick}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  title="Lịch sử đọc"
                >
                  <Clock className="h-5 w-5" />
                </button>
                <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                  <Bookmark className="h-5 w-5" />
                </button>
                <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                  <Settings className="h-5 w-5" />
                </button>
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
                  >
                    <User className="h-4 w-4" />
                    <span className="max-w-[100px] truncate">{user.email}</span>
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg py-2">
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors flex items-center space-x-2"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Đăng xuất</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg transition-colors"
              >
                <User className="h-4 w-4" />
                <span>Đăng nhập</span>
              </button>
            )}
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
                <button onClick={handleHomeClick} className="hover:text-orange-400 transition-colors text-left">Home</button>
                <a href="#" className="hover:text-orange-400 transition-colors">Browse</a>
                <button
                  onClick={handleGenresClick}
                  className="hover:text-orange-400 transition-colors text-left"
                >
                  Genres
                </button>
                <button
                  onClick={handleRankingClick}
                  className="hover:text-orange-400 transition-colors text-left"
                >
                  Rankings
                </button>
                <a href="#" className="hover:text-orange-400 transition-colors">Latest</a>
              </nav>

              {/* Mobile User Actions */}
              <div className="pt-4 border-t border-gray-700">
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={handleHistoryClick}
                          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                          title="Lịch sử đọc"
                        >
                          <Clock className="h-5 w-5" />
                        </button>
                        <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                          <Bookmark className="h-5 w-5" />
                        </button>
                        <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                          <Settings className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <User className="h-4 w-4" />
                        <span className="max-w-[120px] truncate">{user.email}</span>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                        <Bookmark className="h-5 w-5" />
                      </button>
                      <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                        <Settings className="h-5 w-5" />
                      </button>
                    </div>
                    <button
                      onClick={() => navigate('/login')}
                      className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg transition-colors"
                    >
                      <User className="h-4 w-4" />
                      <span>Đăng nhập</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;