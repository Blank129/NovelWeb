import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Search, TrendingUp } from 'lucide-react';

interface Genre {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  novel_count: number;
}

export default function GenresPage() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const { data, error } = await supabase
        .from('genres')
        .select('*')
        .order('novel_count', { ascending: false });

      if (error) throw error;
      setGenres(data || []);
    } catch (error) {
      console.error('Error fetching genres:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredGenres = genres.filter((genre) =>
    genre.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    genre.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGenreClick = (slug: string) => {
    navigate(`/genre/${slug}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
            Khám phá thể loại
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Tìm kiếm truyện yêu thích của bạn qua hàng trăm thể loại khác nhau
          </p>
        </div>

        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Tìm kiếm thể loại..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 transition-all text-white placeholder-gray-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGenres.map((genre) => (
            <div
              key={genre.id}
              onClick={() => handleGenreClick(genre.slug)}
              className="group cursor-pointer bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-orange-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10 hover:-translate-y-1"
            >
              <div className={`h-32 bg-gradient-to-br ${genre.color} p-6 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10">
                  <span className="text-5xl mb-2 block filter drop-shadow-lg">{genre.icon}</span>
                </div>
                <div className="absolute bottom-3 right-3 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  <div className="flex items-center space-x-1 text-white text-sm font-medium">
                    <TrendingUp className="h-3 w-3" />
                    <span>{genre.novel_count.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-bold mb-2 group-hover:text-orange-400 transition-colors">
                  {genre.name}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2">
                  {genre.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredGenres.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-500 mb-4">
              <Search className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p className="text-xl">Không tìm thấy thể loại nào</p>
              <p className="text-sm mt-2">Thử tìm kiếm với từ khóa khác</p>
            </div>
          </div>
        )}

        <div className="mt-16 bg-gradient-to-r from-orange-500/10 to-pink-500/10 border border-orange-500/20 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Không tìm thấy thể loại yêu thích?</h2>
          <p className="text-gray-400 mb-6">
            Chúng tôi liên tục cập nhật thêm nhiều thể loại mới. Hãy quay lại sau nhé!
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Khám phá trang chủ
          </button>
        </div>
      </div>
    </div>
  );
}
