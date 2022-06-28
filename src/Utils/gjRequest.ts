import axios from "axios"
import params from './params'

axios.defaults.headers.common["User-Agent"] = "";

async function gjRequest(endpoint: string, requestParams: { secret: string, [key : string] : any }): Promise<string[]> {

    const res = await axios.post(`${params.baseUrl}${endpoint}.php`, new URLSearchParams(requestParams))

    res.data = res.data.toString()

    if(res.data == '-1')  {

        console.log(`${endpoint}.php: Got -1 as response (not found). Params: `, requestParams)
        return ['-1']

    } 
    
    else if(res.data == '-2') {

        console.log(`${endpoint}.php: Got -2 as response (empty list).`)
        return ['-2']

    }

    const dataList = res.data.split("|")

    return dataList

}

export default gjRequest