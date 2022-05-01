# ![Title](https://cdn.discordapp.com/attachments/779044709930369144/865273776866197534/Geometry_Dash2Ejs.png)

Api wrapper for Geometry Dash. Made by me, 100% made in TypeScript. Um, don't know what else to add. I guess i will just say that Colon is a furry.

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