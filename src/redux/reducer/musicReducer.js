import actionTypes from '../action/actionTypes';
import { toast } from 'react-toastify'

const initState = {
    currentSongId: ''
};

const musicReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_SONG_ID:
            return {
                ...state, currentSongId: action?.payload ?? '',
            };
        default:
            return state;
    }
};

export default musicReducer;