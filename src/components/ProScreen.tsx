import React from 'react';
import { useLanguage } from '../language/LanguageContext';
import { usePro } from '../context/ProContext';

interface ProScreenProps {
  onBack: () => void; // (للرجوع للشاشة السابقة)
}

const ProScreen: React.FC<ProScreenProps> = ({ onBack }) => {
  const { t } = useLanguage();
  const { setIsPro } = usePro();

  const handleUpgrade = () => {
    // (هذا مثال فقط)
    // في تطبيق حقيقي، هنا تضع كود الدفع (مثل Stripe أو Gumroad)
    // بعد نجاح الدفع، تقوم بتفعيل "برو"
    alert('Upgrade Successful! (This is a demo)');
    setIsPro(true); // (تفعيل "برو" باستخدام الـ Context الذي أنشأناه)
    onBack(); // الرجوع للشاشة الرئيسية
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 p-4 sm:p-6 lg:p-8 text-white">
      <header className="flex items-center mb-6">
        <button onClick={onBack} className="text-white mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold">{t('proTitle')}</h1>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center text-center">
        <div className="bg-gray-800 p-8 rounded-2xl shadow-xl max-w-lg">
          <span className="text-5xl mb-4">✨</span>
          <h2 className="text-3xl font-bold mb-4">{t('proTitle')}</h2>
          <p className="text-gray-400 mb-8">
            {t('proDesc')}
          </p>

          {/* (هنا تضع قائمة بالميزات) */}
          <ul className="text-left space-y-2 mb-8 text-gray-300">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span> Unlimited Story Generations
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span> Access to All Premium Styles
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span> Priority Support
            </li>
          </ul>

          <button
            onClick={handleUpgrade}
            className="w-full px-8 py-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 transform transition-transform hover:scale-105"
          >
            {t('upgradeNow')}
          </button>
        </div>
      </main>
    </div>
  );
};

export default ProScreen;
