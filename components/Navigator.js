import React , { Component } from 'react'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Decks from './Decks'
import DeckView from './DeckView'
import NewDeckView from './NewDeckView'
import AddCardView from './AddCardView'
import QuizView from './QuizView'
import { purple, white, red } from '../utils/colors'

const Tabs = TabNavigator({
  home: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'FlashCard - Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    },
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? red : white,
    labelStyle: {
      fontSize: 18,
      textAlign:'left',
      fontWeight: 'bold'
    },
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : red,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const Navigations = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: red,
        height: 56,
      }
    }
  },
  AddCardView: {
    screen: AddCardView,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: red,
        height: 56,
      }
    }
  },
   NewDeckView: {
    screen:  NewDeckView,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: red,
        height: 56,
      }
    }
  },
   QuizView: {
    screen: QuizView,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: red,
        height: 56,
      }
    }
  },
})
export default class MainNavigator extends Component {
  render() {
    return (
      <Navigations />
    );
  }
}

