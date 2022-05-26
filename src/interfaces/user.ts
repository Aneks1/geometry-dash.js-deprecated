import Icons from './icons'

interface User {

    readonly info: {

        readonly username: string
        readonly playerID: string
        readonly accountID: string

    }

    readonly stats: {

        readonly coins: number
        readonly usercoins: number
        readonly stars: number
        readonly demons: number
        readonly diamonds: number
        readonly creatorPoints: number
        readonly globalRank: number

    }

    readonly social: {

        readonly youtube: string | null
        readonly twitter: string | null
        readonly twitch: string | null

    }

    readonly icons: Icons

}

export default User