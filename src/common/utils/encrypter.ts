import * as bcrypt from "bcryptjs"

export interface EncrypterInterface {

    encrypt(value: string): Promise<string>

    compare(hash: string, value: string): Promise<boolean>
}

export class Encrypter implements EncrypterInterface {

    compare(hash: string, value: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            bcrypt.compare(value, hash, function(err, res) {
                if (err) return reject(err)
                resolve(res)
            });
        })
        
        
    }

    encrypt(value: string): Promise<string> {
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(10, function(err, salt) {
                if (err) return reject(err);
                bcrypt.hash(value, salt, function(err, hash) {
                    if (err) return reject(err);
                    resolve(hash)
                });
            });
        })
    }

}