import React from 'react';
import { useLanguage } from '../language/LanguageContext';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const { t } = useLanguage();

  // هذا مجرد مثال، يمكنك إضافة نظام تسجيل دخول حقيقي لاحقاً
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(); // يتم تسجيل الدخول مباشرة لأغراض هذا القالب
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-6 bg-gray-900 text-white">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-4">{t('loginTitle')}</h1>
        <p className="text-gray-400 text-center mb-8">{t('loginDesc')}</p>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              className="w-full p-3 bg-gray-800 border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className="w-full p-3 bg-gray-800 border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 transform transition-transform hover:scale-105"
          >
            {t('loginButton')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
