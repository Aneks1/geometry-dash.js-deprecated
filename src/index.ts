import CommentManager from "./managers/level-comments";
import UserCommentManager from "./managers/user-comments";
import SettingsManager from "./managers/user-settings";

import Author from "./structures/author";
import ClientUser from "./structures/client-user";
import Client from "./structures/client";
import Comment from "./structures/comment";
import Level from "./structures/level";
import User from "./structures/user/base-user";

export = {
    CommentManager,
    UserCommentManager,
    SettingsManager,

    Author,
    ClientUser,
    Client,
    Comment,
    Level,
    User,
};
