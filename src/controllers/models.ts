// отвечает за работу с таблицей model

import {NextFunction, Request, response, Response} from 'express' 
import { prismaClient } from '..'
import { BadRequestException } from '../exceptions/baseException'
import { ErrorCode } from '../exceptions/root'
import axios from 'axios'
import { EXTERNAL_URL } from '../secrets'


export const newModel = async (req:Request,res:Response, next:NextFunction) => {

    const {name,rate_for_hundred} = req.body

    let existCheck = await prismaClient.model.findFirst({where: {name:name}})
    if (existCheck) {
        throw new BadRequestException('model already exist',ErrorCode.BAD_REQUEST)
    } 

    const model = await prismaClient.model.create({
        data: {
            name, 
            rate_for_hundred
        }
    })
    res.json(model)
}

export const removeModel = async (req:Request,res:Response, next:NextFunction) => {
    try{
        const model = await prismaClient.model.delete({
            where: {
                id: +req.params.id,
            },
        })
        res.json(model)
    } catch(err) {
        throw new BadRequestException("model not found",ErrorCode.NOT_FOUND)
    }

}

export const updateModel = async (req:Request,res:Response, next:NextFunction) => {
    try{
        const model = req.body
        const updateModel = await prismaClient.model.update({
            where: {
                id: +req.params.id,    
            },
            data: model
        })
        res.json(updateModel)
    } catch(err) {
        throw new BadRequestException("model not found",ErrorCode.NOT_FOUND)
    }
}

export const chatWithModel = async (req:Request,res:Response, next:NextFunction) => {

    const { messages, model } = req.body;

    let user = req.user
    if (user.credits <= 0) {
        throw new BadRequestException('user dont have credits', ErrorCode.NOT_FOUND)
    }

    let tempModel = await prismaClient.model.findFirst({where: {name:model}})
    if (!tempModel) {
        throw new BadRequestException('model not found', ErrorCode.NOT_FOUND)
    } 
    let multiplier:any = tempModel.rate_for_hundred

    try {
        const response = await axios.post(EXTERNAL_URL, {
            message: messages,
            model: model,
           //  responseType: 'stream'
        });

        const { usage, choices } = response.data ;
        const message = choices  

        
        user.credits = user.credits - (multiplier / (100 / usage.total_tokens))
        
        await prismaClient.user.update({
            where: {
                id: user.id,  
            },
            data: user
        })
        
        res.json({
            status: 'success',
            data: message,
        });

    } catch (error) {
        console.error('Error sending data to API:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to send data to API'
        });
    }

}
