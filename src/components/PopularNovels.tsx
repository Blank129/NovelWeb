import React, { useEffect } from 'react';
import { Star, TrendingUp, Eye } from 'lucide-react';
import { Novel } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTop3ViewNovels } from '../services/api';
import { useNavigate } from 'react-router-dom';

interface PopularNovelsProps {
  onNovelSelect: (novel: Novel) => void;
}

const PopularNovels: React.FC<PopularNovelsProps> = ({ onNovelSelect }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { top3NovelView, loading } = useSelector(
    (state: any) => state.novels
  );

  useEffect(() => {
    dispatch(fetchTop3ViewNovels() as any);
  }, [dispatch]);

  // Chuyển đổi views từ string (VD: "17.8M") sang number
  const parseViews = (viewsStr: string): number => {
    if (!viewsStr) return 0;
    const value = parseFloat(viewsStr.replace(/[^0-9.]/g, ''));
    if (viewsStr.includes('M')) return value * 1000000;
    if (viewsStr.includes('K')) return value * 1000;
    return value;
  };

  const convertToKebabCase = (input: string) => {
      return input.split(" ").join("-");
    };
  
    const handleNovelSelect = (novel: Novel) => {
      navigate(`/novel/${convertToKebabCase(novel.title)}`, {
        state: { id: novel.id },
      });
    };

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
          <button className="text-orange-400 hover:text-orange-300 font-medium transition-colors" onClick={() => navigate("/ranking")}>
            View All →
          </button>
        </div>

        {loading ? (
          <div className="text-center text-white py-12">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {top3NovelView?.map((novel: any, index: number) => (
              <div
                key={novel.id}
                onClick={() => handleNovelSelect(novel)}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
              >
                <div className="flex">
                  <div className="flex-shrink-0 relative">
                    <img
                      src={novel.image}
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
                        <span>{novel.views}</span>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-medium ${
                        novel.status === 'Ongoing' ? 'bg-green-600 text-green-100' :
                        novel.status === 'Completed' ? 'bg-blue-600 text-blue-100' :
                        'bg-yellow-600 text-yellow-100'
                      }`}>
                        {novel.status.toUpperCase()}
                      </div>
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                      {novel.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {novel.categories?.slice(0, 3).map((category: string) => (
                        <span key={category} className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                          {category}
                        </span>
                      ))}
                    </div>
{/*                     
                    <div className="text-sm text-gray-400">
                      {novel.chapters} chapters
                    </div> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularNovels;