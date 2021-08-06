import { Request, Response } from 'express';
import registerService from '../services/registerService'

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

export default signup;
