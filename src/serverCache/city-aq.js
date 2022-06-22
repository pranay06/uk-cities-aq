import { useQuery, useQueryClient } from "react-query";
import {getLatest} from "../api/latest";

function generateCityAqKey(city) {
    return ['latest', city.city, city.uiKey]
}

export function useCityAQ(city, options={}){

    return useQuery(generateCityAqKey(city), ()=>getLatest(city.city), {
        ...options
    });
}

// export function useRemoveCityAQ(city) {
//     const queryClient = useQueryClient();
//     queryClient.removeQueries(generateCityAqKey(city), { exact: true })
// }



