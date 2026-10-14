import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get("/profile")
    @UseGuards(JwtAuthGuard)
    async getProfile(@Req() req: Request & { user: any },) {
        
        return this.userService.getUser(req.user.id)
    }
}
