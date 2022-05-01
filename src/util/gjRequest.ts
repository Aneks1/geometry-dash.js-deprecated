import axios from "axios"
import { baseUrl } from './params.json'

axios.defaults.headers.common["User-Agent"] = "";

async function gjRequest(endpoint: string, params: { secret: string, [key : string] : any }) {

    const res = await axios.post(`${baseUrl}${endpoint}.php`, new URLSearchParams(params))

    return res.data

}

export default gjRequest