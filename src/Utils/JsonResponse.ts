import {ApiResponses} from "../../types";

type Override<T1, T2> = Omit<T1, keyof T2> & T2;
type FinalResult<
    T extends ApiResponses,
    Ignored extends keyof T,
    > = Override<T, { [key in Ignored] : string }>

class JsonResponseBuilder<
    Response extends ApiResponses,
    Ignored extends keyof Response = keyof Response,
    > {
    private output : Record<string,unknown> = {} ;
    private alreadyParsed = new Set<string>();
    public constructor(
        private readonly dictionary: Record<string | number | symbol,string>
    ) {
    }

    public withTransform<K extends keyof Response>(key : K, callback: (value : string) => Response[K] ) :
        JsonResponseBuilder<Response, Ignored> {
        this.output[key as string] = callback(this.dictionary[key.toString()]);
        this.alreadyParsed.add(key.toString())
        return this;
    }

    /**
     *
     * @param keys the keys you want to keep from being parsed
     *  Note : This makes the keys provided their values as string
     */
    public withPreserve<K extends (keyof Response)[]>(...keys : [...K])
        : JsonResponseBuilder<Response, Extract<Ignored, K[number]>> {
        for(const key of keys) {
            if(this.alreadyParsed.has(key.toString())) {
                throw Error("this key has already been parsed")
            }
            this.output[key.toString()] = this.dictionary[key];
            this.alreadyParsed.add(key.toString());
        }
        return this as unknown as JsonResponseBuilder<Response, Extract<Ignored, K[number]>>;
    }

    /**
     * All numeric strings, boolean strings, empty strings are converted into numbers, booleans, null unless .withPreserve(keys) is called before hand.
     *
     */
    public parseRest(): JsonResponseBuilder<Response, Ignored> {
        const keysNeededToParse = Object.keys(this.dictionary).filter(key => !this.alreadyParsed.has(key));
        for(const key of keysNeededToParse) {
            const value: string = this.dictionary[key];
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

                }
            }
        }
        return this;
    }

    public build()  {
        return this.output as FinalResult<Response, Ignored>;
    }

}

export default function jsonBuilder<Response extends ApiResponses>(raw: Record<string, string>) {
    return new JsonResponseBuilder<Response>(raw);
}