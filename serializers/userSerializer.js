import Serializer from './serializer.js';
import User from '../models/user.js';


class UserSerializer extends Serializer {

    /**
     * Setup the instance with the data from the request.
     * @param requestData
     */
    constructor(requestData) {
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

        super(requestData, fields, model);

    }


}

export default UserSerializer;
