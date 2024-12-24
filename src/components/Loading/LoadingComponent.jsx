import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

const LoadingComponent = () => {
    return (
        <RotatingLines
            visible={true}
            height="28"
            width="28"
            color="grey"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    );
};

export default React.memo(LoadingComponent);