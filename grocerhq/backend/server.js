let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');

require('dotenv').config();
const app = express();
const port = process.env.PORT || 5001 ;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

const loginRouter = require('./routes/login');
app.use('/login', loginRouter);

const productRouter = require('./routes/products');
app.use('/products', productRouter);

const allordersRouter = require('./routes/orders');
app.use('/allorders', allordersRouter);

const cartRouter = require('./routes/cart');
app.use('/cart', cartRouter);

const categoryRouter = require('./routes/categories');
app.use('/category', categoryRouter);

const checkOut = require('./routes/checkout');
app.use('/checkout', checkOut);

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.listen(port, () => {
    console.log(` Server is runing on: Port: ${port}`)
})



// // Express Route
// const studentRoute = require('../backend/routes/student.route')
// // Connecting mongoDB Database
// mongoose
//   .connect('mongodb://127.0.0.1:27017/mydatabase')
//   .then((x) => {
//     console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
//   })
//   .catch((err) => {
//     console.error('Error connecting to mongo', err.reason)
//   })

// 
// app.use('/students', studentRoute)

// // PORT
// const port = process.env.PORT || 4000;
// const server = app.listen(port, () => {
//   console.log('Connected to port ' + port)
// })
// // 404 Error
// app.use((req, res, next) => {
//   next(createError(404));
// });
// app.use(function (err, req, res, next) {
//   console.error(err.message);
//   if (!err.statusCode) err.statusCode = 500;
//   res.status(err.statusCode).send(err.message);
// });