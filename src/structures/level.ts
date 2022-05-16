import CommentManager from "../managers/level-comments";
import Encryptor from "../util/encrypt";
import gjRequest from "../util/gjRequest";
import params from "../util/params";
import Client from "./client";

const encryptor = new Encryptor();

export = class Level {
    public id: string;
    public name: string;
    public description: string;
    public version: number;
    public creatorId: string;
    public difficulty: "auto" | "easy" | "normal" | "hard" | "harder" | "insane" | "demon" | "unknown";
    public demonLevel: "easy" | "medium" | "hard" | "insane" | "extreme" | null;
    public isDemon: boolean;
    public downloads: number;
    public usesOfficialSong: boolean;
    public likes: number;
    public dislikes: number;
    public length: "tiny" | "short" | "medium" | "long" | "xl";
    public stars: number;
    public starsRequested: number;
    public copiedFrom: string | null;
    public isTwoPlayer: boolean;
    public customSongId: string | null;
    public coins: number;
    public coinsVerified: boolean;
    public isEpic: boolean;
    public isGauntlet: boolean;
    public objectsAmount: number;

    constructor(private client: Client, data: Record<string, string>) {
        this.id = data[1];
        this.name = data[2];
        this.description = encryptor.base64.decrypt(data[3]);
        this.version = +data[5];
        this.creatorId = data[6];
        this.downloads = +data[10];
        this.usesOfficialSong = !data[11] ? false : true;
        this.likes = +data[14];
        this.length =
            data[15] == "0"
                ? "tiny"
                : data[15] == "1"
                ? "short"
                : data[15] == "2"
                ? "medium"
                : data[15] == "3"
                ? "long"
                : data[15] == "4"
                ? "xl"
                : "tiny";
        this.dislikes = +data[16];
        this.isDemon = !!data[17];
        this.stars = +data[18];
        this.copiedFrom = data[30] ? data[30] : null;
        this.isTwoPlayer = !!data[31];
        this.customSongId = data[35] ? data[35] : null;
        this.coins = +data[37];
        this.coinsVerified = data[38] ? true : false;
        this.starsRequested = +data[39];
        this.isEpic = !!data[42];
        this.isGauntlet = !!data[44];
        this.objectsAmount = +data[45];

        if (this.isDemon) {
            this.demonLevel =
                data[46] == "3"
                    ? "easy"
                    : data[46] == "4"
                    ? "medium"
                    : data[46] == "0"
                    ? "hard"
                    : data[46] == "5"
                    ? "insane"
                    : data[46] == "6"
                    ? "extreme"
                    : null;
            this.difficulty = "demon";
        } else {
            this.difficulty =
                data[47] == "0"
                    ? "unknown"
                    : data[47] == "10"
                    ? "easy"
                    : data[47] == "20"
                    ? "normal"
                    : data[47] == "30"
                    ? "hard"
                    : data[47] == "40"
                    ? "harder"
                    : data[47] == "50"
                    ? "insane"
                    : "unknown";

            this.demonLevel = null;
        }
    }

    public async like(): Promise<this> {
        await gjRequest("likeGJItem211", {
            secret: params.secrets.common,
            itemID: this.id,
            type: 1,
            like: 1,
        });

        return this;
    }

    public async dislike(): Promise<this> {
        await gjRequest("likeGJItem211", {
            secret: params.secrets.common,
            itemID: this.id,
            type: 1,
            like: 0,
        });

        return this;
    }

    public async postComment(comment: string, percentage: number): Promise<string> {
        if (comment.includes("\n")) throw new Error("Comment cannot contain newlines");
        if (percentage > 100 || percentage < 0) throw new Error("Percentage must be between 0 and 100");

        comment = encryptor.base64.encrypt(comment).replace(/\+/g, "-").replace(/\//g, "_");
        const res = await gjRequest("uploadGJComment21", {
            secret: params.secrets.common,
            levelID: this.id,
            percent: percentage,
            comment,
            userName: this.client.username,
            gjp: this.client.gjp,
            chk: encryptor.chk(this.client.username + comment + this.id.toString() + percentage.toString(), 29481, "0xPT6iUrtws0J"),
        });

        if (res == -1) throw new Error("Failed to post comment");
        else return String(res);
    }

    public comments: CommentManager | null = null;

    public async fetchComments(): Promise<CommentManager> {
        const res = await gjRequest("getGJComments21", {
            secret: params.secrets.common,
            levelID: this.id,
            page: 0,
        });

        if (res == -1) throw new Error("Failed to fetch comments");
        else {
            const manager = new CommentManager(this.client, res, 0);
            this.comments = manager;
            return manager;
        }
    }
};
