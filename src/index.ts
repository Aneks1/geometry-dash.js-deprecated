import getUserFromID from "./getData/getGJUserInfo20"
import getCommentsFromPlayerID from "./getData/getGJAccountComments"
import Client from "./util/client"

export default { getUserFromID, Client }

async function name() {

    const me = new Client()
    
    const a = await me.login({ username: "Tofixts", password: "sussus" })

    const comments = await getCommentsFromPlayerID({ id: me.profile.info.playerID })
}

name()