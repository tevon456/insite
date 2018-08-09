import {
  FETCH_CHART_DATA_SUCCESS,
  FETCH_CHART_DATA_REQUEST,
  FETCH_CHART_DATA_ERROR
} from '../types/graph';


const initialState = {

  status: "pending",
  data: []

};


export default function chartReducer(state = initialState, action) {

  switch (action.type) {

    case FETCH_CHART_DATA_REQUEST:
      return state;

    case FETCH_CHART_DATA_ERROR:
      return { ...state,
        status: 'error',
        data: []
      }

    case FETCH_CHART_DATA_SUCCESS:

      return { ...state,
        status: 'success',
        data: action.data
      }

    default:
      return state;
  }
}
