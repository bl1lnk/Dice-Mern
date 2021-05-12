import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_D_REQUEST,
    USER_D_FAIL,
    USER_D_SUCCESS,
  } from '../constants/userConstants'

    export const userLoginReducer = (state = {}, action) => {
        switch (action.type) {
          case USER_LOGIN_REQUEST:
            return { loading: true }
          case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }
      
          case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }
          case USER_LOGOUT:
            return {}
          default:
            return state
        }
      }
      
      export const userDetailReducer = (state = { user: {} }, action) => {
        switch (action.type) {
          case USER_D_REQUEST:
            return { ...state, loadingudr: true }
          case USER_D_SUCCESS:
            return { loadingudr: false, user: action.payload }
      
          case USER_D_FAIL:
            return { loadingudr: false, errorudr: action.payload }
          default:
            return state
        }
      }
      
  

    
      
      export const userRegisterReducer = (state = {}, action) => {
        switch (action.type) {
          case USER_REGISTER_REQUEST:
            return { loading: true }
          case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload }
      
          case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }
          default:
            return state
        }
      }
  
      