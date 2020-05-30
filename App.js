import 'react-native-gesture-handler';
import { YellowBox } from 'react-native';
import React from 'react';
import Routes from './src/routes';
import { Provider as StoreProvider } from 'react-redux'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import store from './src/store'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ContextProvider from './src/globalState/state';
import SnackBar from './src/Components/SnackBar'
import DialogBar from './src/Components/DialogBar'

YellowBox.ignoreWarnings(['componentWillReceiveProps']);

const theme = {
  ...DefaultTheme,
  roundness: 4,
  dark: true,
  mode: 'exact',
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF',
    primary: '#5677fc',
    accent: '#FFFFFF',
  },
};


export default function App() {
  return (
    <StoreProvider store={store}>
      <PaperProvider
        theme={theme}
        settings={{
          icon: props => <MaterialIcons {...props} />,
        }}
      >
         <ContextProvider>
            <Routes />
            <DialogBar />
            <SnackBar />
         </ContextProvider>
      </PaperProvider>
    </StoreProvider>
  );
}