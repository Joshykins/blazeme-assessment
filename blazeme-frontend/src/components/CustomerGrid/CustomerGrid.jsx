import React, { useState, useEffect } from 'react';
import './CustomerGrid.scss';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { customerGridInitalState } from './CustomerGridInitalState';
import { useDispatch, useSelector } from 'react-redux';
import { GetCustomersAction, DeleteCustomer, GetCustomerCountAction, UpdateCustomer, GridLoaded, GridRefreshesd } from '../../actions';



const CustomerGrid = () => {  
  const dispatch = useDispatch();
  const [state, setState] = useState(() => { return customerGridInitalState });

  
  state.customerData = useSelector((state) =>  state.customersReducer.customerData);
  state.customerResults = useSelector((state) =>  state.customersReducer.customerResults);
  state.loadingCustomers = useSelector((state) => state.customersReducer.loadingCustomerData);



  //loadGrid
  state.loadGrid = useSelector((state) => state.customersReducer.loadGrid);
  if(state.loadGrid == true) {
    dispatch(GridLoaded())
    dispatch(GetCustomerCountAction())
    state.setCustomers(state.customerData, state.customerResults);
  }

  //Refresh grid
  state.refreshGrid = useSelector((state) => state.customersReducer.refreshGrid);
  if(state.refreshGrid == true) {
    dispatch(GridRefreshesd())
    state.gridAPI.refreshInfinitePageCache();
  }

  //Loading Customers
  const customerDataSource = {
    async getRows(params) {
      let body = parseAgGridFilterAndSorts(params);
      dispatch(GetCustomersAction(body));
      setState({ ...state, setCustomers: params.successCallback});
    }
  }

  //Updating Customers
  const updateCustomer = (params) => {
    let body = params.data;
    body.id = params.data._id;
    dispatch(UpdateCustomer(body));
    setState({ ...state, gridAPI: params.node.gridApi});
  }



  //Deleting Customers
  state.components.deleteButton = () => {
    return "<div class=\"gridContainerDeleteButton\">X</div>"
  }

  state.loadingCustomerDeletion = useSelector((state) => state.customersReducer.loadingCustomerDeletion);

  const manageDeleteButton = (params) => {
    if(params.column.colDef.headerName === "Delete") {
      dispatch(DeleteCustomer(params.node.data))
      setState({ ...state, gridAPI: params.node.gridApi });
    }
  }

  //Grid Ready
  const onGRidReadyFunction = (params) => {
    state.gridAPI = params.api;
  }

  return (
    <div className="ag-theme-balham gridContainer">
      <AgGridReact
        components={state.components}
        columnDefs={state.columnDefs}
        defaultColDef={state.defaultColDef}
        rowModelType="infinite"
        pagination={true}
        paginationPageSize={50}
        datasource={customerDataSource}
        onCellEditingStopped={updateCustomer}
        onCellClicked={manageDeleteButton}
        onGridReady={onGRidReadyFunction}
      />
      
    </div>
  )
};

const parseAgGridFilterAndSorts = (params) => {
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

  return body;
}

export default CustomerGrid;