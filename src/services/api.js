import axios from 'axios';
import {Service} from '~/config/defines.json';

const API = axios.create({
  baseURL: Service.URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
});

export default API;
