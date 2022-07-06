
    // [    Imports    ] \\

import Client from "./client"
import gjRequest from "../Utils/gjRequest"
import params from "../Utils/params"
import formatResponse from "../Utils/formatResponse";
import Player from './Player'
import FriendRequest from "./FriendRequest";
import getUserFromID from "../endpoints/getGJUserInfo20";
    import httpClient from "../Utils/httpClient";


class RelationshipsManager {

    public client: Client;

    constructor(client: Client) {

        this.client = client

    }

    public friends: Player[] = []
    public blockedUsers: Player[] = []

    public friendRequests: FriendRequest[] = []


    public async blockUser({ targetUserID }: { targetUserID: string }) {

        const user = await getUserFromID({ userID: targetUserID })
        if (user == '-1') return console.log('The user to block doesn\'t exist.')

        const data = await httpClient.post('getGJFriendRequests20', {

            secret: params.secrets.common,
            accountID: this.client.accountID,
            gjp: this.client.gjp,
            targetAccountID: targetUserID,

        })

        await this.getBlockedUsers()

        return this.blockedUsers

    }


    public async getFriendRequests() {

        const data = await httpClient.post('getGJFriendRequests20', {

            secret: params.secrets.common,
            accountID: this.client.accountID,
            gjp: this.client.gjp,
            getSent: '0'

        })

        if(data[0] == '-1') return '-1'
        if(data[0] == '-2') return console.log(`Client "${this.client.username}" has no friend requests :(`)

        for(const user of data) {

            const userData = formatResponse(user.split(':'))
            userData['15'] =  `glow ${userData['15']}`
            this.friendRequests.push(new FriendRequest(userData, this))

        }

        return this.friendRequests

    }

    public async getBlockedUsers() {

        const data = await gjRequest("getGJUserList20", {

            accountID: this.client.accountID,
            secret: params.secrets.common,
            gjp: this.client.gjp,
            type: 1

        })

        if(data[0] == '-1') return '-1'
        if(data[0] == '-2') return console.log(`Client "${this.client.username}" hasn't blocked any users.`)

        for(const user of data) {

            const userData = formatResponse(user.split(':'))
            this.blockedUsers.push(new Player(userData))

        }

        return this.blockedUsers

    }

    public async getFriends() {

        const data = await httpClient.post("getGJUserList20", {

            accountID: this.client.accountID,
            secret: params.secrets.common,
            gjp: this.client.gjp,
            type: '0'

        })
        if(data[0] == '-1') return '-1'
        if(data[0] == '-2') return console.log(`Client "${this.client.username}" doesn't have any friends D:`)


        for(const user of data) {

            const userData = formatResponse(user.split(':'))
            this.friends.push(new Player(userData))

        }

        return this.friends

    }
}


export default RelationshipsManager