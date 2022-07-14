import Icons from './Icons'
import {ApiUserData, UserData, UserSocialData, UserStats} from "../../types/index";
import Parseable from "./contracts/parseable";
import jsonBuilder from "../Utils/JsonResponse";

class User implements Parseable<ApiUserData> {

    public readonly info : UserData
    public readonly stats : UserStats
    public readonly social : UserSocialData
    public readonly icons: Icons

    constructor(userInfo: Record<string, string>) {
        const parsedUserData = this.parse(userInfo)
        this.info = {

            username: parsedUserData['1'],
            playerId: parsedUserData['2'] as unknown as string,
            accountId: parsedUserData['16'] as unknown as string

        };

        this.stats = {

            coins: parsedUserData['13'],
            userCoins: parsedUserData['17'],
            stars: parsedUserData['3'],
            diamonds: parsedUserData['46'],
            demons: parsedUserData['4'],
            creatorPoints: parsedUserData['8'],
            globalRank: parsedUserData['30']

        };

        this.social = {

            youtube: parsedUserData[20],
            twitch: parsedUserData[45],
            twitter: parsedUserData[44]

        };

        this.icons = new Icons(userInfo)

    }

    parse(dataT: Record<string, string>): ApiUserData {
        return jsonBuilder<ApiUserData>(dataT)
            .withPreserve(['2', '16'])
            .withTransform('20', value => value === '' ? null : `https://www.youtube.com/channel/${dataT[13]}`)
            .withTransform('45', value => value === '' ? null : `https://www.twitch.tv/${dataT[26]}`)
            .withTransform('44', value => value === '' ? null : `https://twitter.com/${dataT[27]}`)
            .parseRest()
            .build()
    }

}

export default User