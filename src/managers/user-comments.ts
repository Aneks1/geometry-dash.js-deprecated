import formatResponse from "../util/formatResponse";
import Comment from "../structures/comment";
import Author from "../structures/author";
import params from "../util/params";
import gjRequest from "../util/gjRequest";
import Client from "../structures/client";

export = class UserCommentManager {
    private rawCommentData!: Record<string, string>[];
    private rawUserData!: (Record<string, string> | null)[];

    constructor(private client: Client, data: string, public page: number) {
        const commentsData = data.split("|");

        this.rawCommentData = commentsData.map(e => e.split(":")[0]).map(e => formatResponse(e.split("~")));
        this.rawUserData = commentsData.map(e => e.split(":")[1]).map(e => (e ? formatResponse(e.split("~")) : null));
    }

    public get(id: string) {
        const index = this.rawCommentData.findIndex(e => e[6] == id);
        const comment = this.rawCommentData[index],
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            author = this.rawUserData[index]!;

        return {
            comment: new Comment(comment),
            author: new Author(author),
        };
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
};
