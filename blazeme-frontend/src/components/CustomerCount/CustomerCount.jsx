import React, { useState } from 'react';
import './CustomerCount.scss'
import Axios from 'axios';
import { numberWithCommas } from '../../util/numbers';
const CustomerCount = () => {
  const initialState = {
    customerAmount: 0,
    customerAmountLoading: true
  }
  const [state, setState] = useState(() => { return initialState });

  React.useEffect(() => {
    Axios.get("http://localhost:3656/customers/totalcount")
      .then(res => {
        console.log(res);
        setState({ ...state, customerAmount: res.data, customerAmountLoading: false })
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  return (
    <div className="customerCount">
       {!state.customerAmountLoading ? (
        <h6>(There are currently <span className="customerCountResults">{numberWithCommas(state.customerAmount)}</span> customers in the database)</h6>
      ) : (
        <h6>(Loading customer count...)</h6>
      )}
    </div>
  )
}
export default CustomerCount;