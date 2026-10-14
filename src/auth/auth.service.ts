import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { registerUserDto } from './dto/registerUser.dto';
import bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}
    async registerUser(registerUserDto: registerUserDto) {
        console.log(registerUserDto);
        const hashPassword = await bcrypt.hash(registerUserDto.password, 5);
        
        return this.userService.createUser({...registerUserDto, password: hashPassword})
    }
}
