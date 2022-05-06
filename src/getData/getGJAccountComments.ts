import gjRequest from "../util/gjRequest";
import params from "../util/params";
import Encryptor from "../util/encrypt";
import { Comment } from "../../types";
// import getUserFromID from "./getGJUserInfo20";

async function getCommentsFromPlayerID({ id, page = "0" }: { id: string; page?: string }) {
    const data = await gjRequest("getGJCommentHistory", {
        secret: params.secrets.common,
        userID: id,
        page: page,
    });

    const allComments = data.split("|");

    const encryptor = new Encryptor();

    allComments.forEach(async (comment: string) => {
        const commentInfo = comment.split(":")[0];
        const userInfo = comment.split(":")[1];

        const commentInfoArr = commentInfo.split("~");
        const userInfoArr = userInfo.split("~");

        for (let i = 0; i <= commentInfoArr.length; i += 2) {
            commentInfoArr.splice(i, 1);
            i--;
        }

        for (let i = 0; i <= userInfoArr.length; i += 2) {
            userInfoArr.splice(i, 1);
            i--;
        }

        // const userObj = await getUserFromID({ id: userInfoArr[6] });

        const commentObj: Comment = {
            comment: {
                content: encryptor.base64.decrypt(commentInfoArr[0]),
                likes: commentInfoArr[3],
                date: commentInfoArr[5] + " ago",
                commentID: commentInfoArr[6],
                percent: commentInfoArr[4],
            },

            // user: userObj,

            level: commentInfoArr[1],
        };
    });

    return data;
}

export default getCommentsFromPlayerID;
