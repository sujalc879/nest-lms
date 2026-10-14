import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { signupUserDto, signinUserDto } from './dto/signupUser.dto';
import bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}
    async signupUser(signupUserDto: signupUserDto) {
        const hashPassword = await bcrypt.hash(signupUserDto.password, 5);
        
        return await this.userService.signupTheUser({...signupUserDto, password: hashPassword})
    }

    async signinUser(signinUserDto: signinUserDto) {
        
        return await this.userService.signinTheUser(signinUserDto)
    }
}
