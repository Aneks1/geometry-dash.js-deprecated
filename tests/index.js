const gd = require('../dist').default

try {
    gd.getUserFromID({ userID: '187237' }).then((user) => console.log(user))
    process.exit(0);
} catch {
    process.exit(1);
}