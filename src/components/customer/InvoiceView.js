import React, { useEffect, useState } from "react";
import moment from "moment/moment.js";
import AnchorTag from "../../components/Anchortag";
import { getInvoice } from "../../context/Invoice";
import Button from "../Button";

export default function InvoiceView(props) {
  const [data, setdata] = useState(0);
  const [customer, setcustomer] = useState([]);
  const [status, setstatus] = useState("");
  const [total, settotal] = useState(0);
  const [credit, setcredit] = useState(0);
  const [date, setdate] = useState("");
  const [productList, setproductList] = useState([]);

  let columnList = [
    "S/N",
    "ItemCode",
    "Name",
    "Description",
    "QTY",
    "Price(LKR)",
    "Total(LKR)",
  ];

  useEffect(() => {
    getInvoice(props.match.params.id).then((c) => {
      if (c !== undefined) {
        setdata(c.data.id);
        setcustomer(c.data.customer);
        setstatus(c.data.status);
        settotal(c.data.total);
        setcredit(c.data.balancetobepaid);
        setdate(c.data.createdDate);
        setproductList(c.data.invoiceProducts);
      }
    });
  }, []);

  function printInvoice() {
    let wantToSaveInvoice = false;
    let ProductListToPass = [];

    productList.map((item) => {
      debugger
      let Product = {
        buyingPrice: 0,
        count: 0,
        description: "",
        id: 0,
        itemCode: "",
        measurement: "",
        name: "",
        qty: 0,
        sellingPrice: 0,
        stockValue: 0,
      };
      Product.buyingPrice = item.product.buyingPrice;
      Product.count = item.qty;
      Product.description = item.product.description;
      Product.itemCode = item.product.itemCode;
      Product.measurement = item.product.measurement;
      Product.name = item.product.name;
      Product.qty = item.product.qty;
      Product.sellingPrice = item.sellingPrice;
      Product.stockValue = item.product.stockValue;

      ProductListToPass.push(Product);
    });

    props.history.push({
      pathname: "/app/shop/invoice/create/save",
      state: [ProductListToPass, total, customer, wantToSaveInvoice],
    });
  }

  return (
    <div className="admin-content mx-auto w-50">
      <div className="w-100">
        <h4>Invoice Details</h4>
      </div>
      <div>
        <form>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 mt-2">
                <div className="d-flex">
                  <div className="form-group">
                    <AnchorTag
                      className="btn btn-warning"
                      itemValue="Back to List"
                      link="/app/shop/invoice/list"
                    />
                  </div>
                  <div className="form-group ml-3">
                    <Button
                      id="proceed"
                      className="btn btn-primary w-100"
                      text="Print Invoice"
                      onClick={printInvoice}
                    />
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label className="mb-1">Bill No</label>
                  <input
                    type="text"
                    className="form-control"
                    value={data}
                    readOnly
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label className="mb-1">Customer Shortname</label>
                  <input
                    type="text"
                    className="form-control"
                    value={customer.shortCode}
                    readOnly
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label className="mb-1">Status</label>
                  <input
                    type="text"
                    className="form-control"
                    value={status}
                    readOnly
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label className="mb-1">Total</label>
                  <input
                    type="text"
                    className="form-control"
                    value={(Math.round(total * 100) / 100).toFixed(2)}
                    readOnly
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label className="mb-1">Credit balance</label>
                  <input
                    type="text"
                    className="form-control"
                    value={(Math.round(credit * 100) / 100).toFixed(2)}
                    readOnly
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label className="mb-1">Date</label>
                  <input
                    type="text"
                    className="form-control"
                    value={moment(date).format("L")}
                    readOnly
                  />
                </div>
              </div>
              <div className="col-12 list-table-invoice-view">
                <table className="table">
                  <thead className="thead-dark sticky-top">
                    <tr>
                      {columnList.map((field, index) => {
                        return <th key={index}>{field}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {productList.map((invoiceItem, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{invoiceItem.product.itemCode}</td>
                          <td className="aradana-font">
                            {invoiceItem.product.name}
                          </td>
                          <td>{invoiceItem.product.description}</td>
                          <td>{invoiceItem.qty}</td>
                          <td>
                            {(
                              Math.round(invoiceItem.sellingPrice * 100) / 100
                            ).toFixed(2)}
                          </td>
                          <td>
                            {" "}
                            {(
                              Math.round(
                                invoiceItem.qty * invoiceItem.sellingPrice * 100
                              ) / 100
                            ).toFixed(2)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
