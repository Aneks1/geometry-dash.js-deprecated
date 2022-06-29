import axios from "axios";
import params from '../Utils/params'
/**
 * A class that acts as a wrapper around axios to make http stuff easier
 */
export class HttpClient {

    public constructor() {
        axios.defaults.headers.common["User-Agent"] = "";
    }

    private static baseURLGenerator(endpoint : string)  {
        return new URL(`${endpoint}.php`, params.baseUrl);
    }

    public async post<T>(endpoint: string, urlSearchParams? : Record<string, unknown> & { secret : string }) {
        const url = HttpClient.baseURLGenerator(endpoint);
        try {
            return axios.post(url.toString(), urlSearchParams).then(res => res.data as T)
        } catch (e) {
            throw e;
        }
    }

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

}

export default new HttpClient()