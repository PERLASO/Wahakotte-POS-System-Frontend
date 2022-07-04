import React, { Component } from "react";
import Switch from "../../components/input/Switch";
import PageHeader from "../../components/PageHeader";
import { getDashboardData } from "../../context/Dashboard";
import { shortcutKeys } from "../../shortcutKeysConfig";
const Mousetrap = require("mousetrap");

class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.userRole = "owner";

    this.state = {
      isLoading: true,
      data: [],
      value: false,
    };
  }
  componentDidMount() {
    Mousetrap.bind("s", () => this.setState({ value: !this.state.value }));
    getDashboardData().then((c) => {
      if (c != undefined) {
        this.setState({ isLoading: false });
        this.setState({ data: c.data });
      }
    });
  }

  render() {
    let todaySummery;

    if (this.state.value) {
      todaySummery = (
        <div className="row">
          <div className="col-4">
            <div className="dash-summary-cell">
              <p>
                <b>Today : Total Invoices</b>
              </p>
              <h3>{this.state.data.totalInvoicesToday} </h3>
            </div>
          </div>
          <div className="col-4">
            <div className="dash-summary-cell">
              <p>
                <b>Today : Total sales</b>
              </p>
              <h3>RS: {(Math.round(this.state.data.totalSellToday * 100) / 100).toFixed(2)}</h3>
            </div>
          </div>
          <div className="col-4">
            <div className="dash-summary-cell">
              <p>
                <b>Today : Profit</b>
              </p>
              <h3>RS: {(Math.round(this.state.data.profitToday * 100) / 100).toFixed(2)}</h3>
            </div>
          </div>
        </div>
      );
    }

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
            <hr></hr>

            <div className="d-flex">
              <h3 className="pt-4 pr-3">Today Summary</h3>
              <Switch
                isOn={this.state.value}
                onColor="#fac94d"
                handleToggle={() => this.setState({ value: !this.state.value })}
              ></Switch>
            </div>
            {todaySummery}
          </div>
        </div>
        <div className="copyright-note">
          <p>
            copyright ©2022 all rights reserved{" "}
            <a href="http://perlaso.com/" target="_blank">
              {" "}
              PERLASO
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default DashboardPage;
