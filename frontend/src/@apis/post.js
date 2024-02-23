import { PrivateAxios, PublicAxios } from "../@config"


export const doPostJob = ({ postData }) => {
    console.log('postData: ', postData);
    return PublicAxios({
        method: 'POST',
        url: "/api/job/post",
        data: postData,
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
    });
}


