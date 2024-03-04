import { PrivateAxios, PublicAxios } from "../@config";


export const postApplication = async (myData) => {

    try {
        const response = await PrivateAxios({
            method: 'POST',
            url: `/api/application/post`,
            withCredentials: true,
            data: myData,
            headers: { "Content-Type": "application/json" }
        });
        // console.log("-------------",response.data.myJobs);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch job details");
    }
};


