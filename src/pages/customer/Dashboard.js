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
      <div className="admin-content mx-auto">
        <PageHeader headerText="Welcome to Dashboard" />
        <div className="w-75">
          <div className="container-fluid">
            <div className="row">
              <div className="col-4">
                <div className="dash-summary-cell">
                  <p>
                    <b>Total Products</b>
                  </p>
                  <p>{this.state.data.totalProducts} </p>
                </div>
              </div>
              <div className="col-4">
                <div className="dash-summary-cell">
                  <p>
                    <b>Total Invoices</b>
                  </p>
                  <p>{this.state.data.totalInvoices}</p>
                </div>
              </div>
              <div className="col-4">
                <div className="dash-summary-cell">
                  <p>
                    <b>Total Sell Today</b>
                  </p>
                  <p>{this.state.data.totalSellToday}</p>
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
