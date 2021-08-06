import { Request, Response } from 'express';
import { createSessionService } from '../services/sessionService';

let createSession = async (req: Request, res: Response) => {
    try {
        const session = await createSessionService(req.body)
        return res.status(201).json(session)
    } catch (err) {
        return res.status(400).json(err)
    }

}

export {
    createSession
}