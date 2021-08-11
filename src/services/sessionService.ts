import sessionModel from '../models/sessionModel';
import { getAll, getOne, deleteOne, updateOne } from '../util/handler'

let createSessionService = async (sessionData: any, userObject: any) => {
    const { title, body, date } = sessionData;
    const user = userObject.id
    try {
        if(!title || !body || !date){
            return Promise.reject('Title, body and date is compulsory')
        }
        const session = await sessionModel.create({ user, title, body, date })
        return Promise.resolve(session)
    } catch (err) {
        return Promise.reject(err)
    }
}

let getSessionService = getOne(sessionModel);
let getAllSessionService = getAll(sessionModel);
let updateSessionService = updateOne(sessionModel);
let deleteSessionService = deleteOne(sessionModel);

export {
    createSessionService,
    getSessionService,
    getAllSessionService,
    updateSessionService,
    deleteSessionService
}