import actionTypes from '../action/actionTypes';

const initState = {
    isLoading: false,
    isError: false,
    isPlaying: false,
    currentSongId: '',
    currentSongData: {},
    playLists: [],
    recentSongs: [],
    searchData: {},
};

const musicReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.SET_IS_PLAYING:
            return {
                ...state, isPlaying: action?.payload ?? false,
            };

        case actionTypes.SET_CURRENT_SONG_ID:
            return {
                ...state, currentSongId: action?.payload ?? '',
            };

        case actionTypes.SET_CURRENT_SONG_DATA:
            return {
                ...state, currentSongData: action?.payload ?? {},
            };

        case actionTypes.SET_RECENT_SONGS:
            return {
                ...state,
                recentSongs: action?.payload
                    ? [
                        action.payload,
                        ...state.recentSongs
                            .filter((song) => song.encodeId !== action.payload.encodeId)
                            .slice(0, 19),
                    ]
                    : state.recentSongs,
            };


        case actionTypes.SET_PLAYLIST_START:
            return {
                ...state, isLoading: true, isError: false,
            };
        case actionTypes.SET_PLAYLIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                playLists: action?.payload ?? [],
            };
        case actionTypes.SET_PLAYLIST_FAILED:
            toast.error(action?.payload);
            return {
                ...state, isLoading: false, isError: true, playLists: []
            }

        case actionTypes.SEARCH_DATA_START:
            return {
                ...state, isLoading: true, isError: false,
            };
        case actionTypes.SEARCH_DATA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                searchData: action?.payload ?? {},
            };
        case actionTypes.SEARCH_DATA_FAILED:
            toast.error(action?.payload);
            return {
                ...state, isLoading: false, isError: true, searchData: {}
            }

        default:
            return state;
    }
};

export default musicReducer;