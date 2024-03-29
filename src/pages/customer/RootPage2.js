import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import "../../style/admin.css";
import HeaderNavBar from "../../components/navigation/HeaderNavbar";
import AnchorTag from "../../components/Anchortag";
import DashboardPage from "../../pages/customer/Dashboard";
import CustomerShopPage from "../customer/shop/CustomerShopPage";
import ProfileBasePage from "../customer/profile/ProfileBasePage";
import NavLiTag from "../../components/navigation/NavListTag";
import logo from '../../images/logo.png';
import 'font-awesome/css/font-awesome.min.css';
import Setting from "../settings/Setting";

class CustomerRootPage2 extends Component {
  constructor(props) {
    super(props);
    this.userRole = "owner";
  }

  logout(){
    localStorage.setItem("loginState", false);
    localStorage.clear();
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3 pr-lg-5">
          <img src={logo} className="logo-img"/>
          <Link className="navbar-brand px-3" to="/">
            Wijerathne Marketing Service
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <div className="d-flex flex-row pr-5">
                <AnchorTag
                id="goto-dashboard-btn"
                  link={`${this.props.match.path}/dashboard`}
                  liClassName=""
                  className="list-group-item list-group-item-action"
                  itemValue="Dashboard"
                ></AnchorTag>
                {/* <AnchorTag link={`${this.props.match.path}/shop/view`} liClassName="" className="list-group-item list-group-item-action" itemValue="Shop"></AnchorTag> */}
                <AnchorTag
                  id="goto-customer-btn"
                  link={`${this.props.match.path}/shop/employee/list`}
                  liClassName=""
                  className="list-group-item list-group-item-action"
                  itemValue="Customers"
                ></AnchorTag>
                {/* <AnchorTag link={`${this.props.match.path}/shop/product-category/list`} liClassName="" className="list-group-item list-group-item-action" itemValue="Product Category"></AnchorTag> */}
                <AnchorTag
                id="goto-product-btn"
                  link={`${this.props.match.path}/shop/product/list`}
                  className="list-group-item list-group-item-action"
                  itemValue="Products"
                ></AnchorTag>
                <AnchorTag
                  id="goto-invoice-btn"
                  link={`${this.props.match.path}/shop/invoice/list`}
                  className="list-group-item list-group-item-action"
                  itemValue="Invoices"
                ></AnchorTag>
                <AnchorTag
                id="create-invoice-btn"
                  link="/app/shop/invoice/create"
                  className="list-group-item list-group-item-action bg-warning font-weight-bold"
                  itemValue=" Crt-Inv"
                ></AnchorTag>
              </div>

              <Link
                to="/login"
                className="nav-link "
                onClick={this.logout}
              >
                Logout
              </Link>
              <Link
                to={"/app/setting"}
                className="nav-link "
              >
                <i className="fa fa-gears fa-lg" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Settings and User Manual" ></i>
              </Link>
            </ul>
          </div>
        </nav>
        <div className=" pt-4 ">
          <Switch>
            <Route
              path={`${this.props.match.path}/dashboard`}
              component={DashboardPage}
            />
            <Route
              path={`${this.props.match.path}/shop`}
              component={CustomerShopPage}
            />
            <Route
              path={`${this.props.match.path}/profile`}
              component={ProfileBasePage}
            />
            <Route
              path={`${this.props.match.path}/setting`}
              component={Setting}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default CustomerRootPage2;
