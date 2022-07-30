import React, { Component } from "react";
import AnchorTag from "../../components/Anchortag";
import InputFormGroup from "../input/InputFormGroup";
import InputNumberGroup from "../input/InputNumberGroup";
import { getCustomer, updateCustomer } from "../../context/Customer";

class EmployeeEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      shortCode: "",
      address: "",
      area: "",
      phoneNumber: "",
      creditBalance: 0,
      OriginalcreditBalance: 0,
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeShortCode = this.handleChangeShortCode.bind(this);
    this.handleChangeAddress = this.handleChangeAddress.bind(this);
    this.handleChangeArea = this.handleChangeArea.bind(this);
    this.handleChangePhoneNumber = this.handleChangePhoneNumber.bind(this);
    this.handleChangeCreditBalance = this.handleChangeCreditBalance.bind(this);
  }

  handleChangeName(e) {
    this.setState({ name: e.target.value });
  }

  handleChangeShortCode(e) {
    this.setState({ shortCode: e.target.value });
  }
  handleChangeAddress(e) {
    this.setState({ address: e.target.value });
  }

  handleChangeArea(e) {
    this.setState({ area: e.target.value });
  }

  handleChangePhoneNumber(e) {
    this.setState({ phoneNumber: e.target.value });
  }
  handleChangeCreditBalance(e) {
    if (!isNaN(e.target.value)) {
      let newValue = this.state.OriginalcreditBalance + Number(e.target.value);
      this.setState({ creditBalance: newValue });
    }
  }
  componentDidMount() {
    getCustomer(this.props.match.params.employeeId).then((res) => {
      if (res != undefined) {
        this.setState({ name: res.data.name });
        this.setState({ shortCode: res.data.shortCode });
        this.setState({ address: res.data.address });
        this.setState({ area: res.data.area });
        this.setState({ phoneNumber: res.data.phoneNumber });
        this.setState({ creditBalance: res.data.creditBalance });
        this.setState({ OriginalcreditBalance: res.data.creditBalance });
      }
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let data = {
      id: this.props.match.params.employeeId,
      name: this.state.name,
      shortCode: this.state.shortCode,
      address: this.state.address,
      area: this.state.area,
      phoneNumber: this.state.phoneNumber,
      creditBalance: this.state.creditBalance,
    };

    updateCustomer(data).then((res) => {
      if (res.data === true) {
        alert("Success!");
        this.props.history.push(`/app/shop/employee/list`);
      } else {
        alert("Update Failed");
      }
    });
  };

  render() {
    return (
      <div className="admin-content mx-auto w-50">
        <div className="w-100 mb-5">
          <AnchorTag
            link="/app/shop/employee/list"
            className="btn btn-primary float-right"
            itemValue="Back to Employee List"
          ></AnchorTag>
          <h4>Edit Employee Details</h4>
        </div>
        <div className="w-100">
          <form onSubmit={this.handleSubmit}>
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <InputFormGroup
                    labelClassName="mb-2"
                    onChange={this.handleChangeName}
                    value={this.state.name}
                    inputclassname="form-control"
                    label="Name"
                  />
                </div>
                <div className="col-12">
                  <InputFormGroup
                    labelClassName="mb-2"
                    onChange={this.handleChangeShortCode}
                    value={this.state.shortCode}
                    inputclassname="form-control"
                    label="Short Name"
                  />
                </div>
                <div className="col-12">
                  <InputFormGroup
                    labelClassName="mb-2"
                    onChange={this.handleChangeAddress}
                    value={this.state.address}
                    inputclassname="form-control"
                    label="Address"
                  />
                </div>

                <div className="col-6">
                  <InputFormGroup
                    labelClassName="mb-2"
                    onChange={this.handleChangeArea}
                    value={this.state.area}
                    inputclassname="form-control"
                    label="Area"
                  />
                </div>
                <div className="col-6">
                  <InputFormGroup
                    p
                    labelClassName="mb-2"
                    onChange={this.handleChangePhoneNumber}
                    value={this.state.phoneNumber}
                    inputclassname="form-control"
                    label="Phone Number"
                  />
                </div>
                <div className="col-6 d-flex">
                  <div>
                    <label className="mb-2">Credit Balance</label>
                    <input
                      type="number"
                      className="form-control"
                      value={this.state.creditBalance}
                      readOnly
                    />
                  </div>
                  <div className="pt-4 pr-2 pl-2">
                    <h2>+</h2>
                  </div>
                  <div>
                    <label className="mb-2">Add value</label>
                    <input
                      labelClassName="mb-2"
                      onChange={this.handleChangeCreditBalance}
                      className="form-control"
                      onKeyUp={(ev) => {
                        if (ev.key === "Enter") {
                          ev.target.blur();
                          ev.preventDefault();
                          return false;
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="col-12 mt-3">
                  <div className="form-group">
                    <AnchorTag
                      className="btn btn-warning"
                      itemValue="Cancel"
                      link="/app/shop/employee/list"
                    />
                    <input
                      type="submit"
                      className="btn btn-success ml-3"
                      value="Submit"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default EmployeeEdit;
