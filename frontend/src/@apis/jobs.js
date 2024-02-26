import { PublicAxios } from "../@config";
import { useQuery } from "@tanstack/react-query";

export const useGetJobs = () => {
       return PublicAxios({
            method: 'GET',
            url: "/api/job/getall",
            withCredentials: true,
            headers: { "Content-Type": "application/json" }
        });

};