import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

const LoadingComponent = ({ width = 28, height = 28, }) => {
    return (
        <RotatingLines
            visible={true}
            height={height}
            width={width}
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