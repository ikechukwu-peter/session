import {  Request, Response, NextFunction } from 'express';
import userModel from '../models/userModel'

let checkUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user
    try {
        let user = await userModel.findById(userId)
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
    const userId = req.user
    try {
        let user = await userModel.findById(userId)
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
