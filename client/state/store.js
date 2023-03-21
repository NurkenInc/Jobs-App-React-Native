import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducers/index'
import { initialState } from '../reducers/jobs'

const store = createStore(reducers, applyMiddleware(thunk))

export default store