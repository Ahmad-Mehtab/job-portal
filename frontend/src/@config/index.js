import axios from "axios";

const CONSTANTS = {
    BASEURL: "http://localhost:8000/"
}


export const PublicAxios = axios.create({
    baseURL: CONSTANTS.BASEURL
})

export const PrivateAxios = axios.create({
    baseURL: CONSTANTS.BASEURL
})



// jwt token
PrivateAxios.interceptors.request.use(function (config) {
    // logic
    config.headers.Authorization = "Token something"
    return config;
}, function (error) {
    return Promise.reject(error);
});