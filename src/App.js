import React, { useState } from 'react';
import { StatusBar, Image } from 'react-native';
import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './theme';
import Navigation from './navigations';
import { ProgressProvider, UserProvider } from './contexts';

//미리 불러오기
const cacheImages = images => {
  return images.map(image => {
    if(typeof image === 'string') {
      //나중에 사용될 이미지를 미리 다운로드받아 디스크 캐쉬로 미리 가져온다. Promise 리턴
      return Image.prefetch(image);
    } else {
      //모듈에서 사용될 이미지일경우 디스크 캐쉬로.
      return Asset.fromModule(image).downloadAsync();
    }
  });
};
//폰트 캐쉬
const cacheFonts = fonts => {
  return fonts.map(font => Font.loadAsync(font));
};

const App = () => {
  const [isReady, setIsReady] = useState(false);

  const _loadAssets = async () => {
    const imageAssets = cacheImages([]);
    const fontAssets = cacheFonts([]);

    await Promise.all([...imageAssets, ...fontAssets]);
  };

  return isReady ? (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <ProgressProvider>
          <StatusBar barStyle="dark-content" />
          <Navigation />
        </ProgressProvider>
      </UserProvider>
    </ThemeProvider>
  ) : (
    <AppLoading
      startAsync={_loadAssets}
      onFinish={() => setIsReady(true)}
      onError={console.warn}
      />
  );
}

export default App;
