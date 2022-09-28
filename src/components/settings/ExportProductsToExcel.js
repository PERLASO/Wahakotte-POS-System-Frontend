import React, { Component } from "react";
import { CSVLink } from "react-csv-3";
import { getProductList } from "../../context/Product";

const headers = [
  { label: "Id", key: "id" },
  { label: "ItemCode", key: "itemCode" },
  { label: "Name", key: "name" },
  { label: "Description", key: "description" },
  { label: "BuyingPrice", key: "buyingPrice" },
  { label: "SellingPrice", key: "sellingPrice" },
  { label: "Measurement", key: "measurement" },
  { label: "Qty", key: "qty" },
  { label: "StockValue", key: "stockValue" },
];
const fileName = "Invoices-upto";

class ExportProductsToExcel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      allProducts: [],
    };
  }
 
  componentDidMount() {
    getProductList().then((c) => {
      if (c != undefined) {
        this.setState({ allProducts: c.data });
      }
    });
  }


  render() {
    return (
      <div className="p-5 d-flex" style={{backgroundColor:"#d4f2d3"}}>
        <div>
          <h2>Export All Products</h2>
        </div>
        <div>
          <button
            className="btn btn-success"
            variant="contained"
          >
            <CSVLink
              headers={headers}
              data={this.state.allProducts}
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

export default ExportProductsToExcel;
