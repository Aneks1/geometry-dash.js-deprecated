import gjRequest from '../util/gjRequest'
import params from '../util/params'
import User from '../interfaces/user'
import formatResponse from "../util/formatResponse"
import Icons from '../interfaces/icons'

async function getUserFromID({ id }: { id: string }) {
    
    const data = await gjRequest('getGJUserInfo20', 

        {

            secret: params.secrets.common, 
            targetAccountID: id 

        }
    )

    const userInfo = formatResponse(data[0].split(":"))

    const user: User = {

        info: {

            username: userInfo['1'],
            playerID: userInfo['2'],
            accountID: userInfo['16']

        },

        stats: {

            coins: Number(userInfo['13']),
            usercoins: Number(userInfo['17']),
            stars: Number(userInfo['3']),
            diamonds: Number(userInfo['46']),
            demons: Number(userInfo['4']),
            creatorPoints: Number(userInfo['8']),
            globalRank: Number(userInfo['30'])

        },

        social: {

            youtube: !userInfo['20'] ? null : `https://www.youtube.com/channel/${userInfo[13]}`,
            twitch: !userInfo['45'] ? null : `https://www.twitch.tv/${userInfo[26]}`,
            twitter: !userInfo['44'] ? null : `https://twitter.com/${userInfo[27]}`

        },

        icons: {

            color1: userInfo['10'],
            color2: userInfo['11'],

            glow: userInfo['28'] == '1',
            
            gamemodes: {

                cube: userInfo['21'],
                ship: userInfo['22'],
                ball: userInfo['23'],
                ufo: userInfo['24'],
                wave: userInfo['25'],
                robot: userInfo['26'],
                spider: userInfo['43'],

            },

        } as Icons

    }

    return user

}

export default getUserFromID