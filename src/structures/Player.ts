
type iconNums = '0' |'1' | '2' | '3' | '4' | '5' | '6'
type vehicles = 'cube' | 'ship' | 'ball' | 'ufo' | 'wave' | 'robot' | 'spider'

class Player {

    public readonly info: Record<string, string | number | null | boolean>
    public readonly icons: Record<string, string | number | null | boolean>

    constructor(userInfo: Record<string, string | number | null>) {

        this.info = {

            username: userInfo['1'],
            accountID: userInfo['16']

        },

        this.icons = {

            color1: userInfo['10'],
            color2: userInfo['11'],

            iconType: getIconType(userInfo['14']!.toString() as iconNums),
            iconID: userInfo['9']

        }

        if(userInfo['2']) this.info.playerID = userInfo['2']

        if(userInfo['15']?.toString().startsWith('glow ')) {

            this.icons.glow = userInfo['15'].toString().split(' ')[1] == '2'

        }

        else {

            this.icons.trail = userInfo['15']

        }
        
    }
}


export default Player


function getIconType(num: iconNums): vehicles {

    switch (num) {

        case '0':

            return 'cube'

        case '1':

            return 'ship'

        case '2':
            
            return 'ball'

        case '3':

            return 'ufo'

        case '4':

            return 'wave'

        case '5':

            return 'robot'

        case '6':

            return 'spider'

    }

}