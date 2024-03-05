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


