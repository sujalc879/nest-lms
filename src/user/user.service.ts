import { ConflictException, Injectable } from '@nestjs/common';
import { signupUserDto, signinUserDto } from '../auth/dto/signupUser.dto';
import { PrismaService } from '../prisma/prisma.service';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const JWT_SECRET = "sujal";

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { }

    async signupTheUser(signupUserDto: signupUserDto) {
        try {
            const user = await this.prisma.user.create({
                data: signupUserDto
            })

            return {
                "message": "user created successfully", details: {
                    firstName: signupUserDto.firstName,
                    lastName: signupUserDto.lastName,
                    email: signupUserDto.email
                }
            }

        } catch (error) {
            const err = error as { code? : string }
            const DUPLICATE_KEY_CODE = "P2002"
            if (err.code === DUPLICATE_KEY_CODE) {
                throw new ConflictException('This Email is Already Exists');
                
            }
            throw err;

        }
    }

    async signinTheUser(signinUserDto: signinUserDto) {
        const userExist = await this.prisma.user.findFirst({
            where: {
                email: signinUserDto.email
            }
        })

        if (userExist === null) {
            return { message : "incorrect credentials (1)"}
        }

        const verifyUser = await bcrypt.compare(signinUserDto.password, userExist.password);

        if (!verifyUser) {
            return { message : "incorrect credentials (2)"}
        }

        const token = jwt.sign({
            id : userExist.id
        }, JWT_SECRET);


        return {
            token
        }
    }

    async getUser(id: any) {
        const user = await this.prisma.user.findFirst({
            where: {
                id
            }
        })

        return { user };
    }
}
