// отвечает за работу с таблицей user

import {NextFunction, Request, response, Response} from 'express' 
import { prismaClient } from '..'
import { compareSync, hashSync } from 'bcrypt'
import { BadRequestException } from '../exceptions/baseException'
import { ErrorCode } from '../exceptions/root'
import { JWT_SECRET } from '../secrets'
import jwt from 'jsonwebtoken'


export const signup = async (req:Request,res:Response, next:NextFunction) => {

    const {email,password,name} = req.body

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

export const checkBalance = async (req:Request,res:Response) => {

}


export const updateBalance = async (req:Request,res:Response) => {


}

export const me = async (req:Request,res:Response) => {

   
}