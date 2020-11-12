import React from 'react';
import { LogBox } from 'react-native';
import Routes from './routes';

import { StatusBarModeProvider } from './contexts/statusBarMode';

LogBox.ignoreAllLogs();

const App = () => {
  return (
    <StatusBarModeProvider>
      <Routes />
    </StatusBarModeProvider>
  );
}

export default App;