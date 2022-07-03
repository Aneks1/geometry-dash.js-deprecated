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
    twitch: `https://twitch.tv/${string}` | null;
    youtube: `https://youtube.com/${string}` | null;
    twitter: `https://twitter.com/${string}` | null;
}