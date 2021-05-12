import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_D_REQUEST,
    USER_D_SUCCESS,
    USER_D_FAIL,
    USER_LOGOUT,
   
  } from '../constants/userConstants'

  import axios from 'axios'
  

  export const login = (email, password) => async (dispatch) => {
    try {
      dispatch({
        type: USER_LOGIN_REQUEST,
      })
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
  
      const { data } = await axios.post(
        '/api/users/login',
        { email, password },
        config
      )
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
      // dispatch({ type: USER_D_SUCCESS, payload: data })
      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (err) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      })
    }
  }
  
  export const register = (name, email, password) => async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      })
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
  
      const { data } = await axios.post(
        '/api/users/register',
        { name, email, password },
        config
      )
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (err) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      })
    }
  }
  
  export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_D_REQUEST,
      })
      const {
        userLogin: { userInfo },
      } = getState()
      const auth = `Bearer ${userInfo.token}`
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: auth,
        },
      }
      const { data } = await axios.get(`/api/users/${id}`, config)
      dispatch({ type: USER_D_SUCCESS, payload: data })
      localStorage.setItem('userDetail', JSON.stringify(data))

     

    } catch (err) {
      dispatch({
        type: USER_D_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      })
    }
  }
  



  export const logout = (dispatch) => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('user')

  }
  
  

  