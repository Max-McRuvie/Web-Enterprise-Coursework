import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Routes
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import quoteRoutes from './routes/quote.routes.js';
import adminRoutes from './routes/admin.routes.js';

// Config
import config from '../config/config.js';
const PORT = config.port;
const MONGOURI = config.mongoUri;
// Express
const app = express();

// Path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Connect to MongoDB

await mongoose.connect(MONGOURI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));



// Body Parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Routes
app.use("/", userRoutes)
app.use("/", authRoutes)
app.use("/", quoteRoutes)
app.use("/", adminRoutes)


// Authorisation error handler
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({"error": err.name + ": " + err.message});
    }else if(err){
        res.status(400).json({"error": err.name + ": " + err.message});
    }
});

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// Serve static files from the React app
app.use('/static', express.static(path.join(__dirname, '../build/static')));

app.get('*', (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, '../build/')});
});

// 404 not found
app.use((req, res, next) => {
    res.send("This page does not exist!")
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
