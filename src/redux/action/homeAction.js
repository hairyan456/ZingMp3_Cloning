import actionTypes from "./actionTypes";
import { getHome } from "../../services/homeService";

export const getHomeRedux = () => {
    return async (dispatch, getState) => {
        dispatch({ type: actionTypes.GET_HOME_START });
        try {
            let res = await getHome();
            if (res?.err === 0)
                dispatch({ type: actionTypes.GET_HOME_SUCCESS, payload: res?.data?.items });
            else {
                console.log(res);
                dispatch({
                    type: actionTypes.GET_HOME_FAILED,
                    payload: res?.msg ?? "Error fetching home",
                });
            }
        } catch (error) {
            console.error("Error in getHomeRedux:", error);
            dispatch({
                type: actionTypes.GET_HOME_FAILED,
                payload: error?.message || "Unexpected error occurred",
            });
        }
    };
};

export const setScrollTopRedux = (flag) => ({
    type: actionTypes.SET_SCROLL_TOP,
    payload: flag
});

