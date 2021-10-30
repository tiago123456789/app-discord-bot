import { Body, Controller, Get, Post, Res, UseGuards } from "@nestjs/common";
import { AuthorizationApiKeyGuard } from "src/security/authorization_apikey.guard";
import { Command } from "./command.entities";
import { CommandService } from "./command.service";

@Controller("/api/commands")
@UseGuards(AuthorizationApiKeyGuard)
export default class CommandEndpoint {

    constructor(private readonly commandService: CommandService) {}

    @Get()
    @UseGuards(AuthorizationApiKeyGuard)
    public async getAll(): Promise<Array<Command>> {
        const commands = await this.commandService.getAll();
        return commands;
    }

}