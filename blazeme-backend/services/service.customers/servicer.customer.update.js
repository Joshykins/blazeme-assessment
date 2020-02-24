export const updateCustomer = async (customerModel, customerId, dataToReplaceCustomerWith) => {

  //Verify has email
  if (!dataToReplaceCustomerWith.email) {
    return { errorMessage: "Customer must have an email" };
  }


  try {
    let data = await customerModel.findOneAndUpdate({ _id: customerId }, dataToReplaceCustomerWith)
    return {
      message: "Updated customer successfully.",
      customer: dataToReplaceCustomerWith
    };
  }
  catch (err) {
    return { errorMessage: err };
  };

}