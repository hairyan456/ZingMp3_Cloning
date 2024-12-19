import React, { useEffect } from 'react';
import Header from '../../components/Header/Header';
import { getHome } from '../../services/homeService';
import { toast } from 'react-toastify';

const HomePage = () => {
    const fetchHome = async () => {
        try {
            const res = await getHome();
            if (res?.err === 0) {
                console.log(res);
            }
            else
                toast.error(res?.msg);
        } catch (error) {
            console.log('Error:', error);
            toast.error(error?.message);
        }
    };

    useEffect(() => {
        fetchHome();
    }, []);

    return (
        <div className='overflow-y-auto'>
            <Header />
        </div>
    );
};

export default HomePage;