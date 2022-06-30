
    // [    Imports    ] \\
    
import gjRequest from "../Utils/gjRequest"
import params from "../Utils/params"
import Comment from '../structures/comment'
import formatResponse from "../Utils/formatResponse"
    import httpClient from "../Utils/httpClient";

async function getCommentsFromPlayerID({ playerID, page = "0" }: { playerID: string, page?: string }) {

    const data = await httpClient.post<string[]>('getGJCommentHistory',
        {

            secret: params.secrets.common,
            userID: playerID,
            page

        }
    )
    
    if(data[0] ==  '-1') return '-1'

    let comments: Comment[] = []

    for (const comment of data) {

        let commentStructure = comment.split(':')[0] // First structure is the comment info
        let userStructure = comment.split(':')[1] // Second structure is the user info

        let commentInfo = formatResponse(commentStructure.split('~'))
        let userInfo = formatResponse(userStructure.split('~'))

        console.log(userInfo)

        const commentObj = new Comment(commentInfo, userInfo)
        comments.push(commentObj)

    }

    return comments

}

export default getCommentsFromPlayerID