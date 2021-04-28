const dotenv = require('dotenv');
dotenv.config();
const path = require('path'); // DEPLOY
const express = require('express');
const mongoose = require('mongoose');

const config = require('./config/config');
const userRouter = require('./routes/userRoutes');





const app = express();
app.use(express.json());

app.use('/', express.static(path.join(__dirname, '../build'))); // DEPLOY -> Serves the files inside ../build

app.use('/api/users', userRouter);

// Use this only if you're using React Router
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html')) // DPEPLY -> This is the catch all we need for navigation other than root.
})



// const uri = 'mongodb://localhost:27017/group-order-app';
const uri = config.DATABASE_URL;

// const port = '4000';
const port = config.PORT;

// ================ ROUTES ================
// Note: Mounts the router onto the endpoint.
app.use('/api', userRouter);

mongoose
    .connect(
        uri,
        {
            useNewUrlParser: true, // avoid deprecation warning
            useUnifiedTopology: true, // avoid deprecation warning - Use new server discover and monitoring engine
        },
    )
    .then( () => {
        app.listen( port, () => {
            console.log('Successfully connected.');
        });
    })
    .catch( (err) => {
        console.error('Failed to connect.');
        console.error(err);
    });
