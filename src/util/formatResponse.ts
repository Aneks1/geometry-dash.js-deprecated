export default function formatResponse(data: string[]) {

    const formatted: { [key: string]: any } = {}

    for (let i = 0; i < data.length; i += 2) {

        formatted[data[i] as keyof typeof formatted] = data[i + 1]

    }

    return formatted

}