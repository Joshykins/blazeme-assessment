import mongoose from 'mongoose';

const customerSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true
  },
  phoneNumber: String
})

const customerModel = mongoose.model('Customers', customerSchema);
export { customerModel };