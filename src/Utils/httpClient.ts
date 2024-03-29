
    // [    Imports    ] \\

import axios from "axios"
import params from '../Utils/params'
import ErrorMessage from "./errorMessages"
import { ErrorCode } from "../../types"
import BoomlinksAPIError from "../Structures/BoomlinksAPIError"

export class HttpClient {

    public constructor() {

        axios.defaults.headers.common["User-Agent"] = "";
        
    }

    private static baseURLGenerator(endpoint : string)  {

        return new URL(`${endpoint}.php`, params.baseUrl)

    }

    public async post < T extends ( string | string[] ) > (endpoint: string, urlSearchParams: Record<string, string> & { secret : string }) : Promise<T | ErrorCode> {

        const url = HttpClient.baseURLGenerator(endpoint)

        let res = await axios.post(url.toString(), new URLSearchParams(urlSearchParams))
        const data = res.data.toString() as ErrorCode | string

        if((["-1", "-2", "-12"]).includes(data)) {

            switch(data) {

                case '-1':
    
                    throw new BoomlinksAPIError(
                        
                        `Got response -1 (not found). ${new ErrorMessage(urlSearchParams).errorMessages[endpoint]['-1']}`, 
    
                        endpoint, 
                        urlSearchParams
    
                    )
    
                case '-2':
    
                    return '-2'
    
                case '-12': 
    
                    throw new BoomlinksAPIError(
                            
                        `Got response -12 (account banned). ${new ErrorMessage(urlSearchParams).errorMessages[endpoint]['-12']}`, 
        
                        endpoint, 
                        urlSearchParams
        
                    )

                default:

                    return '-1'

            }

        }
        
        else { return data.split('|') as T }

    }

    /*
    public async patch<T>(endpoint: string, data : T) {
        const url = HttpClient.baseURLGenerator(endpoint);
        return axios.patch<T>(url.toString(), data)
    }

    public async delete(endpoint : string) {
        const url = HttpClient.baseURLGenerator(endpoint);
        return axios.delete(url.toString())
    }

    public async put<T>(endpoint : string, data : T) {
        const url = HttpClient.baseURLGenerator(endpoint);
        return axios.put(url.toString(), data)
    }
    */

}

export default new HttpClient()