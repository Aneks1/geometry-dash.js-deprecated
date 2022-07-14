class Icons {

    public readonly color1: string
    public readonly color2: string
    public readonly glow: boolean
    public readonly gamemodes: Record<string, string>

    constructor(userInfo: Record<string, string>) {

        this.color1 = userInfo['10']!.toString()
        this.color2 = userInfo['11']!.toString()

        this.glow = userInfo['28'] == '1',
        
        this.gamemodes = {

            cube: userInfo['21']!.toString(),
            ship: userInfo['22']!.toString(),
            ball: userInfo['23']!.toString(),
            ufo: userInfo['24']!.toString(),
            wave: userInfo['25']!.toString(),
            robot: userInfo['26']!.toString(),
            spider: userInfo['43']!.toString(),

        }

    }

}

export default Icons