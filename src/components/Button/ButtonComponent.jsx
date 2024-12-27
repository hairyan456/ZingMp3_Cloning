import React from 'react';

const ButtonComponent = ({ text = '', className = '', ...props }) => {
    return (
        <button type='button'
            className={`${className} py-1 px-4 rounded-l-full rounded-r-full uppercase border border-gray-400`}
            {...props}
        >
            {text}
        </button>
    );
};

export default ButtonComponent;