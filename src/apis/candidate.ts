import ICandidate from "@/models/Candidate";
import configuredAxios from "./axios.config";
const axios = configuredAxios.create({
    baseURL: configuredAxios.defaults.baseURL + "candidates/",
});

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    config.headers.Authorization = "Bearer " + token;
    return config;
});

export const getPersonalInfo = () => axios.get<ICandidate>("");

interface IUpdateUserFormBody {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    sex: boolean;
    placeOfOrigin: string;
    address: string;
    identityCard: string;
    email: string;
    phoneNumber: string;
}

export const updatePersonalInfo = (data: IUpdateUserFormBody) =>
    axios.put("user", data);

interface IUpdateCandidateFormBody {
    bio: string;
    qualificationId: number;
    experienceId: number;
    school: string;
    skillIds: number[];
}

export const updateProfile = (data: IUpdateCandidateFormBody) =>
    axios.put("", data);