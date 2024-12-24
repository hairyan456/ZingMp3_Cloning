import actionTypes from '../action/actionTypes';

const initState = {
    isLoading: false,
    isError: false,
    isPlaying: false,
    currentSongId: '',
    playLists: [],
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

        default:
            return state;
    }
};

export default musicReducer;