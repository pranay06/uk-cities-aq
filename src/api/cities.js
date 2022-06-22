// curl -X 'GET' \
//   'https://api.openaq.org/v2/cities?limit=100&page=1&offset=0&sort=asc&country=KLPD&order_by=city' \
//   -H 'accept: application/json'

import uuid from 'react-uuid';
import axios from "axios";
import {OPENAQ} from "../constants/index";
const cities = axios.create({
    baseURL: OPENAQ.BASE_URL
})
console.log("Inside AXIOS");
console.log(OPENAQ.BASE_URL)
export const getCities = async ()=>{

    const {data} = await cities.get(`/cities?limit=100&page=1&offset=0&sort=asc&country=GB&order_by=city`);
    return data.results.map((city)=>{
        city.uiKey = uuid();
        return city;
    });


}