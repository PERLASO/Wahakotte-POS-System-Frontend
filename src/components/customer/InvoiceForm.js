import React, { Component } from "react";
import AnchorTag from "../../components/Anchortag";
import Button from "../Button";
import InputFormGroup from "../input/InputFormGroup";
import InputWithSuggestionProductCode from "../input/InputWithSuggestionProductCode";
import InputWithSuggestionProductName from "../input/InputWithSuggestionProductName";
import {
  getProductList,
  getSingleProductByShortcode,
  getSingleProductByName,
} from "../../context/Product";
import {
  getAllCustomers,
  getCustomerByName,
  getCustomerByShortname,
} from "../../context/Customer";
import { withRouter } from "react-router-dom";
import Helmet from "react-helmet";
import InputWithSuggestionCustomerCode from "../input/InputWithSuggestionCustomerCode";
import InputWithSuggestionCustomerCodeInvoiceCreate from "../input/InputWithSuggestionCustomerCodeInvoiceCreate";
import InputWithSuggestionCustomerName from "../input/InputWithSuggestionCustomerName";
import InputWithSuggestionCustomerNameInvoiceCreate from "../input/InputWithSuggestionCustomerNameInvoiceCreate";

class InvoiceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [],
      productData: [],
      count: 0,
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
      searchCustomerName: "",
      searchProductKey: "",
      searchCustomerKey: false,
      searchKey: false,
      searchProduct: false,
      searchCustomer: false,
      searchByCode: true,
      total: 0,
      buyingPriceVisible: true,
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
    this.handleChangeSearchCustomerName =
      this.handleChangeSearchCustomerName.bind(this);
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
    this.setState(
      { searchCustomerKey: false, searchNameKey: e, searchCustomer: false }
    );
  }
  handleChangeSearchCustomerName(e) {
    this.setState(
      { searchCustomerKey: false, searchCustomerName: e, searchCustomer: false }
    );
  }

  handleChangeSearchProductKey(e) {
    this.setState(
      { searchKey: false, searchProductKey: e, searchProduct: false,searchByCode:true },
      () => {
        this.setState({
          productData: this.state.data.filter((data) =>
            data.itemCode.startsWith(this.state.searchProductKey.toUpperCase())
          ),
        });
        this.setState({ searchProduct: true });
      }
    );
  }

  handleChangeSearchProductName(e) {
    this.setState(
      { searchKey: false, searchProductName: e, searchProduct: false,searchByCode:false },
      () => {
        this.setState({
          productData: this.state.data.filter((data) =>
            data.description.toLowerCase().startsWith(this.state.searchProductName.toLowerCase())
          ),
        });
        this.setState({ searchProduct: true });
      }
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
      tot =tot +this.state.invoiceItems[i].sellingPrice *
          this.state.invoiceItems[i].count;
    }
    this.setState({ total: tot });

    const SavedInvoiceItems = JSON.parse(localStorage.getItem("invoiceItems"));
    SavedInvoiceItems[index].sellingPrice = e.target.value;

        localStorage.setItem("invoiceItems", JSON.stringify(SavedInvoiceItems));
        localStorage.setItem("InvoiceTotal", JSON.stringify(tot));
  }
handleCountChange(e, index) {
    let updateItem = this.state.invoiceItems[index];
    updateItem.count = e.target.value;
    this.state.invoiceItems[index] = updateItem;
    let tot = 0;
    for (let i = 0; i < this.state.invoiceItems.length; i++) {
      tot = tot +this.state.invoiceItems[i].sellingPrice *
          this.state.invoiceItems[i].count;
    }
    this.setState({ total: tot });

    const SavedInvoiceItems = JSON.parse(localStorage.getItem("invoiceItems"));
    SavedInvoiceItems[index].count = e.target.value;

        localStorage.setItem("invoiceItems", JSON.stringify(SavedInvoiceItems));
        localStorage.setItem("InvoiceTotal", JSON.stringify(tot));
}

  componentDidMount() {
    getProductList().then((c) => {
      if (c != undefined) {
        console.log(c.data)
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
    const SavedInvoiceItems = JSON.parse(localStorage.getItem("invoiceItems"));
    const InvoiceTotal = JSON.parse(localStorage.getItem("InvoiceTotal"));
    const SavedInvoiceCustomerName = localStorage.getItem("InvoiceCustomerName");
    const SavedInvoiceCustomerArea = localStorage.getItem("InvoiceCustomerArea");
    const CustomerData = JSON.parse(localStorage.getItem("CustomerData"));

    if (SavedInvoiceItems != null) {
      this.setState({ invoiceItems: SavedInvoiceItems });
      this.setState({ total: InvoiceTotal });
    }
    if (SavedInvoiceCustomerName != null) {
          this.setState({ customer: CustomerData });
          this.setState({ customerName: SavedInvoiceCustomerName });
          this.setState({ customerArea: SavedInvoiceCustomerArea });
          this.setState({ saveInvoiceCustomerCheck: true });
          this.setState({ searchCustomer: true });

          localStorage.setItem("InvoiceCustomerName", SavedInvoiceCustomerName);
          localStorage.setItem("InvoiceCustomerArea", SavedInvoiceCustomerArea);
    }
  }

  checkItem(data) {
      return async (e) => {
        e.preventDefault();
        this.setState({ itemId: data.id });

        if (this.isItemExist(data.id)) {
          let total = 0;
          this.state.invoiceItems.find((el) => {
            if (el.id === data.id) {
              el["count"] = this.state.count;
            }
            total = total + el.count * el.sellingPrice;

            this.setState({ total: total });
          });
        } else {
          data["count"] = parseFloat(this.state.count);
          await this.setState({ item: data });
          this.state.invoiceItems.push(this.state.item);
          this.setState({
            total: this.state.total + data.count * data.sellingPrice,
          });
        }
        this.setState({ saveInvoiceCheck: false });
        let itemSearchField = document.getElementById("invoice-search-product");
        itemSearchField.focus();
        document.getElementById("invoice-search-product-by-name").value = "";
        itemSearchField.value = "";
        this.setState({ searchKey: false });
        this.setState({ searchProductKey: "" });
        this.setState({ searchProduct: false });
        this.setState({ count: 0 });   
        localStorage.setItem("invoiceItems", JSON.stringify(this.state.invoiceItems));
        localStorage.setItem("InvoiceTotal", JSON.stringify(this.state.total));
        let scroll_to_bottom = document.getElementById('auto-scroll-table');
		    scroll_to_bottom.scrollTop = scroll_to_bottom.scrollHeight;
      }
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
    const SavedInvoiceItems = JSON.parse(localStorage.getItem("invoiceItems"));
    SavedInvoiceItems.find((el) => {
      if (el.id == id) {
        SavedInvoiceItems.splice(SavedInvoiceItems.indexOf(el), 1);
        localStorage.setItem("invoiceItems", JSON.stringify(SavedInvoiceItems));
        var InvoiceTotal = JSON.parse(localStorage.getItem("InvoiceTotal")) - total;
        localStorage.setItem("InvoiceTotal", JSON.stringify(InvoiceTotal));
      }
    });
  };

  clearInvoice=()=>{
    this.setState({ invoiceItems: [] });
    this.setState({ total: 0 });
    localStorage.removeItem("invoiceItems");
    localStorage.removeItem("InvoiceTotal");
  }

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
      let wantToSaveInvoice = true;
      this.props.history.push({
        pathname: "/app/shop/invoice/create/save",
        state: [
          this.state.invoiceItems,
          this.state.total,
          this.state.customer,
          wantToSaveInvoice,
        ],
      });
    }
    localStorage.removeItem("invoiceItems");
    localStorage.removeItem("InvoiceTotal");
    localStorage.removeItem("InvoiceCustomerName");
    localStorage.removeItem("InvoiceCustomerArea");
    localStorage.removeItem("CustomerData");
  };

  onSearchCustomerClick = () => {
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

          localStorage.setItem("CustomerData", JSON.stringify(res.data[0]));
          localStorage.setItem("InvoiceCustomerName", this.state.customer.name);
          localStorage.setItem("InvoiceCustomerArea", this.state.customer.area);

          var productField = document.getElementById("invoice-search-product");
          document.getElementById("list-search-data-by-name").value = "";

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
          
          localStorage.setItem("CustomerData", JSON.stringify(res.data[0]));
          localStorage.setItem("InvoiceCustomerName", this.state.customer.name);
          localStorage.setItem("InvoiceCustomerArea", this.state.customer.area);

          var productField = document.getElementById("invoice-search-product");
          document.getElementById("list-search-data").value = "";
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
    document.getElementById("search-result-item-selling-price").focus();
  };
  onSearchProductClickByName = () => {

    document.getElementById("search-result-item-selling-price").focus();
  };

  onEnterSellingPrice = () => {
    document.getElementById("search-result-item-qty").focus();
  };
  onEnterSellingPriceAllTable = (a) => {
    document.getElementById("search-result-item-qty-" + a).focus();
  };

  render() {
    if (this.state.isLoading === true) {
      return <div>Loading ...</div>;
    }
    return (
      <div className="admin-content mx-auto">
        {this.state.invoiceItems == null && this.handleInvoiceItems}
        <div className="w-100 d-flex justify-content-between">
          <h4 className="font-weight-bold">Create Invoice</h4>
          <h4>No of Items Added : {this.state.invoiceItems.length}</h4>
          <h4>Total : {( Math.round(this.state.total * 100) / 100).toFixed(2)}</h4> 
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
                      <InputWithSuggestionCustomerCodeInvoiceCreate
                        inputId="list-search-data"
                        placeholder="search by code"
                        onPressEnter={this.onSearchCustomerClick}
                        action={this.handleChangeSearchNameKey}
                        inputclassname="form-control form-control-sm"
                      />
                    </div>
                    <div className="col-6">
                      <InputWithSuggestionCustomerNameInvoiceCreate
                        inputId="list-search-data-by-name"
                        placeholder="search by name"
                        action={this.handleChangeSearchCustomerName}
                        inputclassname="form-control form-control-sm"
                        onPressEnter={this.onSearchCustomerClickByName}
                      />
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
                <div className="col-12 list-table-invoice-create" id="auto-scroll-table">
                  {/* <Table className="table table-stripped" allowAction={false} columnList={this.invoiceColumnList} tableData={this.state.invoiceItems} actionLinkPrefix=""></Table> */}
                  <table className="table">
                    <thead className="thead-dark sticky-top">
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
                            <td>{index+1}</td>
                            <td>{invoiceItem.itemCode}</td>
                            <td className="aradana-font bold">{invoiceItem.name}</td>
                            <td>{invoiceItem.description}</td>
                            <td>
                              <input
                                type="number"
                                className="form-control"
                                id="price"
                                min={0.001}
                                max={invoiceItem.qty}
                                placeholder={invoiceItem.count}
                                onChange={(e) =>
                                  this.handleCountChange(e, index)
                                }
                                onKeyUp={(ev) => {
                                  if (ev.key === "Enter") {
                                    ev.target.blur();
                                  }
                                }}
                              />
                            </td>
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
                              {(
                                Math.round(
                                  invoiceItem.count *
                                    invoiceItem.sellingPrice *
                                    100
                                ) / 100
                              ).toFixed(2)}
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
                        <td>{(Math.round(this.state.total * 100) / 100 ).toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="col-12">
                  <div className="form-group d-flex justify-content-between">
                    <Button
                      id="proceed"
                      className="btn btn-sm btn-warning w-50"
                      text="Proceed"
                      onClick={this.saveInvoice}
                    />
                    <div className="w-25 d-flex justify-content-end">
                    <Button
                      id="proceed"
                      className="btn btn-sm btn-warning w-50"
                      text="Clear"
                      onClick={this.clearInvoice}
                    />
                    </div>
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
                    onPressEnter={this.onSearchProductClick}
                    placeholder="search by code"
                    inputId="invoice-search-product"
                    inputclassname="form-control  form-control-sm mb-1"
                  />
                  <InputWithSuggestionProductName
                    fieldType="productName"
                    action={this.handleChangeSearchProductName}
                    onPressEnter={this.onSearchProductClickByName}
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
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="Check1"
                    checked={this.state.buyingPriceVisible}
                    onClick={() => this.handlebuyingPriceVisible()}
                  />
                  <label className="form-check-label text-primary" for="Check1">
                    Show Buying Price
                  </label>
                </div>
              </div>
            </form>
            <div className="row invoice-product-add-table">
              <table className="table">
                <thead className="thead-dark sticky-top">
                  <tr>
                    {this.columnList.map((field, index) => {
                      return <th key={index}>{field}</th>;
                    })}
                  </tr>
                </thead>
                {this.state.searchProduct &&
                  this.state.productData.sort(this.state.searchByCode ? (a,b) => a.itemCode.length - b.itemCode.length :(a,b) => a.description.length - b.description.length ).map((data, index) => {
                    return (
                      <tbody key={index}>
                        <tr style={{backgroundColor: this.state.invoiceItems.some(item => item.id === data.id)? "#f78f8f":"white"}}>
                          <td>{index+1}</td>

                          <td>{data.itemCode}</td>
                          <td className="aradana-font bold">{data.name}</td>
                          {/* <td>{data.description}</td> */}
                          <td>{data.qty}
                          
                          </td>
                          <td
                            style={{
                              backgroundColor: this.state.buyingPriceVisible
                                ? "white"
                                : "black",
                              color: "black",
                            }}
                          >
                            {(Math.round(data.buyingPrice * 100) / 100).toFixed(
                              2
                            )}
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
                                placeholder=""
                                className="form-control w-50"
                                step=".001"
                                min={0.001}
                                max={data.qty}
                                onChange={this.handleChangeCount}
                                onFocus={(e) => {
                                  e.target.placeholder = "";
                                  e.target.value = "";
                                }}
                                required
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
                    var a = this.state.invoiceItems;
                    return (
                      <tbody key={index}>
                        <tr style={{backgroundColor: this.state.invoiceItems.some(item => item.id === data.id)? "#f78f8f":"white"}}>
                          <td>{index+1}</td>
                          <td>{data.itemCode}</td>
                          <td className="aradana-font">{data.name}</td>
                          {/* <td>{data.description}</td> */}
                          <td>{data.qty}</td>
                          <td
                            style={{
                              backgroundColor: this.state.buyingPriceVisible
                                ? "white"
                                : "black",
                              color: "black",
                            }}
                          >
                            {(Math.round(data.buyingPrice * 100) / 100).toFixed(
                              2
                            )}
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
                                  this.onEnterSellingPriceAllTable(
                                    index.toString()
                                  );
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
                                id={
                                  "search-result-item-qty-" + index.toString()
                                }
                                type="number"
                                placeholder=""
                                className="form-control w-50"
                                step=".001"
                                min={0.001}
                                max={data.qty}
                                onChange={this.handleChangeCount}
                                onFocus={(e) => {
                                  e.target.placeholder = "";
                                  e.target.value = "";
                                }}
                                required
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
