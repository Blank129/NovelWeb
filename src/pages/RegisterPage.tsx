import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, User, Chrome } from 'lucide-react';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleGoogleRegister = () => {
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Đăng Ký</h1>
          <p className="text-gray-400">Tạo tài khoản mới để bắt đầu</p>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Tên người dùng
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-gray-700 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Nhập tên người dùng"
                  required
                />
              </div>
            </div>

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

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                Xác nhận mật khẩu
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-gray-700 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-start">
              <input
                id="terms"
                type="checkbox"
                className="w-4 h-4 mt-1 rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-800"
                required
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-300">
                Tôi đồng ý với{' '}
                <a href="#" className="text-blue-400 hover:text-blue-300">
                  Điều khoản dịch vụ
                </a>{' '}
                và{' '}
                <a href="#" className="text-blue-400 hover:text-blue-300">
                  Chính sách bảo mật
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 transform hover:scale-105"
            >
              Đăng Ký
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-800 text-gray-400">Hoặc đăng ký với</span>
              </div>
            </div>

            <button
              onClick={handleGoogleRegister}
              className="mt-4 w-full bg-white hover:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
            >
              <Chrome size={20} />
              <span>Đăng ký với Google</span>
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-gray-400">
            Đã có tài khoản?{' '}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold transition">
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
