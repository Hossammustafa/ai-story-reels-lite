import React, { useState, useEffect } from 'react';
import { useLanguage } from '../language/LanguageContext';
import { SavedStory } from '../types'; // (هذا الملف أنشأناه سابقاً src/types.ts)

interface SavedStoriesScreenProps {
  onBack: () => void;
}

const SavedStoriesScreen: React.FC<SavedStoriesScreenProps> = ({ onBack }) => {
  const { t } = useLanguage();
  const [stories, setStories] = useState<SavedStory[]>([]);

  useEffect(() => {
    // تحميل القصص المحفوظة عند فتح الشاشة
    try {
      const savedStories = JSON.parse(localStorage.getItem('savedStories') || '[]');
      setStories(savedStories);
    } catch (error) {
      console.error("Failed to load saved stories:", error);
      setStories([]);
    }
  }, []);

  const deleteStory = (id: string) => {
    const updatedStories = stories.filter(story => story.id !== id);
    setStories(updatedStories);
    localStorage.setItem('savedStories', JSON.stringify(updatedStories));
  };

  const shareStory = (script: string) => {
    if (navigator.share) {
      navigator.share({ title: 'My AI Story', text: script }).catch(console.error);
    } else {
      navigator.clipboard.writeText(script);
      alert('Story script copied to clipboard!');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 p-4 sm:p-6 lg:p-8 text-white">
      <header className="flex items-center mb-6">
        <button onClick={onBack} className="text-white mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold">{t('savedStoriesTitle')}</h1>
      </header>

      <main className="flex-grow overflow-y-auto">
        {stories.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-lg">{t('noSavedStories')}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {stories.map((story) => (
              <div key={story.id} className="bg-gray-800 rounded-lg p-4">
                <p className="text-gray-300 line-clamp-3 mb-3">
                  {story.script}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    {new Date(story.timestamp).toLocaleString()}
                  </span>
                  <div>
                    <button onClick={() => shareStory(story.script)} className="text-green-400 hover:text-green-300 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                      </svg>
                    </button>
                    <button onClick={() => deleteStory(story.id)} className="text-red-400 hover:text-red-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default SavedStoriesScreen;
