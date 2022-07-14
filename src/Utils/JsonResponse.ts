import {ApiResponses} from "../../types";


class JsonResponseBuilder<Response extends ApiResponses> {
    private output : Record<string,unknown> = {} ;
    private alreadyParsed = new Set<string>();
    public constructor(
        private readonly dictionary: Record<string | number | symbol,string>
    ) {
    }

    public withTransform<K extends keyof Response>(key : K, callback: (value : string) => unknown ) :
        JsonResponseBuilder<Response> {
        this.output[key as string] = callback(this.dictionary[key.toString()]);
        this.alreadyParsed.add(key.toString())
        return this;
    }

    /**
     *
     * @param keys the keys you want to keep from being parsed
     *  Note : As the builder parses to one type, if accessing this preserved key,
     *  you will need to cast it as string
     */
    public withPreserve<K extends keyof Response>(keys : K[]) {
        for(const key of keys) {
            if(this.alreadyParsed.has(key.toString())) {
                throw Error("this key has already been parsed")
            }
            this.output[key as string] = this.dictionary[key];
            this.alreadyParsed.add(key.toString());
        }
        return this;
    }
    public parseRest(): JsonResponseBuilder<Response> {
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

    public build() : Response {
        return this.output as Response;
    }

}

export default function jsonBuilder<Response extends ApiResponses>(raw: Record<string, string>) {
    return new JsonResponseBuilder<Response>(raw);
}