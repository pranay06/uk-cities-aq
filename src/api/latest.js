import axios from "axios";
import {OPENAQ} from "../constants/index";

const cities = axios.create({
    baseURL: OPENAQ.BASE_URL
});

export const getLatest = async (city)=>{

    const {data} = await cities.get(`latest?limit=100&page=1&offset=0&sort=desc&radius=1000&country_id=GB&city=${city}&order_by=lastUpdated&dumpRaw=false`);
    return data.results;


}