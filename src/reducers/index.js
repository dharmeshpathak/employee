import {combineReducers} from 'redux'
import {employeeReducer} from './employeeReducer'
import {userReducer} from './userReducer'
export default combineReducers({employees:employeeReducer,
user:userReducer});

