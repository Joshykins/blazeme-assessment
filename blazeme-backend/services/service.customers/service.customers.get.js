export const getCustomers = async (customerModel, page, countPerPage, sort, firstNameFilter, lastNameFilter, emailFilter, phoneNumberFilter) => {
  //Find Record Offset
  let skipAmount = 0;
  if (page && countPerPage) {
    skipAmount = (page - 1) * countPerPage;
  }
  //Get Sort
  let pickedSort = "firstName";
  if (sort) {
    pickedSort = sort;
  }
  //Construct filter
  let filters = {}
  if (firstNameFilter) {
    filters.firstName = new RegExp(firstNameFilter, "i");
  }
  if (lastNameFilter) {
    filters.lastName = new RegExp(lastNameFilter, "i");
  }
  if (emailFilter) {
    filters.email = new RegExp(emailFilter, "i");
  }
  if (phoneNumberFilter) {
    filters.phoneNumber = new RegExp(phoneNumberFilter, "i");
  }
  try {
    let results = {
      data: await customerModel
        .find(filters, null, { skip: skipAmount, limit: countPerPage })
        .sort(sort),
      count: await customerModel
        .countDocuments(filters, null, { skip: skipAmount, limit: countPerPage })
        .sort(pickedSort)
    }
    return results;
  }
  catch (err) {
    return { errorMessage: err };
  };
};


export const getTotalCount = async (customerModel) => {
  try {
    let data = await customerModel.countDocuments({})
    return data;
  }
  catch (err) {
    return { errorMessage: err };
  };
} 