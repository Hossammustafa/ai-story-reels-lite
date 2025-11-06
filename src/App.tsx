import { useState } from 'react';
import OnboardingScreen from './components/OnboardingScreen';
import LoginScreen from './components/LoginScreen';
import StoryInputScreen from './components/StoryInputScreen';
import StyleSelectionScreen from './components/StyleSelectionScreen';
import GenerationScreen from './components/GenerationScreen';
import PreviewScreen from './components/PreviewScreen';
import SavedStoriesScreen from './components/SavedStoriesScreen';

// (ملاحظة: هذه الملفات غير موجودة بعد، ولكننا سننشئها لاحقاً)

type Screen = 
  | 'onboarding' 
  | 'login' 
  | 'storyInput' 
  | 'styleSelection' 
  | 'generating' 
  | 'preview' 
  | 'savedStories';

function App() {
  const [screen, setScreen] = useState<Screen>('onboarding');
  const [storyIdea, setStoryIdea] = useState('');
  const [storyStyle, setStoryStyle] = useState('');
  const [generatedScript, setGeneratedScript] = useState('');

  const handleIdeaSubmit = (idea: string) => {
    setStoryIdea(idea);
    setScreen('styleSelection');
  };

  const handleStyleSubmit = (style: string) => {
    setStoryStyle(style);
    setScreen('generating');
  };

  const handleGenerationComplete = (script: string) => {
    setGeneratedScript(script);
    setScreen('preview');
  };

  const handleNewStory = () => {
    setStoryIdea('');
    setStoryStyle('');
    setGeneratedScript('');
    setScreen('storyInput');
  };

  const renderScreen = () => {
    switch (screen) {
      case 'onboarding':
        return <OnboardingScreen onComplete={() => setScreen('login')} />;
      case 'login':
        return <LoginScreen onLogin={() => setScreen('storyInput')} />;
      case 'storyInput':
        return (
          <StoryInputScreen 
            onSubmit={handleIdeaSubmit} 
            navigateToSaved={() => setScreen('savedStories')} 
          />
        );
      case 'styleSelection':
        return <StyleSelectionScreen onSelect={handleStyleSubmit} />;
      case 'generating':
        return (
          <GenerationScreen 
            idea={storyIdea} 
            style={storyStyle} 
            onComplete={handleGenerationComplete} 
          />
        );
      case 'preview':
        return <PreviewScreen script={generatedScript} onNewStory={handleNewStory} />;
      case 'savedStories':
        return <SavedStoriesScreen onBack={() => setScreen('storyInput')} />;
      default
