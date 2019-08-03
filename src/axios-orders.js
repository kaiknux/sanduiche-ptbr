import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-5e6b7.firebaseio.com/'
});

export default instance;