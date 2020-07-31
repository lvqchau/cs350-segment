import { combineReducers } from 'redux'
import studentReducer from './studentReducer'
import actionReducer from './actionReducer'
import courseReducer from './courseReducer'

const rootReducer = combineReducers({
	studentReducer,
	actionReducer,
	courseReducer
})

export default rootReducer