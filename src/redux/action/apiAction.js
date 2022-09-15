import { FETCH_API_REQUEST, FETCH_API_SUCCESS, FETCH_API_FAILURE } from '../action/actionTypes';

export const fetchApiRequest = () => {
    return {
        type: FETCH_API_REQUEST
    }
}

export const fetchApiSuccess = apiData => {
    return {
        type: FETCH_API_SUCCESS,
        payload: apiData
    }
}

export const fetchApiFailure = error => {
    return {
        type: FETCH_API_FAILURE,
        payload: error
    }
}