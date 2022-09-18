import React, { Component } from "react";
import { CSVLink } from "react-csv-3";
import { exportAllInvoice } from "../../context/Invoice";

const headers = [
  { label: "Id", key: "id" },
  { label: "CreatedDate", key: "createdDate" },
  { label: "Customer", key: "customer" },
  { label: "Status", key: "status" },
  { label: "Total", key: "total" },
  { label: "InvoiceProducts", key: "invoiceProducts" },
];


const fileName = "Invoices-upto";

let data = [
  { id: 1, createdDate: "2020-12-12", customer: "Ahmed", status: "Paid", total: 100, invoiceProducts: 1},
  { id: 1, createdDate: "2020-12-12", customer: "Ahmed", status: "Paid", total: 100, invoiceProducts: 2},
];

let data2=[];

class ExportInvoicesToExcel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      invoicesData: [],
    };
  }

  componentDidMount() {
    exportAllInvoice().then((c) => {
      if (c != undefined) {
        this.setState({ invoicesData: c.data }, () => {
          this.state.invoicesData.forEach((item) => {
            data.push({
              id: item.id,
              createdDate: item.createdDate,
              customer: item.customer.name,
              status: item.status,
              total: item.total,
              invoiceProducts: item.invoiceProducts[0].id,
            });
            for (let i = 1; i < item.invoiceProducts.length; i++) {
              const product = item.invoiceProducts[i];
              data.push({
                id: "",
                createdDate: "",
                customer: "",
                status: "",
                total: "",
                invoiceProducts: product.id,
              });
            }
          });
        });
      }
    });
  }

  render() {
    return (
      <div className="p-5 d-flex" style={{backgroundColor:"#d4f2d3"}}>
        <div>
          <h2>Export All Invoices</h2>
        </div>
        <div>
          <button
            className="btn btn-success"
            variant="contained"
            onClick={() => {
              debugger;
              data2 = data;
              console.log(data2);
            }}
          >
            <CSVLink
              headers={headers}
              data={data}
              filename={fileName}
              style={{ textDecoration: "none", color: "#fff" }}
            >
              {this.state.loading ? "Loading csv..." : "Export Data"}
            </CSVLink>
          </button>
        </div>
      </div>
    );
  }
}

export default ExportInvoicesToExcel;
