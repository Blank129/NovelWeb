import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Settings,
  Bookmark,
  X,
  Home,
  Play,
  Pause,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChapterById, fetchNovelById } from "../services/api";
import Loading from "../components/Loading";

const NovelReaderPage: React.FC = () => {
  const location = useLocation();
  const id = location.state?.id;
  const {chapter} = useParams<{ chapter: any}>();
  const navigate = useNavigate();
  const currentChapter = parseInt(chapter);

  const [showMobileSettings, setShowMobileSettings] = useState(false);
  const [fontSize, setFontSize] = useState(18);
  const [darkMode, setDarkMode] = useState(true);
  const [fontFamily, setFontFamily] = useState("Default");
  const [lineHeight, setLineHeight] = useState(1.6);
  const [language, setLanguage] = useState("English");
  const [isPlaying, setIsPlaying] = useState(false);

  const dispatch = useDispatch();
  const { chapterNovel, detailNovel, loading } = useSelector(
    (state: any) => state.novels
  );

  useEffect(() => {
    dispatch(fetchChapterById({ id, chapter } as any) as any);
    dispatch(fetchNovelById(id) as any);
  }, [dispatch, id, chapter]);

  // Get data from API
  const novel = chapterNovel?.novel;
  const chapterData = chapterNovel?.chapters;

  const chapterTitle = chapterData?.title || `Chapter ${currentChapter}`;
  const chapterContent = chapterData ? chapterData[0]?.content : <Loading />;

  const totalChapters =
    detailNovel?.chapters.length || 0;
  const hasNextChapter = currentChapter < totalChapters;
  const hasPreviousChapter = currentChapter > 1;

  const convertToKebabCase = (input: string) => {
    return input.split(" ").join("-");
  };

  const handleNextChapter = () => {
    if (hasNextChapter) {  
      navigate(`/novel/${convertToKebabCase(detailNovel.title)}/chapter/${currentChapter + 1}`, { state: { id } });
      window.scrollTo({ top: 0});
    }
  };

  const handlePreviousChapter = () => {
    if (hasPreviousChapter) {
      navigate(`/novel/${convertToKebabCase(detailNovel.title)}/chapter/${currentChapter - 1}`, { state: { id } });
      window.scrollTo({ top: 0});
    }
  };

  const handleBackToNovel = () => {
    navigate(`/novel/${id}`);
  };

  const handleScreenTap = (e: React.MouseEvent) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      setShowMobileSettings(true);
    }
  };

  const splitBySentence = (text: string): string => {
    let result = "";
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const nextChar = text[i + 1];
      const prevChar = text[i - 1];

      // Quy tắc đặc biệt: Nếu gặp ":[" thì xuống dòng sau dấu :
      if (char === ":" && nextChar === "[") {
        result += ":\n\n";
        continue;
      }

      // Xử lý cụm kết thúc câu đặc biệt như ?! hoặc !?
      if (
        !inQuotes &&
        ((char === "?" && nextChar === "!") ||
          (char === "!" && nextChar === "?"))
      ) {
        result += char + nextChar;
        const nextNextChar = text[i + 2];

        if (
          nextNextChar === '"' ||
          /^[ \n]*['"]?[A-ZÀ-Ý]/.test(text.slice(i + 2))
        ) {
          result += "\n\n";
        }

        i++; // bỏ qua ký tự tiếp theo (! hoặc ?)
        continue;
      }

      // Xử lý dấu ngoặc kép
      if (char === '"') {
        inQuotes = !inQuotes;
        result += char;

        if (nextChar === '"') {
          result += "\n\n";
          i++;
          continue;
        }

        if (!inQuotes && nextChar && /[A-ZÀ-Ý]/.test(nextChar)) {
          result += "\n\n";
        }

        continue;
      }

      // Xử lý dấu kết thúc câu thông thường
      if (!inQuotes && (char === "." || char === "!" || char === "?")) {
        result += char;

        if (nextChar === '"') {
          result += "\n\n";
        } else if (/^[ \n]*['"]?[A-ZÀ-Ý]/.test(text.slice(i + 1))) {
          result += "\n\n";
        }

        continue;
      }

      // Bỏ dòng trắng không cần thiết cạnh dấu ngoặc kép
      if (char === "\n" && (prevChar === '"' || nextChar === '"')) {
        continue;
      }

      result += char;
    }

    // Xóa dòng chỉ chứa dấu ngoặc kép
    return result
      .split("\n")
      .filter((line) => line.trim() !== '"')
      .join("\n");
  };

  // console.log(
  //   "detailNovel in Reader:",
  //  detailNovel
  // );

  const fontOptions = ["Default", "Dyslexic", "Roboto", "Lora"];
  const languageOptions = [
    "English",
    "Vietnamese",
    "Chinese",
    "Japanese",
    "Korean",
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Desktop Header */}
      <div
        className={`hidden md:block z-50 border-b transition-all duration-300 ${
          darkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-gray-100 border-gray-200"
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBackToNovel}
              className={`flex items-center space-x-2 transition-colors ${
                darkMode
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <ChevronLeft className="h-5 w-5" />
              <span>Back</span>
            </button>

            <div className="text-center">
              <h1 className="font-semibold truncate max-w-xs">
                {detailNovel?.title || "Loading..."}
              </h1>
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Chapter {currentChapter} of {totalChapters}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                className={`p-2 rounded-lg transition-colors ${
                  darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
                }`}
              >
                <Bookmark className="h-5 w-5" />
              </button>
              <button
                className={`p-2 rounded-lg transition-colors ${
                  darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
                }`}
              >
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Settings Overlay */}
      {showMobileSettings && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowMobileSettings(false)}
          ></div>

          <div className="absolute bottom-0 left-0 right-0 bg-gray-900 text-white rounded-t-2xl shadow-2xl animate-slide-up">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
              <h2 className="text-base font-semibold">{chapterTitle}</h2>
              <button
                onClick={() => setShowMobileSettings(false)}
                className="p-1 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {/* Navigation Controls */}
              <div className="flex items-center justify-center space-x-6 py-3 border-b border-gray-700">
                <button
                  onClick={handlePreviousChapter}
                  disabled={!hasPreviousChapter}
                  className={`p-2 rounded-lg transition-colors ${
                    hasPreviousChapter
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-800 opacity-50 cursor-not-allowed"
                  }`}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <button
                  onClick={handleBackToNovel}
                  className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <Home className="h-5 w-5" />
                </button>

                <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                  <Settings className="h-5 w-5" />
                </button>

                <button
                  onClick={handleNextChapter}
                  disabled={!hasNextChapter}
                  className={`p-2 rounded-lg transition-colors ${
                    hasNextChapter
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-800 opacity-50 cursor-not-allowed"
                  }`}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Font Family Selection */}
              <div className="px-4 py-3 border-b border-gray-700">
                <div className="flex justify-center space-x-2">
                  {fontOptions.map((font) => (
                    <button
                      key={font}
                      onClick={() => setFontFamily(font)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        fontFamily === font
                          ? "bg-blue-600 text-white"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }`}
                    >
                      {font}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Size Slider */}
              <div className="px-4 py-3 border-b border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl">A⁻</span>
                  <div className="flex-1 mx-3">
                    <input
                      type="range"
                      min="14"
                      max="28"
                      step="2"
                      value={fontSize}
                      onChange={(e) => setFontSize(Number(e.target.value))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>14</span>
                      <span className="text-blue-400 font-bold">
                        {fontSize}
                      </span>
                      <span>28</span>
                    </div>
                  </div>
                  <span className="text-xl">A⁺</span>
                </div>
              </div>

              {/* Translation Section */}
              <div className="px-4 py-3 border-b border-gray-700">
                <h3 className="text-center text-gray-400 text-sm mb-2">
                  Translation
                </h3>
                <div className="flex items-center space-x-3">
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-1.5 text-white text-sm"
                  >
                    {languageOptions.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                  <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors">
                    Select Lang
                  </button>
                </div>
              </div>

              {/* Text to Speech Section */}
              <div className="px-4 py-3">
                <h3 className="text-center text-gray-400 text-sm mb-2">
                  Text to Speech
                </h3>
                <div className="flex items-center justify-center space-x-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="h-5 w-5" />
                    )}
                  </button>

                  <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                    <div className="w-5 h-5 bg-white rounded-sm"></div>
                  </button>

                  <select className="bg-gray-700 border border-gray-600 rounded-lg px-2 py-1.5 text-white text-xs">
                    <option>1x</option>
                    <option>1.5x</option>
                    <option>2x</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chapter Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {loading ? (
          <Loading />
        ) : (
          <div
            onClick={handleScreenTap}
            className="prose prose-lg max-w-none leading-relaxed cursor-pointer md:cursor-default"
            style={{
              fontSize: `${fontSize}px`,
              lineHeight: lineHeight,
              fontFamily:
                fontFamily === "Default"
                  ? "system-ui"
                  : fontFamily === "Dyslexic"
                  ? "OpenDyslexic, monospace"
                  : fontFamily === "Roboto"
                  ? "Roboto, sans-serif"
                  : fontFamily === "Lora"
                  ? "Lora, serif"
                  : "system-ui",
              color: darkMode ? "#e5e7eb" : "#374151",
            }}
          >
            <div className="whitespace-pre-line">
              {splitBySentence(chapterContent)}
            </div>
          </div>
        )}
      </div>

      {/* Desktop Navigation Footer */}
      <div
        className={`hidden md:block sticky bottom-0 border-t transition-all duration-300 ${
          darkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-gray-100 border-gray-200"
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handlePreviousChapter}
              disabled={!hasPreviousChapter}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                hasPreviousChapter
                  ? darkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-900"
                  : "opacity-50 cursor-not-allowed"
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>

            <div className="text-center">
              <div
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {currentChapter} / {totalChapters}
              </div>
              <div
                className={`w-48 h-2 rounded-full mt-1 ${
                  darkMode ? "bg-gray-700" : "bg-gray-300"
                }`}
              >
                <div
                  className="h-full bg-orange-500 rounded-full transition-all duration-300"
                  style={{
                    width: `${(currentChapter / totalChapters) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            <button
              onClick={handleNextChapter}
              disabled={!hasNextChapter}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                hasNextChapter
                  ? darkMode
                    ? "bg-orange-600 hover:bg-orange-700 text-white"
                    : "bg-orange-500 hover:bg-orange-600 text-white"
                  : "opacity-50 cursor-not-allowed"
              }`}
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Footer */}
      {!showMobileSettings && (
        <div
          className={`md:hidden fixed bottom-0 left-0 right-0 border-t transition-all duration-300 ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-gray-100 border-gray-200"
          }`}
        >
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={handlePreviousChapter}
                disabled={!hasPreviousChapter}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  hasPreviousChapter
                    ? darkMode
                      ? "bg-gray-700 hover:bg-gray-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-900"
                    : "opacity-50 cursor-not-allowed"
                }`}
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </button>

              <div className="text-center">
                <div
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {currentChapter} / {totalChapters}
                </div>
                <div
                  className={`w-32 h-2 rounded-full mt-1 ${
                    darkMode ? "bg-gray-700" : "bg-gray-300"
                  }`}
                >
                  <div
                    className="h-full bg-orange-500 rounded-full transition-all duration-300"
                    style={{
                      width: `${(currentChapter / totalChapters) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              <button
                onClick={handleNextChapter}
                disabled={!hasNextChapter}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  hasNextChapter
                    ? darkMode
                      ? "bg-orange-600 hover:bg-orange-700 text-white"
                      : "bg-orange-500 hover:bg-orange-600 text-white"
                    : "opacity-50 cursor-not-allowed"
                }`}
              >
                <span>Next</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NovelReaderPage;
