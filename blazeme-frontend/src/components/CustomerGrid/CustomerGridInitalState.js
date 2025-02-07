export const customerGridInitalState = {
  setCustomers: undefined,
  loadingCustomers: true,
  loadingCustomerDeletion: false,
  loadingCustomerUpdate: false,
  gridAPI: undefined,
  loadGrid: false,
  refreshGrid: false,
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
      width: 150,
      filterParams: {
        applyButton: true,
        suppressAndOrCondition: true,
        filterOptions: ["equals"]
      }
    },
    {
      headerName: "Delete",
      width: 100,
      resizable: false,
      editable: false,
      cellRenderer: 'deleteButton'
    }
  ],
  components: {
    deleteButton: undefined
  },
  defaultColDef: {
    sortable: true,
    resizable: true,
    filter: true,
    editable: true,
  }
};
