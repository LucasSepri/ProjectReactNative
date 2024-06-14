import axios from "axios";

const api = axios.create({
    baseURL: 'https://projectreactnative.onrender.com'
});
export {api};

