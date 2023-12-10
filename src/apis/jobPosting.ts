import IJobPosting from "@/models/JobPosting";
import configuredAxios from "./axios.config";
const axios = configuredAxios.create({
    baseURL: configuredAxios.defaults.baseURL + "jobPostings/",
});

axios.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');
    config.headers.Authorization = 'Bearer ' + token;
    return config;
});

export const getJobPostings = () => axios.get<IJobPosting[]>("");