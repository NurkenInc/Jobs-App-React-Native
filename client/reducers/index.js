import { combineReducers } from 'redux'

import jobsReducer from './jobs'

const reducers = combineReducers({ jobs: jobsReducer })

export default reducers