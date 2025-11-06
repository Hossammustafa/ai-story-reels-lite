import React, { Fragment } from 'react';
import { useLanguage } from '../language/LanguageContext';
import { usePro } from '../context/ProContext';
import { PRIVACY_POLICY_URL, TERMS_OF_SERVICE_URL } from '../constants';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  // (سنضيف هذا لاحقاً، للذهاب لشاشة "برو")
  // onNavigateToPro: () => void; 
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { t, language, setLanguage } = useLanguage();
  const { isPro } = usePro();

  if (!isOpen) {
    return null;
  }

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  return (
    // (هذه هي الخلفية المظلمة)
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
      onClick={onClose}
    >
      {/* (هذا هو المربع الأبيض/الرمادي للمحتوى) */}
      <div
        className="relative w-full max-w-md rounded-2xl bg-gray-800 text-white shadow-xl p-6"
        onClick={(e) => e.stopPropagation()} // (لمنع إغلاق المودال عند النقر بالداخل)
      >
        {/* (زر الإغلاق) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold mb-6">{t('settings')}</h2>

        <div className="space-y-4">
          {/* (خيار تغيير اللغة) */}
          <div>
            <label htmlFor="language-select" className="block text-sm font-medium text-gray-300 mb-2">
              {t('language')}
            </label>
            <select
              id="language-select"
              value={language}
              onChange={handleLanguageChange}
              className="w-full p-3 bg-gray-700 border-2 border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="en">English (US)</option>
              <option value="ar">العربية (Arabic)</option>
            </select>
          </div>

          {/* (خيار الترقية لـ "برو") */}
          {!isPro && (
            <button
              // onClick={onNavigateToPro} (سنقوم بتفعيل هذا لاحقاً عندما نربط ProScreen)
              className="w-full px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              {t('upgradeToPro')}
            </button>
          )}

          {/* (الروابط القانونية) */}
          <div className="pt-4 border-t border-gray-700 text-center">
            <a 
              href={PRIVACY_POLICY_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm text-indigo-400 hover:underline mx-3"
            >
              {t('privacyPolicy')}
            </a>
            <a 
              href={TERMS_OF_SERVICE_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm text-indigo-400 hover:underline mx-3"
            >
              {t('termsOfService')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
