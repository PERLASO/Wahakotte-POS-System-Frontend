import React from "react";
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
    };
  }

  render() {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();

    return (
      <div>
        <div>
          <div className="container pt-5 pl-5 pr-5">
            <h1 className="text-center font-weight-bold" id="shop-title">
              Wijerathna Marketing Service
            </h1>
            <div className="row h5">
              <table className="w-100" id="invoice-table">
                <thead className="thead-dark">
                  <tr>
                    <th colSpan="7">
                      <div className="col-12">
                        <hr />
                      </div>
                      <div className="container">
                        <div className="row h5 font-weight-bold">
                          <div className="col">
                            <div className="row">
                              <div
                                className="col pt-2"
                                style={{ fontSize: "25px" }}
                              >
                                Date
                              </div>
                              <div className="col">
                                <input
                                  style={{
                                    fontSize: "25px",
                                    fontWeight: "bold",
                                  }}
                                  type="text"
                                  className="form-control input-lg "
                                  value={this.state.date}
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div
                                className="col pt-2"
                                style={{ fontSize: "25px" }}
                              >
                                Bill No
                              </div>
                              <div className="col">
                                <input
                                  style={{
                                    fontSize: "25px",
                                    fontWeight: "bold",
                                  }}
                                  type="text"
                                  className="form-control input-lg"
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
                              <div
                                className="col pt-2"
                                style={{ fontSize: "25px", fontWeight: "bold" }}
                              >
                                Customer ID
                              </div>
                              <div className="col">
                                <input
                                  style={{
                                    fontSize: "25px",
                                    fontWeight: "bold",
                                  }}
                                  type="text"
                                  className="form-control input-lg"
                                  value={this.state.customer.shortCode}
                                  readOnly
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col">
                            <div className="row ">
                              <div
                                className="col pt-2"
                                style={{ fontSize: "25px" }}
                              >
                                Customer Name
                              </div>
                              <div className="col">
                                <input
                                  style={{
                                    fontSize: "25px",
                                    fontWeight: "bold",
                                  }}
                                  type="text"
                                  className="form-control input-lg"
                                  value={this.state.customer.name}
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="row ">
                              <div
                                className="col pt-2"
                                style={{ fontSize: "25px" }}
                              >
                                Area
                              </div>
                              <div className="col">
                                <input
                                  style={{
                                    fontSize: "25px",
                                    fontWeight: "bold",
                                  }}
                                  type="text"
                                  className="form-control input-lg"
                                  value={this.state.customer.area}
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="row ">
                              <div
                                className="col pt-2"
                                style={{ fontSize: "25px" }}
                              >
                                T/N
                              </div>
                              <div className="col">
                                <input
                                  style={{
                                    fontSize: "25px",
                                    fontWeight: "bold",
                                  }}
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
                    </th>
                  </tr>
                  <tr className="h6 body-row border-bottom ">
                    <th style={{width:"10px"}}>
                      <h5
                        style={{ fontSize: "24px"}}
                        className="font-weight-bold mb-2 mt-2"
                      >
                        S/N
                      </h5>
                    </th>
                    {/* <th>
                      <h5
                        style={{ fontSize: "24px" }}
                        className="font-weight-bold"
                      >
                        ItemCode
                      </h5>
                    </th> */}
                    <th>
                      <h5
                        style={{ fontSize: "24px", width: "230px" }}
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
                        Price (LKR)
                      </h5>
                    </th>
                    <th>
                      <h5
                        style={{ fontSize: "24px" }}
                        className="font-weight-bold"
                      >
                        Total (LKR)
                      </h5>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="7" style={{ height: "20px" }}></td>
                  </tr>
                  {this.state.invoiceItems.map((invoiceItem, index) => {
                    return (
                      <tr key={index}>
                        <td style={{ height: "45px" }}>
                          <h5
                            className="font-weight-bold"
                            style={{ fontSize: "25px" }}
                          >
                            {index + 1}
                          </h5>
                        </td>
                        {/* <td>
                          <h5
                            className="font-weight-bold"
                            style={{ fontSize: "25px" }}
                          >
                            {invoiceItem.itemCode}
                          </h5>
                        </td> */}
                        <td>
                          <h5
                            className="font-weight-bold aradana-font"
                            style={{ fontSize: "28px" }}
                          >
                            {invoiceItem.name}
                          </h5>
                        </td>
                        <td>
                          <h5
                            className="font-weight-bold"
                            style={{ fontSize: "25px" }}
                          >
                            {invoiceItem.measurement}
                          </h5>
                        </td>
                        <td>
                          <h5
                            className="pl-3 font-weight-bold"
                            style={{ fontSize: "25px" }}
                          >
                            {invoiceItem.count}
                          </h5>
                        </td>
                        <td>
                          <h5
                            className="font-weight-bold"
                            style={{ fontSize: "25px", textAlign: "right" , marginRight: "70px"}}
                          >
                            {(
                              Math.round(invoiceItem.sellingPrice * 100) / 100
                            ).toFixed(2)}
                          </h5>
                        </td>
                        <td>
                          <h5
                            style={{ fontSize: "25px", textAlign:"right" , marginRight: "70px"}}
                            className="font-weight-bold"
                          >
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
                  <InvoiceAdditionalRows
                    rowsCount={this.state.invoiceItems.length}
                  ></InvoiceAdditionalRows>
                  <tr>
                    <td colSpan="7" style={{ height: "25px" }}></td>
                  </tr>
                  <tr>
                    <td colSpan="4">
                      <div className="text-left font-weight-bold">
                        <h4>.....................................</h4>
                        <h4>Customer Signature</h4>
                      </div>
                    </td>
                    <td colSpan="3">
                      <div className=" font-weight-bold">
                        <div className="d-flex justify-content-end pr-5">
                          <h2 style={{ fontWeight: "bold" }}>Grand Total : </h2>
                          <h2 className="pl-1" style={{ fontWeight: "bold" }}>
                            {(Math.round(this.state.total * 100) / 100).toFixed(
                              2
                            )}
                          </h2>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default InvoicePrint;
