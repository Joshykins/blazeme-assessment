import axios from 'axios';
import { customerModel } from '../models/models.customers';
import { response } from 'express';

//Populates up to x entries
//Recursive function to split apart request into 5000 customer packets
let populateCustomersTo = async (desiredEntries, countAdded) => {
  let resultsPacketSize = 5000;

  //When function is called set the addec count to zero.
  if (countAdded == undefined) {
    let totalDbCount = await customerModel.countDocuments({})
      .then(data => data)
      .catch(err => console.log(err));
    
      if(desiredEntries <= totalDbCount) {
        console.log(`Db has ${totalDbCount}, which is above requested customer count of ${desiredEntries}`);
        return
      }
      else {
        desiredEntries = desiredEntries-totalDbCount
      }

    console.log(`Beginning Population of ${desiredEntries} customers. \n ============================`);
    countAdded = 0;
  }

  //If desired amount to be added is greater than resultsPacketSize + countAdded 
  //set packet size as difference of desired amount and total count added.  
  if (countAdded + resultsPacketSize > desiredEntries) {
    resultsPacketSize = desiredEntries - countAdded;
  }

  //When the end is reached
  if (countAdded == desiredEntries) {
    console.log(`============================\n Finished populating ${desiredEntries} customers.`);
    return;
  }
  countAdded += resultsPacketSize;

  //Get request for randomuser api
  let usersFromApi = await getCustomers(resultsPacketSize);
  //format data to customer format
  const customersToAdd = formatCustomersFromRandomUser(usersFromApi.data.results);
  //Add to mongoDb
  await insertCustomers(customersToAdd);
  console.log(`${countAdded}/${desiredEntries} Customers Added.`);

  populateCustomersTo(desiredEntries, countAdded);
}

let getCustomers = async (resultsToGet) => {
  try {
    const response = await axios.get(`https://randomuser.me/api/?results=${resultsToGet}`)
    return response;
  }
  catch(error) {
    console.log("ERROR(Limit reached):Retrying getting customers in 60s");
    await awaitSeconds(60)
    const res = await getCustomers(resultsToGet);
    return res;
  }
};


let formatCustomersFromRandomUser = (usersArray) => {
  return usersArray.map((user => {
    return {
      firstName: user.name.first,
      lastName: user.name.last,
      email: user.email,
      phoneNumber: user.cell
    };
  }));
};

let insertCustomers = async (customers) => {
  try {
    customerModel.insertMany(customers);
  }
  catch(err) {
    console.log(err);
    console.log("Retrying inserting customers in 60s");
    await awaitSeconds(60);
    await insertCustomers(customers);

  };
};


let awaitSeconds = async (time) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, time*1000);
  });
}

export default populateCustomersTo;