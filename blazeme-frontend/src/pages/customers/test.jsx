"use strict";

import React, { Component } from "react";
import { render } from "react-dom";
import { AgGridReact } from "@ag-grid-community/react";
import { AllModules } from "@ag-grid-enterprise/all-modules";
import "@ag-grid-community/all-modules/dist/styles/ag-grid.css";
import "@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css";

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modules: AllModules,
      columnDefs: [
        {
          headerName: "Athlete",
          field: "athlete",
          width: 150,
          filter: "agSetColumnFilter",
          filterParams: {
            cellHeight: 20,
            values: irishAthletes(),
            debounceMs: 1000,
          }
        },
        {
          headerName: "Age",
          field: "age",
          width: 90,
          filter: "agNumberColumnFilter"
        },
        {
          headerName: "Country",
          field: "country",
          width: 140,
          cellRenderer: "countryCellRenderer",
          keyCreator: countryKeyCreator,
          filter: "agSetColumnFilter"
        },
        {
          headerName: "Year",
          field: "year",
          width: 90
        },
        {
          headerName: "Date",
          field: "date",
          width: 110
        },
        {
          headerName: "Sport",
          field: "sport",
          width: 110,
          filter: "agSetColumnFilter",
          filterParams: { suppressMiniFilter: true }
        },
        {
          headerName: "Gold",
          field: "gold",
          width: 100,
          filter: "agNumberColumnFilter"
        },
        {
          headerName: "Silver",
          field: "silver",
          width: 100,
          filter: "agNumberColumnFilter"
        },
        {
          headerName: "Bronze",
          field: "bronze",
          width: 100,
          filter: "agNumberColumnFilter"
        },
        {
          headerName: "Total",
          field: "total",
          width: 100,
          filter: "agNumberColumnFilter"
        }
      ],
      defaultColDef: {
        resizable: true,
        filter: true
      },
      components: { countryCellRenderer: countryCellRenderer },
      rowData: null
    };
  }

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const httpRequest = new XMLHttpRequest();
    const updateData = data => {
      patchData(data);
      this.setState({ rowData: data });
    };

    httpRequest.open(
      "GET",
      "https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinnersSmall.json"
    );
    httpRequest.send();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        updateData(JSON.parse(httpRequest.responseText));
      }
    };
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div
          id="myGrid"
          style={{
            height: "100%",
            width: "100%"
          }}
          className="ag-theme-balham"
        >
          <AgGridReact
            modules={this.state.modules}
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            components={this.state.components}
            rowData={this.state.rowData}
            floatingFilter={true}
            onGridReady={this.onGridReady}
          />
        </div>
      </div>
    );
  }
}

function irishAthletes() {
  return [
    "John Joe Nevin",
    "Katie Taylor",
    "Paddy Barnes",
    "Kenny Egan",
    "Darren Sutherland",
    "Margaret Thatcher",
    "Tony Blair",
    "Ronald Regan",
    "Barack Obama"
  ];
}
function countryCellRenderer(params) {
  return params.value.name + " (" + params.value.code + ")";
}
function countryKeyCreator(params) {
  var countryObject = params.value;
  var key = countryObject.name;
  return key;
}
function patchData(data) {
  data.forEach(function(row) {
    var countryName = row.country;
    var countryCode = countryName.substring(0, 2).toUpperCase();
    row.country = {
      name: countryName,
      code: countryCode
    };
  });
}

render(<GridExample></GridExample>, document.querySelector("#root"));