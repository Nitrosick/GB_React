import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectAuth } from 'src/store/profile/selectors';

interface PublicRouteProps {
  component?: JSX.Element;
}

export const PublicRoute: FC<PublicRouteProps> = ({ component }) => {
  const isAuth = useSelector(selectAuth);

  if (isAuth) {
    return <Navigate to="/" replace />;
  }

  return component ? component : <Outlet />;
};
