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
    },
    body: {
        type: String,
    },
    date: {
        type: Date,
        required: true
    },

    time: {
        type: String,
        required: true
    },

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
