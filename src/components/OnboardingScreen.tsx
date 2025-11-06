import React from 'react';
import { useLanguage } from '../language/LanguageContext';

interface OnboardingScreenProps {
  onComplete: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen items-center justify-center text-center p-6 bg-gray-900 text-white">
      <div className="max-w-md">
        {/* يمكنك إضافة أيقونة أو لوجو هنا */}
        <h1 className="text-4xl font-bold mb-4">{t('welcome')}</h1>
        <p className="text-lg text-gray-400 mb-12">
          {t('welcomeDesc')}
        </p>
        <button
          onClick={onComplete}
          className="w-full px-8 py-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 transform transition-transform hover:scale-105"
        >
          {t('getStarted')}
        </button>
      </div>
    </div>
  );
};

export default OnboardingScreen;
