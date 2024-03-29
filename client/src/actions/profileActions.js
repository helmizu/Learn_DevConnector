import axios from 'axios'
import { PROFILE_LOADING, GET_PROFILE, GET_ERRORS, CLEAR_CURRENT_PROFILE, GET_PROFILES } from './types';
import { logoutUser } from './authActions';

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

export const getProfiles = () => dispatch => {
    dispatch(setProfileLoading())
    axios.get('/api/profile/all').then(res => {
        dispatch({
            type : GET_PROFILES,
            payload : res.data
        })
    })
    .catch(err => {
        dispatch({
            type : GET_PROFILES,
            payload : null
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
//delete Account and Profile
export const deleteAccount = () => dispatch => {
    if(window.confirm('Are you sure? This can NOT be undone!')){
        axios.delete('/api/profile')
        .then(res => dispatch(logoutUser()))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload : err.response.data
        }))
    }
}

export const addExperience = (expData, history) => dispatch => {
    axios.post('/api/profile/experience', expData)
    .then(res => history.push('/dashboard'))
    .catch(err => dispatch({
        type : GET_ERRORS,
        payload : err.response.data
    }))
}

export const deleteExperience = (id) => dispatch => {
    if(window.confirm('Are you sure? This can NOT be undone!')) {
        axios.delete(`/api/profile/experience/${id}`)
        .then(res => dispatch({
            type : GET_PROFILE,
            payload : res.data
        }))
        .catch(err => dispatch({
            type : GET_ERRORS,
            payload : err.response.data
        }))
    }
}

export const addEducation = (eduData, history) => dispatch => {
    axios.post('/api/profile/education', eduData)
    .then(res => history.push('/dashboard'))
    .catch(err => dispatch({
        type : GET_ERRORS,
        payload : err.response.data
    }))
}

export const deleteEducation = (id) => dispatch => {
    if(window.confirm('Are you sure? This can NOT be undone!')) {
        axios.delete(`/api/profile/education/${id}`)
        .then(res => dispatch({
            type : GET_PROFILE,
            payload : res.data
        }))
        .catch(err => dispatch({
            type : GET_ERRORS,
            payload : err.response.data
        }))
    }
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

export const getProfileByHandle = (handle) => dispatch => {
    dispatch(setProfileLoading())
    axios.get(`/api/profile/handle/${handle}`)
    .then(res => {
        dispatch({
            type: GET_PROFILE,
            payload : res.data
        })
    })
    .catch(err => {
        dispatch({
            type : GET_PROFILE,
            payload: null
        })
    })
}
