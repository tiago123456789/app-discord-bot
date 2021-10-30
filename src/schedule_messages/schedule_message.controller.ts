import { Body, Controller, Get, Param, Post, Redirect, Render, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { AuthorizationSessionGuard } from "src/security/authorization_session.guard";
import { Public } from "src/security/public.decorator";
import { ScheduleMessage } from "./schedule_message.entity";
import { ScheduleMessageService } from "./schedule_message.service";

@Controller("/schedule-messages")
@UseGuards(AuthorizationSessionGuard)
export class ScheduleMessageController {

    constructor(private readonly scheduleMessageService: ScheduleMessageService) {}
    
    @Get()
    @Render("schedule-messages/index.ejs")
    async index( @Req() request: Request) {
        const scheduledMessages = await this.scheduleMessageService.getAll()
        const  message = await request.consumeFlash("success");
        return { scheduledMessages: scheduledMessages, successMessage: message }
    }

    @Get("/delete/:id")
    @Render("schedule-messages/index.ejs")
    async delete(
        @Param("id") id: Number, 
        @Req() request: Request,
        @Res() response: Response,
    ) {
        await this.scheduleMessageService.delete(id)
        request.flash("success", "Delete with success!!!")
        return response.redirect("/schedule-messages")
    }

    @Post()
    @Render("schedule-messages/index.ejs")
    async register(
        @Body() scheduleMessage: ScheduleMessage, 
        @Res() response: Response,
        @Req() request: Request
    ) {
        await this.scheduleMessageService.register(scheduleMessage);
        request.flash("success", "Schedule message created success")
        return response.redirect("/schedule-messages")
    }
}