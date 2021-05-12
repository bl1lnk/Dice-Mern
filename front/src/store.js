import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'


import {
  userLoginReducer,
  userDetailReducer,
  userRegisterReducer,
} from './reducers/userReducers'

import {provabilityChangeReducer, provabilityDetailReducer} from './reducers/provabilityReducers'
import {rollBetReducer, createHistoryReducer,listHistoryReducer} from './reducers/diceReducers'

const reducer = combineReducers({

  userLogin: userLoginReducer,
  CreateHistoryBet:createHistoryReducer,
  userRegister: userRegisterReducer,
  userDetail: userDetailReducer,
  provabilityDetail :provabilityDetailReducer,
  provabilityChange: provabilityChangeReducer,
  rollBet: rollBetReducer,
  historyList: listHistoryReducer,

})


const userDetails = localStorage.getItem('userDetail')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

  const Historylist = localStorage.getItem('Historylist')
  ? JSON.parse(localStorage.getItem('Historylist'))
  : null


const userInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null


  const provabilityInfo = localStorage.getItem('provabilityInfo')
  ? JSON.parse(localStorage.getItem('provabilityInfo'))
  : null
  

  const betResult = localStorage.getItem('betResult')
  ? JSON.parse(localStorage.getItem('betResult'))
  : null
  
const initialState = {

  userLogin: { userInfo },
  provabilityinfo: {provabilityInfo},
  betResult: {betResult},
  userDetail :{userDetails},
  historyList: {Historylist}

}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
