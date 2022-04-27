import React, { Component } from "react";
import AnchorTag from "../../components/Anchortag";
import Button from "../Button";
import InputFormGroup from "../input/InputFormGroup";
import { getProductList, getSingleProductByShortcode } from "../../context/Product";
import { getAllCustomers, getCustomer } from "../../context/Customer";
import { withRouter } from 'react-router-dom';



class InvoiceForm extends Component {
    constructor(props) {
        super(props);
        this.columnList = ["S/N", "ItemCode", "Name", "Description", "QTY", "Selling Price(LKR)", "Val. of QTY(LKR)", "Select Quantity"];
        this.invoiceColumnList = ["S/N", "ItemCode", "Name", "Description", "QTY", 'Price(LKR)', "Total(LKR)"];
        this.invoiceTableData = []

        this.state = {
            isLoading: true,
            billNo: '',
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
            customerName: 'Customer Name',
            customerArea: 'Area',
            saveInvoiceCheck: false,
            saveInvoiceCustomerCheck: false,
            saveInvoiceProductCheck: false,
            saveInvoiceBillNoCheck: false,
            saveInvoiceMessage: '',
            searchNameKey: '',
            searchProductKey: '',
            searchCustomerKey: false,
            searchKey: false,
            searchProduct: false,
            total: 0,

        }

        this.handleChangeCount = this.handleChangeCount.bind(this);
        this.handleChangeBillNo = this.handleChangeBillNo.bind(this);
        this.handleInvoiceItems = this.handleInvoiceItems.bind(this);
        this.checkItem = this.checkItem.bind(this);
        this.handleChangeSearchNameKey = this.handleChangeSearchNameKey.bind(this);
        this.handleChangeSearchProductKey = this.handleChangeSearchProductKey.bind(this);
        this.handleYes = this.handleYes.bind(this);
    }

    handleChangeCount(e) {
        this.setState({ count: e.target.value })
    }

    handleInvoiceItems() {
        { this.setState({ invoiceItems: [] }) }
    }

    handleChangeBillNo(e) {
        this.setState({ billNo: e.target.value })
        this.setState({ saveInvoiceBillNoCheck: true })
    }

    handleChangeSearchNameKey(e) {
        this.setState({ searchCustomerKey: false })
        this.setState({ searchNameKey: e.target.value })
    }

    handleChangeSearchProductKey(e) {
        this.setState({ searchKey: false })
        this.setState({ searchProductKey: e.target.value })
        this.setState({ searchProduct: false })
    }

    handleYes() {
        this.setState({ itemcheck: false })
        this.setState({ itemcheckYes: true })
    }

    componentDidMount() {
        getProductList().then(c => {
            if (c != undefined) {
                this.setState({ isLoading: false })
                this.setState({ data: c.data })
            }
        });
        getAllCustomers().then(c => {
            if (c != undefined) {
                this.setState({ isLoading: false })
                this.setState({ customerData: c.data })
            }
        })
    }


    checkItem(data) {
        return async e => {
            e.preventDefault();
            this.setState({ itemId: data.id })

            if (this.isItemExist(data.id)) {
                console.log('item exists')
                let total = 0;
                this.state.invoiceItems.find((el) => {
                    if (el.id === data.id) {
                        el['count'] = this.state.count;

                    }
                    total = total + el.count * el.sellingPrice

                    this.setState({ total: total })
                })
            } else {
                data['count'] = parseInt(this.state.count)
                await this.setState({ item: data })
                this.state.invoiceItems.push(this.state.item)
                this.setState({ total: this.state.total + data.count * data.sellingPrice })
            }
            this.setState({ saveInvoiceCheck: false })
        }
    }

    isItemExist = (data) => {
        return this.state.invoiceItems.find((el) => {
            return el.id === data
        })

    }

    removeItem = (id) => {
        let total = 0;
        const items = this.state.invoiceItems.filter(el => el.id !== id)
        this.state.invoiceItems.find((el) => {
            if (el.id == id) {
                total = el.count * el.sellingPrice
            }
        })
        this.setState({ invoiceItems: items })
        this.setState({ total: this.state.total - total })
    }


    saveInvoice = () => {
        if (this.state.saveInvoiceCustomerCheck === false && this.state.invoiceItems.length === 0 && this.state.saveInvoiceBillNoCheck === false) {
            this.setState({ saveInvoiceCheck: true })
            this.setState({ saveInvoiceMessage: "Please set Product Details, Customer, and Bill Number to proceed" })
        } else if (this.state.saveInvoiceCustomerCheck === true && (this.state.invoiceItems.length === 0 && this.state.saveInvoiceBillNoCheck === false)) {
            this.setState({ saveInvoiceCheck: true })
            this.setState({ saveInvoiceMessage: "Please set Product Details and Bill Number to proceed" })
        } else if (this.state.saveInvoiceBillNoCheck === true && (this.state.saveInvoiceCustomerCheck === false && this.state.invoiceItems.length === 0)) {
            this.setState({ saveInvoiceCheck: true })
            this.setState({ saveInvoiceMessage: "Please set Customer and Product Details to proceed" })
        } else if (this.state.invoiceItems.length !== 0 && (this.state.saveInvoiceCustomerCheck === false && this.state.saveInvoiceBillNoCheck === false)) {
            this.setState({ saveInvoiceCheck: true })
            this.setState({ saveInvoiceMessage: "Please set Customer Details and Bill Number to proceed" })
        } else if ((this.state.invoiceItems.length !== 0 && this.state.saveInvoiceCustomerCheck === true) && this.state.saveInvoiceBillNoCheck === false) {
            this.setState({ saveInvoiceCheck: true })
            this.setState({ saveInvoiceMessage: "Please set Bill Number to proceed" })
        } else if ((this.state.saveInvoiceBillNoCheck === true && this.state.saveInvoiceCustomerCheck === true) && this.state.invoiceItems.length === 0) {
            this.setState({ saveInvoiceCheck: true })
            this.setState({ saveInvoiceMessage: "Please set Product Details to proceed" })
        } else if ((this.state.saveInvoiceBillNoCheck === true && this.state.invoiceItems.length !== 0) && this.state.saveInvoiceCustomerCheck === false) {
            this.setState({ saveInvoiceCheck: true })
            this.setState({ saveInvoiceMessage: "Please set Customer Details to proceed" })
        } else {
            this.props.history.push({
                pathname: '/app/shop/invoice/create/save/print',
                state: [this.state.invoiceItems, this.state.total, this.state.customer, this.state.billNo]

            })
        }
    }

    onSearchCustomerClick = () => {
        this.setState({ saveInvoiceCheck: false })
        getCustomer(this.state.searchNameKey).then(res => {
            try {
                if (res.data.isDeleted) {
                    this.setState({ searchCustomerKey: true })
                } else {

                    this.setState({ customer: res.data })
                    this.setState({ customerName: this.state.customer.name })
                    this.setState({ customerArea: this.state.customer.area })
                    this.setState({ saveInvoiceCustomerCheck: true })
                }
            } catch (error) {
                this.setState({ searchCustomerKey: true })
            }
        })
    }

    onSearchProductClick = () => {
        getSingleProductByShortcode(this.state.searchProductKey).then(res => {
            try {
                if (res.data.isDeleted) {
                    this.setState({ searchKey: true })
                } else {
                    this.setState({ productData: [res.data] })
                    this.setState({ searchProduct: true })
                }
            } catch (error) {
                this.setState({ searchKey: true })
            }
        })
    }

    render() {
        if (this.state.isLoading === true) {

            return (
                <div>
                    Loading ...
                </div>
            )
        }
        return (
            <div className="admin-content mx-auto">
                {this.state.invoiceItems == null && this.handleInvoiceItems}
                <div className="w-100 mb-5">
                    <AnchorTag link="/app/shop/invoice/list" className="btn btn-sm btn-primary float-right" itemValue="Back to Invoice List"></AnchorTag>
                    <h4>Create Invoice</h4>
                </div>
                <div className="w-200">
                    <div className="container-fluid">
                        <div className="row ">
                            <div className="col-12">
                                <div className="row">
                                    <div className='col-2 '>
                                        <h6>Bill No</h6>
                                    </div>
                                    <div className='col-4'>
                                        <InputFormGroup labelClassName="mb-2" label="" inputclassname="form-control form-control-sm" onChange={this.handleChangeBillNo} placeholder="Enter Bill No" />
                                    </div>
                                </div>
                                <div className="row p-1">
                                    <div className='col-12 '>
                                        <hr />
                                    </div>
                                </div>

                            </div>
                            <div className="col-6 border-right">
                                <div className="row">
                                    <div className="col-12">
                                        <h6 className="text-center"><b>Set Customer Details</b></h6>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <InputFormGroup labelClassName="mb-2" label="" inputclassname="form-control form-control-sm" onChange={this.handleChangeSearchNameKey} placeholder="Customer ID" />
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <input type="submit" className="btn btn-sm btn-success" value="Search" onClick={this.onSearchCustomerClick} />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        {this.state.searchCustomerKey && <div><h6 className="text-danger">User Not Found!</h6></div>}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label>Customer Name</label>
                                            <input type="text" className="form-control" value={this.state.customerName} readOnly />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label >Area</label>
                                            <input type="text" className="form-control" value={this.state.customerArea} readOnly />
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="col-6">

                                <div className="col-12">
                                    {/* <Table className="table table-stripped" allowAction={false} columnList={this.invoiceColumnList} tableData={this.state.invoiceItems} actionLinkPrefix=""></Table> */}
                                    <table className="table">
                                        <thead className="thead-dark">
                                            <tr>
                                                {this.invoiceColumnList.map((value, index) => {
                                                    return (
                                                        <th key={index}>{value}</th>
                                                    )
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
                                                        <td>{invoiceItem.name}</td>
                                                        <td>{invoiceItem.description}</td>
                                                        <td>{invoiceItem.count}</td>
                                                        <td>{invoiceItem.sellingPrice}.00</td>
                                                        <td>{invoiceItem.count * invoiceItem.sellingPrice}.00</td>
                                                        <td><button className="btn btn-danger" onClick={() => this.removeItem(invoiceItem.id)}> Remove</button></td>
                                                    </tr>
                                                )
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
                                        <Button className="btn btn-sm btn-warning w-100" text="Proceed" onClick={this.saveInvoice} />
                                    </div>
                                </div>
                                {this.state.saveInvoiceCheck &&
                                    <div className="text-danger">{this.state.saveInvoiceMessage}</div>
                                }
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-12">
                                <hr />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <h6 className="text-center"><b>Set Products Details</b></h6>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3">
                                <InputFormGroup labelClassName="sr-only" inputclassname="form-control  form-control-sm" placeholder="Product Code" onChange={this.handleChangeSearchProductKey} />
                            </div>
                            <div className="col-2">
                                <Button className="btn btn-sm btn-success w-75" text="Search" onClick={this.onSearchProductClick} />
                            </div>
                            <div className="col-12">
                                {this.state.searchKey && <div><h6 className="text-danger">Product Not Found!</h6></div>}
                            </div>
                        </div>
                        <div className="row">
                            <table className="table">
                                <thead className="thead-dark">
                                    <tr>
                                        {this.columnList.map((field, index) => {
                                            return (
                                                <th key={index}>{field}</th>
                                            )
                                        })}
                                    </tr>
                                </thead>
                                {this.state.searchProduct &&
                                    this.state.productData.map((data, index) => {

                                        return (
                                            <tbody key={index}>
                                                <tr>
                                                    <td>{data.id}</td>
                                                    <td>{data.itemCode}</td>
                                                    <td>{data.name}</td>
                                                    <td>{data.description}</td>
                                                    <td>{data.qty}</td>
                                                    <td>{data.sellingPrice}.00</td>
                                                    <td>{data.stockValue}.00</td>
                                                    <td>
                                                        <form onSubmit={this.checkItem(data)} >

                                                            <input className="sm" type='number' placeholder='1' inputclassname="form-control" min={1} max={data.qty} onChange={this.handleChangeCount} />
                                                            &nbsp;
                                                            <button className="button-add btn btn-info" type='submit'  >Add</button>
                                                        </form>
                                                    </td>
                                                </tr>

                                            </tbody>
                                        )
                                    })}

                                {!this.state.searchProduct && this.state.data.map((data, index) => {
                                    return (
                                        <tbody key={index}>
                                            <tr>
                                                <td>{data.id}</td>
                                                <td>{data.itemCode}</td>
                                                <td>{data.name}</td>
                                                <td>{data.description}</td>
                                                <td>{data.qty}</td>
                                                <td>{data.sellingPrice}.00</td>
                                                <td>{data.stockValue}.00</td>
                                                <td>
                                                    <form onSubmit={this.checkItem(data)} >

                                                        <input className="sm" type='number' placeholder='1' inputclassname="form-control" min={1} max={data.qty} onChange={this.handleChangeCount} />
                                                        &nbsp;
                                                        <button className="button-add btn btn-info" type='submit'  >Add</button>
                                                    </form>
                                                </td>
                                            </tr>
                                        </tbody>
                                    )
                                })}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(InvoiceForm);