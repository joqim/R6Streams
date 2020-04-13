import history from '../history';
import axios from 'axios';
import {
  SIGN_IN, 
  SIGN_OUT, 
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM  
} from './types';

//action creators returned to authReducer
export const signIn = (userId, userName, userAvatar) => {
  return {
    type: SIGN_IN,
    payloadId: userId,
    payloadName: userName,
    payloadAvatar: userAvatar
  }
}

export const signOut = () => {
  return {
    type: SIGN_OUT
  }
}

export const createStream = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await axios.post('/streams', {...formValues, userId});

  dispatch({ type: CREATE_STREAM, payload: response})
  //navigate to root route
  history.push('/');
};

export const fetchStreams = () => async dispatch => {
  const response = await axios.get('/streams')

  dispatch({ type: FETCH_STREAMS, payload: response })
};

export const fetchStream = (id) => async dispatch => {
  const response = await axios.get(`/streams/edit/${id}`)

  dispatch({ type: FETCH_STREAM, payload: response })
}

export const editStream = (id, formValues) => async dispatch => {
  const response = await axios.patch(`/streams/edit/${id}`, formValues);

  dispatch({ type: EDIT_STREAM, payload: response});
  history.push('/');
}

export const deleteStream = (id) => async dispatch => {
  await axios.delete(`/streams/${id}`);

  dispatch({ type: DELETE_STREAM, payload: id});
  history.push('/');
}