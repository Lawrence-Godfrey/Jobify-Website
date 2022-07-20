import mongoose from 'mongoose';
import validator from 'validator';
import jwt from 'jsonwebtoken';


/**
 *
 * @type {mongoose.Schema<any, Model<any, any, any, any>, {}, {}>}
 */
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A name is required'],
        minlength: [3, 'Name must be at least 3 characters'],
        maxlength: [20, 'Name must be at most 20 characters'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'An email is required'],
        validate: {
            validator: validator.isEmail,
            message: 'Email is not valid'
        },
        unique: true
    },
    password: {
        type: String,
        required: [true, 'A password is required'],
        minlength: [6, 'Password must be at least 8 characters']
    },
    lastName: {
        type: String,
        trim: true,
        minlength: [3, 'Last name must be at least 3 characters'],
        maxlength: [20, 'Last name must be at most 20 characters']
    },
    location: {
        type: String,
        trim: true,
        maxlength: [50, 'Location must be at most 50 characters'],
        default: 'No location specified'
    }
});

UserSchema.pre('save', async function () {
    // await updatePassword(this)

    return this;
})

UserSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JTW_EXPIRES_IN });
}


export default mongoose.model('User', UserSchema);