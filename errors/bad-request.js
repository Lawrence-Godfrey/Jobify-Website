import CustomAPIError from "./custom-api-error.js";


class BadRequestError extends CustomAPIError {
    constructor(message) {
        super(message, 400);
    }
}

export default BadRequestError;