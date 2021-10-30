import { Body, Controller, Get, Post, Render, Req, Res } from "@nestjs/common";
import { Response, Request } from "express";
import { Public } from "src/security/public.decorator";
import { CredentialAuth } from "./credential_auth.dto";
import { User } from "./user.entities";
import { UserService } from "./user.service";

@Controller("/users")
export default class UserController {

    constructor(private userService: UserService) { }

    @Get("/register")
    @Render("user/register")
    public index() {
        return { errorMessage: "" }
    }

    @Post()
    public async register(@Res() response: Response, @Body() user: User) {
        try {
            await this.userService.save(user);
            return response.redirect("/users/login")
        } catch(error) {
            console.log(error.message)
            return response.render("user/register.ejs", { errorMessage: error.message })
        }
      
    }

    @Get("/login")
    @Render("user/login")
    public async login() {
        return { errorMessage: "" }
    }

    @Post("/login")
    public async authenticate(
        @Body() credentialAuth: CredentialAuth,
        @Req() request: Request,
        @Res() response: Response
    ) {
        try {
            const user = await this.userService.authenticate(credentialAuth)
            // @ts-ignore
            request.session.user = user;
            return response.redirect("/commands")
        } catch(error) {
            console.log(error.message)
            return response.render("user/login.ejs", { errorMessage: error.message })
        }
       
    }

    @Get("/logout")
    public async logout(
        @Req() request: Request,
        @Res() response: Response
    ) {
        // @ts-ignore
        request.session.destroy()
        return response.redirect("/users/login")
    }
}