import React, { useEffect, useState } from 'react';
import { useLanguage } from '../language/LanguageContext';
import { generateStory } from '../services/geminiService'; // (هذا هو الملف الذي أنشأناه)

interface GenerationScreenProps {
  idea: string;
  style: string;
  onComplete: (script: string) => void;
}

const GenerationScreen: React.FC<GenerationScreenProps> = ({ idea, style, onComplete }) => {
  const { t } = useLanguage();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    generateStory(idea, style)
      .then((script) => {
        if (!cancelled) onComplete(script);
      })
      .catch((generationError) => {
        console.error('[v0] Story generation failed:', generationError);
        if (!cancelled) setError(t('errorGenerating'));
      });

    return () => {
      cancelled = true;
    };
  }, [idea, style, onComplete, t]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900 p-6 text-center text-white">
        <div className="max-w-md">
          <h1 className="mb-4 text-3xl font-bold">{error}</h1>
          <p className="mb-6 text-gray-400">Please go back and try again.</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-lg bg-indigo-600 px-6 py-3 font-bold transition hover:bg-indigo-700"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

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
