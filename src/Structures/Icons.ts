import Parseable from "./contracts/parseable";
import jsonBuilder from "../Utils/JsonResponse";
import {ApiIconData} from "../../types";

class Icons implements Parseable {

    public readonly color1: string
    public readonly color2: string
    public readonly glow: boolean
    public readonly gamemodes: Record<string, string>

    constructor(userInfo: Record<string, string>) {
        const parsedIconData = this.parse(userInfo);
        this.color1 = parsedIconData['10'];
        this.color2 = userInfo['11'];

        this.glow = parsedIconData['28'] === 1;
        
        this.gamemodes = {

            cube: parsedIconData['21'],
            ship: parsedIconData['22'],
            ball: parsedIconData['23'],
            ufo: parsedIconData['24'],
            wave: parsedIconData['25'],
            robot: parsedIconData['26'],
            spider: parsedIconData['43'],

        }

    }
    parse(dataT: Record<string, string>) {
        return jsonBuilder<ApiIconData>(dataT)
            .withPreserve('10', '11', '21', '22', '23', '24', '25', '26', '43')
            .parseRest()
            .build()
    }

}

export default Icons