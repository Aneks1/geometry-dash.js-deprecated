    
    // [    Endpoints   ] \\

import getUserFromID from "./Endpoints/getGJUserInfo20"
import getCommentsFromPlayerID from "./Endpoints/getGJCommentHistory"

    // [    Structures    ] \\
    
import Client from "./Structures/Client"
import LevelComment from "./Structures/LevelComment"
import ProfileComment from "./Structures/ProfileComment"
import FriendRequest from "./Structures/FriendRequest"
import Icons from "./Structures/Icons"
import Player from "./Structures/Player"
import RelationshipsManager from "./Structures/managers/RelationshipsManager"
import User from "./Structures/User"

export default { 
    
    getUserFromID, 
    Client, 
    getCommentsFromPlayerID,
    LevelComment,
    FriendRequest,
    Icons,
    Player,
    RelationshipsManager,
    User,
    ProfileComment
}

    const me = new Client();
    me.login({ username: 'Tofixts', password: 'sussus' }).then(c => {
            console.log(c.profile)
    })