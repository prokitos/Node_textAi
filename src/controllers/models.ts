// отвечает за работу с таблицей model

import {NextFunction, Request, response, Response} from 'express' 
import { prismaClient } from '..'
import { BadRequestException } from '../exceptions/baseException'
import { ErrorCode } from '../exceptions/root'
import axios from 'axios'


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

    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });

    const sendEvent = (data : any) => {
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8002/info', {
                responseType: 'stream'
            });

            response.data.on('data', (chunk : any) => {
                // Отправка данных клиенту при получении их от API
                sendEvent({ data: chunk.toString() });
            });

            response.data.on('end', () => {
                console.log('Stream ended');
                res.end();
            });

            response.data.on('error', (error : any) => {
                console.error('Error in stream:', error);
                res.end();
            });
        } catch (error) {
            console.error('Error fetching data from API:', error);
            res.end();
        }
    };

    fetchData();


}
