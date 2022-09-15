import { FETCH_API_REQUEST, FETCH_API_SUCCESS, FETCH_API_FAILURE } from '../action/actionTypes';

const initialState = {
    loading: false,
    apiData: [],
    error: ''
}

const apiReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_API_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_API_SUCCESS:
            return {
                loading: false,
                apiData: action.payload,
                error: ''
            }
        case FETCH_API_FAILURE:
            return {
                loading: false,
                apiData: [],
                error: action.payload
            }
        default: return state
    }
}

export default apiReducer;