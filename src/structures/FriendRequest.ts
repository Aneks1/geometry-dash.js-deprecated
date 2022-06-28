import Player from "./Player"
import encryptor from "../Utils/encryptor"
import gjRequest from "../Utils/gjRequest"
import params from "../Utils/params"
import RelationshipsManager from "./Relationships"

class FriendRequest {

    public readonly rsManager: RelationshipsManager

    public readonly user: Player
    public readonly request: Record<string, string | number | null | boolean>

    constructor(userInfo: Record<string, string | number | null>, rsManager: RelationshipsManager) {

        this.user = new Player(userInfo)

        this.request = {

            id: userInfo['32'],
            message: encryptor.base64.decrypt(userInfo['35']!.toString()),
            age: userInfo['37']!.toString().replace('#', ''),
            newRequest: userInfo['41'] == '1'

        }

        this.rsManager = rsManager
        
    }

    public async accept() {

        const data = await gjRequest('acceptGJFriendRequest20', {

            secret: params.secrets.common,
            accountID: this.rsManager.client.accountID,
            gjp: this.rsManager.client.gjp,
            targetAccountID: this.user.info.accountID,
            requestID: this.request.id

        })

        await this.rsManager.getFriends()
        await this.rsManager.getFriendRequests()

        return this.rsManager.friends

    }

    public async deny() {

        const data = await gjRequest('deleteGJFriendRequests20', {

            secret: params.secrets.common,
            accountID: this.rsManager.client.accountID,
            gjp: this.rsManager.client.gjp,
            targetAccountID: this.user.info.accountID,
            isSender: 0

        })

        await this.rsManager.getFriends()
        await this.rsManager.getFriendRequests()

        return this.rsManager.friendRequests

    }

}

export default FriendRequest