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
            percent: commentInfo["10"]

        },

        this.author = new Player(userInfo),

        this.level = commentInfo["1"]

    }

}

export default Comment