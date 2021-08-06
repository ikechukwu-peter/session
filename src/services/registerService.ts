//@ts-ignore
import random from 'randity'
import userModel from '../models/userModel';
import sendEmail from './emailService';


let registerService = async (userData: any) => {
    const { email, username, role } = userData;
    const password: string = random(4)

    try {
        if (!email || !username) {
            return Promise.reject('Please provide username and email')
        }
        let newUser = await userModel.create({
            username,
            email,
            password,
            role
        })
        //the message sent along with the url for verification
        const message = `You have just signed up for a session , here is your passcode ${password}. \nIf you didn't sign up for a Session please ignore this email.`;
        const html = `<strong>You have just signed up for a Session, here is your passcode ${password}. \n <br /> If you didn't sign up for a Session please ignore this email.</strong>`;

        //email sent here
         await sendEmail({
            email,
            subject: " Session, Here is Your Passcode",
            html,
            message,
        });
        return Promise.resolve("Please check your email to see your passcode, use the code to login")
    }
    catch (err) {
        return Promise.reject({
            from: 'Signup',
            err
        })
    }

}

export default registerService;