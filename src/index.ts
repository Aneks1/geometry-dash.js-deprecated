    
    // [    Endpoints   ] \\

import getUserFromID from "./Endpoints/getGJUserInfo20"
import getCommentsFromPlayerID from "./Endpoints/getGJCommentHistory"

    // [    Structures    ] \\
    
import Client from "./Structures/Client"
import Comment from "./Structures/Comment"
import FriendRequest from "./Structures/FriendRequest"
import Icons from "./Structures/Icons"
import Player from "./Structures/Player"
import RelationshipsManager from "./Structures/Relationships"
import User from "./Structures/User"

export default { 
    
    getUserFromID, 
    Client, 
    getCommentsFromPlayerID,
    Comment,
    FriendRequest,
    Icons,
    Player,
    RelationshipsManager,
    User

}