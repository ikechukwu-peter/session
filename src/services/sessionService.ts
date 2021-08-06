import sessionModel from '../models/sessionModel';
import {getOne, deleteOne, updateOne} from '../util/handler'

let createSessionService = async (sessionData: any, userId: any) => {
    const { title, body, date } = sessionData;
    let user: string = userId.id;

    try {
        const session = await sessionModel.create({ user, title, body, date })
        return Promise.resolve(session)
    } catch (err) {
        return Promise.reject(err)
    }
}

let getSessionService = getOne(sessionModel)
let updateSessionService = updateOne(sessionModel)
let deleteSessionService = deleteOne(sessionModel)

export {
    createSessionService,
    getSessionService,
    updateSessionService,
    deleteSessionService
}