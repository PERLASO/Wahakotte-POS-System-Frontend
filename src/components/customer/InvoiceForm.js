import React, { Component } from "react";
import AnchorTag from "../../components/Anchortag";
import Button from "../Button";
import InputFormGroup from "../input/InputFormGroup";
import InputWithSuggestionProductCode from "../input/InputWithSuggestionProductCode";
import InputWithSuggestionProductName from "../input/InputWithSuggestionProductName";
import {
  getProductList,
  getSingleProductByShortcode,
  getSingleProductByName
} from "../../context/Product";
import {
  getAllCustomers,
  getCustomerByName,
  getCustomerByShortname,
} from "../../context/Customer";
import { withRouter } from "react-router-dom";
import Helmet from "react-helmet";
import InputWithSuggestionCustomerCode from "../input/InputWithSuggestionCustomerCode";
import InputWithSuggestionCustomerName from "../input/InputWithSuggestionCustomerName";

class InvoiceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [],
      productData: [],
      count: 1,
      item: {},
      itemId: 1,
      invoiceItems: [],
      passData: [],
      itemcheck: false,
      itemcheckYes: false,
      customer: {},
      customerName: "Customer Name",
      customerArea: "Area",
      saveInvoiceCheck: false,
      saveInvoiceCustomerCheck: false,
      saveInvoiceProductCheck: false,
      saveInvoiceMessage: "",
      searchNameKey: "",
      searchCustomerName:"",
      searchProductKey: "",
      searchCustomerKey: false,
      searchKey: false,
      searchProduct: false,
      searchCustomer: false,
      total: 0,
      buyingPriceVisible: false,
    };

    this.columnList = [
      "S/N",
      "ItemCode",
      "Name",
      "Available QTY",
      "Buying price",
      "Selling Price",
      "Measurement",
      "Select Quantity",
    ];
    this.invoiceColumnList = [
      "S/N",
      "ItemCode",
      "Name",
      "Description",
      "QTY",
      "Price(LKR)",
      "Total(LKR)",
    ];
    this.invoiceTableData = [];

    this.handleChangeCount = this.handleChangeCount.bind(this);
    this.handleInvoiceItems = this.handleInvoiceItems.bind(this);
    this.checkItem = this.checkItem.bind(this);
    this.handleChangeSearchNameKey = this.handleChangeSearchNameKey.bind(this);
    this.handleChangeSearchCustomerName = this.handleChangeSearchCustomerName.bind(this);
    this.handleChangeSearchProductKey =
      this.handleChangeSearchProductKey.bind(this);
    this.handleChangeSearchProductName =
      this.handleChangeSearchProductName.bind(this);
    this.handleYes = this.handleYes.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
  }

  onSubmitHndl = (e) => {
    e.preventDefault();
    this.setState({ error: "Some error" });
  };

  handleChangeCount(e) {
    this.setState({ count: e.target.value });
  }

  handlebuyingPriceVisible(e) {
    this.setState({ buyingPriceVisible: !this.state.buyingPriceVisible });
  }

  handleInvoiceItems() {
    {
      this.setState({ invoiceItems: [] });
    }
  }

  handleChangeSearchNameKey(e) {
    this.setState({ searchCustomerKey: false ,searchNameKey: e ,searchCustomer: false},
      ()=> this.onSearchCustomerClick());
  }
  handleChangeSearchCustomerName(e) {
    this.setState({ searchCustomerKey: false ,searchCustomerName: e ,searchCustomer: false},
      ()=> this.onSearchCustomerClickByName());
  }

  handleChangeSearchProductKey(e) {
    this.setState(
      { searchKey: false, searchProductKey: e, searchProduct: false },
      () => this.onSearchProductClick()
    );
  }
  handleChangeSearchProductName(e) {
    this.setState(
      { searchKey: false, searchProductName: e, searchProduct: false },
      () => this.onSearchProductClickByName()
    );
  }

  handleYes() {
    this.setState({ itemcheck: false });
    this.setState({ itemcheckYes: true });
  }

  handlePriceChange(e, index) {
    let updateItem = this.state.invoiceItems[index];
    updateItem.sellingPrice = e.target.value;
    this.state.invoiceItems[index] = updateItem;
    let tot = 0;
    for (let i = 0; i < this.state.invoiceItems.length; i++) {
      tot =
        tot +
        this.state.invoiceItems[i].sellingPrice *
          this.state.invoiceItems[i].count;
    }
    this.setState({ total: tot });
  }

  componentDidMount() {
    getProductList().then((c) => {
      if (c != undefined) {
        this.setState({ isLoading: false });
        this.setState({ data: c.data });
      }
    });
    getAllCustomers().then((c) => {
      if (c != undefined) {
        this.setState({ isLoading: false });
        this.setState({ customerData: c.data });
      }
    });
  }

  checkItem(data) {
    return async (e) => {
      e.preventDefault();
      this.setState({ itemId: data.id });

      if (this.isItemExist(data.id)) {
        console.log("item exists");
        let total = 0;
        this.state.invoiceItems.find((el) => {
          if (el.id === data.id) {
            el["count"] = this.state.count;
          }
          total = total + el.count * el.sellingPrice;

          this.setState({ total: total });
        });
      } else {
        data["count"] = parseInt(this.state.count);
        await this.setState({ item: data });
        this.state.invoiceItems.push(this.state.item);
        this.setState({
          total: this.state.total + data.count * data.sellingPrice,
        });
      }
      this.setState({ saveInvoiceCheck: false });
      let itemSearchField = document.getElementById("invoice-search-product");
      itemSearchField.focus();
      document.getElementById("invoice-search-product-by-name").value='';
      itemSearchField.value = "";
      this.setState({ searchKey: false });
      this.setState({ searchProductKey: "" });
      this.setState({ searchProduct: false });
      this.setState({ count: 1 });
    };
  }

  isItemExist = (data) => {
    return this.state.invoiceItems.find((el) => {
      return el.id === data;
    });
  };

  removeItem = (id) => {
    let total = 0;
    const items = this.state.invoiceItems.filter((el) => el.id !== id);
    this.state.invoiceItems.find((el) => {
      if (el.id == id) {
        total = el.count * el.sellingPrice;
      }
    });
    this.setState({ invoiceItems: items });
    this.setState({ total: this.state.total - total });
  };

  saveInvoice = () => {
    if (
      this.state.saveInvoiceCustomerCheck === false &&
      this.state.invoiceItems.length === 0
    ) {
      this.setState({ saveInvoiceCheck: true });
      this.setState({
        saveInvoiceMessage:
          "Please set Product Details, and Customer to proceed",
      });
    } else if (
      this.state.saveInvoiceCustomerCheck === true &&
      this.state.invoiceItems.length === 0
    ) {
      this.setState({ saveInvoiceCheck: true });
      this.setState({
        saveInvoiceMessage: "Please set Product Details to proceed",
      });
    } else if (
      this.state.invoiceItems.length !== 0 &&
      this.state.saveInvoiceCustomerCheck === false
    ) {
      this.setState({ saveInvoiceCheck: true });
      this.setState({
        saveInvoiceMessage: "Please set Customer Details to proceed",
      });
    } else {
      this.props.history.push({
        pathname: "/app/shop/invoice/create/save",
        state: [this.state.invoiceItems, this.state.total, this.state.customer],
      });
    }
  };

  onSearchCustomerClick = () => {
    //document.getElementById("list-search-data").blur();
    this.setState({ saveInvoiceCheck: false });
    getCustomerByShortname(this.state.searchNameKey).then((res) => {
      try {
        if (res.data.isDeleted) {
          this.setState({ searchCustomerKey: true });
        } else {
          this.setState({ customer: res.data[0] });
          this.setState({ customerName: this.state.customer.name });
          this.setState({ customerArea: this.state.customer.area });
          this.setState({ saveInvoiceCustomerCheck: true });
          this.setState({ searchCustomer: true });
          var productField = document.getElementById("invoice-search-product");
          document.getElementById("list-search-data-by-name").value='';

          if (productField != undefined) {
            productField.focus();
          }
        }
      } catch (error) {
        this.setState({ searchCustomerKey: true });
      }
    });
  };
  onSearchCustomerClickByName = () => {
    debugger
    //document.getElementById("list-search-data").blur();
    this.setState({ saveInvoiceCheck: false });
    getCustomerByName(this.state.searchCustomerName).then((res) => {
      try {
        if (res.data.isDeleted) {
          this.setState({ searchCustomerKey: true });
        } else {
          this.setState({ customer: res.data[0] });
          this.setState({ customerName: this.state.customer.name });
          this.setState({ customerArea: this.state.customer.area });
          this.setState({ saveInvoiceCustomerCheck: true });
          this.setState({ searchCustomer: true });
          var productField = document.getElementById("invoice-search-product");
          document.getElementById("list-search-data").value='';
          if (productField != undefined) {
            productField.focus();
          }
        }
      } catch (error) {
        this.setState({ searchCustomerKey: true });
      }
    });
  };

  onSearchProductClick = () => {
    getSingleProductByShortcode(this.state.searchProductKey).then((res) => {
      try {
        if (res.data.isDeleted) {
          this.setState({ searchKey: true });
        } else {
          this.setState({ productData: res.data });
          this.setState({ searchProduct: true });
          document.getElementById("search-result-item-selling-price").focus();
        }
      } catch (error) {
        this.setState({ searchKey: true });
      }
    });
  };
  onSearchProductClickByName = () => {
    getSingleProductByName(this.state.searchProductName).then((res) => {
      try {
        if (res.data.isDeleted) {
          this.setState({ searchKey: true });
        } else {
          this.setState({ productData: res.data });
          this.setState({ searchProduct: true });
          document.getElementById("search-result-item-selling-price").focus();
        }
      } catch (error) {
        this.setState({ searchKey: true });
      }
    });
  };

  onEnterSellingPrice = () => {
    document.getElementById("search-result-item-qty").focus();
  };

  render() {
    if (this.state.isLoading === true) {
      return <div>Loading ...</div>;
    }
    return (
      <div className="admin-content mx-auto">
        {this.state.invoiceItems == null && this.handleInvoiceItems}
        <div className="w-100 d-flex justify-content-between">
          <h4>Create Invoice</h4>
          <h4>Total : {this.state.total}</h4>
          <AnchorTag
            link="/app/shop/invoice/list"
            className="btn btn-primary"
            itemValue="Back to Invoice List"
          ></AnchorTag>
        </div>
        <div>
          <div className="container-fluid ">
            <div className="row ">
              <hr className="col-12" />
              <div className="col-3 border-right">
                <div className="row">
                  <div className="col-12">
                    <h6 className="text-center">
                      <b>Set Customer Details</b>
                    </h6>
                  </div>
                </div>

                <div className="row">
                  <form onSubmit={this.onSubmitHndl} className="w-100 d-flex">
                    <div className="col-6">
                      <InputWithSuggestionCustomerCode inputId="list-search-data" placeholder="search by code" action={this.handleChangeSearchNameKey} inputclassname="form-control form-control-sm"/>
                    </div>
                    <div className="col-6">
                      <InputWithSuggestionCustomerName inputId="list-search-data-by-name" placeholder="search by name" action={this.handleChangeSearchCustomerName} inputclassname="form-control form-control-sm"/>
                    </div>
                  </form>
                  <div className="col-12">
                    {this.state.searchCustomerKey && (
                      <div>
                        <h6 className="text-danger">User Not Found!</h6>
                      </div>
                    )}
                  </div>
                </div>
                {this.state.searchCustomer && (
                  <div className="row">
                    <div className="col-6">
                      <div className="form-group">
                        <label>Customer Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={this.state.customerName}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label>Area</label>
                        <input
                          type="text"
                          className="form-control"
                          value={this.state.customerArea}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                )}
                {!this.state.searchCustomer && (
                  <div className="row">
                    <div className="col-6">
                      <div className="form-group">
                        <label>Customer Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value=" Name"
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label>Area</label>
                        <input
                          type="text"
                          className="form-control"
                          value=" Area"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="col-9">
                <div className="col-12 list-table-invoice-create">
                  {/* <Table className="table table-stripped" allowAction={false} columnList={this.invoiceColumnList} tableData={this.state.invoiceItems} actionLinkPrefix=""></Table> */}
                  <table className="table">
                    <thead className="thead-dark">
                      <tr>
                        {this.invoiceColumnList.map((value, index) => {
                          return <th key={index}>{value}</th>;
                        })}
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.invoiceItems.map((invoiceItem, index) => {
                        return (
                          <tr key={index}>
                            <td>{invoiceItem.id}</td>
                            <td>{invoiceItem.itemCode}</td>
                            <td className="aradana-font">{invoiceItem.name}</td>
                            <td>{invoiceItem.description}</td>
                            <td>{invoiceItem.count}</td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                id="price"
                                placeholder={invoiceItem.sellingPrice}
                                onChange={(e) =>
                                  this.handlePriceChange(e, index)
                                }
                                onKeyUp={(ev) => {
                                  if (ev.key === "Enter") {
                                    ev.target.blur();
                                  }
                                }}
                              />
                            </td>
                            <td>
                              {invoiceItem.count * invoiceItem.sellingPrice}.00
                            </td>
                            <td>
                              <button
                                className="btn btn-danger"
                                onClick={() => this.removeItem(invoiceItem.id)}
                              >
                                {" "}
                                Remove
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                      <tr>
                        <td>Total</td>
                        <td>{this.state.total}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="col-6">
                  <div className="form-group">
                    <Button
                      id="proceed"
                      className="btn btn-sm btn-warning w-100"
                      text="Proceed"
                      onClick={this.saveInvoice}
                    />
                  </div>
                </div>
                {this.state.saveInvoiceCheck && (
                  <div className="text-danger">
                    {this.state.saveInvoiceMessage}
                  </div>
                )}
              </div>
            </div>
            <div
              className="row"
              style={{
                height: "1px",
                margin: "5px",
                backgroundColor: "rgb(110, 110, 110,0.2)",
              }}
            ></div>
            <form onSubmit={this.onSubmitHndl} className="w-100 d-flex">
              <div className="row w-100 d-flex">
                {/* <div className="col-3">
                  <InputFormGroup
                     inputid="invoice-search-product"
                    labelClassName="sr-only"
                    inputclassname="form-control  form-control-sm"
                    placeholder="Product Code"
                    onChange={this.handleChangeSearchProductKey}
                  />
                </div>
                <div className="col-2">
                  <Button
                    className="btn btn-sm btn-success w-75"
                    text="Search"
                    onClick={this.onSearchProductClick}
                  />
                </div> */}
                {/* <InputWithSuggestion productKey = {this.state.searchProductKey} inputId="invoice-search-product"  placeholder="Product Code" inputclassname="form-control  form-control-sm"  InputOnChange={this.handleChangeSearchProductKey} ></InputWithSuggestion> */}
                <div className="d-flex">
                  <InputWithSuggestionProductCode
                    fieldType="productCode"
                    action={this.handleChangeSearchProductKey}
                    placeholder="search by code"
                    inputId="invoice-search-product"
                    inputclassname="form-control  form-control-sm mb-1"
                  />
                  <InputWithSuggestionProductName
                    fieldType="productName"
                    action={this.handleChangeSearchProductName}
                    placeholder="search by name"
                    inputId="invoice-search-product-by-name"
                    inputclassname="form-control  form-control-sm mb-1 ml-3"
                  />
                </div>
                <h6 className="ml-4">
                  <b>Set Products Details</b>
                </h6>

                <div className="col-5">
                  {this.state.searchKey && (
                    <div>
                      <h6 className="text-danger">Product Not Found!</h6>
                    </div>
                  )}
                </div>
                <div className="d-flex">
                  <b>show buying Price</b>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    Checked={this.state.buyingPriceVisible}
                    onChange={() => this.handlebuyingPriceVisible()}
                  />
                </div>
              </div>
            </form>
            <div className="row invoice-product-add-table">
              <table className="table ">
                <thead className="thead-dark fixed">
                  <tr>
                    {this.columnList.map((field, index) => {
                      return <th key={index}>{field}</th>;
                    })}
                  </tr>
                </thead>
                {this.state.searchProduct &&
                  this.state.productData.map((data, index) => {
                    console.log(data);
                    return (
                      <tbody key={index}>
                        <tr>
                          <td>{data.id}</td>
                          <td>{data.itemCode}</td>
                          <td className="aradana-font">{data.name}</td>
                          {/* <td>{data.description}</td> */}
                          <td>{data.qty}</td>
                          <td
                            style={{
                              backgroundColor: this.state.buyingPriceVisible
                                ? "white"
                                : "black",
                            }}
                          >
                            {data.buyingPrice}
                          </td>
                          <td>
                            <input
                              id="search-result-item-selling-price"
                              defaultValue={(
                                Math.round(data.sellingPrice * 100) / 100
                              ).toFixed(2)}
                              onChange={(e) =>
                                (data.sellingPrice = e.target.value)
                              }
                              onKeyUp={(ev) => {
                                if (ev.key === "Enter") {
                                  ev.target.blur();
                                  this.onEnterSellingPrice();
                                }
                              }}
                              className="form-control w-50"
                            />
                          </td>
                          <td>{data.measurement}</td>

                          <td>
                            <form
                              onSubmit={this.checkItem(data)}
                              className="d-flex"
                            >
                              <input
                                id="search-result-item-qty"
                                type="number"
                                placeholder="1"
                                defaultValue={1}
                                form-control
                                w-50
                                className="form-control w-50"
                                min={1}
                                max={data.qty}
                                onChange={this.handleChangeCount}
                              />
                              &nbsp;
                              <button
                                className="button-add btn btn-info"
                                type="submit"
                              >
                                Add
                              </button>
                            </form>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}

                {!this.state.searchProduct &&
                  this.state.data.map((data, index) => {
                    return (
                      <tbody key={index}>
                        <tr>
                          <td>{data.id}</td>
                          <td>{data.itemCode}</td>
                          <td className="aradana-font">{data.name}</td>
                          {/* <td>{data.description}</td> */}
                          <td>{data.qty}</td>
                          <td
                            style={{
                              backgroundColor: this.state.buyingPriceVisible
                                ? "white"
                                : "black",
                            }}
                          >
                            {data.buyingPrice}
                          </td>
                          <td>
                            <input
                              defaultValue={(
                                Math.round(data.sellingPrice * 100) / 100
                              ).toFixed(2)}
                              onChange={(e) =>
                                (data.sellingPrice = e.target.value)
                              }
                              onKeyUp={(ev) => {
                                if (ev.key === "Enter") {
                                  ev.target.blur();
                                  this.onEnterSellingPrice();
                                }
                              }}
                              className="form-control w-50"
                            />
                          </td>
                          <td>{data.measurement}</td>

                          <td>
                            <form
                              onSubmit={this.checkItem(data)}
                              className="d-flex"
                            >
                              <input
                                type="number"
                                placeholder="1"
                                defaultValue={1}
                                className="form-control w-50"
                                min={1}
                                max={data.qty}
                                onChange={this.handleChangeCount}
                              />
                              &nbsp;
                              <button
                                className="button-add btn btn-info"
                                type="submit"
                              >
                                Add
                              </button>
                            </form>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
              </table>
            </div>
          </div>
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

export default withRouter(InvoiceForm);
