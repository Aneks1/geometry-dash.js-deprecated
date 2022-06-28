    
    // [    Endpoints   ] \\

import getUserFromID from "./Endpoints/getGJUserInfo20"
import getCommentsFromPlayerID from "./Endpoints/getGJAccountComments"

    // [    Structures    ] \\
    
import Client from "./Structures/Client"
import Comment from "./Structures/Comment"
import FriendRequest from "./Structures/FriendRequest"
import Icons from "./Structures/Icons"
import Player from "./Structures/Player"
import RelationshipsManager from "./Structures/Relationships"

export default { 
    
    getUserFromID, 
    Client, 
    getCommentsFromPlayerID,
    Comment,
    FriendRequest,
    Icons,
    Player,
    RelationshipsManager

}