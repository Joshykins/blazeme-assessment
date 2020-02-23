import React from 'react'
import CustomerGrid from '../../components/CustomerGrid/CustomerGrid'
import CustomerCount from '../../components/CustomerCount/CustomerCount'

export const Customers = () => {
  return (
    <div className="container">
      <h3>Customers</h3>
      <CustomerGrid/>
      <CustomerCount/>
    </div>
  )
}

export default Customers