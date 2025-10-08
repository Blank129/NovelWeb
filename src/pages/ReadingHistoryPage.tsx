import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAppSelector } from '../app/store';
import { Clock, BookOpen, Trash2, AlertCircle } from 'lucide-react';

interface ReadingHistoryItem {
  id: string;
  novel_id: string;
  novel_title: string;
  novel_cover: string | null;
  chapter_number: number;
  chapter_title: string;
  progress: number;
  last_read_at: string;
}

export default function ReadingHistoryPage() {
  const [history, setHistory] = useState<ReadingHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchHistory();
  }, [user, navigate]);

  const fetchHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('reading_history')
        .select('*')
        .order('last_read_at', { ascending: false });

      if (error) throw error;
      setHistory(data || []);
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteHistoryItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('reading_history')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setHistory(history.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting history:', error);
    }
  };

  const clearAllHistory = async () => {
    if (!confirm('Bạn có chắc muốn xóa toàn bộ lịch sử đọc?')) return;

    try {
      const { error } = await supabase
        .from('reading_history')
        .delete()
        .eq('user_id', user?.id);

      if (error) throw error;
      setHistory([]);
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    if (diffDays < 7) return `${diffDays} ngày trước`;
    return date.toLocaleDateString('vi-VN');
  };

  const handleContinueReading = (item: ReadingHistoryItem) => {
    navigate(`/novel/${item.novel_id}/chapter/${item.chapter_number}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
              <Clock className="h-8 w-8 text-orange-500" />
              Lịch sử đọc truyện
            </h1>
            <p className="text-gray-400">
              {history.length} truyện đã đọc
            </p>
          </div>
          {history.length > 0 && (
            <button
              onClick={clearAllHistory}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Xóa tất cả
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gray-800 rounded-xl p-12 max-w-md mx-auto">
              <AlertCircle className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Chưa có lịch sử đọc</h2>
              <p className="text-gray-400 mb-6">
                Bắt đầu đọc truyện để xem lịch sử tại đây
              </p>
              <button
                onClick={() => navigate('/')}
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Khám phá truyện
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((item) => (
              <div
                key={item.id}
                className="bg-gray-800 rounded-xl border border-gray-700 hover:border-orange-500/50 transition-all overflow-hidden group"
              >
                <div className="flex gap-4 p-4">
                  <div className="flex-shrink-0">
                    <img
                      src={item.novel_cover || 'https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg'}
                      alt={item.novel_title}
                      className="w-24 h-32 object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-orange-400 transition-colors truncate">
                      {item.novel_title}
                    </h3>

                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                      <BookOpen className="h-4 w-4" />
                      <span>Chương {item.chapter_number}: {item.chapter_title}</span>
                    </div>

                    <div className="mb-3">
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                        <span>Tiến độ đọc</span>
                        <span>{item.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-orange-500 to-pink-500 h-full transition-all"
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>{formatDate(item.last_read_at)}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleContinueReading(item)}
                          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                        >
                          Đọc tiếp
                        </button>
                        <button
                          onClick={() => deleteHistoryItem(item.id)}
                          className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-400 hover:text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
