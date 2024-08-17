import axios from "axios";

const api = axios.create({
    baseURL: 'https://projectreactnative.onrender.com'
    // baseURL: ' https://268d-2804-f44-4eb-a800-707e-f74a-132-709.ngrok-free.app'
    // baseURL: 'http://192.168.3.98:3333'
});
export {api};

