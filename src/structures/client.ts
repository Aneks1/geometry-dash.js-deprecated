import gjRequest from "../util/gjRequest";
import Encryptor from "../util/encrypt";
import params from "../util/params";
import uuid from "../util/uuid";
import CommentManager from "../managers/level-comments";
import { LoginParameters } from "../../types";
import ClientUser from "./client-user";

const encryptor = new Encryptor();

class Client {
    public username: string | null = null;
    public accountId: string | null = null;
    public gjp: string | null = null;

    public user: ClientUser | null = null;
    public comments: CommentManager | null = null;

    public async login({ username, password }: LoginParameters) {
        const data = await gjRequest("accounts/loginGJAccount", {
            secret: params.secrets.account,
            udid: uuid(),
            userName: username,
            password,
        });

        if (data == -1) throw new Error("Invalid login credentials! Check that your username and password are correct.\n");
        else if (data == 12) throw new Error("This account is banned from the Geometry Dash servers! Consider not cheating again :c\n");

        this.username = username;
        this.accountId = data.split(",")[0];
        this.gjp = encryptor.xor.encrypt(password, 37526);

        const userData = await gjRequest("getGJUserInfo20", {
            secret: params.secrets.common,
            targetAccountID: this.accountId,
        });

        this.user = new ClientUser(this, userData);

        const commentData = await gjRequest("getGJCommentHistory", {
            secret: params.secrets.common,
            page: 0,
            mode: 0,
            userID: this.user.playerId,
        });

        this.comments = new CommentManager(this, commentData, 0);
        return this;
    }
}

export = Client;
