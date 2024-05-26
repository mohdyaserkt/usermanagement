import { jwtDecode } from 'jwt-decode';
import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps): JSX.Element {
  let token = localStorage.getItem("accessToken");
  
  
  if (token) {
    const decodedToken: any = token ? jwtDecode(token) : null;
    
    return decodedToken.role=='user' ? <>{children}</> : <Navigate to="/signin" />;
  } 
  
  // return  <>{children}</>
  return <Navigate to="/signin" />;
}

