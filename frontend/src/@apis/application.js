import { PrivateAxios, PublicAxios } from "../@config";


export const postApplication = async (formData) => {
    try {
        const response = await PrivateAxios({
            method: 'POST',
            url: `/api/application/post`,
            withCredentials: true,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" }
        });
        // console.log("-------------",response.data.myJobs);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch job details");
    }
};  

export const getApplicationsOfJobSeker = async () => {
    try {
        const response = await PrivateAxios({
            method: 'GET',
            url: `/api/application/jobseeker/getall`,
            withCredentials: true,
            headers: { "Content-Type": "application/json" }
        });
        // console.log("-------------",response.data);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch job details");
    }
}; 

export const getApplicationsOfEmployer = async () => {
    try {
        const response = await PrivateAxios({
            method: 'GET',
            url: `/api/application/employer/getall`,
            withCredentials: true,
            headers: { "Content-Type": "application/json" }
        });
        // console.log("-------------",response.data);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch job details");
    }
};  

export const dltApplitionOfJobSekr = async (id) => {

    try {
        const response = await PrivateAxios({
            method: 'DELETE',
            url: `/api/application/delete/${id}`,
            withCredentials: true,
            headers: { "Content-Type": "application/json" }
        });
        // console.log("-------------",response.data.myJobs);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch job details");
    }
};
