
import { CREATE_HISTORY_FAIL, CREATE_HISTORY_REQUEST, CREATE_HISTORY_SUCCESS, LIST_HISTORY_FAIL, LIST_HISTORY_REQUEST, LIST_HISTORY_SUCCESS, ROLL_DICE_FAIL, ROLL_DICE_REQUEST, ROLL_DICE_SUCCESS } from "../constants/diceConstants"


export const rollBetReducer = (state = { rollbet: {} }, action) => {

    switch (action.type) {
      case ROLL_DICE_REQUEST:
        return { ...state, loadinglhr: true }
      case ROLL_DICE_SUCCESS:
        return { loadinglhr: false,rollbet:action.payload }

      case ROLL_DICE_FAIL:
        return { loadinglhr: false, errorlhr: action.payload }
 
      default:
        return state
    }
  }
  
  export const createHistoryReducer = (state = { history: {} }, action) => {

    switch (action.type) {
      case CREATE_HISTORY_REQUEST:
        return { ...state, loadinglhr: true }
      case CREATE_HISTORY_SUCCESS:
        return { loadinglhr: false,rollbet:action.payload }

      case CREATE_HISTORY_FAIL:
        return { loadinglhr: false, errorlhr: action.payload }
 
      default:
        return state
    }
  }
  
  export const listHistoryReducer = (state = { HList: {} }, action) => {

    switch (action.type) {
      case LIST_HISTORY_REQUEST:
        return { ...state, loadinglhr: true }
      case LIST_HISTORY_SUCCESS:
        return { loadinglhr: false,rollbet:action.payload }

      case LIST_HISTORY_FAIL:
        return { loadinglhr: false, errorlhr: action.payload }
 
      default:
        return state
    }
  }
  
  
