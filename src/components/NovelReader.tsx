import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Settings, Bookmark, Menu, Sun, Moon, Type, Palette } from 'lucide-react';
import { Novel } from '../App';

interface NovelReaderProps {
  novel: Novel;
  chapter: number;
  onBackToNovel: () => void;
  onChapterChange: (chapter: number) => void;
}

const NovelReader: React.FC<NovelReaderProps> = ({ novel, chapter, onBackToNovel, onChapterChange }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showMobileControls, setShowMobileControls] = useState(false);
  const [fontSize, setFontSize] = useState(18);
  const [darkMode, setDarkMode] = useState(true);
  const [fontFamily, setFontFamily] = useState('serif');
  const [lineHeight, setLineHeight] = useState(1.6);

  // Sample chapter content
  const chapterContent = `
    Chapter ${chapter}: ${chapter === 1 ? 'The Beginning' : 'Adventure Continues'}

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

  const handleScreenTap = () => {
    // Only show controls on mobile/tablet screens
    if (window.innerWidth <= 768) {
      setShowMobileControls(!showMobileControls);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      {/* Reader Header */}
      <div className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'
      } ${showMobileControls || window.innerWidth > 768 ? 'translate-y-0' : '-translate-y-full md:translate-y-0'}`}>
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
                onClick={() => setShowSettings(!showSettings)}
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

      {/* Settings Panel */}
      {showSettings && (
        <div className={`border-b transition-all duration-300 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'
        } ${showMobileControls || window.innerWidth > 768 ? 'translate-y-0' : '-translate-y-full md:translate-y-0'}`}>
          <div className="max-w-4xl mx-auto px-4 py-6">
            <h3 className="font-semibold mb-4">Reading Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Font Size</label>
                <input
                  type="range"
                  min="14"
                  max="24"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full"
                />
                <span className="text-sm text-gray-400">{fontSize}px</span>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Line Height</label>
                <input
                  type="range"
                  min="1.2"
                  max="2.0"
                  step="0.1"
                  value={lineHeight}
                  onChange={(e) => setLineHeight(Number(e.target.value))}
                  className="w-full"
                />
                <span className="text-sm text-gray-400">{lineHeight}</span>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Font Family</label>
                <select
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                  className={`w-full p-2 rounded border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="serif">Serif</option>
                  <option value="sans-serif">Sans Serif</option>
                  <option value="monospace">Monospace</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Theme</label>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`flex items-center space-x-2 w-full p-2 rounded border transition-colors ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
                      : 'bg-white border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  <span>{darkMode ? 'Dark' : 'Light'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chapter Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div
          onClick={handleScreenTap}
          className="prose prose-lg max-w-none leading-relaxed"
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: lineHeight,
            fontFamily: fontFamily,
            color: darkMode ? '#e5e7eb' : '#374151'
          }}
        >
          <div className="whitespace-pre-line">
            {chapterContent}
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className={`sticky bottom-0 border-t transition-all duration-300 ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'
      } ${showMobileControls || window.innerWidth > 768 ? 'translate-y-0' : 'translate-y-full md:translate-y-0'}`}>
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

      {/* Mobile Reading Indicator */}
      {!showMobileControls && window.innerWidth <= 768 && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className={`px-4 py-2 rounded-full text-sm font-medium transition-opacity duration-1000 ${
            darkMode ? 'bg-gray-800/80 text-gray-300' : 'bg-white/80 text-gray-700'
          } opacity-0 animate-pulse`}>
            Tap screen for controls
          </div>
        </div>
      )}
    </div>
  );
};

export default NovelReader;