import sessionModel from '../models/sessionModel';

let createSessionService = async (sessionData: any) => {
    const { title, body, date } = sessionData;

    try {
        const session = await sessionModel.create({ title, body, date })
        return Promise.resolve(session)
    } catch (err) {
        return Promise.reject(err)
    }

}
export {
    createSessionService
}