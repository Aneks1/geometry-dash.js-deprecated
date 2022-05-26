import axios from "axios"
import params from './params'

axios.defaults.headers.common["User-Agent"] = "";

async function gjRequest(endpoint: string, requestParams: { secret: string, [key : string] : any }): Promise<string[]> {

    const res = await axios.post(`${params.baseUrl}${endpoint}.php`, new URLSearchParams(requestParams))

    const dataList = res.data.toString().split("|")

    return dataList

}

export default gjRequest