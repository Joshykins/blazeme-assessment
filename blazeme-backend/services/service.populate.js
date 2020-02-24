import axios from 'axios';
import { response } from 'express';

//randomuser.me customer generator
//=========================
//Populates up to x entries
//Recursive function to split apart request into 5000 customer packets
let populateCustomersTo = async (desiredEntries, customerModel) => {
  let resultsPacketSize = 500;
  let countAdded = 0;
  //When function is called set the addec count to zero.

  let totalDbCount = await customerModel.countDocuments({})
    .then(data => data)
    .catch(err => {
      console.log(err)
      console.log("Failure to get customer count");
      return;
    });

  if (desiredEntries < totalDbCount) {
    console.log(`Db has ${totalDbCount}, which is above requested customer count of ${desiredEntries}`);
    return
  }
  if(desiredEntries === totalDbCount) {
    console.log(`Db has ${totalDbCount} customers, which is equal requested count of ${desiredEntries} customers`);
    return
  }
  else {
    desiredEntries = desiredEntries - totalDbCount
  }

  console.log(`Beginning Population of ${desiredEntries} customers. \n ============================`);


  while (true) {
    //If desired amount to be added is greater than resultsPacketSize + countAdded 
    //set packet size as difference of desired amount and total count added.  
    if (countAdded + resultsPacketSize > desiredEntries) {
      resultsPacketSize = desiredEntries - countAdded;
    }

    //When the end is reached
    if (countAdded == desiredEntries) {
      break;
    }

    countAdded += resultsPacketSize;

    //Get request for randomuser api
    let usersFromApi = await getCustomers(resultsPacketSize);
    //format data to customer format
    const customersToAdd = formatCustomersFromRandomUser(usersFromApi.data);
    //Add to mongoDb
    await insertCustomers(customersToAdd, customerModel);
    console.log(`${countAdded}/${desiredEntries} Customers Added.`);
  }
  console.log(`============================\n Finished populating ${desiredEntries} customers.`);
}

let getCustomers = async (resultsToGet) => {
  try {
    const response = await axios.get(`https://uinames.com/api/?ext&amount=${resultsToGet}`)
    return response;
  }
  catch (error) {
    console.log("ERROR(Limit reached):Retrying getting customers in 60s");
    await awaitSeconds(60)
    const res = await getCustomers(resultsToGet);
    return res;
  }
};


let formatCustomersFromRandomUser = (usersArray) => {
  return usersArray.map((user => {
    return {
      firstName: user.name,
      lastName: user.surname,
      email: user.email,
      phoneNumber: user.phone
    };
  }));
};

let insertCustomers = async (customers, customerModel) => {
  try {
    customerModel.insertMany(customers);
  }
  catch (err) {
    console.log(err);
    console.log("Retrying inserting customers in 60s");
    await awaitSeconds(60);
    await insertCustomers(customers, customerModel);

  };
};


let awaitSeconds = async (time) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, time * 1000);
  });
}

export default populateCustomersTo;