import React, {useState} from 'react'
import './AddCustomer.scss';
import { useDispatch, useSelector } from 'react-redux';
import { CreateCustomer } from '../../actions';

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  loadingCustomerCreation: false
}
export const AddCustomer = () => {
  const [state, setState] = useState(initialState);
  const dispatch = useDispatch();

  const submitCustomer = () => {
    if(state.email != "") {
      dispatch(CreateCustomer(state));
      setState(initialState);
    }
  }



  state.loadingCustomerCreation = useSelector((state) => state.customersReducer.loadingCustomerCreation);
  
  return (
    <div>
      <hr />
      <h3>Add Customer</h3>
      <div className="row">
        <label>Customer's First Name</label>
        <input type="text" className="u-full-width" placeholder="John" onChange={(e) => 
          { setState({ ...state, firstName: e.target.value }) }} />
        <label>Customer's Last Name</label>
        <input type="text" className="u-full-width" placeholder="Doe" onChange={(e) => 
          { setState({ ...state, lastName: e.target.value }) }} />
        <label>Customer's Email</label>
        <input type="text" className="u-full-width" placeholder="test@mailbox.com" onChange={(e) => 
          { setState({ ...state, email: e.target.value }) }} />
        <label>Customer's Phone Number</label>
        <input type="text" className="u-full-width" placeholder="(123) 456 7890" onChange={(e) => 
          { setState({ ...state, phoneNumber: e.target.value }) }} />
      </div>
      <input type="button" value={`${(state.loadingCustomerCreation? "Loading..." : "Create")}`} className={`button-primary ${(state.loadingCustomerCreation? "LoadingCustomer" : null)}`} onClick={submitCustomer} />
      <hr />
    </div>

  )
}

export default AddCustomer