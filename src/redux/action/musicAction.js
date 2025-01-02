import actionTypes from "./actionTypes";
import { getArtistSongs, getDetailPlaylist, searchSong } from "../../services/musicService";

export const setCurrentSongRedux = (songId) => ({
    type: actionTypes.SET_CURRENT_SONG_ID,
    payload: songId
});

export const setCurrentSongDataRedux = (songData) => ({
    type: actionTypes.SET_CURRENT_SONG_DATA,
    payload: songData
});

export const setIsPLayingRedux = (flag) => ({
    type: actionTypes.SET_IS_PLAYING,
    payload: flag
});

export const setRecentSongsRedux = (data) => ({
    type: actionTypes.SET_RECENT_SONGS,
    payload: data
});

export const setKeywordRedux = (keyword) => ({
    type: actionTypes.SET_KEYWORD,
    payload: keyword
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

export const searchDataRedux = (keyword) => {
    return async (dispatch, getState) => {
        dispatch({ type: actionTypes.SEARCH_DATA_START });
        try {
            const res = await searchSong(keyword);
            if (res?.err === 0)
                dispatch({ type: actionTypes.SEARCH_DATA_SUCCESS, payload: res?.data ?? {} });
            else {
                console.log(res);
                dispatch({
                    type: actionTypes.SEARCH_DATA_FAILED,
                    payload: res?.msg ?? "Error search song",
                });
            }
        } catch (error) {
            console.error("Error in searchDataRedux:", error);
            dispatch({
                type: actionTypes.SEARCH_DATA_FAILED,
                payload: error?.message || "Unexpected error occurred",
            });
        }
    };
};

export const fetchArtistSongsRedux = (sId) => {
    return async (dispatch, getState) => {
        dispatch({ type: actionTypes.SET_ARTIST_SONGS_START });
        try {
            const res = await getArtistSongs(sId);
            if (res?.err === 0)
                dispatch({ type: actionTypes.SET_ARTIST_SONGS_SUCCESS, payload: res?.data?.items ?? [] });
            else {
                console.log(res);
                dispatch({
                    type: actionTypes.SET_ARTIST_SONGS_FAILED,
                    payload: res?.msg ?? "Error fetching artist songs",
                });
            }
        } catch (error) {
            console.error("Error in fetchArtistSongsRedux:", error);
            dispatch({
                type: actionTypes.SET_ARTIST_SONGS_FAILED,
                payload: error?.message || "Unexpected error occurred",
            });
        }
    };
};

