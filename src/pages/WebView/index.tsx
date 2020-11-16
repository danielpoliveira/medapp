import React from 'react';
import { WebView } from 'react-native-webview';

const CustomWebView = ({ navigation, route }, any) => {

  const { uri } = route.params ?? { uri: null };

  console.log(uri);
  

  return (
    <WebView 
      //style={{flex:1}}
      source={{ uri: uri ?? 'https://google.com' }} />
  );
}

export default CustomWebView;