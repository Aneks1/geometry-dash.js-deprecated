export = class Author {
    public username: string;
    public icon: string;
    public playerColor: string;
    public secondaryPlayerColor: string;
    public iconType: "cube" | "ship" | "ball" | "ufo" | "wave" | "robot" | "spider";
    public hasGlow: boolean;
    public accountId: string;

    constructor(data: Record<string, string>) {
        this.username = data[1];
        this.icon = data[9];
        this.playerColor = data[10];
        this.secondaryPlayerColor = data[11];
        this.iconType =
            data[14] == "0"
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
                : data[14] == "6"
                ? "spider"
                : "cube";

        this.hasGlow = data[15] == "0" ? false : true;
        this.accountId = data[16];
    }
};
