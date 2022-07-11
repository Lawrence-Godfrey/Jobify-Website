import User from '../models/user.js';
import UserSerializer from "../serializers/userSerializer.js";


const register = async (req, res, next) => {
    const serializer = new UserSerializer(req.body);

    if (!serializer.isValid()) {
        return res.status(400).json({
            message: 'Invalid data',
            errors: serializer.errors
        });
    }

    const user = await serializer.save();

    const token = user.createJWT();

    res.status(201).json({ user: serializer.data(), token });
}

const login = async (req, res) => {
    res.send('login user')
}

const updateUser = async (req, res) => {
    res.send('updateUser user')
}

export { register, login, updateUser }