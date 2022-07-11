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
    }
}

export default errorHandler;