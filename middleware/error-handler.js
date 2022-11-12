const errorHandler = (err, req, res, next) => {

    if (err.name === 'ValidationError') {
        res.status(400).json({
            message: err._message,
            errors: err.errors
        });
    } else if (err.code && err.code === 11000) {
        res.status(400).json({
            message: 'Duplicate field value entered',
            errors: { ...err.keyValue, message: "Duplicate field value entered" }
        });
    } else {
        let statusCode = err.statusCode || 500;
        if (process.env.NODE_ENV === 'development') {
            res.status(statusCode).json({
                message: err.message || "Something went wrong...",
                stack: err.stack
            });
        } else {
            res.status(statusCode).json({
                message: err.message || "Something went wrong..."
            });
        }
    }
}

export default errorHandler;