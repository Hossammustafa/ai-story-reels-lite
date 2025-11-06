// هذا لملف الترجمة
export interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

// هذا لبيانات القصة المحفوظة
export interface SavedStory {
  id: string; // معرّف فريد (مثل تاريخ الإنشاء)
  idea: string;
  style: string;
  script: string;
  timestamp: number;
}
