import { PrivateAxios, PublicAxios } from "../@config";
import MyJobs from './../components/Job/MyJobs';

export const getAllJobs = async() => {
    return await PublicAxios({
        method: 'GET',
        url: "/api/job/getall",
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
    });

};
export const getSingleJob = async (id) => {

    try {
        const response = await PrivateAxios({
            method: 'GET',
            url: `/api/job/${id}`,
            withCredentials: true,
            headers: { "Content-Type": "application/json" }
        });
        // console.log("-------------",response.data.job);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch job details");
    }
};

export const getJobList = async() => {

    try {
        const response = await PrivateAxios({
            method: 'GET',
            url: `/api/job/getmyjobs`,
            withCredentials: true,
            headers: { "Content-Type": "application/json" }
        });
        // console.log("-------------",response.data.myJobs);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch job details");
    }
};

export const doDeleteJob = async(id) => {
    
    try {
        const response = await PrivateAxios({
            method: 'DELETE',
            url: `/api/job/delete/${id}`,
            withCredentials: true,
            headers: { "Content-Type": "application/json" }
        });
        // console.log("-------------",response.data.myJobs);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch job details");
    }
};