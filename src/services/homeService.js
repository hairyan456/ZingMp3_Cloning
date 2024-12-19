import axios from '../setup/axios';

const getHome = () => {
    return axios.get(`/home`);
}

export { getHome };