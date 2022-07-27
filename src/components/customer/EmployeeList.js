import React, { Component } from "react";
import {
  getAllCustomers,
  getCustomerByShortname,
  getCustomerByName
} from "../../context/Customer";
import AnchorTag from "../../components/Anchortag";
import InputFormGroup from "../../components/input/InputFormGroup";

import Table from "../../components/table/Table";
import InputWithSuggestionCustomerCode from "../input/InputWithSuggestionCustomerCode";
import InputWithSuggestionCustomerName from "../input/InputWithSuggestionCustomerName";
import Helmet from "react-helmet";

class EmployeeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      customerbyshortname: [],
      searchNameKey: "",
      searchName: "",
      searchKey: false,
      isLoading: true,
      searchCustomer: false,
    };
    this.columnList = [
      "ID",
      "Name",
      "Short Name",
      "Address",
      "Area",
      "Phone Number",
      "Credit Balance",
      "Action",
    ];
    this.handleChangeSearchCustomerCode = this.handleChangeSearchCustomerCode.bind(this);
    this.handleChangeSearchCustomerName = this.handleChangeSearchCustomerName.bind(this);
  }
  onSubmitHndl = (e) => {
    e.preventDefault();
    this.setState({ error: "Some error" });
  };

  handleChangeSearchCustomerCode(e) {
    this.setState({ searchKey: false, searchNameKey: e , searchCustomer: false },
      () => {
        this.onSearchClickCode();
      });
  }

  handleChangeSearchCustomerName(e) {
    this.setState({ searchKey: false, searchName: e , searchCustomer: false },
      () => {
        this.onSearchClickName();
      });
  }

  handleChangeSearchAreaKey(e) {
    this.setState({ searchAreaKey: e.target.value });
  }

  componentDidMount() {
    getAllCustomers().then((res) => {
      this.setState({ isLoading: false });
      this.setState({ customers: res.data });
    });
  }

  onSearchClickCode = () => {
    this.setState({customerbyshortname: this.state.customers.filter(data =>data.shortCode.startsWith(this.state.searchNameKey.toUpperCase()))});
    this.setState({ searchCustomer: true });
  };

  onSearchClickName = () => {
    this.setState({customerbyshortname: this.state.customers.filter(data =>data.name.toLowerCase().startsWith(this.state.searchName.toLowerCase()))});
    this.setState({ searchCustomer: true });
  };

  render() {
    if (this.state.isLoading === true) {
      return (
        <div>
          <AnchorTag
            link="/app/shop/employee/create"
            className="btn  btn-warning"
            itemValue="Create Customer"
          ></AnchorTag>
        </div>
      );
    }

    return (
      <div className="admin-content mx-auto">
        <div className="w-100 mb-3">
          <AnchorTag
            link="/app/shop/employee/create"
            className="btn btn-warning float-right"
            itemValue="Create Customer"
          ></AnchorTag>
          <h4>Customer List</h4>
        </div>
        <div className="row mb-2">
          <div className="col-4">
            <p>
              <b>Search a Customer</b>
            </p> 
          </div>
          <form onSubmit={this.onSubmitHndl} className="w-100 d-flex">
            <div className="col-4">
            {/* <InputFormGroup
                inputid="list-search-data"
                labelClassName="mb-2"
                label=""
                inputclassname="form-control form-control-sm capitalize-input"
                onChange={this.handleChangeSearchCustomerCode}
                placeholder="search by code"
              /> */}
              <InputWithSuggestionCustomerCode fieldType="CustomerCode"
                    action={this.handleChangeSearchCustomerCode}
                    placeholder="search by code"
                    inputId="list-search-data"
                    inputclassname="form-control form-control-sm mb-1"/>
            </div>
            <div className="col-4">
              <InputWithSuggestionCustomerName fieldType="CustomerCode"
                    action={this.handleChangeSearchCustomerName}
                    placeholder="search by name"
                    inputId="list-search-data-customer-name"
                    inputclassname="form-control  form-control-sm mb-1"/>
            </div>
            {/* <input type="text" id="customer-short-name-input"/>    */}
            {/* <div className="col-2">
              <div className="form-group">
                <input
                  type="submit"
                  className="btn btn-sm btn-success"
                  value="Search"
                  onClick={this.onSearchClick}
                />
              </div>
            </div> */}
          </form>

          <div className="col-8">
            {this.state.searchKey && (
              <div>
                <h6 className="text-danger">User Not Found!</h6>
              </div>
            )}
          </div>
        </div>
        <div className="list-table">
          {this.state.searchCustomer && (
            <Table
              className="table table-striped"
              columnList={this.columnList}
              tableData={this.state.customerbyshortname}
              actionLinkPrefix=""
            ></Table>
          )}
          {!this.state.searchCustomer && (
            <Table
              className="table table-striped"
              columnList={this.columnList}
              tableData={this.state.customers}
              actionLinkPrefix=""
            ></Table>
          )}
        </div>
        <Helmet>
          <script>{`
        
        document.getElementById("list-search-data").focus();
        
    `}</script>
        </Helmet>
      </div>
    );
  }
}

export default EmployeeList;
