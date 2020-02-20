import React, { useState } from 'react';
import './Customers.scss';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const Customers = () => {
  const initialState = {
    columnDefs: [
      { headerName: "Make", field: "make" },
      { headerName: "Model", field: "model" },
      { headerName: "Price", field: "price" }],
    rowData: [
      { make: "Toyota", model: "Celica", price: 35000 },
      { make: "Ford", model: "Mondeo", price: 32000 },
      { make: "Porsche", model: "Boxter", price: 72000 }]
  };

  const [state, setState] = useState(() => { return initialState });

  return (
    <div className="container">
      <h6>Customers</h6>
      <div className="row">

        <div className="ag-theme-balham eleven column gridContainer">
          <AgGridReact
            
            columnDefs={state.columnDefs}
            rowData={state.rowData}>
          </AgGridReact>
        </div>
      </div>
    </div>
  )
};

export default Customers;