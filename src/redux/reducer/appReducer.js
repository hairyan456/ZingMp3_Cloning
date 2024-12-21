import actionTypes from '../action/actionTypes';
import { toast } from 'react-toastify'

const initState = {
    isLoading: false,
    isError: false,
    banner: [],
    bestOf2024: [],
    hotSongs: [],
};

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_HOME_START:
            return {
                ...state, isLoading: true, isError: false,
            };
        case actionTypes.GET_HOME_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                banner: action?.payload?.find(item => item?.sectionType === 'banner')?.items ?? [],
                bestOf2024: action?.payload?.find(item => item?.title === 'Best of 2024')?.items ?? [],
                hotSongs: action?.payload[2]?.items ?? [],

            };
        case actionTypes.GET_HOME_FAILED:
            toast.error(action?.payload);
            return {
                ...state, isLoading: false, isError: true, banner: []
            }
        default:
            return state;
    }
};

export default appReducer;