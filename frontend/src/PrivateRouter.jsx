import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRouter() {
  const { isAuthorized, currentUser } = useSelector((state) => state.user);
  return currentUser ? <Outlet class="bg-slate-200" />: <Navigate to="/login" />
  
}

export default PrivateRouter