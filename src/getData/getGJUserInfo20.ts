import gjRequest from '../util/gjRequest'
import params from '../util/params.json'
import User from '../interfaces/user'

async function getUserFromID({ id }: { id: string }) {
    
    const data = await gjRequest('getGJUserInfo20', 

        {

            secret: params.secrets.common, 
            targetAccountID: id 

        }
    )

    const arr = data.split(':')

    for(let i = 0; i <= arr.length; i += 2) {

        arr.splice(i, 1)
        i--

    }

    const user: User = {

        info: {

            username: arr[0],
            playerID: arr[1],
            accountID: arr[24]

        },

        stats: {

            coins: Number(arr[2]),
            usercoins: Number(arr[3]),
            stars: Number(arr[6]),
            diamonds: Number(arr[7]),
            demons: Number(arr[8]),
            creatorPoints: Number(arr[9]),
            globalRank: Number(arr[23])

        },

        social: {

            youtube: !arr[13] ? null : `https://www.youtube.com/channel/${arr[13]}`,
            twitch: !arr[26] ? null : `https://www.twitch.tv/${arr[26]}`,
            twitter: !arr[27] ? null : `https://twitter.com/${arr[27]}`

        }

    }

    return user

}

export default getUserFromID