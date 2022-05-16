import Encryptor from "../util/encrypt";
import gjRequest from "../util/gjRequest";
import params from "../util/params";

export = class Comment {
    public levelId: string;
    public content: string;
    public playerId: string;
    public likes: number;
    public id: string;
    public isSpam: boolean;
    public postedAt: `${string} ago`;
    public percent: number;
    public modBadge: "none" | "mod" | "elder";
    public modChatColor: readonly [number, number, number] | null;

    constructor(data: Record<string, string>) {
        this.levelId = data[1];
        this.content = new Encryptor().base64.decrypt(data[2]);
        this.playerId = data[3];
        this.likes = +data[4];
        this.id = data[6];
        this.isSpam = !!data[7];
        this.postedAt = `${data[9]} ago`;
        this.percent = +data[10];
        this.modBadge = data[11] === "1" ? "mod" : data[11] === "2" ? "elder" : "none";
        const modColor = data[12]?.split(",");
        modColor ? (this.modChatColor = [+modColor[0], +modColor[1], +modColor[2]]) : (this.modChatColor = null);
    }

    public async like(): Promise<this> {
        await gjRequest("likeGJItem211", {
            secret: params.secrets.common,
            itemID: this.id,
            type: 2,
            like: 1,
        });

        return this;
    }

    public async dislike(): Promise<this> {
        await gjRequest("likeGJItem211", {
            secret: params.secrets.common,
            itemID: this.id,
            type: 2,
            like: 0,
        });

        return this;
    }
};
