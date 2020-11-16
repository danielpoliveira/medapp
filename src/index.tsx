import React from 'react';
import { LogBox } from 'react-native';
import Routes from './routes';

import { ActionSheetProvider, connectActionSheet } from '@expo/react-native-action-sheet'

import { StatusBarModeProvider } from './contexts/statusBarMode';
import { AuthProvider } from './contexts/auth';

import CustomStatusBar from './components/CustomStatusBar';

LogBox.ignoreAllLogs();

const ConnectedApp = connectActionSheet<{}>(
  () =>
    <>
      <CustomStatusBar />
      <Routes />
    </>
);

const App = () => {
  return (
    <AuthProvider>
      <StatusBarModeProvider>
        <ActionSheetProvider>

          <ConnectedApp />

        </ActionSheetProvider>
      </StatusBarModeProvider>
    </AuthProvider>
  );
}

export default App;