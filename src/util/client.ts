import gjRequest from "./gjRequest"
import sha1 from 'sha1'
import Encryptor from './encrypt'
import params from "./params.json"
import uuid from "./uuid"
import User from "../interfaces/user"
import getUserFromID from "../getData/getGJUserInfo20"

const encryptor = new Encryptor()

class Client {

    private username!: string
    private accountID!: string
    private gjp!: string

    public profile!: User

    public async login({ username, password }: { username: string, password: string }) {

        const data = await gjRequest('accounts/loginGJAccount',

            { 

                secret: params.secrets.account,
                udid: uuid(),
                userName: username,
                password: password,
            
            }
        )

        if(data == -1) {

            throw new Error("Invalid login credentials! Check that your username and password are correct.\n")

        } 

        else if(data == 12) {

            throw new Error("This account is baneed from the Geometry Dash servers! Consider not cheating again :c\n")

        }
        
        else {

            this.username = username
            this.accountID = data.split(',')[0]
            this.gjp = encryptor.xor.encrypt(password, 37526)

            this.profile = await getUserFromID({ id: this.accountID })
            
        }

        return data

    }

    public async postLevelComment({ id, comment, percent = 0 }: { id: string, comment: string, percent?: number }) {

        if (comment.includes('\n')) {

            throw new Error('You can\' add line breaks to posts!')

        }

        if(percent > 100 || percent < 0) {

            throw new Error('Percent can\'t be higher than 100 or lower than 0!')

        }

        comment = encryptor.base64.encrypt(comment)

        const str = sha1(this.username + comment + id + percent.toString() + "0xPT6iUrtws0J")

        const encrypted = encryptor.xor.encrypt(str, 29481)

        const data = await gjRequest('uploadGJComment21',

            {

                secret: params.secrets.common,
                accountID: this.accountID,
                gjp: this.gjp,
                userName: this.username,
                comment: comment,
                levelID: id,
                percent: percent.toString(),
                chk: encrypted

            }
        )

        return data
    }

    public async postProfileComment({ comment }: { comment: string }) {

        if (comment.includes('\n')) {

            throw new Error('You can\' add line breaks to posts!')

        }

        comment = encryptor.base64.encrypt(comment)

        const data = await gjRequest('uploadGJAccComment20',

            {

                secret: params.secrets.common,
                userName: this.username,
                accountID: this.accountID,
                gjp: this.gjp,
                comment: comment,

            }
        )

        return data
    }
}

export default Client