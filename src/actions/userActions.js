import {
    ADD_USER,
    MATCH_USER,
    LOGIN_USER,
    LOGOUT_USER,
    CHECK_USER
  } from "./types";
  import instance from "../api/index";

  export const signUp=(values)=>{
      console.log(values);
      return async (dispatch)=>{
          try{
              const {data} = await instance.get('/users');
              const user = data.filter((emp) => emp.username === values.email);
              console.log(user);
              if (user.length) {
               dispatch({type:MATCH_USER,payload:true})
               
              } else {
                dispatch({type:MATCH_USER,payload:false})

                const res = await instance.post(`/users`, {
                  username: values.email,
                  password: values.password,
                });
                console.log(res);
                dispatch({type:ADD_USER})

          }
        }catch(error){

          }
      }
  }

  export const logIn = (values)=>{
    return async(dispatch)=>{
      const {data, status}= await instance.get('/users');
       if(status===200){
         const user = data.filter((emp)=>{
           return (emp.username===values.email && emp.password === values.password);
            
    });
    if(user.length !==0){
      
      localStorage.setItem('userItem',JSON.stringify(user[0]));
      dispatch({type:LOGIN_USER,payload:{validUser:true,
      loggedInUser:user[0],
      login:true
    }})
      
    }else{
      dispatch({type:LOGIN_USER,payload:{validUser:false,loggedInUser:'',login:false}});
    }

  }
  }}

    export const logoutUser = ()=>{
    return  (dispatch)=>{
      localStorage.clear();
      dispatch({type:LOGOUT_USER,payload:false})
    }
  }
  export const checkUser = ()=>{
    return (dispatch)=>{
      const user = localStorage.getItem('userItem');
      console.log("user= ",user);
      if(user!==null)
      {
        dispatch({type:CHECK_USER,payload:{loggedInUser:JSON.parse(user),login:true}})
    }else{
      dispatch({type:CHECK_USER,payload:{loggedInUser:'',login:false}})
    }
    }
  }