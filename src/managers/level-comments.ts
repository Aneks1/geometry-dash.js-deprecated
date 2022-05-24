import Client from "../structures/client";
import formatResponse from "../util/formatResponse";
import { LevelComment } from "../../types";
import Comment from "../structures/comment";
import Author from "../structures/author";
import gjRequest from "../util/gjRequest";
import params from "../util/params";
import Level from "../structures/level";

export default class CommentManager {
    private rawCommentData!: Record<string, string>[];
    private rawUserData!: (Record<string, string> | null)[];

    constructor(private client: Client, rawData: string, private page: number, id?: string) {
        const data = rawData.split("|");

        this.rawCommentData = data
            .map(e => e.split(":")[0])
            .map(e => formatResponse(e.split("~")))
            .map(e => (id ? ((e[1] = id), e) : e));
        this.rawUserData = data.map(e => e.split(":")[1]).map(e => (e ? formatResponse(e.split("~")) : null));
    }

    public get(id: string): LevelComment {
        const index = this.rawCommentData.findIndex(e => e[6] == id);
        const comment = this.rawCommentData[index],
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            author = this.rawUserData[index]!;

        const data: { comment: Comment; author: Author } & ({ level: { fetch: () => Promise<Level> } } | { level: Level }) = {
            comment: new Comment(comment),
            author: new Author(author),
            level: {
                fetch: async () => {
                    const res = await gjRequest("downloadGJLevel22", {
                        secret: params.secrets.common,
                        levelID: comment[1],
                    });

                    const lvl = new Level(this.client, formatResponse(res.split(":")));
                    data.level = lvl;
                    return lvl;
                },
            },
        };

        return data;
    }

    public async fetchNextPage(): Promise<CommentManager | null> {
        const commentData = await gjRequest("getGJComments21", {
            secret: params.secrets.common,
            page: this.page + 1,
            mode: 0,
            levelID: this.rawCommentData[0][1],
        });

        return commentData ? new CommentManager(this.client, commentData, this.page + 1) : null;
    }

    public async fetchPage(page: number): Promise<CommentManager | null> {
        const commentData = await gjRequest("getGJComments21", {
            secret: params.secrets.common,
            page,
            mode: 0,
            userID: this.client.user?.data.playerId,
        });

        return commentData ? new CommentManager(this.client, commentData, page) : null;
    }
}
