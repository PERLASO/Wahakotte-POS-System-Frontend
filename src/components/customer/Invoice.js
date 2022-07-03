import React from "react";
import  Helmet  from "react-helmet";
import { setInvoice } from "../../context/Invoice";

class Invoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invoiceItems: props.location.state[0],
      total: props.location.state[1],
      customer: props.location.state[2],
      paidAmount: props.location.state[1],
      checkSaved: false,
      status: "CASH",
      checkStatus: true,
      statusMessage: "Enter paid amount to proceed",
      data: {},
    };

    this.handleStatus = this.handleStatus.bind(this);
    this.handlePaidAmount = this.handlePaidAmount.bind(this);
    const current = new Date();
    this.date = `${current.getDate()}/${
      current.getMonth() + 1
    }/${current.getFullYear()}`;
   this.handleStatus();
    this.saveInvoice();
  }
  onSubmitHndl = (e) => {
    e.preventDefault();
    this.setState({ error: "Some error" });
  };

  handleStatus() {
 //   this.setState({ status: e.target.value });
 this.setState({ status: "CASH" });
    this.setState({ checkStatus: true });
  }

  handlePaidAmount(e) {
    var val = e.target.value;
    if(!isNaN(val)){
      this.setState({ paidAmount: val });
      this.setState({ checkStatus: true });
    }

    if (val == this.state.total) {
      document.getElementById("select-status").selectedIndex = "1";
      this.setState({ status: "CASH" });
    } else if (val == 0) {
      document.getElementById("select-status").selectedIndex = "0";
      this.setState({ status: "CREDIT" });
    } else {
      document.getElementById("select-status").selectedIndex = "2";
      this.setState({ status: "HYBRID" });
    }
  }

  saveInvoice = () => {
    if (this.state.status.length <= 0) {
      this.setState({ checkStatus: false });
    } else if (
      this.state.status.length >= 0 &&
      (this.state.status == "HYBRID" || this.state.status == "CASH") &&
      this.state.paidAmount == 0
    ) {
      this.setState({ checkStatus: false });
      this.setState({ statusMessage: "Please input Paid Amount to proceed" });
    } else {
      let data = {
        customerID: this.state.customer.id,
        productsList: this.state.invoiceItems,
        invoiceStatus: this.state.status,
        totalInvoicePrice: this.state.total,
        paidAmount: this.state.paidAmount,
      };

      {
        data.productsList.map((data, index) => {
          data.qty = data.count;
        });
      }

      setInvoice(data).then((c) => {
        if (c !== null) {
        //  alert("Invoice Saved!");
          this.props.history.push({
            pathname: `/app/shop/invoice/create/save/print`,
            state: [
              this.state.customer,
              this.state.invoiceItems,
              this.state.status,
              this.state.total,
              this.state.paidAmount,
              c,
            ],
          });
        } else {
          alert("failed !");
        }
      });
    }
  };

  render() {
    return (
      <div className="container ">
        <div className="row">
          <div className="col-12 ">
            <button
              id="proceed"
              className="btn btn-success float-right invoice-print-btn d-none"
              onClick={this.saveInvoice}
            >
              {" "}
              Save Invoice{" "}
            </button>
          </div>
          <div className="col-12">
            <h4 className="text-center">Wijerathna Marketing Service</h4>
          </div>
        </div>
        <div className="col-12">
          <hr />
        </div>
        <div className="container">
          <div className="row h6">
            <div className="col">
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
                      id="select-status"
                      className="form-control"
                      readOnly
                      disabled
                      required
                      onChange={this.handleStatus}
                      defaultValue={this.state.status}
                    >
                      <option vlaue="CREDIT">CREDIT</option>
                      <option value="CASH">CASH</option>
                      <option value="HYBRID">HYBRID</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row p-1 ">
                <div className="col">Paid Amount</div>
                <div className="col">
                  <form type="submit" onSubmit={this.onSubmitHndl}>
                    <input
                      id="paid-ammount"
                      type="number"
                      className="form-control"
                      value={this.state.paidAmount}
                    //  onChange={this.handlePaidAmount}
                      onKeyUp={(ev) => {
                        if (ev.key === "Enter") {
                          ev.target.blur(); 
                           this.saveInvoice();
                        }
                      }}
                    />
                  </form>
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
                <div className="col">Grand Total</div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    value={'RS : '+this.state.total + ".00"} 
                    readOnly
                  />
                </div>
              </div>
              <div className="row p-1">
                <div className="col text-danger">
                  {" "}
                  {!this.state.checkStatus && this.state.statusMessage}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-100 h6">
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
                    <td>{index + 1}</td>
                    <td>{invoiceItem.itemCode}</td>
                    <td className="aradana-font">{invoiceItem.name}</td>
                    <td>{invoiceItem.count}</td>
                    <td>{invoiceItem.sellingPrice}.00</td>
                    <td>{invoiceItem.count * invoiceItem.sellingPrice}.00</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div
            id="grand-total"
            className="col-md-12  pb-14 pr-12 grand-total page-footer"
          >
            <div className="text-right font-weight-bold ">
              Grand Total - Rs.{this.state.total}.00
            </div>
          </div>
        </div>
        <Helmet>
          <script>{`
        
        document.getElementById("paid-ammount").focus();
        
    `}</script>
        </Helmet>
      </div>
    );
  }
}

export default Invoice;
