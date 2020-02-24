export const deleteCustomer = async (customerModel, id) => {
  try {
    console.log(id)
    const data = await customerModel.findOneAndDelete({ _id: id});

    return { message:"User Successfully Deleted!" };
  }
  catch (err) {
    return { errorMessage: err };
  };
}
