import { Injectable } from '@nestjs/common';
import { registerUserDto } from '../auth/dto/registerUser.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}
    async createUser(registerUserDto: registerUserDto) {
        console.log(registerUserDto);
        const user = await this.prisma.user.create({
            data: registerUserDto
        })
        
        return { "message": "user created successfully", details: {
            firstName : registerUserDto.firstName,
            lastName : registerUserDto.lastName,
            email : registerUserDto.email
        } }
    }
}
