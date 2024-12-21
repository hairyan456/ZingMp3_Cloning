import axios from '../setup/axios';

const getSong = (id) => {
    return axios.get(`/song?id=${id}`);
}

const getDetailSong = (id) => {
    return axios.get(`/infosong?id=${id}`);
}

export { getSong, getDetailSong };