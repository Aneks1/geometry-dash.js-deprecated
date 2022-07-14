

type KVSeparators = ':' | '~|~' | '~';
type ApiResponses =
   | ApiAccountComment
   | ApiUserCommentData
   | ApiUserData

export interface ApiAccountComment {
    ['1'] : number; //levelId
    ['2'] : string; //comment //encoded in base64
    ['3'] : number; //authorPlayedId
    ['4'] : number; //likes
    ['5'] : number; //dislikes
    ['6'] : number; //messageId
    ['7'] : boolean; //spam
    ['8'] : number; //authorAccountId
    ['9'] : string; // age
    ['10'] : number; // percent
    ['11'] : number; // modBadge
    ['12'] : string; //moderatorChatColor
}

export interface ApiUserCommentData {
    ['1'] : string; //userName
    ['9'] : number; //icon
    ['10'] : number; //playerColor
    ['11'] : number; //playerColor2
    ['14'] : number; //iconType
    ['15'] : 0 | 2; // glow
    ['16'] : number;//accountID
}

export interface ApiUserData {
    ['1'] : string; //userName
    ['2'] : number; // 	userID
    ['3'] : number; // stars
    ['4'] : number; // demons
    ['6'] : number; //ranking
    ['7'] : number;//  	accountHighlight
    ['8'] : number; // 	creatorpoints
    ['9'] : number; // iconID
    ['10'] : number; // 	playerColor
    ['11']: number; // 	playerColor2
    ['13']: number;//secretCoins
    ['14']: number; // 	iconType
    ['15']: number; // 	special
    ['16']: number; //accountID
    ['17']: number; // 	usercoins
    ['18']: number; // 	messageState
    ['19']: number; // 	friendsState
    ['20']: string;// youTube
    ['21']: number;// 	accIcon
    ['22']: number;//accShip
    ['23']: number;// 	accBall
    ['24']: number; // 	accBird
    ['25']: number; // 	accDart(wave)
    ['26']: number; // 	accRobot
    ['27']:number; //  	accStreak
    ['28']: number; // 	accGlow
    ['29']: number//  	isRegistered
    ['30']: number; // 	globalRank
    ['31']:number; //1	friendstate
    ['38']:number; // messages
    ['39']: number; // friendRequests
    ['40']: number; //  newFriends
    ['41']: boolean; // NewFriendRequest
    ['42']: string; // age
    ['43']: number; //  	accSpider
    ['44']: string; //  	twitter
    ['45']: string;//twitch
    ['46']: number;// diamonds
    ['48']: number; //	accExplosion
    ['49']: number; // 	modlevel
    ['50']: number; // 	commentHistoryState
}

class JsonResponseBuilder<Response extends ApiResponses> {
    private readonly dictionary : StringOnlyValue<Response>;
    private output : Record<string,unknown> = {} ;
    private alreadyParsed = new Set<string>();
    public constructor(private response : string[], separator: KVSeparators) {
        this.dictionary = Object.fromEntries(this.chunk(separator)) as StringOnlyValue<Response>;
    }

    public withTransform<K extends keyof Response>(key : K, callback: (value : string) => Response[K] ) :
        JsonResponseBuilder<Response> {
        this.output[key as string] = callback(this.dictionary[key]);
        this.alreadyParsed.add(key.toString())
        return this;
    }

    public parseRest(): JsonResponseBuilder<Response> {
        const keysNeededToParse = Object.keys(this.dictionary).filter(key => !this.alreadyParsed.has(key));
        for(const key of keysNeededToParse) {
            const value: string = this.dictionary[key as keyof Response];
            if(value === undefined) {
                throw Error('Parsing the wrong data structure');
            }
            if(value === 'true') {
                this.output[key] = true;
            } else if (value === 'false') {
                this.output[key] = false;
            } else {
                const val = Number.parseFloat(value);
                if(!Number.isNaN(val)) {
                    this.output[key] = Number.parseFloat(value);
                } else if (value === '') {
                    this.output[key] = null;
                } else {
                    this.output[key] = value;
                    console.log(key)

                }
            }
        }
        return this;
    }

    private chunk(separator : KVSeparators) : [string, string][]  {
        //assumption that the data is a length 1 array
        const formattedVals = this.response[0].split(separator);
        const pairings : [string, string][] = []
        for (let i = 0; i < formattedVals.length; i += 2) {
            pairings.push([formattedVals[i], formattedVals[i + 1]]);
        }
        return pairings;
    }

    public build() : Response {
        return this.output as Response;
    }

}

type StringOnlyValue<T extends ApiResponses> = {
     [K in keyof T]: string;
}

export default function jsonBuilder<Response extends ApiResponses>(response : string[], separator: KVSeparators) {
    return new JsonResponseBuilder<Response>(response,separator);
}