import gjRequest from "../util/gjRequest";
import sha1 from "sha1";
import Encryptor from "../util/encrypt";
import params from "../util/params";
import uuid from "../util/uuid";
import User from "../structures/user";
import { LoginParameters, PostCommentParameters } from "../../types";
import UserCommentManager from "../managers/user-comments";

const encryptor = new Encryptor();

class Client {
    public username: string | null = null;
    public accountID: string | null = null;
    public gjp: string | null = null;

    public user: User | null = null;
    public comments: UserCommentManager | null = null;

    public async login({ username, password }: LoginParameters) {
        const data = await gjRequest("accounts/loginGJAccount", {
            secret: params.secrets.account,
            udid: uuid(),
            userName: username,
            password,
        });

        if (data == -1) throw new Error("Invalid login credentials! Check that your username and password are correct.\n");
        else if (data == 12) throw new Error("This account is baneed from the Geometry Dash servers! Consider not cheating again :c\n");

        this.username = username;
        this.accountID = data.split(",")[0];
        this.gjp = encryptor.xor.encrypt(password, 37526);

        const userData = await gjRequest("getGJUserInfo20", {
            secret: params.secrets.common,
            targetAccountID: this.accountID,
        });

        this.user = new User(userData);

        const commentData = await gjRequest("getGJCommentHistory", {
            secret: params.secrets.common,
            page: 0,
            mode: 0,
            userID: this.user.data.playerId,
        });
        console.log(commentData);
        this.comments = new UserCommentManager(this, commentData, 0);
        return this;
    }

    public async postLevelComment({ id, comment, percent = 0 }: PostCommentParameters) {
        if (comment.includes("\n")) {
            throw new Error("You can't add line breaks to posts!");
        }

        if (percent > 100 || percent < 0) {
            throw new Error("Percent can't be higher than 100 or lower than 0!");
        }

        comment = encryptor.base64.encrypt(comment);

        const str = sha1(this.username + comment + id + percent.toString() + "0xPT6iUrtws0J");

        const encrypted = encryptor.xor.encrypt(str, 29481);

        const data = await gjRequest("uploadGJComment21", {
            secret: params.secrets.common,
            accountID: this.accountID,
            gjp: this.gjp,
            userName: this.username,
            comment,
            levelID: id,
            percent: percent.toString(),
            chk: encrypted,
        });

        return data;
    }

    public async postProfileComment(comment: string) {
        if (comment.includes("\n")) {
            throw new Error("You can't add line breaks to posts!");
        }

        comment = encryptor.base64.encrypt(comment);

        const data = await gjRequest("uploadGJAccComment20", {
            secret: params.secrets.common,
            userName: this.username,
            accountID: this.accountID,
            gjp: this.gjp,
            comment: comment,
        });

        return data;
    }
}

export = Client;
