import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Navigate } from 'react-router-dom';

function Protect(props: any) {
    const { children } = props;
   const { user } = useSelector((state: RootState) => state.auth);
   console.log('user from protected route',  user);
   if(user !== null) {
       return children;
   } else {
     return <Navigate to="/login" />
   }
}

export default Protect
