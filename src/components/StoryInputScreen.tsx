import React, { useState } from 'react';
import { useLanguage } from '../language/LanguageContext';
import SettingsModal from './SettingsModal'; // (سننشئ هذا الملف لاحقاً)
import { APP_NAME } from '../constants';

interface StoryInputScreenProps {
  onSubmit: (idea: string) => void;
  navigateToSaved: () => void;
}

const StoryInputScreen: React.FC<StoryInputScreenProps> = ({ onSubmit, navigateToSaved }) => {
  const [idea, setIdea] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { t, language } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idea.trim()) {
      onSubmit(idea.trim());
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 p-4 sm:p-6 lg:p-8">
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-xl font-bold text-white">{APP_NAME}</h1>
        <div>
            {/* (ممتاز) هذا الكود يدعم RTL بشكل صحيح */}
            <button onClick={navigateToSaved} className={`text-gray-400 hover:text-white ${language === 'ar' ? 'ml-4' : 'mr-4'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
            </button>
            <button onClick={() => setIsSettingsOpen(true)} className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826 3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </button>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('storyIdeaTitle')}</h2>

        {/* (تم الإصلاح) استخدام دالة الترجمة t() هنا */}
        <p className="text-gray-400 mb-8 max-w-xl">{t('storyIdeaDescription')}</p>

        <form onSubmit={handleSubmit} className="w-full max-w-lg">
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder={t('storyIdeaPlaceholder')}
            className="w-full h-32 p-4 bg-gray-800 border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
            rows={4}
          />
          <button
            type="submit"
            disabled={!idea.trim()} // (ممتاز) تعطيل الزر إذا كان الإدخال فارغاً
            className="mt-6 w-full px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 disabled:bg-gray-700 disabled:cursor-not-allowed transform transition-transform hover:scale-105"
          >
            {t('next')}
          </button>
        </form>
      </main>

      {/* (ملاحظة) هذا المكون غير موجود بعد، ولكننا سننشئه لاحقاً */}
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
};

export default StoryInputScreen;
