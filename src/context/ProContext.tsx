import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

type ProContextType = {
  isPro: boolean;
  setIsPro: (isPro: boolean) => void;
};

const ProContext = createContext<ProContextType | undefined>(undefined);

export const ProProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // (تم الإصلاح) القراءة من LocalStorage عند بدء التشغيل
  const [isPro, setIsPro] = useState(() => {
    try {
      const savedIsPro = localStorage.getItem('isPro');
      return savedIsPro ? JSON.parse(savedIsPro) : false;
    } catch (error) {
      console.error("Failed to parse isPro from localStorage", error);
      return false;
    }
  });

  // (تم الإصلاح) الكتابة في LocalStorage عند كل تغيير
  useEffect(() => {
    try {
      localStorage.setItem('isPro', JSON.stringify(isPro));
    } catch (error) {
      console.error("Failed to save isPro to localStorage", error);
    }
  }, [isPro]); // التشغيل فقط عند تغير قيمة isPro

  return (
    <ProContext.Provider value={{ isPro, setIsPro }}>
      {children}
    </ProContext.Provider>
  );
};

export const usePro = (): ProContextType => {
  const context = useContext(ProContext);
  if (!context) {
    throw new Error('usePro must be used within a ProProvider');
  }
  return context;
};
