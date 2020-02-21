import express from 'express';
import { customerModel } from '../models/models.customers';
const customerRouter = express.Router();

// GET /customers/totalcount
//*********************//
// Returns the total amount of customers
customerRouter.get('/totalcount', async (req, res) => {
  try {
    let data = await customerModel.countDocuments({})
    res.json(data);
  }
  catch (err) {
    res.json({ message: err });
  };
});

// GET /customers/ofofset
//*********************//
// Returns the total amount of customers
customerRouter.get('/', async (req, res) => {
  let skipAmount = 0;
  if(req.body.page && req.body.countPerPage) {
   skipAmount = req.body.page*req.body.countPerPage
  }
  try {
    let data = await customerModel.find({}, null, {skip:skipAmount, limit: 5}).sort({firstName: 1});
    res.json(data);
  }
  catch (err) {
    res.json({ message: err });
  };
});
// POST /customers/update
//*********************//
// Updates a given customer
customerRouter.post('/update', async (req, res) => {
  const editedCustomer = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber
  }
  try {
    let data = await customerModel.findOneAndUpdate({ id: req.id }, editedCustomer)
    res.json(editedCustomer);
  }
  catch (err) {
    res.json({ message: err });
  };

});

// POST /customers/create
//*********************//
// Creates a submitted customer
customerRouter.post('/create', async (req, res) => {
  const customer = new customerModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber
  })

  try {
    let data = await customer.save()
    res.json(data);
  }
  catch (err) {
    res.json({ message: err });
  };

})

export { customerRouter };