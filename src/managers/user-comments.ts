import formatResponse from "../util/formatResponse";
import Comment from "../structures/comment";
import params from "../util/params";
import gjRequest from "../util/gjRequest";
import Client from "../structures/client";
import Encryptor from "../util/encrypt";

export default class UserCommentManager {
    private rawCommentData!: Record<string, string>[];

    constructor(private client: Client, data: string, public page: number) {
        const commentsData = data.split("|");

        this.rawCommentData = commentsData.map(e => e.split(":")[0]).map(e => formatResponse(e.split("~")));
    }

    public get(id: string): Comment {
        const index = this.rawCommentData.findIndex(e => e[6] == id);
        const comment = this.rawCommentData[index];

        return new Comment(comment);
    }

    public async create(content: string): Promise<void> {
        const commentText = new Encryptor().base64.encrypt(content).replace(/\+/g, "-").replace(/\//g, "_");
        await gjRequest("uploadGJAccComment20", {
            secret: params.secrets.common,
            gjp: this.client.gjp,
            comment: commentText,
            accountID: this.client.user?.data.accountId,
        });
    }

    public async fetchNextPage(): Promise<UserCommentManager | null> {
        const commentData = await gjRequest("getGJAccountComments20", {
            secret: params.secrets.common,
            page: this.page + 1,
            mode: 0,
            userID: this.client.user?.data.playerId,
        });

        return commentData ? new UserCommentManager(this.client, commentData, this.page + 1) : null;
    }

    public async fetchPage(page: number): Promise<UserCommentManager | null> {
        const commentData = await gjRequest("getGJAccountComments20", {
            secret: params.secrets.common,
            page,
            mode: 0,
            userID: this.client.user?.data.playerId,
        });

        return commentData ? new UserCommentManager(this.client, commentData, page) : null;
    }

    public async delete(id: string): Promise<void> {
        const res = await gjRequest("deleteAccComment20", {
            secret: params.secrets.common,
            gjp: this.client.gjp,
            commentID: id,
            accountID: this.client.user?.data.accountId,
        });
        if (res == -1) throw new Error("Failed to delete comment");
    }
}
