import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Chrome } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleGoogleLogin = () => {
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Đăng Nhập</h1>
          <p className="text-gray-400">Chào mừng bạn trở lại</p>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-700 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="example@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Mật khẩu
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-700 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-800"
                />
                <span className="ml-2 text-sm text-gray-300">Ghi nhớ đăng nhập</span>
              </label>
              <a href="#" className="text-sm text-blue-400 hover:text-blue-300 transition">
                Quên mật khẩu?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 transform hover:scale-105"
            >
              Đăng Nhập
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-800 text-gray-400">Hoặc đăng nhập với</span>
              </div>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="mt-4 w-full bg-white hover:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
            >
              <Chrome size={20} />
              <span>Đăng nhập với Google</span>
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-gray-400">
            Chưa có tài khoản?{' '}
            <Link to="/register" className="text-blue-400 hover:text-blue-300 font-semibold transition">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
