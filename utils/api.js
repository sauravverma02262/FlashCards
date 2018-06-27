import { AsyncStorage } from 'react-native'

DECKS_STORAGE_KEY = 'mobile-flashcards:decksAndCards'

export function clearAllData(){
  return AsyncStorage.clear()
}

export function saveDeckTitle(title){
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [title]: {
      title: title,
      questions: []
    }
  }))  
}

export function setDecks(decks){
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(decks))  
}

export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
  	.then(formatCalendarResults)
} 

export function formatCalendarResults (results) {
  return JSON.parse(results)
}
