
    // [    Imports    ] \\

import params from "../Utils/params"
import LevelComment from '../Structures/LevelComment'
import formatResponse from "../Utils/formatResponse"
import httpClient from "../Utils/httpClient";

async function getCommentsFromPlayerID({ playerID, page = "0" }: { playerID: string, page?: string }): Promise<LevelComment[] | null> {

    const data = await httpClient.post<string[]>('getGJCommentHistory',
        {

            secret: params.secrets.common,
            userID: playerID,
            page

        }
    )

    let comments: LevelComment[] = []

    for (const comment of data) {

        let commentStructure = comment.split(':')[0] // First structure is the comment info
        let userStructure = comment.split(':')[1] // Second structure is the user info

        let commentInfo = formatResponse(commentStructure.split('~'))
        let userInfo = formatResponse(userStructure.split('~'))

        const commentObj = new LevelComment(commentInfo, userInfo)
        comments.push(commentObj)

    }

    return comments

}

export default getCommentsFromPlayerID