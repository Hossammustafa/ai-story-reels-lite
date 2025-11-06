import React, { useEffect } from 'react';
import { useLanguage } from '../language/LanguageContext';
import { generateStory } from '../services/geminiService'; // (هذا هو الملف الذي أنشأناه)

interface GenerationScreenProps {
  idea: string;
  style: string;
  onComplete: (script: string) => void;
}

const GenerationScreen: React.FC<GenerationScreenProps> = ({ idea, style, onComplete }) => {
  const { t } = useLanguage();

  useEffect(() => {
    const getStory = async () => {
      try {
        // (هنا يتم استدعاء الذكاء الاصطناعي)
        const script = await generateStory(idea, style);
        onComplete(script);
      } catch (error) {
        console.error(error);
        alert(t('errorGenerating'));
        // (في تطبيق حقيقي، قد ترغب في إعادته إلى الشاشة السابقة)
        // في هذا القالب، سنقوم بإعادته إلى شاشة الإدخال
        window.location.reload(); // أبسط طريقة لإعادة التعيين
      }
    };

    getStory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // يتم تشغيله مرة واحدة فقط عند تحميل المكون

  return (
    <div className="flex flex-col min-h-screen items-center justify-center text-center p-6 bg-gray-900 text-white">
      <div className="max-w-md">
        {/* (هذا هو Spinner بسيط) */}
        <svg className="animate-spin h-12 w-12 text-indigo-400 mx-auto mb-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <h1 className="text-3xl font-bold mb-4">{t('generatingTitle')}</h1>
        <p className="text-lg text-gray-400">
          {t('generatingDesc')}
        </p>
      </div>
    </div>
  );
};

export default GenerationScreen;
