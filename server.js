const express = require('express');
const dotenv = require('dotenv');
const fileupload = require('express-fileupload');
const connectDB = require('./config/db');

const cors = require('cors');

//Load env vars
dotenv.config({path:'./config/config.env'});

//Route files
const products = require('./routes/products');


//connect to database
connectDB();

const app = express();

//body parser
app.use(express.json());

//enable cors
app.use(cors());


//File uploading
app.use(fileupload(    {useTempFiles: true
}));



//Mount routers
app.use('/api/v1/products', products);



const PORT = process.env.PORT || 5000;

const server = app.listen(PORT,console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`))

//Handle unhandled promise rejection
process.on('unhandledRejection',(err, promise)=>{
    console.log(`Error: ${err.message}`.red);
    //close server & exit process
    server.close(()=> process.exit(1));
})