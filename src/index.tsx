import React from 'react';
import { LogBox } from 'react-native';
import Routes from './routes';

import { ActionSheetProvider, connectActionSheet } from '@expo/react-native-action-sheet'

import { DropDownComponentProvider } from '../src/contexts/dropDown';
import { AuthProvider } from './contexts/auth';

LogBox.ignoreAllLogs();

const AppContent = () => {
  return (
    <Routes />
  );
}

const ConnectedApp = connectActionSheet<{}>(AppContent);

const App = () => {
  return (
    <DropDownComponentProvider>
      <AuthProvider>
        <ActionSheetProvider>

          <ConnectedApp />

        </ActionSheetProvider>
      </AuthProvider>
    </DropDownComponentProvider>
  );
}

export default App;