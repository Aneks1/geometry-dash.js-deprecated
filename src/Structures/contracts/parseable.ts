

export default interface Parseable<T> {
    parse(dataT: Record<string, string>) : T
}