import path from 'path';
import express from 'express';
import mongoose from 'mongoose'

// Config
import config from '../config/config.js';
const PORT = config.port;

// Express
const app = express();

// Connect to MongoDB
mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, { dbName: "users" })
mongoose.connection.on('error', err => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`)
})

// 404 not found
app.use((req, res, next) => {
    res.send("Page not found!")
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
