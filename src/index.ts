    
    // [    Endpoints   ] \\

import getUserFromID from "./endpoints/getGJUserInfo20"
import getCommentsFromPlayerID from "./endpoints/getGJAccountComments"

    // [    Structures    ] \\
    
import Client from "./structures/client"
import Comment from "./structures/comment"
import FriendRequest from "./structures/FriendRequest"
import Icons from "./structures/Icons"
import Player from "./structures/Player"
import RelationshipsManager from "./structures/Relationships"

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

    const me = new Client();
    me.login({ username: 'Tofixts', password: 'sussus' }).then(c => {
        if(c instanceof Client) {
            console.log(c.profile)
        }
    })