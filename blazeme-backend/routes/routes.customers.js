import express from 'express';
import { customerModel } from '../models/models.customers';
const customerRouter = express.Router();

// GET /customers/totalcount
//*********************//
// Returns the total amount of customers
customerRouter.get('/totalcount', (req, res) => {
  customerModel.count({})
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json({ message: err });
    });
});

// POST /customers/update
//*********************//
// Updates a given customer
customerRouter.post('/update', (req, res) => {
  const editedCustomer = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber
  }

  customerModel.findOneAndUpdate({id: req.id}, editedCustomer)
  .then(data => {
    res.json(editedCustomer);
  })
  .catch(err => {
    res.json({ message: err });
  });
});

// POST /customers/create
//*********************//
// Creates a submitted customer
customerRouter.post('/create', (req, res) => {
  const customer = new customerModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber
  })

  customer.save()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json({ message: err });
    });


})

export { customerRouter };