import * as React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  // const uri = 'https://taskit-three.vercel.app';
  const uri = 'http://192.168.18.11:3000';
  return (
    <>
      <StatusBar style="dark" backgroundColor='#0e161f' />
      <WebView
        style={styles.container}
        source={{ uri }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
