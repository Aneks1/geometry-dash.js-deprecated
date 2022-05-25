import CommentManager from "../../managers/level-comments";
import UserCommentManager from "../../managers/user-comments";
import Encryptor from "../../util/encrypt";
import gjRequest from "../../util/gjRequest";
import params from "../../util/params";
import Client from "../client";
import BaseUser from "./base-user";

const encryptor = new Encryptor();

export default class User extends BaseUser {
    #client: Client;
    constructor(client: Client, rawData: string) {
        super(rawData);
        this.#client = client;
    }

    public async fetchAccountComments(): Promise<UserCommentManager> {
        const res = await gjRequest("getGJAccountComments20", {
            secret: params.secrets.common,
            page: 0,
            accountID: this.accountId,
        });

        return new UserCommentManager(this.#client, res, 0);
    }

    public async fetchComments(): Promise<CommentManager> {
        const res = await gjRequest("getGJCommentHistory", {
            secret: params.secrets.common,
            page: 0,
            userID: this.playerId,
        });

        return new CommentManager(this.#client, res, 0);
    }

    public async sendFriendRequest(message?: string): Promise<boolean> {
        try {
            await gjRequest("uploadFriendRequest20", {
                secret: params.secrets.common,
                gjp: this.#client.gjp,
                toAccountID: this.accountId,
                accountID: this.#client.user?.accountId,
                comment: message ? encryptor.base64.encrypt(message) : "",
            });

            return true;
        } catch {
            return false;
        }
    }

    public async block(): Promise<void> {
        await gjRequest("blockGJUser20", {
            secret: params.secrets.common,
            gjp: this.#client.gjp,
            accountID: this.#client.user?.accountId,
            targetAccountID: this.accountId,
        });
    }

    public async unblock(): Promise<void> {
        await gjRequest("unblockGJUser20", {
            secret: params.secrets.common,
            gjp: this.#client.gjp,
            accountID: this.#client.user?.accountId,
            targetAccountID: this.accountId,
        });
    }

    public async sendMessage(subject: string, message: string): Promise<boolean> {
        const res = await gjRequest("uploadGJMessage20", {
            secret: params.secrets.common,
            gjp: this.#client.gjp,
            toAccountID: this.accountId,
            accountID: this.#client.user?.accountId,
            subject: encryptor.base64.encrypt(subject),
            message: encryptor.base64.encrypt(message),
        });

        return res == 1;
    }
}
