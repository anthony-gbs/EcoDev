import React, { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import MainMenu from './components/MainMenu';
import SubmitWaste from './components/SubmitWaste';
import WasteHistory from './components/WasteHistory';

type Screen = 'login' | 'menu' | 'submit' | 'history';

interface User {
  id: string;
  name: string;
  email: string;
}

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentScreen('menu');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('login');
  };

  const handleNavigate = (screen: 'submit' | 'history') => {
    setCurrentScreen(screen);
  };

  const handleBackToMenu = () => {
    setCurrentScreen('menu');
  };

  const handleSubmitWaste = (description: string, imageFile?: File) => {
    // This would normally send data to an API
    console.log('Submitting waste:', { description, imageFile });
  };

  if (currentScreen === 'login') {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  switch (currentScreen) {
    case 'menu':
      return (
        <MainMenu
          user={user}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
      );
    case 'submit':
      return (
        <SubmitWaste
          onBack={handleBackToMenu}
          onSubmit={handleSubmitWaste}
        />
      );
    case 'history':
      return (
        <WasteHistory
          onBack={handleBackToMenu}
        />
      );
    default:
      return (
        <MainMenu
          user={user}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
      );
  }
}

export default App;