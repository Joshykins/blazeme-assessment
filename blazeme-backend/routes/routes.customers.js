import express from 'express';
import { customerModel } from '../models/models.customers';
import { getTotalCount, getCustomers } from '../services/service.customers/service.customers.get';
import { deleteCustomer } from '../services/service.customers/service.customer.delete';
import { createCustomer } from '../services/service.customers/service.customer.create';
import { updateCustomer } from '../services/service.customers/servicer.customer.update';
const customerRouter = express.Router();

// GET /customers/totalcount
//*********************//
// Returns the total amount of customers
customerRouter.get('/totalcount', async (req, res) => {
  res.json(await getTotalCount(customerModel));
});



// GET /customers
//*********************//
// Returns customers based on some body parameters
/*
{
	"page" : 1, //Page numb
	"countPerPage" : 50, // amount displayed per page
  "sort" : "firstName", // field we're sorting by
  "sortOrder" : 1,
  "firstNameFilter" : "Josh" // first name filter
  "lastNameFilter" : "Roelle" // first name filter
  "emailFilter" : "joshuaroelle2@gmail.com" // email filter
  "phoneNumberFilter" : "760 500 0453" // phone filter
}
*/
customerRouter.get('/', async (req, res) => {
  res.json(await getCustomers(customerModel, req.query.startRow, req.query.endRow, req.query.sort, req.query.sortOrder, req.query.firstNameFilter, req.query.lastNameFilter,  req.query.emailFilter, req.query.phoneNumberFilter));
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

  res.json(await updateCustomer(customerModel, req.body.id, editedCustomer));
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
  res.json(await createCustomer(customer));
})


// DELETE /customers
//*********************//
// Deletes a specified customer
customerRouter.delete("/", async (req, res) => {
  res.json(await deleteCustomer(customerModel, req.body.id));
});

export { customerRouter };