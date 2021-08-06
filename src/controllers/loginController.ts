import { Request, Response} from 'express';
import loginService from '../services/loginService'

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

export default login;
