import axios from "axios";

import {
    FETCH_CHART_DATA_SUCCESS,
    FETCH_CHART_DATA_REQUEST,
    FETCH_CHART_DATA_ERROR
} from './types/graph';



export function fetchChartData(route) {
    return async dispatch => {
        dispatch({
            type: FETCH_CHART_DATA_REQUEST
        });
        try {
            return axios.get(route).then(response => {
                dispatch({
                    type: FETCH_CHART_DATA_SUCCESS,
                    payload: response.data
                })
                //dispatch(fetchingChartSuccess(response.data))
            })
        } catch (error) {
            dispatch({
                type: FETCH_CHART_DATA_ERROR,
                error: error
            })
        }
    };
}