import React , { Component } from 'react';
import { Text, View, StatusBar } from 'react-native'
import { purple, white, red } from './utils/colors'
import { Provider } from 'react-redux'
import store from './store'
import { Constants } from 'expo'
import Navigations from './components/Navigator'
import { setLocalNotification, clearLocalNotification } from './utils/helpers'

function AppStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends Component {
  componentDidMount(){
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={store}>
      <View style={{flex: 1}}>
          <AppStatusBar backgroundColor={red} barStyle="light-content" />
          <Navigations />
      </View>
      </Provider>
    );
  }
}
