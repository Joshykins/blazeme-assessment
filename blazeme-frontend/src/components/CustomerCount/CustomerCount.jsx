import React, { useState } from 'react';
import './CustomerCount.scss'
import Axios from 'axios';
import { numberWithCommas } from '../../util/numbers';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { GetCustomerCountAction } from '../../actions';

const CustomerCount = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(GetCustomerCountAction());
  }, [])
  const initialState = {
    customerAmount: 3,
    customerAmountLoading: false
  }
  const [state, setState] = useState(() => { return initialState });




  state.customerAmount = useSelector((state) => state.customersReducer.customerCount )
  state.customerAmountLoading = useSelector((state) => state.customersReducer.loadingCustomerCount);

  return (
    <p className="customerCount">
      {!state.customerAmountLoading ? (
        <p>(There are currently <span className="customerCountResults">{numberWithCommas(state.customerAmount)}</span> customers in the database)</p>
      ) : (
          <p>(Loading customer count...)</p>
        )}
    </p>
  )
}
export default CustomerCount;