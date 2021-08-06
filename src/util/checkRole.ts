import express, { Application, Request, Response, NextFunction } from 'express';
import userModel from '../models/userModel'
//@ts-ignore
import decoder from 'jwt-decode';


let checkUser = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization!.split(" ")[1]!;
    let data: any = decoder(token);
    try {
        let user = await userModel.findById(data.id)
        if(!(user!.role === 'client')){
            res.status(403).json({warning:'You are not allowed to access this functionality'})
        }else {
            next()
        }
    }catch(err){
        res.status(500).json('Internal Server Error')
    }
}
let checkAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization!.split(" ")[1]!;
    let data: any = decoder(token);
    try {
        let user = await userModel.findById(data.id)
        if(!(user!.role === 'admin')){
            res.status(403).json({warning:'You are not allowed to access this functionality'})
        }else {
            next()
        }
    }catch(err){
        res.status(500).json('Internal Server Error')
    }
}

export {checkUser, checkAdmin}
