import React from 'react';
import { Navigate } from 'react-router-dom';

const withAuth = (WrappedComponent) => {
    return (props) => {
        const isAuthenticated = !!localStorage.getItem('token'); // Giả sử bạn lưu token trong localStorage.

        if (!isAuthenticated) {
            return <Navigate to="/sign-in" replace />;
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
