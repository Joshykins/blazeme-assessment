export const getCustomers = async (customerModel, startRow, endRow, sort, sortOrder, firstNameFilter, lastNameFilter, emailFilter, phoneNumberFilter) => {
  //Sanitize
  if (!endRow) {
    return { errorMessage: "Must have a start row" };
  }
  if (!startRow) {
    return { errorMessage: "Must have a end row" };
  }
  endRow = Number(endRow);
  startRow= Number(startRow);

  //Get Sort
  let pickedSort = "firstName";
  if (sort) {
    pickedSort = sort;
  }
  let pickedSortOrder = 1
  if (sortOrder) {
    if (sortOrder == -1) {
      pickedSortOrder = -1;
    }
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
      customers: await customerModel
        .find(filters, null, { skip: startRow, limit: endRow-startRow })
        .sort({ [pickedSort]: pickedSortOrder }),
      count: await customerModel
        .countDocuments(filters, null, { skip: startRow, limit: endRow-startRow })
        .sort({ [pickedSort]: pickedSortOrder })
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