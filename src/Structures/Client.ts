
    // [    Imports    ] \\

import getUserFromID from "../Endpoints/getGJUserInfo20"
import uuid from "../Utils/uuid"
import params from "../Utils/params"
import User from "./User"
import encryptor from '../Utils/encryptor'
import httpClient from "../Utils/httpClient";
import CommentManager from "./managers/CommentManager"
import RelationshipsManager from "./managers/RelationshipsManager"

class Client {

    public username!: string
    public accountID!: string
    public playerID!: string
    public gjp!: string

    public profile!: User
    public commentManager!: CommentManager
    public relationships!: RelationshipsManager

    public async login({ username, password }: { username: string, password: string }) {

        const data = await httpClient.post<string[]>('accounts/loginGJAccount', {
            secret: params.secrets.account,
            udid: uuid(),
            userName: username,
            password: password,

        })

        this.username = username
        this.accountID = data[0].split(',')[0]
        this.playerID = data[0].split(',')[1]
        this.gjp = encryptor.xor.encrypt(password, 37526)

        this.profile = await getUserFromID({ userID: this.accountID }) as User

        this.commentManager = new CommentManager(this)
        this.relationships = new RelationshipsManager(this)

        await this.relationships.getBlockedUsers()
        await this.relationships.getFriends()
        await this.relationships.getFriendRequests()
        
        return this

    }
    
}

export default Client