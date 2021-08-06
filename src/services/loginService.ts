import jwt from 'jsonwebtoken'
import userModel from '../models/userModel';


const signToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_EXPIRESIN,
    });
};


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
        return Promise.reject( err )
    }
}

export default loginService;