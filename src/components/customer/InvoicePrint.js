import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import Invoice from "./Invoice";

export default function InvoicePrint(props) {

  let newDate = new Date()
let date = newDate.getDate().toString();
let month = newDate.getMonth().toString();
let year = newDate.getFullYear().toString();
  let componentRef = useRef();

  //let data = props.location.state;

  return (
    <div>
      {/* button to trigger printing of target component */}
      <div className="float-right">
        <ReactToPrint className="pb-12"
          trigger={() => (
            <button className="btn btn-info invoice-print-btn"> Print Invoice</button>
          )}
          content={() => componentRef}

          // documentTitle= {data[3] +"-"+ data[2].name+ "-"  + year +"."+ month + "."+ date}
          pageStyle ={
           ` @page { size: auto; margin: margin: 10mm ; !important; }
           @media print {
            div.page-footer {
            position: fixed;
            bottom:0mm;
            width: 100%;
            height: 50px;
            page-break-after: always;
            }
           `
          }
        />
         {/* <Invoice ref={(el) => (componentRef = el)} props={data}  /> */}

         {console.log(props)}

         {/* <div className="container ">
         <button className="btn btn-success" onClick={this.saveInvoice}> Save Invoice </button>
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
                    value={this.date}
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
                <div className="col"> Set Status</div>
                <div className="col">
                  <div className="form">
                    <select
                      className="form-control"
                      required
                      onChange={this.handleStatus}
                      defaultValue='Set Status'
                      >
                      <option value='Set Status'>Set Status</option>
                      <option value='CASH'>CASH</option>
                      <option value='HYBRID'>HYBRID</option>
                      <option vlaue='CREDIT'>CREDIT</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row p-1">
                <div className="col">Paid Amount</div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.paidAmount}
                    onChange={this.handlePaidAmount}
                  />
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
              <div className="row p-1">
                <div className="col text-danger"> {!this.state.checkStatus && this.state.statusMessage}</div>
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
          <div id="grand-total" className="col-md-12  pb-14 pr-12 grand-total page-footer">
            <div className="text-right font-weight- ">
              Grand Total - Rs.{this.state.total}.00
            </div>
          </div>


         
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
      </div> */}
      </div>
    </div>
  );
}
