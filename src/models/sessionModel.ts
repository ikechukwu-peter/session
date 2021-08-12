import { Schema, model, Types } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface Session {
    title: string;
    slug: string,
    body: string,
    user: Types.ObjectId,
    date: Date,
    time: string,
    dateCreated?: Date,

}

const schema = new Schema<Session>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'A Session must belong to a user.']
    },
    title: {
        type: String, trim: true,
        required: [true, "A session must have a title"],
        maxlength: [60, 'A session title must have less or equal then 60 characters'],
        minlength: [10, 'A session title must have more or equal then 10 characters']
    },
    body: {
        type: String,
        required: [true, "A session must have a body"],
        maxlength: [400, 'A session title must have less or equal then 400 characters'],
        minlength: [50, 'A session title must have more or equal then 10 characters']
    },
    date: Date,
    time: String,
   
    dateCreated: {
        type: Date,
        default: Date.now(),
    }
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)


schema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
    });
    next();
});

// 3. Create a Model.
const sessionModel = model<Session>('Session', schema);
export default sessionModel;