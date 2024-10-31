import axios from "axios";

const api = axios.create({
    baseURL: 'https://projectreactnative-yxas.onrender.com'
    // baseURL: 'https://3ceb-2804-f44-4ef-d150-fa65-546-f049-d9bb.ngrok-free.app'
    // baseURL: 'http://192.168.3.98:3333'
    // baseURL: 'http://192.168.12.157:3333'
});
export {api};

