import { PROVABILITY_CHANGE_FAIL, PROVABILITY_CHANGE_REQUEST, PROVABILITY_CHANGE_SUCCESS, PROVABILITY_DETAIL_FAIL, PROVABILITY_DETAIL_REQUEST, PROVABILITY_DETAIL_SUCCESS } from "../constants/provabilityConstants"

export const provabilityDetailReducer = (state = { provability: {} }, action) => {
    switch (action.type) {
      case PROVABILITY_DETAIL_REQUEST:
        return { ...state, loadingpdr: true }
      case PROVABILITY_DETAIL_SUCCESS:
        return { loadingpdr: false, provability: action.payload }
  
      case PROVABILITY_DETAIL_FAIL:
        return { loadingpdr: false, errorpdr: action.payload }
 
      default:
        return state
    }
  }
  


  export const provabilityChangeReducer = (state = { msg: {} }, action) => {
    switch (action.type) {
      case PROVABILITY_CHANGE_REQUEST:
        return { ...state, loadingpcr: true }
      case PROVABILITY_CHANGE_SUCCESS:
        return { loadingpcr: false, msg: action.payload }
  
      case PROVABILITY_CHANGE_FAIL:
        return { loadingpcr: false, errorpcr: action.payload }
 
      default:
        return state
    }
  }
  
