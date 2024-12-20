import actionTypes from "./actionTypes";
import { getHome } from "../../services/homeService";

export const getHomeRedux = () => {
    return async (dispatch, getState) => {
        dispatch({ type: actionTypes.GET_BANNER_START });
        try {
            let res = await getHome();
            if (res?.err === 0)
                dispatch({ type: actionTypes.GET_BANNER_SUCCESS, payload: res?.data?.items });
            else {
                console.log(res);
                dispatch({
                    type: actionTypes.GET_BANNER_FAILED,
                    payload: res?.msg ?? "Error fetching home",
                });
            }
        } catch (error) {
            console.error("Error in getHomeRedux:", error);
            dispatch({
                type: actionTypes.GET_BANNER_FAILED,
                payload: error?.message || "Unexpected error occurred",
            });
        }
    };
};
