export const createCustomer = async (customer) => {
  if(!customer.email) {
    return { errorMessage:"Must have email"};
  }

  try {
    let data = await customer.save()
    return {message: "Customer created successfully.", customer: data};
  }
  catch(err) {
    return { errorMessage:err};
  }
}