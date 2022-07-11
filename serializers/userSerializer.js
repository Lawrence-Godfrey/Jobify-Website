import Serializer from './serializer.js';
import User from '../models/user.js';


class UserSerializer extends Serializer {

    constructor(data) {
        const fields = {
            _id: {
                readOnly: true,
                displayName: 'id'
            },
            name: {},
            email: {},
            password: {
                writeOnly: true
            },
            lastName: {},
            location: {},
        }

        const model = User;

        super(data, fields, model);

    }


}

export default UserSerializer;
