import params from '../Utils/params'
import User from '../structures/user'
import formatResponse from "../Utils/formatResponse"
import httpClient from "../Utils/httpClient";

async function getUserFromID({ userID }: { userID: string }) {
    
    const data = await httpClient.post('getGJUserInfo20',

        {

            secret: params.secrets.common, 
            targetAccountID: userID 

        }
    )
    
    if(data[0] == '-1') return '-1'

    const userInfo = formatResponse(data[0].split(":"))

    return new User(userInfo)

}

export default getUserFromID