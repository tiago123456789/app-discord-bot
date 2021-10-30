import { Body, Controller, Get, Param, Post, Render, Req, Res, UseGuards } from "@nestjs/common";
import { Request, request, Response } from "express";
import { AuthorizationSessionGuard } from "src/security/authorization_session.guard";
import { Command } from "./command.entities";
import { CommandService } from "./command.service";

@Controller("/commands")
@UseGuards(AuthorizationSessionGuard)
export default class CommandController {

    constructor(private readonly commandService: CommandService) {}

    @Get()
    @Render("command/index.ejs")
    public async getAll(@Req() request: Request) {
        const commands = await this.commandService.getAll();
        const message = await request.consumeFlash("success")
        return { commands, successMessage: message };
    }

    @Get("/delete/:id")
    public async delete(
        @Param("id") id: Number,
        @Body() command: Command, 
        @Res() response: Response,
        @Req() request: Request
    ): Promise<void>  {
        await this.commandService.delete(id)
        // @ts-ignore
        request.flash("success", "Command deleted success!!!")
        return response.redirect("/commands")
    }


    @Post()
    public async save(
        @Body() command: Command, 
        @Res() response: Response,
        @Req() request: Request
    ): Promise<void>  {
        await this.commandService.save(command)
        // @ts-ignore
        request.flash("success", "Command created success!!!")
        return response.redirect("/commands")
    }

}