import React from 'react';
import { useLanguage } from '../language/LanguageContext';

interface PreviewScreenProps {
  script: string;
  onNewStory: () => void;
}

const PreviewScreen: React.FC<PreviewScreenProps> = ({ script, onNewStory }) => {
  const { t } = useLanguage();

  const handleSave = () => {
    // (ملاحظة) هذا الكود للحفظ في LocalStorage
    // سنحتاج لإضافة ملف `SavedStoriesScreen.tsx` ليعمل هذا بالكامل
    try {
      const savedStories = JSON.parse(localStorage.getItem('savedStories') || '[]');
      const newStory = {
        id: new Date().toISOString(), // معرّف فريد
        script: script,
        timestamp: Date.now()
        // (في تطبيق حقيقي، ستحفظ أيضاً الفكرة والستايل)
      };
      savedStories.unshift(newStory); // إضافة القصة الجديدة في البداية
      localStorage.setItem('savedStories', JSON.stringify(savedStories.slice(0, 50))); // حفظ آخر 50 قصة
      alert('Story saved!');
    } catch (error) {
      console.error("Failed to save story:", error);
      alert('Failed to save story.');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: t('previewTitle'),
        text: script,
      }).catch(console.error);
    } else {
      // (بديل للمتصفحات التي لا تدعم "Share")
      navigator.clipboard.writeText(script);
      alert('Story script copied to clipboard!');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 p-4 sm:p-6 lg:p-8 text-white">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t('previewTitle')}</h1>
        <button
          onClick={onNewStory}
          className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700"
        >
          {t('newStory')}
        </button>
      </header>

      <main className="flex-grow bg-gray-800 rounded-lg p-4 overflow-y-auto">
        {/* استخدام whitespace-pre-line للحفاظ على تنسيق الأسطر والفراغات من الذكاء الاصطناعي */}
        <pre className="whitespace-pre-wrap text-base font-sans">
          {script}
        </pre>
      </main>

      <footer className="mt-6 flex gap-4">
        <button
          onClick={handleSave}
          className="flex-1 px-6 py-3 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600"
        >
          {t('save')}
        </button>
        <button
          onClick={handleShare}
          className="flex-1 px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700"
        >
          {t('share')}
        </button>
      </footer>
    </div>
  );
};

export default PreviewScreen;
