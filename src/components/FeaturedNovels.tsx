import React, { useEffect } from "react";
import { Star, Eye } from "lucide-react";
import { Novel } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { fetchTop4RatingNovels } from "../services/api";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

interface FeaturedNovelsProps {
  onNovelSelect: (novel: Novel) => void;
}

const FeaturedNovels: React.FC<FeaturedNovelsProps> = ({ onNovelSelect }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { top4NovelRating, loading } = useSelector(
    (state: any) => state.novels
  );

  useEffect(() => {
    dispatch(fetchTop4RatingNovels() as any);
  }, [dispatch]);

  const novels = top4NovelRating || [];

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
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Featured Novels
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover the most popular and highly-rated novels that readers can't
            stop talking about
          </p>
        </div>

        {loading ? (
          <Loading />
        ) : novels.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <p>No featured novels available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {novels.map((novel: any) => (
              <div
                key={novel.id}
                onClick={() => handleNovelSelect(novel)}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
              >
                <div className="relative">
                  <img
                    src={novel.image}
                    alt={novel.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 from-black/60 to-transparent"></div>
                  <div className="absolute top-3 right-3">
                    <div
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        novel.status?.toLowerCase() === "ongoing"
                          ? "bg-green-600 text-green-100"
                          : novel.status?.toLowerCase() === "completed"
                          ? "bg-blue-600 text-blue-100"
                          : "bg-yellow-600 text-yellow-100"
                      }`}
                    >
                      {novel.status?.toUpperCase()}
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
                        <span>{novel.views}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-white font-bold text-lg mb-2 group-hover:text-orange-400 transition-colors line-clamp-2">
                    {novel.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-2">
                    by {novel.author || "Unknown"}
                  </p>

                  {novel.description && (
                    <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                      {novel.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-1 mb-3">
                    {novel.categories?.slice(0, 2).map((category: string) => (
                      <span
                        key={category}
                        className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs"
                      >
                        {category}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>{novel.chapters} chapters</span>
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

export default FeaturedNovels;
