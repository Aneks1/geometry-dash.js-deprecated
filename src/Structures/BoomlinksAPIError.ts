import { format } from "util"

class BoomlinksAPIError extends Error {

    constructor(msg: string, endpoint: string, params: Record<string, string>) {

        super(msg)
        this.message = format(endpoint + '.php: ' + msg + ' Params: ', params)
        this.name = 'BoomlinksAPIError'

    }

}

export default BoomlinksAPIError