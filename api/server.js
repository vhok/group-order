const dotenv = require('dotenv');
dotenv.config();
const path = require('path'); // DEPLOY
const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('./models/userModel');
const ItemModel = require('./models/itemModel');
const RestaurantModel = require('./models/restaurantModel');
const OrderModel = require('./models/orderModel');
const GroupOrderModel = require('./models/groupOrder');

const config = require('./config/config');
const userRouter = require('./routes/userRoutes');
const orderRouter = require('./routes/orderRoutes');

const app = express();
app.use(express.json());

app.use('/', express.static(path.join(__dirname, '../build'))); // DEPLOY -> Serves the files inside ../build

app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

// Use this only if you're using React Router
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html')) // DPEPLY -> This is the catch all we need for navigation other than root.
})

// const uri = 'mongodb://localhost:27017/group-order-app';
const uri = config.DATABASE_URL;

// const port = '4000';
const port = config.PORT;

mongoose
    .connect(
        uri,
        {
            useNewUrlParser: true, // avoid deprecation warning
            useUnifiedTopology: true, // avoid deprecation warning - Use new server discover and monitoring engine
        },
    )
    .then( async () => {
        // ================ DUMMY DATA (DELETE DURING PRODUCTION) ================
        // await UserModel.deleteMany();
        await ItemModel.deleteMany();
        await RestaurantModel.deleteMany();
        await OrderModel.deleteMany();
        await GroupOrderModel.deleteMany();

        const buzzBuzzItemOne = new ItemModel({
            name: 'Chicken Souvlaki Combo',
            description: 'Chicken souvlaki with pita and greek salad.',
            price: 7.99,
        });

        const buzzBuzzItemTwo = new ItemModel({
            name: 'Chicken on a Bun',
            description: 'Chicken souvlaki with a bun and greek salad.',
            price: 7.99,
        });

        const costaItemOne = new ItemModel({
            name: 'Half Chicken with Rice',
            description: 'Seasoned half chicken with rice.',
            price: 9.99,
        });

        const costaItemTwo = new ItemModel({
            name: 'Half Chicken with Potatoes',
            description: 'Seasoned half chicken with potatoes.',
            price: 9.99,
        });
        
        const restaurantOne = new RestaurantModel({
            name: 'Buzz Buzz Pizza',
            items: [buzzBuzzItemOne, buzzBuzzItemTwo],
            address: {
                streetNumber: 822,
                streetName: 'Wilson Ave.',
                city: 'North York',
                province: 'Ontario',
                postalCode: 'M3K 1E5',
            },
            phoneNumber: 4166307777,
        });

        const restaurantTwo = new RestaurantModel({
            name: 'Costa Verde B.B.Q. & Portuguese Grill',
            items: [costaItemOne, costaItemTwo],
            address: {
                streetNumber: 2764,
                streetName: 'Keele St.',
                city: 'North York',
                province: 'Ontario',
                postalCode: 'M6M 2G2',
            },
            phoneNumber: 4166365517,
        });

        const groupOrderOne = new GroupOrderModel({
            restaurant: restaurantOne._id,
        });
        
        const orderOne = new OrderModel({
            user: mongoose.Types.ObjectId('608e4c08ef2a5e71402c7f04'),
            items: [buzzBuzzItemOne],
            cost: 9.99,
            paid: 0,
        });

        await restaurantOne.save();
        await restaurantTwo.save();
        await groupOrderOne.save();
        await orderOne.save();

        // =======================================================================
        app.listen( port, () => {
            console.log('Successfully connected.');
        });
    })
    .catch( (err) => {
        console.error('Failed to connect.');
        console.error(err);
    });
