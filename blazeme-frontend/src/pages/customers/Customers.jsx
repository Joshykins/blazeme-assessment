import React from 'react'
import CustomerGrid from '../../components/CustomerGrid/CustomerGrid'
import CustomerCount from '../../components/CustomerCount/CustomerCount'
import AddCustomer from '../../components/AddCustomer/AddCustomer'


export const Customers = () => {
  return (
    <div className="container">
      <h3>Customers</h3>
      <AddCustomer/>
      <CustomerGrid/>
      <CustomerCount/>
    </div>
  )
}

export default Customers