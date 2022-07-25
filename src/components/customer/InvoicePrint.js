import React, { useState } from "react";
import ReactToPrint from "react-to-print";
import Invoice from "./Invoice";
import Helmet from "react-helmet";
import { render } from "react-dom";
import InvoiceAdditionalRows from "./InvoiceAdditionalRows";

class InvoicePrint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: this.props.date,
      customer: this.props.props[0],
      invoiceItems: this.props.props[1],
      status: this.props.props[2],
      total: this.props.props[3],
      paidAmount: this.props.props[4],
      // billNo: this.props.props[5],
    };
  }

  render() {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth(); //months from 1-12
    var day = dateObj.getUTCDate();

    return (
      <div>
        <div>
          <div className="container p-5">
            <h2 className="text-center font-weight-bold">
              Wijerathna Marketing Service
            </h2>
            <div className="col-12">
              <hr />
            </div>
            <div className="container">
              <div className="row h5">
                <div className="col">
                  <div className="row">
                    <div className="col pt-2" style={{ fontSize: "25px" }}>
                      Date
                    </div>
                    <div className="col">
                      <input
                        style={{ fontSize: "25px" }}
                        type="text"
                        className="form-control input-lg "
                        value={this.state.date}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col pt-2" style={{ fontSize: "25px" }}>
                      Bill No
                    </div>
                    <div className="col">
                      <input
                        style={{ fontSize: "25px" }}
                        type="text"
                        className="form-control input-lg"
                        // value={this.state.billNo }
                        value={
                          "BL" +
                          this.state.customer.shortCode +
                          day +
                          "." +
                          month
                        }
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col pt-2" style={{ fontSize: "25px" }}>
                      Customer ID
                    </div>
                    <div className="col">
                      <input
                        style={{ fontSize: "25px" }}
                        type="text"
                        className="form-control input-lg"
                        value={this.state.customer.shortCode}
                        readOnly
                      />
                    </div>
                  </div>
                  {/* <div className="row p-1 invisible">
                    <div className="col"> Status</div>
                    <div className="col">
                      <div className="form">
                        <input
                          type="text"
                          className="form-control"
                          value={this.state.status}
                          readOnly
                        />
                      </div>
                    </div>
                  </div> */}
                </div>
                <div className="col">
                  <div className="row ">
                    <div className="col pt-2" style={{ fontSize: "25px" }}>
                      Customer Name
                    </div>
                    <div className="col">
                      <input
                        style={{ fontSize: "25px" }}
                        type="text"
                        className="form-control input-lg"
                        value={this.state.customer.name}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col pt-2" style={{ fontSize: "25px" }}>
                      Area
                    </div>
                    <div className="col">
                      <input
                        style={{ fontSize: "25px" }}
                        type="text"
                        className="form-control input-lg"
                        value={this.state.customer.area}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col pt-2" style={{ fontSize: "25px" }}>
                      T/N
                    </div>
                    <div className="col">
                      <input
                        style={{ fontSize: "25px" }}
                        type="text"
                        className="form-control input-lg"
                        value={this.state.customer.phoneNumber}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row h5">
              <table className="w-100" id="invoice-table">
                <thead className="thead-dark">
                  <tr className="h6 body-row border-bottom ">
                    <th>
                      <h5
                        style={{ fontSize: "24px" }}
                        className="font-weight-bold"
                      >
                        S/N
                      </h5>
                    </th>
                    <th>
                      <h5
                        style={{ fontSize: "24px" }}
                        className="font-weight-bold"
                      >
                        ItemCode
                      </h5>
                    </th>
                    <th>
                      <h5
                        style={{ fontSize: "24px" }}
                        className="font-weight-bold"
                      >
                        Name
                      </h5>
                    </th>
                    <th>
                      <h5
                        style={{ fontSize: "24px" }}
                        className="font-weight-bold"
                      ></h5>
                    </th>
                    <th>
                      <h5
                        style={{ fontSize: "24px" }}
                        className="font-weight-bold"
                      >
                        QTY
                      </h5>
                    </th>
                    <th>
                      <h5
                        style={{ fontSize: "24px" }}
                        className="font-weight-bold"
                      >
                        Price <small>(LKR)</small>
                      </h5>
                    </th>
                    <th>
                      <h5
                        style={{ fontSize: "24px" }}
                        className="font-weight-bold"
                      >
                        Total <small>(LKR)</small>
                      </h5>
                    </th>
                  </tr>
                  <tr style={{ height: "20px" }}></tr>
                </thead>
                <tbody>
                  {this.state.invoiceItems.map((invoiceItem, index) => {
                    return (
                      <tr key={index}>
                        <td style={{ height: "45px" }}>
                          <h5 style={{ fontSize: "25px" }}>{index + 1}</h5>
                        </td>
                        <td>
                          <h5 style={{ fontSize: "25px" }}>
                            {invoiceItem.itemCode}
                          </h5>
                        </td>
                        <td>
                          <h5
                            className="font-weight-bold aradana-font"
                            style={{ fontSize: "28px" }}
                          >
                            {invoiceItem.name}
                          </h5>
                        </td>
                        <td>
                          <h5 style={{ fontSize: "25px" }}>
                            {invoiceItem.measurement}
                          </h5>
                        </td>
                        <td>
                          <h5 className="pl-3" style={{ fontSize: "25px" }}>
                            {invoiceItem.count}
                          </h5>
                        </td>
                        <td>
                          <h5 style={{ fontSize: "25px" }}>
                            {(
                              Math.round(invoiceItem.sellingPrice * 100) / 100
                            ).toFixed(2)}
                          </h5>
                        </td>
                        <td>
                          <h5 style={{ fontSize: "25px" }}>
                            {(
                              Math.round(
                                invoiceItem.count *
                                  invoiceItem.sellingPrice *
                                  100
                              ) / 100
                            ).toFixed(2)}
                          </h5>
                        </td>
                      </tr>
                    );
                  })}
                  <InvoiceAdditionalRows rowsCount={this.state.invoiceItems.length}></InvoiceAdditionalRows>
                  <tr>
                    <td colSpan="7">
                      <div className="col-12  pb-14 pr-12 justify-content-between d-flex">
                        <div className="text-left font-weight-bold col-4 pt-4">
                          <h4>.....................................</h4>
                          <h4>Customer Signature</h4>
                        </div>
                        <div className=" font-weight-bold col-5 pt-4 ">
                          <div className="d-flex">
                            <h2  style={{fontWeight:"bold"}}>Grand Total : </h2>
                            <h2 className="pl-1" style={{fontWeight:"bold"}}>
                              {(
                                Math.round(this.state.total * 100) / 100
                              ).toFixed(2)}
                            </h2>
                          </div>
                        </div>
                      </div>
                    </td>
                    {/* <div
                      className="justify-content-right page-footer"
                      id="invoice-footer">
                      <div className="col-12  pb-14 pr-12 justify-content-between d-flex">
                        <div className="text-left font-weight-bold col-4 pt-4">
                          <h4>............................</h4>
                          <h5>Customer Signature</h5>
                        </div>
                        <div className=" font-weight-bold col-4 pt-4 ">
                          <div className="d-flex">
                            <h3>Grand Total : </h3>
                            <h3 className="pl-1">
                              {(
                                Math.round(this.state.total * 100) / 100
                              ).toFixed(2)}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* <Helmet>
          <script>{`
        debugger
          var oRows = document.getElementById('invoice-table').getElementsByTagName('tr');
          var iRowCount = oRows.length;
          var footer = document.getElementById("invoice-footer")
          if (iRowCount > 10 ) {
            
            footer.classList.remove('page-footer');
            footer.style.margin = "200px auto";
            footer.style.display = "none";
         }
         document.getElementById('create-invoice-btn').click();
    `}</script>
        </Helmet> */}
      </div>
    );
  }
}

export default InvoicePrint;
