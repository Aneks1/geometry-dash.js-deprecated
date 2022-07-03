import httpClient from '../Utils/httpClient'
import params from '../Utils/params'
import User from '../Structures/User'
import formatResponse from "../Utils/formatResponse"

async function getUserFromID({ userID }: { userID: string }): Promise<User | null> {
    
    const data = await httpClient.post('getGJUserInfo20', 
        {

            secret: params.secrets.common, 
            targetAccountID: userID 

        }
    )
    
    if(data == '-1') {
        
        console.log(':D')
        return null

    }

    const userInfo = formatResponse(data[0].split(":"))

    return new User(userInfo)

}

export default getUserFromID