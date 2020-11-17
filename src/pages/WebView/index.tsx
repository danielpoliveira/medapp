import React from 'react';
import { WebView } from 'react-native-webview';
import CustomStatusBar from '../../components/CustomStatusBar';

const CustomWebView = ({ navigation, route }, any) => {
  const { uri } = route.params ?? { uri: null };
  return (
    <React.Fragment>
      <CustomStatusBar background="#FFFFFF" mode="dark" />

      <WebView
        source={{ uri: uri ?? 'https://google.com' }} 
      />
    </React.Fragment>
  );
}

export default CustomWebView;