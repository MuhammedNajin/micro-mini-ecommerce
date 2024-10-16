import axios from "axios";
import { useSelector } from "react-redux";

export function createAxios(baseUrl: string) {

    try {
        return axios.create({
            baseURL: baseUrl, 
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '
            }
          });
          
    } catch (error) {
        
    }
}