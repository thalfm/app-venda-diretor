import 'react-native-gesture-handler';
import { YellowBox } from 'react-native';
import React from 'react';
import NavigationContainer from './src/navigators/NavigationContainer';
import { Provider as StoreProvider } from 'react-redux'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import store from './src/store'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ContextProvider from './src/globalState/state';
import SnackBar from './src/components/SnackBar'
import DialogBar from './src/components/DialogBar'
import Spinner from './src/components/Spinner'

YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested',
  'componentWillUpdate has been renamed',
  'componentWillReceiveProps has been renamed',
  "Can't perform a React state update on an unmounted component"
])

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
            <NavigationContainer />
            <DialogBar />
            <SnackBar />
            <Spinner />
         </ContextProvider>
      </PaperProvider>
    </StoreProvider>
  );
}