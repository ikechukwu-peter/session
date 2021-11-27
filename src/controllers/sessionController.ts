import { Request, Response } from 'express';

import {
    createSessionService, deleteSessionService, getSessionService,
    updateSessionService, getAllSessionService
} from '../services/sessionService';

let createSession = async (req: Request, res: Response) => {
    console.log(req.body)
    try {
        const sessionData = await createSessionService(req.body, req.user)
    return res.status(201).json(sessionData)
    } catch (err) {
        return res.status(400).json(err)
    }

}

let getSession = getSessionService;
let getAllSession = getAllSessionService;
let updateSession = updateSessionService;
let deleteSession = deleteSessionService;

export {
    createSession,
    getSession,
    getAllSession,
    updateSession,
    deleteSession
}
