import axios from "axios";

import {
    FETCH_CHART_DATA_SUCCESS,
    FETCH_CHART_DATA_REQUEST,
    FETCH_CHART_DATA_ERROR
} from 'types/graph';



export function fetchChartData(route) {
    return dispatch => {
        dispatch({type: FETCH_CHART_DATA_REQUEST});
             
        
        axios.get(route).then(response => {
                dispatch({
                    type: FETCH_CHART_DATA_SUCCESS,
                    data: response.data
                })

            })
            .catch ((error) => {
            dispatch({
                type: FETCH_CHART_DATA_ERROR,
            })
        });
    }
}
