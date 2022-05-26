import gjRequest from "../util/gjRequest"
import params from "../util/params"
import Encryptor from '../util/encrypt'
import Comment from '../interfaces/comment'
import getUserFromID from "./getGJUserInfo20"
import formatResponse from "../util/formatResponse"

async function getCommentsFromPlayerID({ id, page = "0" }: { id: string, page?: string }) {

    const data = await gjRequest('getGJCommentHistory',
        {
            secret: params.secrets.common,
            userID: id,
            page: page
        }
    )

    const encryptor = new Encryptor()

    let comments: Comment[] = []

    for (const comment of data) {

        let commentStructure = comment.split(':')[0]
        let userStructure = comment.split(':')[1]

        let commentInfo = formatResponse(commentStructure.split('~')) // First structure is the comment info
        let userInfo = formatResponse(userStructure.split('~')) // Second structure is the user info

        const userObj = await getUserFromID({ id: userInfo["16"] })

        const commentObj: Comment = {

            comment: {

                content: encryptor.base64.decrypt(commentInfo["2"]),
                likes: commentInfo["4"],
                date: commentInfo["9"] + " ago",
                commentID: commentInfo["6"],
                percent: commentInfo["10"]

            },

            user: userObj,

            level: commentInfo["1"],

        }

        comments.push(commentObj)

    }

    return comments

}

export default getCommentsFromPlayerID