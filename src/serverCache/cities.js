import { useQuery } from "react-query";
import {getCities} from "../api/cities";

export function useCities(options){
    return useQuery('cities', getCities, {
        staleTime: Infinity,
        ...options
    });
}

