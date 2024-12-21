import actionTypes from '../action/actionTypes';
import { toast } from 'react-toastify'

const initState = {
    currentSongId: '',
    isPlaying: false,
};

const musicReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_SONG_ID:
            return {
                ...state, currentSongId: action?.payload ?? '',
            };
        case actionTypes.SET_PLAYING_SONG:
            return {
                ...state, isPlaying: action?.payload ?? false,
            };
        default:
            return state;
    }
};

export default musicReducer;