import CustomAPIError from "./custom-api-error.js";


class UnauthenticatedError extends CustomAPIError {
    constructor(message) {
        super(message, 401);
    }
}

export default UnauthenticatedError;