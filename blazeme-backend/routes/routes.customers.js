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



// GET /customers
//*********************//
// Returns customers based on some body parameters
/*
{
	"page" : 1, //Page numb
	"countPerPage" : 50, // amount displayed per page
	"sort" : "firstName", // field we're sorting by
  "firstNameFilter" : "Josh" // first name filter
  "lastNameFilter" : "Roelle" // first name filter
  "emailFilter" : "joshuaroelle2@gmail.com" // email filter
  "phoneNumberFilter" : "760 500 0453" // phone filter
}
*/
customerRouter.get('/', async (req, res) => {
  //Find Record Offset
  let skipAmount = 0;
  if (req.body.page && req.body.countPerPage) {
    skipAmount = (req.body.page - 1) * req.body.countPerPage;
  }
  //Get Sort
  let sort = "firstName";
  if (req.body.sort) {
    sort = req.body.sort;
  }
  //Construct filter
  let filters = {}
  if (req.body.firstNameFilter) {
    filters.firstName = new RegExp(req.body.firstNameFilter, "i");
  }
  if (req.body.lastNameFilter) {
    filters.lastName = new RegExp(req.body.lastNameFilter, "i");
  }
  if (req.body.emailFilter) {
    filters.email = new RegExp(req.body.emailFilter, "i");
  }
  if (req.body.phoneNumberFilter) {
    filters.phoneNumber = new RegExp(req.body.phoneNumberFilter, "i");
  }

  try {
    let results = {
      data: await customerModel
        .find(filters, null, { skip: skipAmount, limit: req.body.countPerPage })
        .sort(sort),
      count: await customerModel
        .countDocuments(filters, null, { skip: skipAmount, limit: req.body.countPerPage })
        .sort(sort)
    }

    res.json(results);
  }
  catch (err) {
    res.json({ message: err });
  };
});




// PUT /customers/update
//*********************//
// Updates a given customer
/*
{
  "id": "5e4e37e254f93a30ceefc292", //Id of user
  "firstName": "Joshua", //customer data to replace old with
  "lastName": "Roelle",
  "email": "joshuaroelle2@gmail.com",
  "phoneNumber": "760 500 0453"
}
*/
customerRouter.put('/update', async (req, res) => {
  const editedCustomer = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber
  }

  try {
    let data = await customerModel.findOneAndUpdate({ _id: req.body.id }, editedCustomer)
    res.json(editedCustomer);
  }
  catch (err) {
    res.json({ message: err });
  };

});




// POST /customers/create
//*********************//
// Creates a submitted customer
/*
{
  "firstName": "Joshua", //customer to add
  "lastName": "Roelle",
  "email": "joshuaroelle2@gmail.com",
  "phoneNumber": "760 500 0453"
}
*/
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


// DELETE /customers
//*********************//
// Deletes a specified customer
customerRouter.delete("/", async (req, res) => {
  try {
    const data = await customerModel.findOneAndDelete({ _id: req.body.id });

    res.json("User Successfully Deleted!");
  }
  catch (err) {
    res.json({ message: err });
  };
});

export { customerRouter };