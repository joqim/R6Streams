import _ from 'lodash';
import {
  FETCH_STREAM,
  FETCH_STREAMS,
  CREATE_STREAM,
  EDIT_STREAM,
  DELETE_STREAM
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAMS:
      //since mapKeys is a big object, we use ...
      //converts array of objects into an object of objects with each object having a key of id ( 1,2,3...)
      return { ...state, streams : action.payload.data}
    case FETCH_STREAM:
      return { ...state, stream : action.payload.data}
    case CREATE_STREAM:
      return { ...state, stream : 'stream created'}
    case EDIT_STREAM:
      return { ...state, stream : 'stream edited'}
    case DELETE_STREAM:
      return _.omit(state, action.payload.data);
    default:
      return state;
  }
}