import axios from 'axios'

import {
  FETCH_NEARBY_JOBS_REQUEST,
  FETCH_NEARBY_JOBS_SUCCESS,
  FETCH_NEARBY_JOBS_FAILURE,
  FETCH_POPULAR_JOBS_REQUEST,
  FETCH_POPULAR_JOBS_SUCCESS,
  FETCH_POPULAR_JOBS_FAILURE
} from '../actions/jobs'

// fix to env
const RAPID_API_KEY = 'env'

export const fetchNearbyJobs = ({ endpoint, query }) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_NEARBY_JOBS_REQUEST })

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPID_API_KEY,
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
      },
      url: `https://jsearch.p.rapidapi.com/${endpoint}`,
      params: { ...query }
    };

    try {
      const response = await axios.request(options)

      dispatch({
        type: FETCH_NEARBY_JOBS_SUCCESS,
        payload: response.data.data
      })
    } catch (error) {
      dispatch({ type: FETCH_NEARBY_JOBS_FAILURE, payload: error })
    }
  }
}

export const fetchPopularJobs = ({ endpoint, query }) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_POPULAR_JOBS_REQUEST })

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPID_API_KEY,
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
      },
      url: `https://jsearch.p.rapidapi.com/${endpoint}`,
      params: { ...query }
    };

    try {
      const response = await axios.request(options)

      dispatch({
        type: FETCH_POPULAR_JOBS_SUCCESS,
        payload: response.data.data
      })
    } catch (error) {
      dispatch({ type: FETCH_POPULAR_JOBS_FAILURE, payload: error })
    }
  }
}