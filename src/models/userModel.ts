import { Schema, model , Types} from 'mongoose';
import bcrypt from 'bcryptjs'

// 1. Create an interface representing a document in MongoDB.
interface User {
    username: string,
    email: string,
    password: string | undefined
    role?: string,
    dateCreated?: Date,
    comparePassword: any,


}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<User>({
    username: { type: String, required: true },
    email: {
        type: String, required: true, unique: true,
        lowercase: true,
        //validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: { type: String, required: true, select: false },
    role: {
        type: String,
        enum: ["client","admin"],
        default: "client",
    },
    dateCreated: {
        type: Date,
        default: Date.now(),
    },
});


schema.pre("save", async function (next) {
    // Only run this function if password was actually modified
    if (!this.isModified("password")) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    next();
});

schema.methods.comparePassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};



// 3. Create a Model.
const UserModel = model<User>('User', schema);
export default UserModel;