import React, { useEffect } from 'react';
import { Play, Star, TrendingUp } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNovelById, fetchNovelViewHighest } from '../services/api';
import Loading from './Loading';
import { useNavigate } from 'react-router-dom';

interface HeroProps {
  onNovelSelect: (novel: any) => void;
}

const Hero: React.FC<HeroProps> = ({ onNovelSelect }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { novelViewHighest, detailNovel, loading } = useSelector((state: any) => state.novels);

  useEffect(() => {
    dispatch(fetchNovelViewHighest() as any);
    if(novelViewHighest){
      dispatch(fetchNovelById(novelViewHighest.id) as any);
    }
  }, [dispatch]);

  // Nếu đang loading hoặc chưa có dữ liệu
  if (loading || !novelViewHighest) return <Loading />

  const novel = novelViewHighest;

  const convertToKebabCase = (input: string) => {
    return input.split(" ").join("-");
  };

  const handleStartReading = (chapterSelect?: any) => {
    const firstChapterId = chapterSelect?.order || detailNovel.chapters?.[0]?.id;
    if (firstChapterId) {
      navigate(`/novel/${convertToKebabCase(detailNovel.title)}/chapter/${firstChapterId}`, {
        state: { id: detailNovel.id },
      });
    } else {
      navigate(`/novel/${convertToKebabCase(detailNovel.title)}/chapter/1`, {
        state: { id: detailNovel.id },
      });
    }
  };

  const handleNovelSelect = (novel: any) => {
        navigate(`/novel/${convertToKebabCase(novel.title)}`, {
          state: { id: novel.id },
        });
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
              {novel.title}
            </h1>
            
            <p className="text-lg text-gray-300 leading-relaxed max-w-lg">
              {novel.description}
            </p>
            
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-white font-medium">{novel.rating}</span>
                <span className="text-gray-400">({novel.views} views)</span>
              </div>
              <div className="text-gray-400">
                {novel.chapters} Chapters
              </div>
              <div className="px-2 py-1 bg-green-600 text-green-100 rounded text-xs font-medium">
                {novel.status.toUpperCase()}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {novel.categories && novel.categories.map((category: string) => (
                <span key={category} className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">
                  {category}
                </span>
              ))}
            </div>
            
            <div className="flex items-center space-x-4 pt-4">
              <button 
                onClick={() => handleStartReading(novel)}
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
          <div className="relative cursor-pointer" onClick={() => handleNovelSelect(novel)}>
            <div className="relative transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <img
                src={novel.image}
                alt={novel.title}
                className="w-full max-w-xs mx-auto rounded-2xl shadow-2xl"
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
                  <div className="text-white font-bold text-lg">{novel.rating}</div>
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