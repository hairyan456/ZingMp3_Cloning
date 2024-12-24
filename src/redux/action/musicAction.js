import actionTypes from "./actionTypes";
import { getDetailPlaylist } from "../../services/musicService";

export const setCurrentSongRedux = (songId) => ({
    type: actionTypes.SET_CURRENT_SONG_ID,
    payload: songId
});

export const setIsPLayingRedux = (flag) => ({
    type: actionTypes.SET_IS_PLAYING,
    payload: flag
});

export const fetchDetailPlaylistRedux = (pid) => {
    return async (dispatch, getState) => {
        dispatch({ type: actionTypes.SET_PLAYLIST_START });
        try {
            const res = await getDetailPlaylist(pid);
            if (res?.err === 0)
                dispatch({ type: actionTypes.SET_PLAYLIST_SUCCESS, payload: res?.data ?? {} });
            else {
                console.log(res);
                dispatch({
                    type: actionTypes.SET_PLAYLIST_FAILED,
                    payload: res?.msg ?? "Error fetching detail playlist",
                });
            }
        } catch (error) {
            console.error("Error in fetchDetailPlaylistRedux:", error);
            dispatch({
                type: actionTypes.SET_PLAYLIST_FAILED,
                payload: error?.message || "Unexpected error occurred",
            });
        }
    };
};

