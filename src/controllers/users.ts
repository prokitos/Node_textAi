// отвечает за работу с таблицей user

import {NextFunction, Request, response, Response} from 'express' 
import { prismaClient } from '..'
import { compareSync, hashSync } from 'bcrypt'
import { BadRequestException } from '../exceptions/baseException'
import { ErrorCode } from '../exceptions/root'
import { JWT_SECRET } from '../secrets'
import jwt from 'jsonwebtoken'
import { $Enums } from '@prisma/client'


export const signup = async (req:Request,res:Response, next:NextFunction) => {

    const {email,password,name} = req.body

    if (!email || !password || !name) { 
        throw new BadRequestException('empty fields!',ErrorCode.BAD_REQUEST)
    }
    if (password.length < 6) {
        throw new BadRequestException('password must be at least 6 characters long', ErrorCode.BAD_REQUEST)
    }

    let user = await prismaClient.user.findFirst({where: {email:email}})
    if (user) {
        throw new BadRequestException('user already exist',ErrorCode.BAD_REQUEST)
    } 
    user = await prismaClient.user.create({
        data:{
            name,
            email,
            password: hashSync(password,10)
        }
    })
    res.json(user)

}


export const login = async (req:Request,res:Response) => {

    const {email,password} = req.body

    if (!email || !password) { 
        throw new BadRequestException('empty fields!',ErrorCode.BAD_REQUEST)
    }
    let user = await prismaClient.user.findFirst({where: {email:email}})
    if (!user) {
        throw new BadRequestException('user not found', ErrorCode.NOT_FOUND)
    } 
    if(!compareSync(password,user.password)) {
        throw new BadRequestException('incorrect password', ErrorCode.INCORRECT_PASSWORD)
    }
    const token = jwt.sign({
        userId: user.id
    },JWT_SECRET)

    res.json({user,token})

}

export const debugSignup = async (req:Request,res:Response, next:NextFunction) => {

    const {email,password,name} = req.body

    if (!email || !password || !name) { 
        throw new BadRequestException('empty fields!',ErrorCode.BAD_REQUEST)
    }
    if (password.length < 6) {
        throw new BadRequestException('password must be at least 6 characters long', ErrorCode.BAD_REQUEST)
    }

    let user = await prismaClient.user.findFirst({where: {email:email}})
    if (user) {
        throw new BadRequestException('user already exist',ErrorCode.BAD_REQUEST)
    } 
    user = await prismaClient.user.create({
        data:{
            name,
            email,
            password: hashSync(password,10),
            role: $Enums.Role.Admin
        }
    })
    res.json(user)

}

export const getBalanceById = async (req:Request,res:Response) => {

    try {
        const user = await prismaClient.user.findFirstOrThrow({
            where: {
                id: +req.params.id,
            },
        })
        res.json(user)
    } catch(err) {
        throw new BadRequestException("User not found",ErrorCode.NOT_FOUND)
    }

}

export const updateBalanceById = async (req:Request,res:Response) => {

    try {
        const user = req.body
        const updateUser = await prismaClient.user.update({
            where: {
                id: +req.params.id,  
            },
            data: user
        })
        res.json(updateUser)
    } catch(err) {
        throw new BadRequestException("user not found",ErrorCode.NOT_FOUND)
    }

}

export const getCurrentBalance = async (req:Request,res:Response) => {

    res.json(req.user)
   
}