import React, { useState } from "react";
import ReactToPrint from "react-to-print";
import Invoice from "./Invoice";
import Helmet from "react-helmet";

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
      billNo: this.props.props[5],
    };
  }

  render() {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth(); //months from 1-12
    var day = dateObj.getUTCDate();

    return (
      <div >
        <div>
          <div className="container p-5">
            <h3 className="text-center">Wijerathna Marketing Service</h3>
            <div className="col-12">
              <hr />
            </div>
            <div className="container">
              <div className="row h5">
                <div className="col">
                  <div className="row p-1">
                    <div className="col">Date</div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.date}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="row p-1">
                    <div className="col">Bill No</div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
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
                  <div className="row p-1">
                    <div className="col">Customer ID</div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
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
                  <div className="row p-1">
                    <div className="col">Customer Name</div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.customer.name}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="row p-1">
                    <div className="col">Area</div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.customer.area}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="row p-1">
                    <div className="col">T/N</div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
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
                      <h5 style={{fontSize:"24px"}} className="font-weight-bold mb-2 mt-2">S/N</h5>
                    </th>
                    <th>
                      <h5 style={{fontSize:"24px"}} className="font-weight-bold">ItemCode</h5>
                    </th>
                    <th>
                      <h5 style={{fontSize:"24px"}} className="font-weight-bold">Name</h5>
                    </th>
                    <th>
                      <h5 style={{fontSize:"24px"}} className="font-weight-bold">Measurement</h5>
                    </th>
                    <th>
                      <h5 style={{fontSize:"24px"}} className="font-weight-bold">QTY</h5>
                    </th>
                    <th>
                      <h5 style={{fontSize:"24px"}} className="font-weight-bold">Price (LKR)</h5>
                    </th>
                    <th>
                      <h5 style={{fontSize:"24px"}} className="font-weight-bold">Total (LKR)</h5>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.invoiceItems.map((invoiceItem, index) => {
                    return (
                      <tr  className="font" key={index}>
                        <td>
                          <h5 style={{fontSize:"24px"}}>{index + 1}</h5>
                        </td>
                        <td>
                          <h5 style={{fontSize:"24px"}}>{invoiceItem.itemCode}</h5>
                        </td>
                        <td>
                          <h5 style={{fontSize:"24px"}}>{invoiceItem.name}</h5>
                        </td>
                        <td>
                          <h5 style={{fontSize:"24px"}}>{invoiceItem.measurement}</h5>
                        </td>
                        <td>
                          <h5 style={{fontSize:"24px"}}>{invoiceItem.count}</h5>
                        </td>
                        <td>
                          <h5 style={{fontSize:"24px"}}>{invoiceItem.sellingPrice}.00</h5>
                        </td>
                        <td>
                          <h5 style={{fontSize:"24px"}}>
                            {invoiceItem.count * invoiceItem.sellingPrice}.00
                          </h5>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <Helmet>
          <script>{`
        
          var oRows = document.getElementById('invoice-table').getElementsByTagName('tr');
          var iRowCount = oRows.length;
          var footer = document.getElementById("invoice-footer")
          if (iRowCount > 26 ) {
            footer.classList.remove('page-footer');
            footer.style.margin = "200px auto";
         }
        
    `}</script>
        </Helmet>
            </div>
            <div className="justify-content-right page-footer" id="invoice-footer">
              <div className="col-12  pb-14 pr-12  ">
                <div className="d-flex">
                  <div className="text-left font-weight-bold col-4 pt-4">
                    <h4>............................</h4>
                    <h5>Customer Signature</h5>  
                  </div>
                  <div className="text-right font-weight-bold ">
                    <div className="w-75 float-right">
                      <div className="row w-75 float-right">
                        <div className="col">
                          <h4 className="font-weight-bold">Net Total :</h4>
                        </div>
                        <div className="col">
                          <h4 className="font-weight-bold">
                            {this.state.total}.00
                          </h4>
                        </div>
                        <div className="w-100"></div>
                        <div className="col">
                          <h5 className="font-weight-bold">Cash :</h5>
                        </div>
                        <div className="col">
                          {" "}
                          <h5 className="font-weight-bold">
                            {this.state.paidAmount}.00
                          </h5>
                        </div>
                        <div className="w-100"></div>
                        <div className="col">
                          <h5 className="font-weight-bold">Balance :</h5>
                        </div>
                        <div className="col">
                          <h5 className="font-weight-bold">
                            {" "}
                            {this.state.paidAmount - this.state.total}.00
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default InvoicePrint;
