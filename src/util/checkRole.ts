import { Request, Response, NextFunction } from 'express';
import sessionModel from '../models/sessionModel'

let checkUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!(req.user.role === 'client')) {
            res.status(403).json({ warning: 'You are not allowed to access this functionality' })
        } else {
            next()
        }
    } catch (err) {
        res.status(500).json('Internal Server Error')
    }
}
let checkAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!(req.user.role === 'admin')) {
            res.status(403).json({ warning: 'You are not allowed to access this functionality' })
        } else {
            next()
        }
    } catch (err) {
        res.status(500).json('Internal Server Error')
    }
}

let checkUserSession = async (req: Request, res: Response, next: NextFunction) => {

    try {
        let session = await sessionModel.findById(req.params.id)

        if (!(JSON.stringify(req.user) === JSON.stringify(session?.user))) {
            res.status(403).json({ warning: 'Nice try' })
        } else {
            next()
        }
    } catch (err) {
        res.status(500).json('Internal Server Error')
    }
}

export { checkUser, checkAdmin, checkUserSession }
