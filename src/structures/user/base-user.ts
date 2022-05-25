import { UserIconData, UserSocialData, UserStats } from "../../../types";
import CommentManager from "../../managers/level-comments";
import UserCommentManager from "../../managers/user-comments";
import formatResponse from "../../util/formatResponse";
import gjRequest from "../../util/gjRequest";
import params from "../../util/params";

export default class BaseUser {
    public accountId: string;
    public playerId: string;
    public username: string;
    public stats: UserStats;
    public social: UserSocialData;
    public modLevel: "none" | "mod" | "elder";
    public messagesEnabled: "all" | "friends" | "off";
    public commentHistoryEnabled: "all" | "friends" | "off";
    public friendRequestEnabled: boolean;
    public isRegistered: boolean;
    public icon: UserIconData;

    constructor(rawData: string) {
        const data = formatResponse(rawData.split(":"));

        this.accountId = data[16];
        this.playerId = data[2];
        this.username = data[1];

        this.social = {
            twitch: data[45] ? `https://twitch.tv/${data[45]}` : null,
            youtube: data[20] ? `https://youtube.com/${data[20]}` : null,
            twitter: data[44] ? `https://twitter.com/${data[44]}` : null,
        };

        this.stats = {
            coins: +data[13],
            creatorPoints: +data[8],
            diamonds: +data[46],
            demons: +data[4],
            globalRank: +data[30],
            stars: +data[3],
            userCoins: +data[17],
        };
        this.modLevel = +data[49] == 0 ? "none" : +data[49] == 1 ? "mod" : "elder";

        this.icon = {
            playerColor: +data[10],
            secondaryPlayerColor: +data[11],

            iconType:
                data[24] == "0"
                    ? "cube"
                    : data[14] == "1"
                    ? "ship"
                    : data[14] == "2"
                    ? "ball"
                    : data[14] == "3"
                    ? "ufo"
                    : data[14] == "4"
                    ? "wave"
                    : data[14] == "5"
                    ? "robot"
                    : data[24] == "6"
                    ? "spider"
                    : "cube",

            cube: +data[21],
            ship: +data[22],
            ball: +data[23],
            ufo: +data[24],
            wave: +data[25],
            robot: +data[26],
            spider: +data[43],
            streak: +data[27],
            glow: +data[28],
            explosion: +data[48],
        };

        this.messagesEnabled = +data[18] == 0 ? "all" : +data[18] == 1 ? "friends" : "off";
        this.friendRequestEnabled = +data[19] == 0 ? true : false;
        this.commentHistoryEnabled = +data[50] == 0 ? "all" : +data[50] == 1 ? "friends" : "off";
        this.isRegistered = !!+data[29];
    }
}
