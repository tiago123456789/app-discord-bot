import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import CommandController from './command.controller';
import CommandEndpoint from './command.endpoint';
import { Command } from './command.entities';
import { CommandService } from './command.service';

@Module({
    imports: [TypeOrmModule.forFeature([Command])],
    controllers: [CommandController, CommandEndpoint],
    providers: [
        CommandService
    ]

})
export class CommandsModule {}
