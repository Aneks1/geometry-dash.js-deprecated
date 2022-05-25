import Client from "../structures/client";
import User from "../structures/user/user";
import gjRequest from "../util/gjRequest";
import params from "../util/params";
import BaseUser from "./user/base-user";

export type UserResolvable = User | string | number;

export default class Searcher {
    static async user(query: UserResolvable): Promise<BaseUser>;
    static async user(query: UserResolvable, client?: Client): Promise<User>;
    static async user(query: UserResolvable, client?: Client): Promise<User | BaseUser> {
        if (query instanceof User) return query;

        let res;
        if (!isNaN(+query)) {
            res = await gjRequest("getGJUserInfo20", {
                secret: params.secrets.common,
                targetAccountID: query,
            });
        } else {
            res = await gjRequest("getGJUsers20", {
                secret: params.secrets.common,
                str: query,
            });
        }

        return client ? new User(client, res) : new BaseUser(res);
    }
}
