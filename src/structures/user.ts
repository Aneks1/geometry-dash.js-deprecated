import Icons from './Icons'

class User {

    public readonly info
    public readonly stats
    public readonly social
    public readonly icons: Icons

    constructor(userInfo: Record<string, string>) {

        this.info = {

            username: userInfo['1'],
            playerID: userInfo['2'],
            accountID: userInfo['16']

        },

        this.stats = {

            coins: Number(userInfo['13']),
            usercoins: Number(userInfo['17']),
            stars: Number(userInfo['3']),
            diamonds: Number(userInfo['46']),
            demons: Number(userInfo['4']),
            creatorPoints: Number(userInfo['8']),
            globalRank: Number(userInfo['30'])

        },

        this.social = {

            youtube: !userInfo['20'] ? null : `https://www.youtube.com/channel/${userInfo[13]}`,
            twitch: !userInfo['45'] ? null : `https://www.twitch.tv/${userInfo[26]}`,
            twitter: !userInfo['44'] ? null : `https://twitter.com/${userInfo[27]}`

        },

        this.icons = new Icons(userInfo)

    }

}

export default User