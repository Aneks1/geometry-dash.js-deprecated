
    // [    Imports    ] \\

import Client from "./Client"
import httpClient from "../Utils/httpClient"
import params from "../Utils/params"
import formatResponse from "../Utils/formatResponse"
import Player from './Player'
import FriendRequest from "./FriendRequest"
import getUserFromID from "../Endpoints/getGJUserInfo20"
import BoomlinksAPIError from "./BoomlinksAPIError"
import ErrorMessage from "../Utils/errorMessages"


class RelationshipsManager {

    public client: Client;

    constructor(client: Client) {

        this.client = client

    }

    public friends: Player[] | null = []
    public blockedUsers: Player[] | null = []

    public friendRequests: FriendRequest[] | null = []


    public async blockUser({ targetUserID }: { targetUserID: string }) {

        const requestParams = {

            secret: params.secrets.common,
            accountID: this.client.accountID,
            gjp: this.client.gjp,
            targetAccountID: targetUserID,

        }

        try {   await getUserFromID({ userID: targetUserID })   }
        catch {

            throw new BoomlinksAPIError(`Got response -1 (not found). ${new ErrorMessage(requestParams).errorMessages['blockGJUser20']['-1']}`, 'blockGJUser20', requestParams)

        }

        await httpClient.post<string>('blockGJUser20', requestParams)
        await this.getBlockedUsers()

        return this.blockedUsers![0]

    }


    public async getFriendRequests() {

        const data = await httpClient.post<string[]>('getGJFriendRequests20', {

            secret: params.secrets.common,
            accountID: this.client.accountID,
            gjp: this.client.gjp,
            getSent: '0'

        })

        if(data == '-2') return this.friendRequests = null
        this.friendRequests = []

        for(const user of data) {

            const userData = formatResponse(user.split(':'))
            userData['15'] =  `glow ${userData['15']}`
            this.friendRequests.push(new FriendRequest(userData, this))

        }

        return this.friendRequests

    }

    public async getBlockedUsers() {

        const data = await httpClient.post<string[]>("getGJUserList20", {

            accountID: this.client.accountID,
            secret: params.secrets.common,
            gjp: this.client.gjp,
            type: '1'

        })

        if(data == '-2') return this.blockedUsers = null
        this.blockedUsers = []

        for(const user of data) {

            const userData = formatResponse(user.split(':'))
            this.blockedUsers.push(new Player(userData))

        }

        return this.blockedUsers

    }

    public async getFriends() {

        const data = await httpClient.post<string[]>("getGJUserList20", {

            accountID: this.client.accountID,
            secret: params.secrets.common,
            gjp: this.client.gjp,
            type: '0'

        })

        if(data == '-2') return this.friends = null
        this.friends = []

        for(const user of data) {

            const userData = formatResponse(user.split(':'))
            this.friends.push(new Player(userData))

        }

        return this.friends

    }
}


export default RelationshipsManager