import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Settings, Bookmark, Menu, Sun, Moon, Type, Palette, X, Home, Play, Pause, Volume2 } from 'lucide-react';
import { Novel } from '../App';

interface NovelReaderProps {
  novel: Novel;
  chapter: number;
  onBackToNovel: () => void;
  onChapterChange: (chapter: number) => void;
}

const NovelReader: React.FC<NovelReaderProps> = ({ novel, chapter, onBackToNovel, onChapterChange }) => {
  const [showMobileSettings, setShowMobileSettings] = useState(false);
  const [fontSize, setFontSize] = useState(18);
  const [darkMode, setDarkMode] = useState(true);
  const [fontFamily, setFontFamily] = useState('Default');
  const [lineHeight, setLineHeight] = useState(1.6);
  const [language, setLanguage] = useState('English');
  const [isPlaying, setIsPlaying] = useState(false);

  const chapterContent = `
    Chapter ${chapter}: ${chapter === 1 ? 'Young Lord, Gu Change' : 'Adventure Continues'}

    The morning sun cast long shadows across the ancient training grounds as Jin-Woo stepped forward. His heart pounded with anticipation, knowing that today would mark the beginning of his true journey.

    "You've come far," Master Chen observed, his weathered hands clasped behind his back. "But this is only the beginning. The path ahead will test not just your strength, but your resolve."

    Jin-Woo nodded solemnly. He had trained for months to reach this point, pushing his body and mind to their limits. The System had awakened within him, granting him abilities beyond normal comprehension, but he knew that power without wisdom was meaningless.

    The training dummy before him seemed to pulse with an otherworldly energy. This wasn't just any ordinary practice target – it was infused with mana crystals that would react to his spiritual pressure.

    "Remember," Master Chen continued, "true strength comes not from the power you wield, but from understanding when and how to use it. Show me what you've learned."

    Taking a deep breath, Jin-Woo centered himself. He could feel the energy flowing through his meridians, the familiar warmth of qi circulation that had become second nature to him. But today felt different. Today, he could sense something more – a deeper connection to the world around him.

    His hand moved to the hilt of his sword, the blade that had been reforged with materials from the Shadow Realm. As his fingers wrapped around the familiar grip, he felt the weapon respond to his touch, humming with barely contained power.

    The first strike came without warning, a blur of motion that left a trail of silver light in the air. The training dummy exploded into fragments, but before the pieces could hit the ground, they reformed, held together by the crystalline matrix within.

    "Impressive," Master Chen murmured. "Your control has improved significantly. But can you maintain that precision under pressure?"

    Without another word, the master gestured toward the forest beyond the training grounds. Dark shapes began to emerge from between the trees – shadow beasts that served as the ultimate test for any aspiring martial artist.

    Jin-Woo's eyes hardened with determination. This was what he had been preparing for. The real test was about to begin.
  `;

  const totalChapters = novel.chapters;
  const hasNextChapter = chapter < totalChapters;
  const hasPreviousChapter = chapter > 1;

  const handleNextChapter = () => {
    if (hasNextChapter) {
      onChapterChange(chapter + 1);
    }
  };

  const handlePreviousChapter = () => {
    if (hasPreviousChapter) {
      onChapterChange(chapter - 1);
    }
  };

  const handleScreenTap = (e: React.MouseEvent) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      setShowMobileSettings(true);
    }
  };

  const fontOptions = ['Default', 'Dyslexic', 'Roboto', 'Lora'];
  const languageOptions = ['English', 'Vietnamese', 'Chinese', 'Japanese', 'Korean'];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      {/* Desktop Header - Always visible on desktop */}
      <div className={`hidden md:block sticky top-0 z-50 border-b transition-all duration-300 ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'
      }`}>
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBackToNovel}
              className={`flex items-center space-x-2 transition-colors ${
                darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <ChevronLeft className="h-5 w-5" />
              <span>Back</span>
            </button>

            <div className="text-center">
              <h1 className="font-semibold truncate max-w-xs">{novel.title}</h1>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Chapter {chapter} of {totalChapters}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                className={`p-2 rounded-lg transition-colors ${
                  darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                }`}
              >
                <Bookmark className="h-5 w-5" />
              </button>
              <button
                className={`p-2 rounded-lg transition-colors ${
                  darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
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
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowMobileSettings(false)}
          ></div>
          
          {/* Settings Panel - Bottom 1/3 of screen */}
          <div className="absolute bottom-0 left-0 right-0 bg-gray-900 text-white rounded-t-2xl shadow-2xl animate-slide-up" style={{ height: '33vh' }}>
            {/* Mobile Settings Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
              <h2 className="text-base font-semibold">Chapter {chapter}: Young Lord, Gu Change</h2>
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
                      ? 'bg-gray-700 hover:bg-gray-600' 
                      : 'bg-gray-800 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <button
                  onClick={onBackToNovel}
                  className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <Home className="h-5 w-5" />
                </button>

                <button
                  className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <Settings className="h-5 w-5" />
                </button>

                <button
                  onClick={handleNextChapter}
                  disabled={!hasNextChapter}
                  className={`p-2 rounded-lg transition-colors ${
                    hasNextChapter 
                      ? 'bg-gray-700 hover:bg-gray-600' 
                      : 'bg-gray-800 opacity-50 cursor-not-allowed'
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
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
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
                      style={{
                        background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((fontSize - 14) / (28 - 14)) * 100}%, #374151 ${((fontSize - 14) / (28 - 14)) * 100}%, #374151 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>14</span>
                      <span>16</span>
                      <span className="text-blue-400 font-bold">{fontSize}</span>
                      <span>20</span>
                      <span>22</span>
                      <span>24</span>
                      <span>26</span>
                      <span>28</span>
                    </div>
                  </div>
                  <span className="text-xl">A⁺</span>
                </div>
              </div>

              {/* Translation Section */}
              <div className="px-4 py-3 border-b border-gray-700">
                <h3 className="text-center text-gray-400 text-sm mb-2">Translation</h3>
                <div className="flex items-center space-x-3">
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-1.5 text-white text-sm"
                  >
                    {languageOptions.map((lang) => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                  <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors">
                    Select Lang
                  </button>
                </div>
              </div>

              {/* Text to Speech Section */}
              <div className="px-4 py-3">
                <h3 className="text-center text-gray-400 text-sm mb-2">Text to Speech</h3>
                <div className="flex items-center justify-center space-x-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </button>
                  
                  <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                    <div className="w-5 h-5 bg-white rounded-sm"></div>
                  </button>

                  <select className="bg-gray-700 border border-gray-600 rounded-lg px-2 py-1.5 text-white text-xs">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </select>

                  <select className="bg-gray-700 border border-gray-600 rounded-lg px-2 py-1.5 text-white text-xs">
                    <option>Tiếng Anh Vương quốc Anh</option>
                    <option>Tiếng Việt</option>
                    <option>English US</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chapter Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div
          onClick={handleScreenTap}
          className="prose prose-lg max-w-none leading-relaxed cursor-pointer md:cursor-default"
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: lineHeight,
            fontFamily: fontFamily === 'Default' ? 'system-ui' : 
                       fontFamily === 'Dyslexic' ? 'OpenDyslexic, monospace' :
                       fontFamily === 'Roboto' ? 'Roboto, sans-serif' :
                       fontFamily === 'Lora' ? 'Lora, serif' : 'system-ui',
            color: darkMode ? '#e5e7eb' : '#374151'
          }}
        >
          <div className="whitespace-pre-line">
            {chapterContent}
          </div>
        </div>
      </div>

      {/* Desktop Navigation Footer */}
      <div className={`hidden md:block sticky bottom-0 border-t transition-all duration-300 ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'
      }`}>
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handlePreviousChapter}
              disabled={!hasPreviousChapter}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                hasPreviousChapter
                  ? darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                  : 'opacity-50 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>

            <div className="text-center">
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {chapter} / {totalChapters}
              </div>
              <div className={`w-48 h-2 rounded-full mt-1 ${
                darkMode ? 'bg-gray-700' : 'bg-gray-300'
              }`}>
                <div
                  className="h-full bg-orange-500 rounded-full transition-all duration-300"
                  style={{ width: `${(chapter / totalChapters) * 100}%` }}
                ></div>
              </div>
            </div>

            <button
              onClick={handleNextChapter}
              disabled={!hasNextChapter}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                hasNextChapter
                  ? darkMode 
                    ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                    : 'bg-orange-500 hover:bg-orange-600 text-white'
                  : 'opacity-50 cursor-not-allowed'
              }`}
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Footer - Only visible when settings are closed */}
      {!showMobileSettings && (
        <div className={`md:hidden fixed bottom-0 left-0 right-0 border-t transition-all duration-300 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'
        }`}>
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={handlePreviousChapter}
                disabled={!hasPreviousChapter}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  hasPreviousChapter
                    ? darkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                    : 'opacity-50 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </button>

              <div className="text-center">
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {chapter} / {totalChapters}
                </div>
                <div className={`w-32 h-2 rounded-full mt-1 ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-300'
                }`}>
                  <div
                    className="h-full bg-orange-500 rounded-full transition-all duration-300"
                    style={{ width: `${(chapter / totalChapters) * 100}%` }}
                  ></div>
                </div>
              </div>

              <button
                onClick={handleNextChapter}
                disabled={!hasNextChapter}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  hasNextChapter
                    ? darkMode 
                      ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                      : 'bg-orange-500 hover:bg-orange-600 text-white'
                    : 'opacity-50 cursor-not-allowed'
                }`}
              >
                <span>Next</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Reading Hint - Only show when settings are closed */}
      {!showMobileSettings && (
        <div className="md:hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className={`px-4 py-2 rounded-full text-sm font-medium transition-opacity duration-1000 ${
            darkMode ? 'bg-gray-800/80 text-gray-300' : 'bg-white/80 text-gray-700'
          } opacity-0 animate-pulse`}>
            Tap screen for settings
          </div>
        </div>
      )}
    </div>
  );
};

export default NovelReader;