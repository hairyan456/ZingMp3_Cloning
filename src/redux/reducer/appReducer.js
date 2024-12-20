import actionTypes from '../action/actionTypes';
import { toast } from 'react-toastify'

const initState = {
    isLoading: false,
    isError: false,
    banner: [],
};

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_BANNER_START:
            return {
                ...state, isLoading: true, isError: false,
            };
        case actionTypes.GET_BANNER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                banner: action?.payload?.find(item => item?.sectionType === 'banner')?.items ?? []
            };
        case actionTypes.GET_BANNER_FAILED:
            toast.error(action?.payload);
            return {
                ...state, isLoading: false, isError: true, banner: []
            }
        default:
            return state;
    }
};

export default appReducer;