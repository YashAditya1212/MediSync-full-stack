import React from 'react'
import { Navigate } from 'react-router-dom'

export const AdminProtectedRoute = ({ children }) => {
    const adminToken = localStorage.getItem('adminToken')
    const doctorToken = localStorage.getItem('doctorToken')
    
    if (!adminToken && !doctorToken) {
        return <Navigate to="/join" replace />
    }
    return children
}

export const DoctorProtectedRoute = ({ children }) => {
    const doctorToken = localStorage.getItem('doctorToken')
    
    if (!doctorToken) {
        return <Navigate to="/join" replace />
    }
    return children
}

export const UserProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token')
    
    if (!token) {
        return <Navigate to="/join" replace />
    }
    return children
}
