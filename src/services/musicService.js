import axios from '../setup/axios';

const getSong = (id) => {
    return axios.get(`/song?id=${id}`);
}

const getDetailSong = (id) => {
    return axios.get(`/infosong?id=${id}`);
}

const getDetailPlaylist = (id) => {
    return axios.get(`/detailplaylist?id=${id}`);
}

const searchSong = (keyword) => {
    return axios.get(`/search?keyword=${keyword}`);
}

export { getSong, getDetailSong, getDetailPlaylist,searchSong };