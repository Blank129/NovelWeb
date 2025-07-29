import React, { useState } from 'react';
import { Star, Eye, Clock, Bookmark, Share2, Heart, Play, ChevronLeft, User } from 'lucide-react';
import { Novel } from '../App';

interface NovelDetailProps {
  novel: Novel;
  onStartReading: (novel: Novel, chapter: number) => void;
  onBackToHome: () => void;
}

const NovelDetail: React.FC<NovelDetailProps> = ({ novel, onStartReading, onBackToHome }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'chapters' | 'reviews'>('overview');

  const chapters = Array.from({ length: novel.chapters }, (_, i) => ({
    number: i + 1,
    title: `Chapter ${i + 1}: ${i === 0 ? 'The Beginning' : i === novel.chapters - 1 ? 'Latest Chapter' : `Adventure Continues`}`,
    releaseDate: new Date(Date.now() - (novel.chapters - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    wordCount: Math.floor(Math.random() * 3000) + 1500
  }));

  const reviews = [
    { user: 'NovelLover2024', rating: 5, comment: 'Amazing story with great character development!', date: '2 days ago' },
    { user: 'BookwormPro', rating: 4, comment: 'Engaging plot but pacing could be better in middle chapters.', date: '1 week ago' },
    { user: 'FantasyFan', rating: 5, comment: 'One of the best novels I\'ve read this year. Highly recommended!', date: '2 weeks ago' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center">
          <button
            onClick={onBackToHome}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </button>
        </div>
      </div>

      {/* Novel Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Cover and Actions */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <img
                src={novel.coverUrl}
                alt={novel.title}
                className="w-full max-w-sm mx-auto rounded-xl shadow-2xl mb-6"
              />
              
              <div className="space-y-3">
                <button
                  onClick={() => onStartReading(novel, 1)}
                  className="w-full flex items-center justify-center space-x-2 bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <Play className="h-5 w-5" />
                  <span>Start Reading</span>
                </button>
                
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`flex items-center justify-center space-x-1 px-3 py-2 rounded-lg font-medium transition-colors ${
                      isBookmarked ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    <Bookmark className="h-4 w-4" />
                    <span className="text-sm">Save</span>
                  </button>
                  
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`flex items-center justify-center space-x-1 px-3 py-2 rounded-lg font-medium transition-colors ${
                      isLiked ? 'bg-red-600 text-white' : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    <Heart className="h-4 w-4" />
                    <span className="text-sm">Like</span>
                  </button>
                  
                  <button className="flex items-center justify-center space-x-1 bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-lg font-medium transition-colors">
                    <Share2 className="h-4 w-4" />
                    <span className="text-sm">Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Novel Information */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">{novel.title}</h1>
            <p className="text-xl text-gray-300 mb-6">by {novel.author}</p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-800 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center space-x-1 text-yellow-400 mb-1">
                  <Star className="h-5 w-5 fill-current" />
                  <span className="font-bold text-lg">{novel.rating}</span>
                </div>
                <span className="text-gray-400 text-sm">Rating</span>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center space-x-1 text-blue-400 mb-1">
                  <Eye className="h-5 w-5" />
                  <span className="font-bold text-lg">{Math.floor(novel.views / 1000)}K</span>
                </div>
                <span className="text-gray-400 text-sm">Views</span>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4 text-center">
                <span className="font-bold text-lg text-green-400 block mb-1">{novel.chapters}</span>
                <span className="text-gray-400 text-sm">Chapters</span>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center space-x-1 text-purple-400 mb-1">
                  <Clock className="h-5 w-5" />
                  <span className="font-bold text-sm">Updated</span>
                </div>
                <span className="text-gray-400 text-xs">{novel.lastUpdated}</span>
              </div>
            </div>

            {/* Genres and Tags */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Genres</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {novel.genre.map((genre) => (
                  <span key={genre} className="px-3 py-1 bg-orange-600 text-white rounded-full text-sm font-medium">
                    {genre}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-2">
                {novel.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="mb-6">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                novel.status === 'ongoing' ? 'bg-green-600 text-green-100' :
                novel.status === 'completed' ? 'bg-blue-600 text-blue-100' :
                'bg-yellow-600 text-yellow-100'
              }`}>
                {novel.status.toUpperCase()}
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">Synopsis</h3>
              <p className="text-gray-300 leading-relaxed">
                {novel.description}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-700 mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'chapters', label: 'Chapters' },
              { id: 'reviews', label: 'Reviews' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="prose prose-invert max-w-none">
            <h3>About this Novel</h3>
            <p>{novel.description}</p>
            <p>This captivating story follows an incredible journey filled with adventure, growth, and unforgettable characters. With {novel.chapters} chapters of compelling content, readers are taken on an immersive experience that keeps them coming back for more.</p>
          </div>
        )}

        {activeTab === 'chapters' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Chapter List</h3>
              <span className="text-gray-400">{novel.chapters} chapters available</span>
            </div>
            
            <div className="space-y-2">
              {chapters.slice(0, 20).map((chapter) => (
                <div
                  key={chapter.number}
                  onClick={() => onStartReading(novel, chapter.number)}
                  className="flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-700 rounded-lg cursor-pointer transition-colors group"
                >
                  <div>
                    <h4 className="font-medium group-hover:text-orange-400 transition-colors">
                      {chapter.title}
                    </h4>
                    <p className="text-sm text-gray-400">
                      {chapter.wordCount} words • {chapter.releaseDate}
                    </p>
                  </div>
                  <ChevronLeft className="h-5 w-5 text-gray-400 rotate-180 group-hover:text-orange-400 transition-colors" />
                </div>
              ))}
              
              {novel.chapters > 20 && (
                <div className="text-center py-4">
                  <button className="text-orange-400 hover:text-orange-300 font-medium">
                    Load more chapters...
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Reader Reviews</h3>
              <button className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg font-medium transition-colors">
                Write Review
              </button>
            </div>
            
            <div className="space-y-6">
              {reviews.map((review, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">{review.user}</h4>
                        <p className="text-sm text-gray-400">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-300">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NovelDetail;