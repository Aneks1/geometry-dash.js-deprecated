import gjRequest from '../Utils/gjRequest'
import params from '../Utils/params'
import User from '../Structures/User'
import formatResponse from "../Utils/formatResponse"

async function getUserFromID({ userID }: { userID: string }) {
    
    const data = await gjRequest('getGJUserInfo20', 

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