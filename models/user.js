import mongoose from 'mongoose';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


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

/**
 * Perform any necessary pre-save operations.
 * Includes hashing the password.
 */
UserSchema.pre('save', async function () {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
})

/**
 * Create a JWT token for the user.
 * @returns {string}
 * @memberof User
 * @instance
 * @method createJWT
 */
UserSchema.methods.createJWT = function () {
    return jwt.sign(
        { userId: this._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JTW_EXPIRES_IN }
    );
}

/**
 * Verify that a password is correct for a User instance.
 * @param {string} password The password to verify.
 * @memberof User
 * @instance
 * @method verifyPassword
 * @returns {Promise<*>}
 */
UserSchema.methods.verifyPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}


export default mongoose.model('User', UserSchema);