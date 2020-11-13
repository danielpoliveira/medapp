import React from 'react';
import { LogBox } from 'react-native';
import Routes from './routes';

import { StatusBarModeProvider } from './contexts/statusBarMode';
import { AuthProvider } from './contexts/auth';

import CustomStatusBar from './components/CustomStatusBar';

LogBox.ignoreAllLogs();

const App = () => {
  return (
    <AuthProvider>
      <StatusBarModeProvider>
        <CustomStatusBar />
        <Routes />
      </StatusBarModeProvider>
    </AuthProvider>
  );
}

export default App;