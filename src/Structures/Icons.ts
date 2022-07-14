import Parseable from "./contracts/parseable";
import jsonBuilder from "../Utils/JsonResponse";
import {ApiIconData} from "../../types";

class Icons implements Parseable<ApiIconData>{

    public readonly color1: string
    public readonly color2: string
    public readonly glow: boolean
    public readonly gamemodes: Record<string, string>

    constructor(userInfo: Record<string, string>) {
        const parsedIconData = this.parse(userInfo);
        this.color1 = parsedIconData['10'] as unknown as string;
        this.color2 = userInfo['11'] as unknown as string;

        this.glow = parsedIconData['28'] === 1;
        
        this.gamemodes = {

            cube: parsedIconData['21'] as unknown as string,
            ship: parsedIconData['22'] as unknown as string,
            ball: parsedIconData['23'] as unknown as string,
            ufo: parsedIconData['24'] as unknown as string,
            wave: parsedIconData['25'] as unknown as string,
            robot: parsedIconData['26'] as unknown as string,
            spider: parsedIconData['43'] as unknown as string,

        }

    }
    parse(dataT: Record<string, string>): ApiIconData {
        return jsonBuilder<ApiIconData>(dataT)
            .withPreserve(['10', '11', '21', '22', '23', '24', '25', '26', '43'])
            .parseRest()
            .build()
    }

}

export default Icons