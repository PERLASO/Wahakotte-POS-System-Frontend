import React, { Component } from "react";
import PageHeader from "../../components/PageHeader";
import { getDashboardData } from "../../context/Dashboard";

class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.userRole = "owner";

    this.state = {
      isLoading: true,
      data: [],
    };
  }
  componentDidMount() {
    getDashboardData().then((c) => {
      if (c != undefined) {
        this.setState({ isLoading: false });
        this.setState({ data: c.data });
      }
    });
  }

  render() {
    return (
      <div className="admin-content mx-auto w-75">
        <PageHeader headerText="Welcome to Dashboard" />
        <div className="w-100">
          <div className="container-fluid">
            <div className="row">
              <div className="col-4">
                <div className="dash-summary-cell">
                  <p>
                    <b>Total Products</b>
                  </p>
                  <h3>{this.state.data.totalProducts} </h3>
                </div>
              </div>
              <div className="col-4">
                <div className="dash-summary-cell">
                  <p>
                    <b>Total Customers</b>
                  </p>
                  <h3>{this.state.data.totalCustomers}</h3>
                </div>
              </div>
              <div className="col-4">
                <div className="dash-summary-cell">
                  <p>
                    <b>Total Invoices</b>
                  </p>
                  <h3>{this.state.data.totalInvoices}</h3>
                </div>
              </div>
            </div>
            <div className="row pt-5">
              <div className="col-4">
                <div className="dash-summary-cell">
                  <p>
                    <b>Today : Total Invoices</b>
                  </p>
                  <h3>{this.state.data.totalInvoices} </h3>
                </div>
              </div>
              <div className="col-4">
                <div className="dash-summary-cell">
                  <p>
                    <b>Today : Total Sales</b>
                  </p>
                  <h3>{this.state.data.totalSellToday}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardPage;
