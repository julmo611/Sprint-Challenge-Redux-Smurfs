/* 
  Action Types Go Here!
  Be sure to export each action type so you can pull it into your reducer
*/
import axios from 'axios';

export const GET_SMURFS = 'GET_SMURFS';
export const GET_SMURFS_SUCCESS = 'GET_SMURFS_SUCCESS';
export const GET_SMURFS_ERROR = 'GET_SMURFS_ERROR';

export const ADD_SMURF = 'ADD_SMURF';
export const ADD_SMURF_SUCCESS = 'ADD_SMURF_SUCCESS';
export const ADD_SMURF_ERROR = 'ADD_SMURF_ERROR';

/*
  For this project you'll need at least 2 action creators for the main portion,
   and 2 more for the stretch problem.
   Be sure to include action types for each type of action creator. Also, be sure to mind
     the "pending" states like, fetching, creating, updating and deleting.
   C - addSmurf
   R - getSmurfs
   U - updateSmurf
   D - deleteSmurf
*/

export const getSmurfs = () => {
  return dispatch => {
    dispatch({ type: GET_SMURFS })
    axios
        .get('http://localhost:3333/smurfs')
        .then(res => {
            dispatch({ type: GET_SMURFS_SUCCESS, payload: res.data })
        })
        .catch(err => {
            console.log(err)
            dispatch({ type: GET_SMURFS_ERROR })
        })
  }
}

export const addSmurf = smurf => {
  return dispatch => {
    dispatch({ type: ADD_SMURF })
    axios
        .post('http://localhost:3333/smurfs', smurf)
        .then(res =>
            dispatch({
                type: ADD_SMURF_SUCCESS,
                payload: res.data,
            })
        )
        .catch(err => {
            console.log(err)
            dispatch({ type: ADD_SMURF_ERROR })
        })
  }
}


