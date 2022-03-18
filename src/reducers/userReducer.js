import {ADD_USER,MATCH_USER,LOGIN_USER,LOGOUT_USER, CHECK_USER} from '../actions/types'
const initialValues = {
    match:false,
    validUser:true,
    loggedInUser:'',
    login:false
}
export const userReducer=(state=initialValues,action)=>{
    switch(action.type){
        case ADD_USER:
            return state;
        case MATCH_USER:
            return {...state,match:action.payload} 
        
        case LOGIN_USER:console.log(action)
        return{
            ...state, validUser:action.payload.validUser,
            loggedInUser:action.payload.loggedInUser,
            login:action.payload.login
        }
        case LOGOUT_USER:
        return{
            ...state,
            login:action.payload.log
        }
        case CHECK_USER:console.log(action);
        
        return {
            ...state,
            loggedInUser:action.payload.loggedInUser,
            login:action.payload.login
        }
        
        default:return state;    
    }

}