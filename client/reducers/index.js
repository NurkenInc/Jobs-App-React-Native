import { combineReducers } from 'redux'

import jobs from './jobs'
import sidemenu from './sidemenu'

const reducers = combineReducers({ jobs, sidemenu })

export default reducers