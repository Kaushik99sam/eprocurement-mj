import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function RouteProtect() {
    const user = useSelector((state)=>state.login.user)
    const location = useLocation();
    console.log(user)
    return user !== 'none' ? (
      <Outlet />
    ) : (
      <Navigate to="/tenders" state={{ from: location }} replace />
    );
}
