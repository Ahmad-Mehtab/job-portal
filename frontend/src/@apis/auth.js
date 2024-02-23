import { PrivateAxios, PublicAxios } from "../@config"


export const doRegister = ({ data }) => {
    return PrivateAxios({
        method: 'POST',
        url: "/api/user/register",
        data: data,
    })
}

export const doLogin = ({data}) =>{
    return PublicAxios({
        method:'POST',
        url:"/api/user/login",
        data:data,
    })
}
