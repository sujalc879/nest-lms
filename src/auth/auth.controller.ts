import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signinUserDto, signupUserDto } from './dto/signupUser.dto';
import { JwtAuthGuard } from './jwt-auth/jwt-auth.guard';




@Controller('/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("/signup")
    async signup(@Body() signupUserDto: signupUserDto) {
        const result = await this.authService.signupUser(signupUserDto);
        return result;
    }

    @Post("/signin")
    async signin(@Body() signinUserDto: signinUserDto) {
        const result = await this.authService.signinUser(signinUserDto)
        return result;
    }


}
