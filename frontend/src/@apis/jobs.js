import { PrivateAxios, PublicAxios } from "../@config";

export const getAllJobs = () => {
    return PublicAxios({
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