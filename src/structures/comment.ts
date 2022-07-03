import Player from './Player'
import encryptor from '../Utils/encryptor'


class Comment {

    public readonly comment: Record<string, string>
    public readonly author: Player
    public readonly level: string


    constructor(commentInfo: Record<string, string>, userInfo: Record<string, string>) {

        this.comment = {

            content: encryptor.base64.decrypt(commentInfo["2"]),
            likes: commentInfo["4"],
            date: commentInfo["9"] + " ago",
            commentID: commentInfo["6"],

        },

        this.author = new Player(userInfo),

        this.level = commentInfo["1"]

        if(commentInfo['10']) this.comment['percent'] = commentInfo["10"]
        if(commentInfo['11']) this.comment['moderatorBadge'] = commentInfo["11"]
        if(commentInfo['12']) this.comment['moderatorChatColor'] = commentInfo["12"]
        
    }

}

export default Comment