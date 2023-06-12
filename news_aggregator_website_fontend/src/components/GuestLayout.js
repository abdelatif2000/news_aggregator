import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider';
import "../assets/css/bootstrap.min.css";
import "../assets/css/fontawesome/css/all.min.css";
import "../assets/css/style.css";

export default function GuestLayout() {
    const { token } = useStateContext();
    // debugger;
    if (token) {
        return <Navigate to={'/'} />
    }
    return (
        <div>
            <Outlet />
        </div>
    )
}
