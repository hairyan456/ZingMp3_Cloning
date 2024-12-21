import React from 'react';
import { useParams } from 'react-router-dom';

const PLaylistPage = () => {
    const params = useParams();
    console.log(params)
    return (
        <div>
            Playlist page
        </div>
    );
};

export default PLaylistPage;