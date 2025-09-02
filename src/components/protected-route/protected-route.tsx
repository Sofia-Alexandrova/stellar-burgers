import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';
import { getUserData } from '../../services/slices/user';

interface ProtectedRouteProps {
  children: React.ReactNode;
  onlyAuthorized?: boolean;
}

export const ProtectedRoute = ({
  children,
  onlyAuthorized
}: ProtectedRouteProps) => {
  const location = useLocation();

  const { isAuthChecked, isAuthenticated } = useSelector(getUserData);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyAuthorized && !isAuthenticated) {
    return <Navigate replace to='/login' state={{ from: location.pathname }} />;
  }

  if (onlyAuthorized && isAuthenticated) {
    const from = location.state?.from || '/';
    return <Navigate replace to={from} />;
  }

  return children || null;
};
