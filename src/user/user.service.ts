import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import BusinessException from "src/common/exceptions/business_exception";
import UnauthorizatedException from "src/common/exceptions/unauthorizated_exception";
import { EncrypterInterface } from "src/common/utils/encrypter";
import { Repository } from "typeorm";
import { CredentialAuth } from "./credential_auth.dto";
import { User } from "./user.entities";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private repository: Repository<User>,
        @Inject("EncrypterInterface") private encrypter: EncrypterInterface
    ) { }


    private findByEmail(email: string) {
        return this.repository.findOne({ where: { email }})
    }

    async authenticate(credential: CredentialAuth): Promise<{ [key: string]: any }> {
        const userWithEmail = await this.findByEmail(credential.email)
        if (!userWithEmail) {
            throw new UnauthorizatedException("Credentials invalids!")
        }

        const isValidPassword = await this.encrypter.compare(
            userWithEmail.password, credential.password
        )

        if (!isValidPassword) {
            throw new UnauthorizatedException("Credentials invalids!")
        }

        return {
            ...userWithEmail, password: ""
        }
    }

    async save(user: User) {
        const userWithEmail = await this.findByEmail(user.email)
        if (userWithEmail) {
            throw new BusinessException("Email can't used. Try another email")
        }
        user.password = await this.encrypter.encrypt(user.password)
        return this.repository.insert(user)
    }
}