export type UserIconType = "cube" | "ship" | "ball" | "ufo" | "wave" | "robot" | "spider";

export type LevelDifficulty = "auto" | "easy" | "normal" | "hard" | "harder" | "insane" | "demon" | "unknown";

export type DemonDifficulty = "easy" | "medium" | "hard" | "insane" | "extreme";

export type LevelLength = "tiny" | "short" | "medium" | "long" | "xl";

export type ErrorCode = "-1" | "-2" | "-12"

export type UserModBadge = "none" | "mod" | "elder";

export type PostedAtString = `${string} ago`;

export type RGBColor = readonly [number, number, number];

export class Author {
    constructor(data: Record<string, string>);
    public username: string;
    public icon: string;
    public playerColor: string;
    public secondaryPlayerColor: string;
    public iconType: UserIconType;
    public hasGlow: boolean;
    public accountId: string;
}

export class Level {
    constructor(data: Record<string, string>);
    public id: string;
    public name: string;
    public description: string;
    public version: number;
    public creatorId: string;
    public difficulty: LevelDifficulty;
    public demonLevel: DemonDifficulty | null;
    public isDemon: boolean;
    public downloads: number;
    public usesOfficialSong: boolean;
    public likes: number;
    public length: LevelLength;
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
}

export class Comment {
    constructor(data: Record<string, string>);
    public levelId: string;
    public content: string;
    public playerId: string;
    public likes: number;
    public id: string;
    public isSpam: boolean;
    public postedAt: PostedAtString;
    public percent: number | null;
    public modBadge: UserModBadge | null;
    public modChatColor: RGBColor | null;
}

export interface LoginParameters {
    username: string;
    password: string;
}

export interface PostCommentParameters {
    id: string;
    comment: string;
    percent?: number;
}

export interface LevelComment {
    comment: Comment;
    author: Author;
    level:
        | {
        fetch: () => Promise<Level>;
    }
        | Level;
}

export interface UserIconData {
    playerColor: number;
    secondaryPlayerColor: number;
    iconType: UserIconType;
    cube: number;
    ship: number;
    ball: number;
    ufo: number;
    wave: number;
    robot: number;
    spider: number;
    streak: number;
    glow: number;
    explosion: number;
}

export interface UserData {
    accountId: string;
    playerId: string;
    username: string;
}

export interface UserStats {
    coins: number;
    creatorPoints: number;
    diamonds: number;
    demons: number;
    globalRank: number;
    stars: number;
    userCoins: number;
}

export interface UserSocialData {
    twitch: `https://www.twitch.tv/${string}` | null;
    youtube: `https://www.youtube.com/channel/${string}` | null;
    twitter: `https://twitter.com/${string}` | null;
}
export type loginGJAccountRequest = [`${string},${string}`] | ['-1'] | ['12']


export type ApiResponses =
    | ApiAccountComment
    | ApiUserCommentData
    | ApiUserData
    | ApiIconData

export interface ApiAccountComment {
    ['1'] : number; //levelId
    ['2'] : string; //comment //encoded in base64
    ['3'] : number; //authorPlayedId
    ['4'] : number; //likes
    ['5'] : number; //dislikes
    ['6'] : number; //messageId
    ['7'] : boolean; //spam
    ['8'] : number; //authorAccountId
    ['9'] : string; // age
    ['10'] : number; // percent
    ['11'] : number; // modBadge
    ['12'] : string; //moderatorChatColor
}

export interface ApiUserCommentData {
    ['1'] : string; //userName
    ['9'] : number; //icon
    ['10'] : number; //playerColor
    ['11'] : number; //playerColor2
    ['14'] : number; //iconType
    ['15'] : 0 | 2; // glow
    ['16'] : number;//accountID
}

export interface ApiUserData {
    ['1'] : string; //userName
    ['2'] : number; // 	userID
    ['3'] : number; // stars
    ['4'] : number; // demons
    ['6'] : number; //ranking
    ['7'] : number;//  	accountHighlight
    ['8'] : number; // 	creatorpoints
    ['9'] : number; // iconID
    ['10'] : number; // 	playerColor
    ['11']: number; // 	playerColor2
    ['13']: number;//secretCoins
    ['14']: number; // 	iconType
    ['15']: number; // 	special
    ['16']: number; //accountID
    ['17']: number; // 	usercoins
    ['18']: number; // 	messageState
    ['19']: number; // 	friendsState
    ['20']: `https://www.youtube.com/channel/${string}` | null // youTube
    ['21']: number;// 	accIcon
    ['22']: number;//accShip
    ['23']: number;// 	accBall
    ['24']: number; // 	accBird
    ['25']: number; // 	accDart(wave)
    ['26']: number; // 	accRobot
    ['27']:number; //  	accStreak
    ['28']: number; // 	accGlow
    ['29']: number//  	isRegistered
    ['30']: number; // 	globalRank
    ['31']:number; //1	friendstate
    ['38']:number; // messages
    ['39']: number; // friendRequests
    ['40']: number; //  newFriends
    ['41']: boolean; // NewFriendRequest
    ['42']: string; // age
    ['43']: number; //  	accSpider
    ['44']: `https://twitter.com/${string}` | null; //  	twitter
    ['45']: `https://www.twitch.tv/${string}` | null;//twitch
    ['46']: number;// diamonds
    ['48']: number; //	accExplosion
    ['49']: number; // 	modlevel
    ['50']: number; // 	commentHistoryState
}

export interface ApiIconData extends Pick<ApiUserData,
    | '10'
    | '11'
    | '28'
    | '21'
    | '22'
    | '23'
    | '24'
    | '25'
    | '26'
    | '43'> {}