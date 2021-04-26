const express = require('express');
const mongoose = require('mongoose');

const userRouter = require('./routes/userRoutes.js')





const app = express();
app.use(express.json());
app.use('/api/users', userRouter);




const uri = 'mongodb://localhost:27017/group-order-app';
const port = '4000';

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
            console.log('Server is running on port 4000');
        });
    })
    .catch( (err) => {
        console.error(err);
    });
