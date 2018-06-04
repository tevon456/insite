import {
  FETCH_CHART_DATA_SUCCESS,
  FETCH_CHART_DATA_REQUEST,
  FETCH_CHART_DATA_ERROR
} from '../types/graph';


const initialState = {

  data: []

};



export default function chartReducer(state = initialState, action) {

 
  switch (action.type) {

    case FETCH_CHART_DATA_REQUEST:
      return initialState;

    case FETCH_CHART_DATA_ERROR:
      //return Object.assign({}, state, {error: action.error});

    case FETCH_CHART_DATA_SUCCESS:

    return Object.assign({}, state, {data: action.json});

    default:
      return initialState;
  }
}