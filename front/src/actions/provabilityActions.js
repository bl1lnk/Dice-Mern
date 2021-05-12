import axios from 'axios'
import { PROVABILITY_CHANGE_FAIL, PROVABILITY_CHANGE_REQUEST, PROVABILITY_CHANGE_SUCCESS, PROVABILITY_DETAIL_FAIL, PROVABILITY_DETAIL_REQUEST, PROVABILITY_DETAIL_SUCCESS } from '../constants/provabilityConstants'

export const getProvabilityDetails = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PROVABILITY_DETAIL_REQUEST,
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
      dispatch({ type: PROVABILITY_DETAIL_SUCCESS, payload: data })

     

    } catch (err) {
      dispatch({
        type: PROVABILITY_DETAIL_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      })
    }
  }


  export const changeProvability = (newseed) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PROVABILITY_DETAIL_REQUEST,
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
        '/api/users/changeProvability',
        {newseed},
        config
      )
      dispatch({ type: PROVABILITY_CHANGE_SUCCESS, payload: data })
    
  
    } catch (err) {
      dispatch({
        type: PROVABILITY_CHANGE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      })
    }
  }