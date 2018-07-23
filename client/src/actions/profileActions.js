import axios from 'axios'
import { PROFILE_LOADING, GET_PROFILE, PROFILE_NOT_FOUND, GET_ERRORS, CLEAR_CURRENT_PROFILE } from './types';

export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading())
    axios.get('/api/profile').then(res => {
        dispatch({
            type : GET_PROFILE,
            payload : res.data
        })
    })
    .catch(err => {
        dispatch({
            type : GET_PROFILE,
            payload : {}
        })
    })
}
//create profile
export const createProfile = (profileData, history) => dispatch => {
    axios.post('/api/profile', profileData).then(res => history.push('/dashboard'))
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }))
}

//profile loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}


export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}

