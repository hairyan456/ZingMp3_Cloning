import actionTypes from "./actionTypes";

export const setCurrentSongRedux = (songId) => ({
    type: actionTypes.SET_CURRENT_SONG_ID,
    payload: songId
});
