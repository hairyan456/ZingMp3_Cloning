import actionTypes from '../action/actionTypes';
import { toast } from 'react-toastify'

const initState = {
    isLoading: false,
    isError: false,
    banner: [],
    bestOf2024: [],
    hotSongs: [],
    chill: [],
    top100: [],
    banner2: [],
    albumHot: [],
    newRelease: {},
    chart: {},
    rank: [],
    scrollTop: false
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
                chill: action?.payload?.find(item => item?.title === 'Chill')?.items ?? [],
                top100: action?.payload?.find(item => item?.title === 'Top 100')?.items ?? [],
                banner2: action?.payload?.find(item => item?.sectionType === 'weekChart')?.items ?? [],
                albumHot: action?.payload
                    ?.find(item => item?.title === 'Album Hot')
                    ?.items?.slice(0, 4) ?? [],
                newRelease: action?.payload?.find(item => item?.sectionType === 'new-release')?.items ?? {},
                chart: action?.payload?.find(item => item?.sectionId === 'hZC')?.chart ?? {},
                rank: action?.payload?.find(item => item?.sectionId === 'hZC')?.items ?? {},
            };
        case actionTypes.GET_HOME_FAILED:
            toast.error(action?.payload);
            return {
                ...state, isLoading: false, isError: true, banner: []
            }

        case actionTypes.SET_SCROLL_TOP:
            return {
                ...state,
                scrollTop: action?.payload,
            }
        default:
            return state;
    }
};

export default appReducer;