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
      billNo: this.props.props[5]
    }
  }


  render() {
    return (
      <div>
        <div>
          <div className="container ">
            <h4 className="text-center">Wijerathna Marketing Service</h4>
            <div className="col-12 pb-4">
              <hr />
            </div>
            <div className="container">
              <div className="row pb-3 h5">
                <div className="col mb-3">
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
                        value={this.state.billNo}
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
                        value={this.state.customer.id}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="row p-1">
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
                  </div>
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
            <div className="row mb-100 h5">
              <table className="table" id="invoice-table">
                <thead className="thead-dark">
                  <tr className="h6">
                    <th>S/N</th>
                    <th>ItemCode</th>
                    <th>Name</th>
                    <th>QTY</th>
                    <th>Price (LKR)</th>
                    <th>Total (LKR)</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.invoiceItems.map((invoiceItem, index) => {
                    return (
                      <tr key={index}>
                        <td>{invoiceItem.id}</td>
                        <td>{invoiceItem.itemCode}</td>
                        <td>{invoiceItem.name}</td>
                        <td>{invoiceItem.count}</td>
                        <td>{invoiceItem.sellingPrice}.00</td>
                        <td>{invoiceItem.count * invoiceItem.sellingPrice}.00</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>


              <Helmet>
                <script >{`
        
          var oRows = document.getElementById('invoice-table').getElementsByTagName('tr');
          var iRowCount = oRows.length;
          if (iRowCount > 22 ) {
            document.getElementById("grand-total").classList.remove('page-footer');
            document.getElementById("customer-signature").classList.remove('page-footer');
         }
        
    `}</script>
              </Helmet>

            </div>
            <div className="justify-content-right ">
              <div id="grand-total" className="col-md-12  pb-14 pr-12 grand-total page-footer">
                <div className="text-right font-weight- ">
                  Net Total - {this.state.total}.00
                </div>
              </div>
              <div id="grand-total" className="col-md-12  pb-14 pr-12 grand-total page-footer">
                <div className="text-right font-weight- ">
                  Cash - {this.state.paidAmount}.00
                </div>
              </div>
              <div id="grand-total" className="col-md-12  pb-14 pr-12 grand-total page-footer">
                <div className="text-right font-weight- ">
                  Balance -{this.state.total - this.state.paidAmount}.00
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
