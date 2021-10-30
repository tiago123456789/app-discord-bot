import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entities';
import UserController from './user.controller';
import { UserService } from './user.service';
import { CommonModule } from 'src/common/common.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        CommonModule
    ],
    controllers: [
        UserController
    ],
    providers: [UserService]
})
export class UserModule {

}
