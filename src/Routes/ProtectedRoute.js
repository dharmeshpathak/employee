import React from 'react'
import {Navigate,Outlet} from 'react-router-dom'
import {useSelector} from 'react-redux'
function ProtectedRoute() {
    const user = useSelector(state=>state.user.loggedInUser)

  return( user===(null||'')?
  (
    <Navigate to='/login'/>
  ):
  
( <Outlet/>)
)
}

export default ProtectedRoute