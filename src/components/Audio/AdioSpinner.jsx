import React from 'react';
import { Audio } from 'react-loader-spinner'

const AdioSpinner = () => {
    return (
        <Audio
            height="50"
            width="50"
            color="#ffffff"
            ariaLabel="audio-loading"
            wrapperStyle={{}}
            wrapperClass="wrapper-class"
            visible={true}
        />
    );
};

export default AdioSpinner;