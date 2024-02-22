import { PrivateAxios, PublicAxios } from "../@config"


export const doPostJob = ({ postData }) => {
    console.log('postData: ', postData);
    return PrivateAxios({
        method: 'POST',
        url: "/api/job/post",
        data: postData,
    })
}


