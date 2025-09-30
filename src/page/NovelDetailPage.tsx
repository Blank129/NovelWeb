import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Star,
  Eye,
  Clock,
  Bookmark,
  Share2,
  Heart,
  Play,
  ChevronLeft,
  ChevronRight,
  User,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNovelById } from "../services/api";

const NovelDetailPage: React.FC = () => {
  const location = useLocation();
  const id = location.state?.id;
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "overview" | "chapters" | "reviews"
  >("overview");
  const [currentPage, setCurrentPage] = useState(1);
  const chaptersPerPage = 50;

  const dispatch = useDispatch();
  const { detailNovel, loading } = useSelector((state: any) => state.novels);

  useEffect(() => {
    if (id) {
      dispatch(fetchNovelById(id) as any);
    }
  }, [dispatch, id]);

  // Hiển thị loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  // Kiểm tra nếu không có dữ liệu
  if (!detailNovel) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-xl">Novel not found</div>
      </div>
    );
  }

  // Mock reviews vì API không có dữ liệu này
  const reviews = [
    {
      user: "NovelLover2024",
      rating: 5,
      comment: "Amazing story with great character development!",
      date: "2 days ago",
    },
    {
      user: "BookwormPro",
      rating: 4,
      comment: "Engaging plot but pacing could be better in middle chapters.",
      date: "1 week ago",
    },
    {
      user: "FantasyFan",
      rating: 5,
      comment:
        "One of the best novels I've read this year. Highly recommended!",
      date: "2 weeks ago",
    },
  ];

  const handleStartReading = (chapterId?: number) => {
    const firstChapterId = chapterId || detailNovel.chapters?.[0]?.id;
    if (firstChapterId) {
      navigate(`/novel/${detailNovel.id}/chapter/${firstChapterId}`);
    }
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  // Format views number
  const formatViews = (views: string) => {
    if (views.includes("M")) {
      return views;
    }
    const num = parseFloat(views);
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return views;
  };

  // Pagination logic
  const totalChapters = detailNovel.chapters?.length || 0;
  const totalPages = Math.ceil(totalChapters / chaptersPerPage);
  const indexOfLastChapter = currentPage * chaptersPerPage;
  const indexOfFirstChapter = indexOfLastChapter - chaptersPerPage;
  const currentChapters = detailNovel.chapters?.slice(
    indexOfFirstChapter,
    indexOfLastChapter
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 500, behavior: "smooth" });
  };

  // Render pagination buttons
  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    pages.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-2 rounded-lg ${
          currentPage === 1
            ? "bg-gray-700 text-gray-500 cursor-not-allowed"
            : "bg-gray-700 hover:bg-gray-600 text-white"
        }`}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
    );

    // First page
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(
          <span key="dots1" className="px-2 text-gray-500">
            ...
          </span>
        );
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 rounded-lg ${
            currentPage === i
              ? "bg-orange-600 text-white"
              : "bg-gray-700 hover:bg-gray-600 text-white"
          }`}
        >
          {i}
        </button>
      );
    }

    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="dots2" className="px-2 text-gray-500">
            ...
          </span>
        );
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white"
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    pages.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 rounded-lg ${
          currentPage === totalPages
            ? "bg-gray-700 text-gray-500 cursor-not-allowed"
            : "bg-gray-700 hover:bg-gray-600 text-white"
        }`}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    );

    return pages;
  };

  // Render chapter list component
  const renderChapterList = () => (
    <>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Chapter List</h3>
        <span className="text-gray-400">
          {totalChapters} chapters available
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        {currentChapters?.map((chapter: any) => (
          <div
            key={chapter.id}
            onClick={() => handleStartReading(chapter.id)}
            className="flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-700 rounded-lg cursor-pointer transition-colors group"
          >
            <div className="flex-1 min-w-0">
              <h4 className="font-medium group-hover:text-orange-400 transition-colors truncate">
                {chapter.title}
              </h4>
              <p className="text-sm text-gray-400">Chapter {chapter.order}</p>
            </div>
            <ChevronLeft className="h-5 w-5 text-gray-400 rotate-180 group-hover:text-orange-400 transition-colors flex-shrink-0 ml-2" />
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {renderPagination()}
        </div>
      )}
    </>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center">
          <button
            onClick={handleBackToHome}
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
                src={detailNovel.image}
                alt={detailNovel.title}
                className="w-full max-w-sm mx-auto rounded-xl shadow-2xl mb-6"
              />

              <div className="space-y-3">
                <button
                  onClick={() => handleStartReading()}
                  className="w-full flex items-center justify-center space-x-2 bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <Play className="h-5 w-5" />
                  <span>Start Reading</span>
                </button>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`flex items-center justify-center space-x-1 px-3 py-2 rounded-lg font-medium transition-colors ${
                      isBookmarked
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 hover:bg-gray-600"
                    }`}
                  >
                    <Bookmark className="h-4 w-4" />
                    <span className="text-sm">Save</span>
                  </button>

                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`flex items-center justify-center space-x-1 px-3 py-2 rounded-lg font-medium transition-colors ${
                      isLiked
                        ? "bg-red-600 text-white"
                        : "bg-gray-700 hover:bg-gray-600"
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
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              {detailNovel.title}
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              by {detailNovel.author}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-800 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center space-x-1 text-yellow-400 mb-1">
                  <Star className="h-5 w-5 fill-current" />
                  <span className="font-bold text-lg">
                    {detailNovel.rating}
                  </span>
                </div>
                <span className="text-gray-400 text-sm">Rating</span>
              </div>

              <div className="bg-gray-800 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center space-x-1 text-blue-400 mb-1">
                  <Eye className="h-5 w-5" />
                  <span className="font-bold text-lg">
                    {formatViews(detailNovel.views)}
                  </span>
                </div>
                <span className="text-gray-400 text-sm">Views</span>
              </div>

              <div className="bg-gray-800 rounded-lg p-4 text-center">
                <span className="font-bold text-lg text-green-400 block mb-1">
                  {detailNovel.chapters?.length || 0}
                </span>
                <span className="text-gray-400 text-sm">Chapters</span>
              </div>

              <div className="bg-gray-800 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center space-x-1 text-purple-400 mb-1">
                  <Clock className="h-5 w-5" />
                  <span className="font-bold text-sm">
                    {detailNovel.status}
                  </span>
                </div>
                <span className="text-gray-400 text-xs">Status</span>
              </div>
            </div>

            {/* Genres and Tags */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Genres</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {detailNovel.categories?.map((genre: string) => (
                  <span
                    key={genre}
                    className="px-3 py-1 bg-orange-600 text-white rounded-full text-sm font-medium"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="mb-6">
              <div
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  detailNovel.status === "Ongoing"
                    ? "bg-green-600 text-green-100"
                    : detailNovel.status === "Completed"
                    ? "bg-blue-600 text-blue-100"
                    : "bg-yellow-600 text-yellow-100"
                }`}
              >
                {detailNovel.status.toUpperCase()}
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">Synopsis</h3>
              <p className="text-gray-300 leading-relaxed">
                {detailNovel.description}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-700 mb-8">
          <nav className="flex space-x-8">
            {[
              { id: "overview", label: "Overview" },
              { id: "chapters", label: "Chapters" },
              { id: "reviews", label: "Reviews" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setCurrentPage(1);
                }}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-orange-500 text-orange-400"
                    : "border-transparent text-gray-400 hover:text-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div>
            <div className="prose prose-invert max-w-none mb-8">
              <p>{detailNovel.description}</p>
            </div>
            <div className="mt-10">{renderChapterList()}</div>
          </div>
        )}

        {activeTab === "chapters" && <div>{renderChapterList()}</div>}

        {activeTab === "reviews" && (
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
                            i < review.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-600"
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

export default NovelDetailPage;