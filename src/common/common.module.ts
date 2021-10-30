import { Module } from '@nestjs/common';
import { Encrypter } from "./utils/encrypter"

@Module({
    providers: [
        {
            provide: "EncrypterInterface",
            useClass: Encrypter 
        }
    ],
    exports: [
        {
            provide: "EncrypterInterface",
            useClass: Encrypter 
        }
    ]
})
export class CommonModule {

}
