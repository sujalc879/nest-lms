import { IsEmail, IsString } from 'class-validator'

export class signupUserDto {
    @IsString()
    firstName: string

    @IsString()
    lastName: string
    
    @IsEmail()
    email: string

    @IsString()
    password: string
}

export class signinUserDto {
    @IsEmail()
    email: string

    @IsString()
    password: string
}