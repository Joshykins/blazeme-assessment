//.env file
import env from 'dotenv';
env.config();
//process.env.DB_CONNECTION

//Express
import express from 'express';

//DB
import mongoose from 'mongoose';

//Routers
import { customerRouter } from './routes/routes.customers';

//middlewares
import bodyParser from 'body-parser';

//Population Script
import populateCustomersTo from './services/service.populate';
import { customerModel } from './models/models.customers';

//cors
import cors from 'cors';



//Connect To DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log("Connected to DB Sucessfully!");
  //populateCustomersTo(137456, customerModel);
});


const app = express();

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//Routers
app.use('/customers', customerRouter);

app.listen(3656, () => {
  console.log("Server is running on port 3656");
});




