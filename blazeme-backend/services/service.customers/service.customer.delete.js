export const deleteCustomer = async (customerModel, id) => {
  try {
    const data = await customerModel.findOneAndDelete({ _id: req.body.id });

    return { message:"User Successfully Deleted!" };
  }
  catch (err) {
    return { errorMessage: err };
  };
}
