import express from 'express';
import dotenv from 'dotenv';
import 'express-async-errors';

import notFound from "./middleware/not-found.js";
import errorHandler from "./middleware/error-handler.js";
import connectDB from "./db/connect.js";
import authRouter from './routes/authRoutes.js';
import jobRouter from './routes/jobRoutes.js';


dotenv.config()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome!')
});

app.use('/api/auth', authRouter);
app.use('/api/jobs', jobRouter);

// Middleware which sends back a 404 error if no route is found
app.use(notFound)

// Middleware for handling all other errors thrown
app.use(errorHandler)

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);

        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`);
        })

    } catch (err) {
        console.log(err);
    }
};

start();