import { Request, Response } from 'express';
import { loginService, registerService, resetPasswordService, forgotPasswordService } from '../services/authService'

let login = async (req: Request, res: Response) => {
    try {
        const userData = await loginService(req.body)
        res.status(200).json({
            userData
        })
    }
    catch (err) {
        res.status(401).json({
            err
        })
    }
}

let signup = async (req: Request, res: Response) => {
    try {
        const userData = await registerService(req.body)
        res.status(201).json({
            userData
        })
    }       
    catch (err) {
        res.status(400).json({
            err
        })
    }
}
let forgotPassword = async(req:Request, res: Response)=> {
    try {
       const changed =  await forgotPasswordService(req.body.email)
        res.status(200).json(changed)
    }catch(e){
        res.status(400).json(e)
    }
}
let resetPassword = async(req:Request, res: Response)=> {
    try {
        const reset = await resetPasswordService(req.body.password, req.user)
        res.status(200).json(reset)
    }catch(e){
        res.status(400).json(e)
    }
}

export {
    login,
    signup,
    forgotPassword,
    resetPassword
}
