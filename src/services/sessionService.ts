import sessionModel from '../models/sessionModel';
import { getAll, getOne, deleteOne, updateOne } from '../util/handler'

let createSessionService = async (sessionData: any, userObject: any) => {
  const { title, body, datetime } = sessionData;

  let now = new Date()

  let day = now.getDate()

  let month = now.getMonth()

  let year = now.getFullYear()

  let today = `${year}-${month}-${day}`

  let date = datetime.split('T')[0]
  let time = datetime.split('T')[1]

  if (date < today) {
    return Promise.reject({ err: "Date is in the past" })
  } else {
    const user = userObject.id
    try {
      const session = await sessionModel.create({ user, title, body, date, time })
      console.log(session)
      return Promise.resolve(session)
    } catch (err) {
      return Promise.reject(err)
    }
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
