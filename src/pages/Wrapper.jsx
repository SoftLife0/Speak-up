import React from 'react'
import { UserAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

export const Wrapper = ({children}) => {
    const { session } = UserAuth();

    if (session === undefined) {
      return <p>Redirecting.. </p>;
    }

  return (<>{session ? children : <Navigate to="/login" />}</>
  );
};
