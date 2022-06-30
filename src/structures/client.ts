
    // [    Imports    ] \\

import getUserFromID from "../endpoints/getGJUserInfo20"
import gjRequest from "../Utils/gjRequest"
import uuid from "../Utils/uuid"
import params from "../Utils/params"
import User from "./user"
import encryptor from '../Utils/encryptor'
import httpClient from "../Utils/httpClient";
import CommentManager from "./CommentManager"
import RelationshipsManager from "./Relationships"

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

        if(data[0] == '-1')
            
            return console.log(
                
                "Invalid login credentials! Check that your username and password are correct.\n"
                
            )

        else if(data[0] == "12") 
            
            return console.log(
                
                "This account is banned from the Geometry Dash servers! Consider not cheating again :c\n"
                
            )
            

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