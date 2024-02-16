import { PrivateAxios, PublicAxios } from "../@config"


export const doRegister = ({ data }) => {
    return PrivateAxios({
        method: 'POST',
        url: "/api/user/register",
        data: data,
    })
}
