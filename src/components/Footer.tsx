import React from 'react';
import { Book, Mail, Twitter, Facebook, Instagram, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Book className="h-8 w-8 text-orange-500" />
              <span className="text-xl font-bold">NovelFire</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your ultimate destination for discovering and reading amazing novels from around the world.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Browse Novels</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Top Rated</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Latest Updates</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Categories</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Rankings</a></li>
            </ul>
          </div>

          {/* Genres */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Genres</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Fantasy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Romance</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Action</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Sci-Fi</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Martial Arts</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Community Guidelines</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 NovelFire. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>Made with ❤️ for novel lovers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;