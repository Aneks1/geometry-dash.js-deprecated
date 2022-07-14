
    // [    Imports    ] \\

import Client from "../Client"
import encryptor from '../../Utils/encryptor'
import params from "../../Utils/params"
    import httpClient from "../../Utils/httpClient";

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

        if (content == '')

            return console.log(

                'You can\'t send an empty comment.'

            )

        if(percent > 100 || percent < 0)
        
            return console.log(
                
                'Percent can\'t be higher than 100 or lower than 0!'
                
            )

        for(const char in content.split('')) {

            if(char.charCodeAt(0) > 255) {

                return console.log('A comment can just include ASCII characters.')

            }

        }


        const commentEncrypted = encryptor.base64.encrypt(content)

        const chk = encryptor.chk(this.client.username + commentEncrypted + levelID + percent.toString(), "0xPT6iUrtws0J", 29481)

        await httpClient.post('uploadGJComment21',

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
    }

    public async postProfileComment({ content }: { content: string }) {

        if (content == '')

            return console.log(

                'You can\'t send an empty comment.'

            )

        if (content.includes('\n'))
        
            return console.log(
                
                'You can\' add line breaks to posts!'
                
            )

        for(const char in content.split('')) {

            if(char.charCodeAt(0) > 255) {

                return console.log('A comment can just include ASCII characters.')

            }

        }

        const commentEncrypted = encryptor.base64.encrypt(content)

        await httpClient.post('uploadGJAccComment20',
            {

                secret: params.secrets.common,
                userName: this.client.username,
                accountID: this.client.accountID,
                gjp: this.client.gjp,
                comment: commentEncrypted,
                
            }
        )
    }

}

export default CommentManager