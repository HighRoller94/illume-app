import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5001/illume-68c8e/us-central1/api' // THE API CLOUD FUNCTION URL
});

export default instance;