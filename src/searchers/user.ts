import Client from "../structures/client";
import User from "../structures/user/user";
import gjRequest from "../util/gjRequest";
import params from "../util/params";

export type UserResolvable = User | string | number;

export default async (client: Client, query: UserResolvable) => {
    if (query instanceof User) return query;

    if (!isNaN(+query)) {
        const res = await gjRequest("getGJUserInfo20", {
            secret: params.secrets.common,
            targetAccountID: query,
        });
        return new User(client, res);
    } else {
        const res = await gjRequest("getGJUsers20", {
            secret: params.secrets.common,
            str: query,
        });
        return new User(client, res);
    }
};
