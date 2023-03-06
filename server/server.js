import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

// Routes
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';

// Config
import config from '../config/config.js';
const PORT = config.port;
const MONGOURI = config.mongoUri;
// Express
const app = express();

// Connect to MongoDB
await mongoose.connect(MONGOURI);

// Body Parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/", userRoutes)
app.use("/", authRoutes)

// Authorisation error handler
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({"error": err.name + ": " + err.message});
    }else if(err){
        res.status(400).json({"error": err.name + ": " + err.message});
    }
});

// 404 not found
app.use((req, res, next) => {
    res.send("Page not found!")
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
