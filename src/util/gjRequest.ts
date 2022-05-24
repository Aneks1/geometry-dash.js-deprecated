import axios from "axios";
import { baseUrl } from "./params";

axios.defaults.headers.common["User-Agent"] = "";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function gjRequest(endpoint: string, params: Record<string, any> & { secret: string }) {
    const res = await axios.post(`${baseUrl}${endpoint}.php`, new URLSearchParams(params));

    return res.data;
}

export default gjRequest;
