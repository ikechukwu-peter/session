import jwt from 'jsonwebtoken'
//@ts-ignore
import random from 'randity'
import userModel from '../models/userModel';
import sendEmail from './emailService';

const signToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_EXPIRESIN,
    });
};

let registerService = async (userData: any) => {
    const { email, username, role } = userData;
    const password: string = random(4)
    
    try {
        if (!email || !username) {
            return Promise.reject('Please provide username and email')
        }
        await userModel.create({
            username,
            email,
            password,
            role
        })
        const message = `You have just signed up for a session , here is your password ${password}. \nIf you didn't sign up for a Session, please ignore this email.`;
        const html = `<strong>You have just signed up for a Session, here is your password ${password}. \n <br /> If you didn't sign up for a Session,  please ignore this email.</strong>`;

        //email sent here
        await sendEmail({
            email,
            subject: " Session, Here is Your Password",
            html,
            message,
        });
        return Promise.resolve("Please check your email to see your password, use the code to login")
    }
    catch (err) {
        return Promise.reject({
            from: 'Signup',
            err
        })
    }

}


let loginService = async (userData: any) => {

    const { email, password, } = userData;
    try {
        if (!email || !password) {
            return Promise.reject('Please provide email and password')
        }
        // 2) Check if user exists && password is correct
        const user = await userModel.findOne({ email }).select("+password");

        if (user === null || !(await user.comparePassword(password, user.password))) {
            return Promise.reject('Incorrect email or password')
        }
        const token = signToken(user._id)
        user.password = undefined;
        user.dateCreated = undefined;
        user.__v = undefined

        return Promise.resolve({ token, user })
    }
    catch (err) {
        return Promise.reject(err)
    }
}

let forgotPasswordService = async (email: string) => {
    const password: string = random(4)
    try {
        if (!email) {
            return Promise.reject('Please provide your email')
        }
        const user = await userModel.findOne({ email: email });

        if (!user) {
            return Promise.reject(
                "There is no user with this email address",
            )
        }
        user.password = password;
        await user.save({ validateBeforeSave: false });
        const message = `You have just requested to change your password , here is your password ${password}. \nIf you didn't request for a password change, your account might be compromised, contact the admin.`;
        const html = `<strong>You have just requested to change your password, here is your password ${password}. \n <br /> If you didn't request for a password change, your account might be compromised, contact the admin.</strong>`;

        //email sent here
        await sendEmail({
            email,
            subject: " Session, Here is Your Password ",
            html,
            message,
        });
        return Promise.resolve("Please check your email to see your password, use the code to login")
    }
    catch (err) {
        return Promise.reject({
            err
        })
    }

}

let resetPasswordService = async (password: string, userData: any) => {
    const {email} = userData

    if (!password) {
        return Promise.reject('Please provide your password')
    }
    // 2) Check if user exists && password is correct
    const user = await userModel.findOne({email: email}).select("+password");

    if (user === null || !(await user.comparePassword(password, user.password))) {
        return Promise.reject('Incorrect  password')
    }
    const newPassword = random(4)
    user.password = newPassword;
    await user.save()

    const message = `Your password was resetted , here is your password ${newPassword}. \nIf you didn't request a reset, please contact the admin.`;
        const html = `<strong>Your password was resetted, here is your password ${newPassword}. \n <br /> If you didn't request a reset, please contact the admin.</strong>`;

        //email sent here
        await sendEmail({
            email,
            subject: " Session, Here is Your Password after Reset",
            html,
            message,
        });
        return Promise.resolve("Please check your email to see your password, use the password to login")
}

export { loginService, registerService, forgotPasswordService, resetPasswordService }