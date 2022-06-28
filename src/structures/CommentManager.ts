
    // [    Imports    ] \\

import Client from "./Client"
import gjRequest from "../Utils/gjRequest"
import encryptor from '../Utils/encryptor'
import params from "../Utils/params"

class CommentManager {

    public client: Client;

    constructor(client: Client) {

        this.client = client

    }

    public async postLevelComment({ levelID, content, percent = 0 }: { levelID: string, content: string, percent?: number }) {

        if (content.includes('\n')) 
        
            return console.log(
                
                'You can\' add line breaks to posts!'
                
            )

        if(percent > 100 || percent < 0) 
        
            return console.log(
                
                'Percent can\'t be higher than 100 or lower than 0!'
                
            )


        const commentEncrypted = encryptor.base64.encrypt(content)

        const chk = encryptor.chk(this.client.username + commentEncrypted + levelID + percent.toString(), "0xPT6iUrtws0J", 29481)

        const data = await gjRequest('uploadGJComment21',

            {

                secret: params.secrets.common,
                accountID: this.client.accountID,
                gjp: this.client.gjp,
                userName: this.client.username,
                comment: commentEncrypted,
                levelID: levelID,
                percent: percent.toString(),
                chk: chk

            }
        )

        return data
    }

    public async postProfileComment({ content }: { content: string }) {

        if (content.includes('\n')) 
        
            return console.log(
                
                'You can\' add line breaks to posts!'
                
            )

        const commentEncrypted = encryptor.base64.encrypt(content)

        const data = await gjRequest('uploadGJAccComment20',

            {

                secret: params.secrets.common,
                userName: this.client.username,
                accountID: this.client.accountID,
                gjp: this.client.gjp,
                comment: commentEncrypted,
                
            }
        )

        return data
    }

}

export default CommentManager