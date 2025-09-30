import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Star,
  Eye,
  TrendingUp,
  Crown,
  Medal,
  Award,
  ChevronLeft,
  Filter,
} from "lucide-react";
import { Novel } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { fetchNovels } from "../services/api";
import Loading from "../components/Loading";

const RankingPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<
    "popular" | "rating" | "trending" | "completed"
  >("popular");
  
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state: any) => state.novels);

  useEffect(() => {
    dispatch(fetchNovels() as any);
  }, [dispatch]);

  const categories = [
    { id: "popular", label: "Most Popular", icon: Eye },
    { id: "rating", label: "Highest Rated", icon: Star },
    { id: "trending", label: "Trending", icon: TrendingUp },
    { id: "completed", label: "Completed", icon: Award },
  ];

  // const timeFilters = [
  //   { id: "daily", label: "Daily" },
  //   { id: "weekly", label: "Weekly" },
  //   { id: "monthly", label: "Monthly" },
  //   { id: "all", label: "All Time" },
  // ];

  // Helper function to convert views string to number
  const parseViews = (viewsStr: string): number => {
    if (!viewsStr) return 0;
    const cleanStr = viewsStr.replace(/,/g, '');
    if (cleanStr.includes('M')) {
      return parseFloat(cleanStr) * 1000000;
    } else if (cleanStr.includes('K')) {
      return parseFloat(cleanStr) * 1000;
    }
    return parseFloat(cleanStr) || 0;
  };

  // Get ranking data from API
  const getRankingData = () => {
    if (!list || list.length === 0) return [];

    // Map API data to Novel format
    const mappedNovels: Novel[] = list.map((novel: any, index: number) => ({
      id: novel.id,
      title: novel.title || 'Unknown Title',
      author: novel.author || 'Unknown Author',
      coverUrl: novel.image || 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: novel.description || 'No description available.',
      genre: novel.categories || [],
      rating: novel.rating || 0,
      chapters: novel.chapters || 0,
      status: novel.status?.toLowerCase() || 'ongoing',
      lastUpdated: '1 day ago',
      views: parseViews(novel.views || '0'),
      tags: novel.categories?.slice(0, 3) || [],
    }));

    // Sort based on active category
    let sortedNovels = [...mappedNovels];
    
    switch (activeCategory) {
      case "popular":
        sortedNovels.sort((a, b) => b.views - a.views);
        break;
      case "rating":
        sortedNovels.sort((a, b) => b.rating - a.rating);
        break;
      case "trending":
        // For trending, prioritize by views and rating combined
        sortedNovels.sort((a, b) => {
          const scoreA = a.views * 0.7 + a.rating * 1000000 * 0.3;
          const scoreB = b.views * 0.7 + b.rating * 1000000 * 0.3;
          return scoreB - scoreA;
        });
        break;
      case "completed":
        sortedNovels = sortedNovels.filter((novel) => novel.status === "completed");
        break;
      default:
        break;
    }

    return sortedNovels;
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-6 w-6 text-yellow-400" />;
    if (rank === 2) return <Medal className="h-6 w-6 text-gray-400" />;
    if (rank === 3) return <Award className="h-6 w-6 text-amber-600" />;
    return <span className="text-2xl font-bold text-gray-400">#{rank}</span>;
  };

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return "bg-gradient-to-r from-yellow-400 to-yellow-600";
    if (rank === 2) return "bg-gradient-to-r from-gray-300 to-gray-500";
    if (rank === 3) return "bg-gradient-to-r from-amber-400 to-amber-600";
    if (rank <= 10) return "bg-gradient-to-r from-orange-500 to-orange-600";
    return "bg-gradient-to-r from-gray-600 to-gray-700";
  };

  const rankedNovels = getRankingData();
  const convertToKebabCase = (input: string) => {
  return input
    .split(' ')           
    .join('-');        
}

  const handleNovelSelect = (novel: Novel) => {
    console.log("Selected Novel:", novel);
    navigate(`/novel/${convertToKebabCase(novel.title)}`, {
      state: {id: novel.id}
    });
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="min-h-screen bg-gray-900 text-white">
          {/* Header */}
          <div className="bg-gray-800 border-b border-gray-700 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <button
                  onClick={handleBackToHome}
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
                          ? "bg-orange-600 text-white shadow-lg"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      <IconComponent className="h-4 w-4" />
                      <span>{category.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Time Filter */}
              {/* <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">Time Period:</span>
                {timeFilters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setTimeFilter(filter.id as any)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      timeFilter === filter.id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div> */}
            </div>

            {/* Top 3 Podium */}
            {rankedNovels.length >= 3 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-center">
                  Top 3 Champions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  {/* 2nd Place */}
                  <div className="order-1 md:order-1">
                    <div
                      onClick={() => handleNovelSelect(rankedNovels[1])}
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
                      <h3 className="font-bold text-lg mb-2 line-clamp-2">
                        {rankedNovels[1].title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-2">
                        by {rankedNovels[1].author}
                      </p>
                      <div className="flex items-center justify-center space-x-2 text-sm">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span>{rankedNovels[1].rating}</span>
                        <span className="text-gray-400">•</span>
                        <span>
                          {Math.floor(rankedNovels[1].views / 1000)}K views
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 1st Place */}
                  <div className="order-2 md:order-2">
                    <div
                      onClick={() => handleNovelSelect(rankedNovels[0])}
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
                      <h3 className="font-bold text-xl mb-2 line-clamp-2 text-white">
                        {rankedNovels[0].title}
                      </h3>
                      <p className="text-yellow-100 text-sm mb-2">
                        by {rankedNovels[0].author}
                      </p>
                      <div className="flex items-center justify-center space-x-2 text-sm text-white">
                        <Star className="h-4 w-4 text-white fill-current" />
                        <span>{rankedNovels[0].rating}</span>
                        <span>•</span>
                        <span>
                          {Math.floor(rankedNovels[0].views / 1000)}K views
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 3rd Place */}
                  <div className="order-3 md:order-3">
                    <div
                      onClick={() => handleNovelSelect(rankedNovels[2])}
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
                      <h3 className="font-bold text-lg mb-2 line-clamp-2 text-white">
                        {rankedNovels[2].title}
                      </h3>
                      <p className="text-amber-100 text-sm mb-2">
                        by {rankedNovels[2].author}
                      </p>
                      <div className="flex items-center justify-center space-x-2 text-sm text-white">
                        <Star className="h-4 w-4 text-white fill-current" />
                        <span>{rankedNovels[2].rating}</span>
                        <span>•</span>
                        <span>
                          {Math.floor(rankedNovels[2].views / 1000)}K views
                        </span>
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
                      onClick={() => handleNovelSelect(novel)}
                      className={`bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-all duration-200 cursor-pointer group border-l-4 ${
                        rank <= 3 ? "border-orange-500" : "border-gray-600"
                      }`}
                    >
                      <div className="flex items-center space-x-6">
                        {/* Rank */}
                        <div className="flex-shrink-0">
                          <div
                            className={`w-16 h-16 rounded-full flex items-center justify-center ${getRankBadgeColor(
                              rank
                            )}`}
                          >
                            {rank <= 3 ? (
                              getRankIcon(rank)
                            ) : (
                              <span className="text-xl font-bold text-white">
                                #{rank}
                              </span>
                            )}
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
                          <p className="text-gray-400 text-sm mb-2">
                            by {novel.author}
                          </p>
                          <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                            {novel.description}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-3">
                            {novel.genre.slice(0, 3).map((genre) => (
                              <span
                                key={genre}
                                className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs border-gray-800 border"
                              >
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
                              <span className="font-semibold">
                                {novel.rating}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Eye className="h-4 w-4 text-blue-400" />
                              <span className="text-sm">
                                {Math.floor(novel.views / 1000)}K
                              </span>
                            </div>
                            <div
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                novel.status === "ongoing"
                                  ? "bg-green-600 text-green-100"
                                  : novel.status === "completed"
                                  ? "bg-blue-600 text-blue-100"
                                  : "bg-yellow-600 text-yellow-100"
                              }`}
                            >
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
            {rankedNovels.length > 0 && (
              <div className="text-center mt-8">
                <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                  Load More Rankings
                </button>
              </div>
            )}

            {/* Empty State */}
            {rankedNovels.length === 0 && !loading && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No novels found in this category.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default RankingPage;