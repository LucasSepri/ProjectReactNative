import axios from "axios";

const api = axios.create({
    baseURL: 'http://46.202.144.33:3333'
});
export { api };

