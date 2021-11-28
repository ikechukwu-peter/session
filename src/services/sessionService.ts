import sessionModel from '../models/sessionModel';
import { getAll, getOne, deleteOne, updateOne } from '../util/handler'

let createSessionService = async (sessionData: any, userObject: any) => {
  const { title, body, date } = sessionData;

  let now = new Date()
  console.log(now)

  let day = now.getDate()

  let month = now.getMonth()

  let year = now.getFullYear()

  let today = `${year}-${month}-${day}`

  let dateOnly = date.split('T')[0]
  let timeOnly = date.split('T')[1]

  console.log(title, body, dateOnly, timeOnly)

  if (dateOnly < today) {
    return Promise.reject({ err: "Date is in the past" })
  } else {
    const user = userObject.id
    try {
      const session = await sessionModel.create({ user, title, body, dateOnly, timeOnly })
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
