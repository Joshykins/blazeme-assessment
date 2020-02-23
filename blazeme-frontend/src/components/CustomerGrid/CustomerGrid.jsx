import React, { useState } from 'react';
import './CustomerGrid.scss';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import Axios from 'axios';

const CustomerGrid = () => {
  const initialState = {
    columnDefs: [
      {
        headerName: "First Name",
        field: "firstName",
        filter: "agTextColumnFilter",
        filterParams: {
          applyButton: true,
          suppressAndOrCondition: true,
          filterOptions: ["equals"]
        }
      },
      {
        headerName: "Last Name",
        field: "lastName",
        filter: "agTextColumnFilter",
        filterParams: {
          applyButton: true,
          suppressAndOrCondition: true,
          filterOptions: ["equals"]
        }
      },
      {
        headerName: "Email Address",
        field: "email",
        filter: "agTextColumnFilter",
        filterParams: {
          applyButton: true,
          suppressAndOrCondition: true,
          filterOptions: ["equals"]
        }
      },
      {
        headerName: "Phone Number",
        field: "phoneNumber",
        filter: "agTextColumnFilter",
        filterParams: {
          applyButton: true,
          suppressAndOrCondition: true,
          filterOptions: ["equals"]
        }
      },
      {
        headerName: "Delete"
      }

    ],
    defaultColDef: {
      sortable: true,
      resizable: true,
      filter: true,
      editable: true,
    }
  };

  const [state, setState] = useState(() => { return initialState });

  const customerDataSource = {
    getRows(params) {
      console.log(params);

      let body = {
        startRow: params.startRow,
        endRow: params.endRow
      }

      if (params.filterModel.firstName) {
        body.firstNameFilter = params.filterModel.firstName.filter
      }

      if (params.filterModel.lastName) {
        body.lastNameFilter = params.filterModel.lastName.filter
      }

      if (params.filterModel.email) {
        body.emailFilter = params.filterModel.email.filter
      }

      if (params.filterModel.phoneNumber) {
        body.phoneNumberFilter = params.filterModel.phoneNumber.filter
      }

      if (params.sortModel[0]) {
        body.sort = params.sortModel[0].colId
        if (params.sortModel[0].sort == "desc") {
          body.sortOrder = -1
        }
        else {
          body.sortOrder = 1
        }
      }

      Axios({
        method: "GET",
        url: 'http://localhost:3656/customers/',
        params: body
      })
        .then((res) => {
          if (res.data.customers) {
            params.successCallback(res.data.customers, res.data.results);
          } else {
            console.log(res.data.errorMessage);
          }
        })
        .catch(err => {
          console.log(err);
        });

      console.log(params)
    }
  }

  const updateCustomer = (params) => {
    let body = params.data;
    body.id = params.data._id;
    Axios({
      method: "PUT",
      url: 'http://localhost:3656/customers/update',
      data: body
    })
      .then((res) => {
        console.log(res);
      })
      .catch(err => {
        console.log(err)
      });
  }


  return (
    <div className="ag-theme-balham gridContainer">
      <AgGridReact
        columnDefs={state.columnDefs}
        defaultColDef={state.defaultColDef}
        enableSorting={true}
        rowModelType="infinite"
        pagination={true}
        paginationPageSize={50}
        datasource={customerDataSource}
        onCellEditingStopped={updateCustomer}
      >

      </AgGridReact>
    </div>
  )
};

export default CustomerGrid;