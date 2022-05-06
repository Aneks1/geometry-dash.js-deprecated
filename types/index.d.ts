export class Client {
    public login(params: { username: string; password: string }): Promise<void>;
}

export interface CommentData {
    content: string;
    likes: string;
    date: string;
    commentID: string;
    percent: string;
}

export interface Comment {
    comment: CommentData;
    user: User;
    level: string;
}

export interface UserInfo {
    username: string;
    playerID: string;
    accountID: string;
}

export interface UserStats {
    coins: number;
    userCoins: number;
    stars: number;
    demons: number;
    diamonds: number;
    creatorPoints: number;
    globalRank: number;
}

export interface UserSocialData {
    youtube: string | null;
    twitter: string | null;
    twitch: string | null;
}

export class User {
    constructor(rawData: string);

    public info: UserInfo;
    public stats: UserStats;
    public social: UserSocialData;
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

export interface UserIconData {
    playerColor: number;
    secondaryPlayerColor: number;
    iconType: number;

    cube: number;
    ship: number;
    ball: number;
    bird: number;
    wave: number;
    robot: number;
    spider: number;

    streak: number;
    glow: number;
    explosion: number;
}
