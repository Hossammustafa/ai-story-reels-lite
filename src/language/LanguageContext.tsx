import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Translations } from '../types'; // (هذا الملف أنشأناه سابقاً src/types.ts)

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
};

const translations: Translations = {
  en: {
    getStarted: 'Get Started',
    welcome: 'Welcome to AI Story Reels Lite',
    welcomeDesc: 'Generate amazing reel scripts with the power of AI. Let\'s create something viral!',
    loginTitle: 'Sign In',
    loginDesc: 'Enter your credentials to continue creating.',
    loginButton: 'Login',
    storyIdeaTitle: 'What\'s your story idea?',
    storyIdeaPlaceholder: 'e.g., A cat who wants to become an astronaut',
    next: 'Next',
    selectStyleTitle: 'Select a Style',
    generatingTitle: 'Generating your masterpiece...',
    generatingDesc: 'Our AI is crafting a unique story just for you. This might take a moment.',
    previewTitle: 'Your Story is Ready!',
    save: 'Save',
    share: 'Share',
    newStory: 'New Story',
    savedStoriesTitle: 'Saved Stories',
    noSavedStories: 'You have no saved stories yet.',
    back: 'Back',
    proTitle: 'Go PRO!',
    proDesc: 'Unlock unlimited story generations, new styles, and priority support.',
    upgradeNow: 'Upgrade Now',
    settings: 'Settings',
    language: 'Language',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    upgradeToPro: 'Upgrade to PRO',
    errorGenerating: 'An error occurred while generating your story. Please try again.',
    // --- ✅ الإضافة الجديدة هنا ---
    storyIdeaDescription: 'Let your imagination run wild. What story do you want to tell? Provide a theme, a character, a plot twist - anything goes!'
  },
  ar: {
    getStarted: 'ابدأ الآن',
    welcome: 'أهلاً بك في AI Story Reels Lite',
    welcomeDesc: 'أنشئ نصوص فيديو مذهلة بقوة الذكاء الاصطناعي. لنصنع شيئًا ينتشر بسرعة!',
    loginTitle: 'تسجيل الدخول',
    loginDesc: 'أدخل بياناتك للمتابعة في الإنشاء.',
    loginButton: 'تسجيل الدخول',
    storyIdeaTitle: 'ما هي فكرة قصتك؟',
    storyIdeaPlaceholder: 'مثال: قطة تريد أن تصبح رائدة فضاء',
    next: 'التالي',
    selectStyleTitle: 'اختر النمط',
    generatingTitle: 'جاري إنشاء تحفتك الفنية...',
    generatingDesc: 'يقوم الذكاء الاصطناعي بصياغة قصة فريدة لك. قد يستغرق هذا بعض الوقت.',
    previewTitle: 'قصتك جاهزة!',
    save: 'حفظ',
    share: 'مشاركة',
    newStory: 'قصة جديدة',
    savedStoriesTitle: 'القصص المحفوظة',
    noSavedStories: 'ليس لديك قصص محفوظة بعد.',
    back: 'رجوع',
    proTitle: 'اشترك في PRO!',
    proDesc: 'احصل على عدد لا محدود من القصص، أنماط جديدة، ودعم ذو أولوية.',
    upgradeNow: 'الترقية الآن',
    settings: 'الإعدادات',
    language: 'اللغة',
    privacyPolicy: 'سياسة الخصوصية',
    termsOfService: 'شروط الخدمة',
    upgradeToPro: 'الترقية إلى PRO',
    errorGenerating: 'حدث خطأ أثناء إنشاء قصتك. يرجى المحاولة مرة أخرى.',
    // --- ✅ الإضافة الجديدة هنا ---
    storyIdeaDescription: 'أطلق العنان لخيالك. ما هي القصة التي تريد أن ترويها؟ قد تكون فكرة، شخصية، أو حدثاً مفاجئاً - كل شيء ممكن!'
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    if (language === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
    }
  }, [language]);

  const t = (key: string): string => {
    // (تم تحسينه) يختار اللغة الصحيحة أو يعود للإنجليزية إذا كان المفتاح غير موجود
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
