import { CREATE_HISTORY_FAIL, CREATE_HISTORY_REQUEST, CREATE_HISTORY_SUCCESS, LIST_HISTORY_FAIL, LIST_HISTORY_REQUEST, LIST_HISTORY_SUCCESS, ROLL_DICE_FAIL, ROLL_DICE_REQUEST, ROLL_DICE_SUCCESS } from "../constants/diceConstants"
import axios from 'axios'


export const rollDice = (chance, betAmount) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ROLL_DICE_REQUEST,
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
  
      const { data } = await axios.post(
        '/api/users/rollDice',
        {chance, betAmount},
        config
      )
      dispatch({ type: ROLL_DICE_SUCCESS, payload: data })
      localStorage.setItem('betResult', JSON.stringify(data))


    } catch (err) {
      dispatch({
        type: ROLL_DICE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      })
    }
  }

  export const createHistory = (bet_id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_HISTORY_REQUEST,
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
  
      const { data } = await axios.post(
        '/api/users/createHistoryBet',
        {bet_id},
        config
      )
      dispatch({ type: CREATE_HISTORY_SUCCESS, payload: data })



    } catch (err) {
      dispatch({
        type: CREATE_HISTORY_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      })
    }
  }


  export const listHistory = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: LIST_HISTORY_REQUEST,
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
  
      const { data } = await axios.get(
        '/api/users/listHistory',
        config
      )
      dispatch({ type: LIST_HISTORY_SUCCESS, payload: data })
      localStorage.setItem('Historylist', JSON.stringify(data))


    } catch (err) {
      dispatch({
        type: LIST_HISTORY_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      })
    }
  }
