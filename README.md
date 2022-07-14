# ![Title](https://cdn.discordapp.com/attachments/779044709930369144/865273776866197534/Geometry_Dash2Ejs.png)

Api wrapper for Geometry Dash. Made by me and my team, 100% made in TypeScript.

## Installing

```
$ npm install geometry-dash.js
```


## Usage

### Getting a Profile:

```ts
// Gets user from its account ID
const user = await getUserFromAccountID({ id: '13976093' })
```

### Logging in into your Account

```ts
const me = new Client()
await me.login({ username: 'Aneks', password: 'UmGnomoEstavaAndandoEncimaDoAsfalto' })
```

### Posting Comments

```ts
await me.postProfileComment({ comment: 'Colon is a Furry' })
await me.postLevelComment({ id: '75206202', comment: 'This is too easy', percent: 100 })
```

### Getting Someone's Comments

```ts
const comments = await getCommentsFromPlayerID({ playerID: '1234567' }) // Add page: "page number" for specific page. Default is 0
```

### Relationships

```ts
const friends = me.relationships.friends
const blocked = me.relationships.blockedUsers
```

### Friend Requests

```ts
const friendRequests = me.relationships.friendRequests
const robtopFriendRequest = friendRequests.filter((rqst: FriendRequest) => { return rqst.user.username == 'RobTop' })
const nexusFriendRequest = friendRequests.filter((rqst: FriendRequest) => { return rqst.user.username == 'Nexus' })

if(nexusFriendRequest) await nexusFriendRequest.accept()
if(robtopFriendRequest) await robtopFriendRequest.accept()
```