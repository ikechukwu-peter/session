import { Request, Response } from 'express';
//@ts-ignore
import decoder from 'jwt-decode';
import { createSessionService, deleteSessionService, getSessionService, updateSessionService } from '../services/sessionService';

let createSession = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        let data = decoder(token!);
        const session = await createSessionService(req.body, data)
        return res.status(201).json(session)
    } catch (err) {
        return res.status(400).json(err)
    }

}

let getSession = getSessionService;
let updateSession = updateSessionService;
let deleteSession = deleteSessionService;

export {
    createSession,
    getSession,
    updateSession,
    deleteSession
}