import {INITIAL_LOAD_DECKS, SAVED_MODIFIED_DECKS, RESET_DECKS} from '../types'

function decks (state = { decks:{}, ready: false }, action) {
  switch (action.type) {
    case INITIAL_LOAD_DECKS:
      return {
        ...state,  
        decks: action.decks,
        ready: true
      }
    case SAVED_MODIFIED_DECKS:
      return {
        ...state,  
        decks: action.decks
      }
    case RESET_DECKS:
      return {
        ...state,  
        decks: {},
        ready: true
      }
    default :
      return state
  }
}

export default decks
