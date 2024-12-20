import axios from '../setup/axios';

const getDetailSong = (id) => {
    return axios.get(`/infosong?id=${id}`);
}

export { getDetailSong };