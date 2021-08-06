import { Schema, model, Types } from 'mongoose';
import slug from 'slug'

// 1. Create an interface representing a document in MongoDB.
interface Session {
    title: string;
    slug: string,
    body: string,
    user: Types.ObjectId, 
    date: Date,
    dateCreated?: Date,

}

const schema = new Schema<Session>({
    user: {
        type: 'ObjectId',
        ref: 'User',
        required: [true, 'A Session must belong to a user.']
    },
    title: {
        type: String, trim: true,
        required: [true, "A session must have a title"],
        maxlength: [40, 'A tour name must have less or equal then 40 characters'],
        minlength: [10, 'A tour name must have more or equal then 10 characters']
    },
    body: {
        type: String,
        required: [true, "A session must have a body"],
        maxlength: [400, 'A tour name must have less or equal then 40 characters'],
        minlength: [50, 'A tour name must have more or equal then 10 characters']
    },
    date: Date,
    slug: String,
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

schema.index({ slug: 1 });
schema.pre('save', function (next) {
    this.slug = slug(this.title, { lower: true });
    next();
});
schema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
    });
    next();
});

// 3. Create a Model.
const sessionModel = model<Session>('Session', schema);
export default sessionModel;