import axios from 'axios';

export default axios.create({
  // baseURL: 'http://localhost:4000'
  baseURL: 'https://r6streams.herokuapp.com:43761'
});