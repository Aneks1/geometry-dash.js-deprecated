import sha1 from 'sha1';

class Encryptor {

    public chk(str: string, salt: string, key: number) {

        return this.xor.encrypt(
            
            sha1(str + salt), key
            
        )

    }

    public xor = {

        encrypt: function (str: string, key: number) {

            const first = String.fromCodePoint(

                ...str.split('')

                    .map(

                        (char, x) => { 
                            
                            return char.charCodeAt(0) ^ key.toString().charCodeAt(x % key.toString().length)

                        }
                    )
                )

            const encrypted = Buffer.from(first).toString('base64').replace(/\//g, '_').replace(/\+/g, '-')

            return encrypted
        
        }

    }

    public base64 = {

        encrypt: function (str: string) {

            const encrypted = Buffer.from(str).toString('base64').replace(/\//g, '_').replace(/\+/g, "-")

            return encrypted

        },

        decrypt: function (str: string) {

            const decrypted = Buffer.from(str.replace(/\//g, '_').replace(/\+/g, '-'), 'base64').toString()

            return decrypted
            
        }
    }

}

const encryptor = new Encryptor()
export default encryptor