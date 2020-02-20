import express from 'express';
import { customerModel } from '../models/models.customers';

const customerRouter = express.Router();

// GET /customers/
//*********************//
//
//
customerRouter.get('/', (req,res) => {
  res.send("home router");
})

customerRouter.post('/create', (req,res) => {
  const customer = new customerModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber:req.body.phoneNumber
  })

  customer.save() 
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json({message: err});
    });

})

export { customerRouter };