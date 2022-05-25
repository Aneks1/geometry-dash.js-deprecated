import SettingsManager from "../managers/user-settings";
import Encryptor from "../util/encrypt";
import gjRequest from "../util/gjRequest";
import params from "../util/params";
import Client from "./client";
import User from "./user/base-user";

const encryptor = new Encryptor();

export default class ClientUser extends User {
    #client: Client;
    public settings: SettingsManager;

    constructor(client: Client, data: string) {
        super(data);
        this.#client = client;

        this.settings = new SettingsManager(client);
    }

    public async postProfileComment(comment: string) {
        if (comment.includes("\n")) {
            throw new Error("You can't add line breaks to posts!");
        }

        const data = await gjRequest("uploadGJAccComment20", {
            secret: params.secrets.common,
            userName: this.username,
            accountID: this.#client.gjp,
            gjp: this.#client.gjp,
            comment: encryptor.base64.encrypt(comment),
        });

        return data;
    }
}
