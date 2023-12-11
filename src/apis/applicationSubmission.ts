import configuredAxios from "./axios.config";
const axios = configuredAxios.create({
    baseURL: configuredAxios.defaults.baseURL + "applicationSubmissions/",
});

axios.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');
    config.headers.Authorization = 'Bearer ' + token;
    return config;
});

export const applyJob = (recruitmentId: number) => axios.post("", {
    recruitmentId
});