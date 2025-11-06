import React from 'react';
import { useLanguage } from '../language/LanguageContext';

interface StyleSelectionScreenProps {
  onSelect: (style: string) => void;
}

// يمكنك تعديل هذه الأنماط كما تريد
const styles = [
  { id: 'cinematic', label: 'Cinematic', emoji: '🎬' },
  { id: 'funny', label: 'Funny', emoji: '😂' },
  { id: 'inspirational', label: 'Inspirational', emoji: '✨' },
  { id: 'dramatic', label: 'Dramatic', emoji: '🎭' },
  { id: 'educational', label: 'Educational', emoji: '📚' },
  { id: 'suspenseful', label: 'Suspenseful', emoji: '🤫' },
];

const StyleSelectionScreen: React.FC<StyleSelectionScreenProps> = ({ onSelect }) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen items-center p-6 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold text-center my-12">{t('selectStyleTitle')}</h1>

      <div className="w-full max-w-lg grid grid-cols-2 gap-4">
        {styles.map((style) => (
          <button
            key={style.id}
            onClick={() => onSelect(style.id)}
            className="flex flex-col items-center justify-center p-6 bg-gray-800 border-2 border-gray-700 rounded-lg text-white hover:bg-gray-700 hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transform transition-all hover:scale-105"
          >
            <span className="text-4xl mb-2">{style.emoji}</span>
            <span className="text-lg font-semibold">{style.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StyleSelectionScreen;
