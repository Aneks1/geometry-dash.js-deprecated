import Client from "../structures/client";
import gjRequest from "../util/gjRequest";
import params from "../util/params";
import { UserSocialData } from "../../types";

export default class SettingsManager {
    #client: Client;
    constructor(client: Client) {
        this.#client = client;
    }

    public async updateMessageState(to: "all" | "friends" | "off"): Promise<void> {
        await gjRequest("updateGJAccSettings20", {
            secret: params.secrets.account,
            gjp: this.#client.gjp,
            accountID: this.#client.accountId,
            mS: to === "all" ? 0 : to === "friends" ? 1 : to === "off" ? 2 : 2,
        });
    }

    public async updateFriendRequestState(to: "all" | "off"): Promise<void> {
        await gjRequest("updateGJAccSettings20", {
            secret: params.secrets.account,
            gjp: this.#client.gjp,
            accountID: this.#client.accountId,
            frS: to === "all" ? 0 : to === "off" ? 1 : 1,
        });
    }

    public async updateCommentHistoryVisibility(to: "all" | "friends" | "off"): Promise<void> {
        await gjRequest("updateGJAccSettings20", {
            secret: params.secrets.account,
            gjp: this.#client.gjp,
            accountID: this.#client.accountId,
            cS: to === "all" ? 0 : to === "friends" ? 1 : to === "off" ? 2 : 2,
        });
    }

    public async updateSocialMedia(data: AtLeastOne<UserSocialData>): Promise<void> {
        const options: Record<string, string | null> & { secret: string } = {
            secret: params.secrets.account,
            gjp: this.#client.gjp,
            accountID: this.#client.accountId,
        };

        data.youtube && (options.yt = data.youtube);
        data.twitter && (options.twitter = data.twitter);
        data.twitch && (options.twitch = data.twitch);

        await gjRequest("updateGJAccSettings20", options);
    }
}

export type AtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
    {
        [K in Keys]-?: Required<Pick<T, K>> & Partial<Record<Exclude<Keys, K>, undefined>>;
    }[Keys];
