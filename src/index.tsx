import React from 'react';
import { LogBox } from 'react-native';
import Routes from './routes';

import CustomStatusBar from './components/CustomStatusBar';
import { StatusBarModeProvider } from './contexts/statusBarMode';

LogBox.ignoreAllLogs();

const App = () => {
  return (
    <StatusBarModeProvider>
      <CustomStatusBar />
      <Routes />
    </StatusBarModeProvider>
  );
}

export default App;