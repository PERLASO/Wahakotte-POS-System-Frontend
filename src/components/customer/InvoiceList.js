import React, { Component } from "react";
import AnchorTag from "../../components/Anchortag";
import Table from "../../components/table/Table";
import {
  getInvoiceByCustomer,
  getInvoiceByDate,
  getInvoiceList,
} from "../../context/Invoice";
import InputFormGroup from "../input/InputFormGroup";
import moment from "moment/moment.js";
import Switch from "../../components/input/Switch";
const Mousetrap = require("mousetrap");

class InvoiceList extends Component {
  constructor(props) {
    super(props);
    this.columnList = [
      "BillNo",
      "Customer Name",
      "Status",
      "Total",
      "Credit Balance",
      "Date",
      "Action",
    ];
    this.state = {
      isLoading: true,
      data: [],
      tableData: [],
      customerInvoices: [],
      dateInvoices: [],
      customerCode: "",
      searchCustomer: false,
      BillNo: 0,
      searchBillNo: false,
      date: "",
      searchDate: false,
      searchKey: false,
      todayList: true,
    };

    this.handleSearchCusotmer = this.handleSearchCusotmer.bind(this);
    this.handleSearchBilNo = this.handleSearchBilNo.bind(this);
    this.handleSearchDate = this.handleSearchDate.bind(this);
  }

  onSubmitHndl = (e) => {
    e.preventDefault();
    this.setState({ error: "Some error" });
  };

  handleSearchCusotmer(e) {
    this.setState({ searchKey: false });
    this.setState({ customerCode: e.target.value });
    this.setState({ searchCustomer: false });
  }

  handleSearchBilNo(e) {
    this.setState({ BillNo: e.target.code });
    this.setState({ searchBillNo: false });
  }

  handleSearchDate(e) {
    this.setState({ date: e.target.value });
    this.setState({ searchDate: false });
  }

  componentDidMount() {
    Mousetrap.bind("s", () => this.onToggleFilter());
    getInvoiceList(this.state.todayList).then((c) => {
      if (c != undefined) {
        this.setState({ isLoading: false });
        this.setState({ tableData: c.data });
      }
    });
  }

  onClickView = (id) => {
    this.props.history.push({
      pathname: `/app/shop/invoice/view/${id}`,
    });
  };

  OnSearchCustomerClick = () => {
    getInvoiceByCustomer(this.state.customerCode, this.state.todayList).then((res) => {
      try {
        if (res.data.isDeleted) {
          this.setState({ searchKey: true });
        } else {
          this.setState({ customerInvoices: res.data });
          this.setState({ searchCustomer: true });
          console.log(this.state.customerInvoices);
        }
      } catch (error) {
        this.setState({ searchKey: true });
      }
    });
  };

  onSearchDateClick = () => {
    getInvoiceByDate(this.state.date).then((res) => {
      try {
        if (res.data.isDeleted) {
          this.setState({ searchKey: true });
        } else {
          this.setState({ dateInvoices: [res.data] });
          this.setState({ searchCustomer: true });
          console.log(this.state.dateInvoices);
        }
      } catch (error) {
        this.setState({ searchKey: true });
      }
    });
  };

  onToggleFilter =() =>{
    this.setState({ todayList: !this.state.todayList });
    console.log(!this.state.todayList)
    getInvoiceList(!this.state.todayList).then((c) => {
        if (c != undefined) {
          this.setState({ isLoading: false });
          this.setState({ tableData: c.data });
        }
      });
  };

  render() {
    if (this.state.isLoading === true) {
      return (
        <div>
          <AnchorTag
            link="/app/shop/invoice/create"
            className="btn btn-sm btn-warning"
            itemValue="Create Invocie"
          ></AnchorTag>
        </div>
      );
    }
    return (
      <div className="admin-content mx-auto w-75">
        <div className="w-100 mb-3">
          <AnchorTag
            link="/app/shop/invoice/create"
            className="btn btn-warning float-right"
            itemValue="Create Invocie"
          ></AnchorTag>
          <h4>Invoice List</h4>
        </div>
        <div className="row mb-2 ">
          <div className="w-100">
            <div className="col-5">
              <label>Search Invoice By Customer Short Name</label>
            </div>
            <div className="d-flex ">
            <form onSubmit={this.onSubmitHndl} className="d-flex  pt-3">
              <div className="col-12">
                {/* <input className="form-control form-control-sm" placeholder="Customer Short Name" onChange={this.handleSearchCusotmer}></input> */}
                <InputFormGroup
                  inputid="list-search-data"
                  labelClassName="mb-2"
                  label=""
                  inputclassname="form-control form-control"
                  placeholder="Customer Short Name"
                  onChange={this.handleSearchCusotmer}
                />
              </div>
              <div className="col-2">
                <div className="form-group d-flex">
                  <input
                    type="submit"
                    className="btn  btn-success"
                    value="Search"
                    onClick={this.OnSearchCustomerClick}
                  />
                </div>
              </div>
            </form>
            <div className="d-flex justify-content-around ml-5 pl-5 float-right">
              <h5 className="pt-4 pr-3 ml-5">Only today invoices</h5>
              <Switch
                isOn={this.state.todayList}
                onColor="#fac94d"
                handleToggle={
                    () => this.onToggleFilter()
                }
              ></Switch>
            </div>
            </div>
          </div>
          {/* <div className="col-5">
                        <label>Search Invoice By Customer Bill No</label>
                    </div> */}
          {/* <div className="col-2">
                        <input className="form-control form-control-sm" placeholder="Bill No" onChange={this.handleSearchBilNo}></input>
                    </div>
                    <div className="col-2">
                        <div className="form-group">
                            <input type="submit" className="btn btn-sm btn-success" value="Search" />
                        </div>
                    </div>
                    <div className="col-5">
                        <label>Search Invoice By Date</label>
                    </div>
                    <div className="col-2">
                        <input className="form-control form-control-sm" placeholder="Date" onChange={this.handleSearchDate}></input>
                    </div> 
                     <div className="col-2">
                        <div className="form-group">
                            <input type="submit" className="btn btn-sm btn-success" value="Search" onClick={this.onSearchDateClick} />
                        </div>
                    </div> */}
          <div className="col-8">
            {this.state.searchKey && (
              <div>
                <h6 className="text-danger">Invoice Not Found!</h6>
              </div>
            )}
          </div>
        </div>
        <div className="list-table">
          <table className="table ">
            <thead className="thead-dark">
              <tr>
                {this.columnList.map((field, index) => {
                  return <th key={index}>{field}</th>;
                })}
              </tr>
            </thead>

            {!this.state.searchCustomer &&
              this.state.tableData.map((data, index) => {
                return (
                  <tbody key={index}>
                    <tr>
                      <td>{index +1}</td>
                      <td>{data.customer.name}</td>
                      <td>{data.status}</td>
                      <td>{data.total}</td>
                      <td>{data.balancetobepaid}</td>
                      <td>{moment(data.createdDate).format("L")}</td>
                      <td>
                        <button
                          className="button-add btn btn-info"
                          onClick={() => this.onClickView(data.id)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            {this.state.searchCustomer &&
              this.state.customerInvoices.map((data, index) => {
                return (
                  <tbody key={index}>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{data.customer.name}</td>
                      <td>{data.status}</td>
                      <td>{data.total}</td>
                      <td>{data.balancetobepaid}</td>
                      <td>{moment(data.createdDate).format("L")}</td>
                      <td>
                        <button
                          className="button-add btn btn-info"
                          onClick={() => this.onClickView(data.id)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
          </table>
        </div>
      </div>
    );
  }
}

export default InvoiceList;
