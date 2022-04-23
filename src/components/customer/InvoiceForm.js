import React, { Component } from "react";
import AnchorTag from "../../components/Anchortag";
import Button from "../Button";
import InputFormGroup from "../input/InputFormGroup";
import { getProductList, getSingleProduct } from "../../context/Product";
import { getAllCustomers, getCustomer } from "../../context/Customer";
import update from 'immutability-helper';


class InvoiceForm extends Component {
    constructor(props) {
        super(props);
        this.columnList = ["S/N", "ItemCode", "Name", "Description", "QTY", "Selling Price(LKR)", "Val. of QTY(LKR)", "Select Quantity"];
        this.invoiceColumnList = ["S/N", "ItemCode", "Name", "Description", "QTY", 'Price', "Total"];
        this.invoiceTableData = []

        this.state = {
            isLoading: true,
            data: [],
            count: 1,
            item: [],
            itemId:1,
            invoiceItems: [],
            itemcheck: false,
            itemcheckYes:false,
            customerCheck:false,
            customer: {},
            customerName: 'Customer Name',
            customerArea: 'Area',
            saveInvoiceCheck:false,
            saveInvoiceMessage:'Please set both customer and product details to proceed',
            searchNameKey: '',
            searchProductKey: '',
            searchCustomerKey: false,
            searchKey: false,
            total: 0,

        }

        this.handleChangeCount = this.handleChangeCount.bind(this);
        this.handleInvoiceItems = this.handleInvoiceItems.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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


    handleChangeSearchNameKey(e) {
        this.setState({ searchCustomerKey: false })
        this.setState({ searchNameKey: e.target.value })
    }

    handleChangeSearchProductKey(e) {
        this.setState({ searchKey: false })
        this.setState({ searchProductKey: e.target.value })

    }

    handleYes(){
        this.setState({itemcheck:false})
        this.setState({itemcheckYes:true})
        console.log(this.state.invoiceItems)
        this.handleSubmit()
    }



    componentDidMount() {
        // let session = JSON.parse(window.sessionStorage.getItem('InvoiceItems'));
        // let session2 = JSON.parse(window.sessionStorage.getItem("InvoiceTotal"))
        // if (session != null && session2 != null) {
        //     this.setState({ invoiceItems: session })
        //     this.setState({ total: session2 })
        // }
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



    handleSubmit() {
        if(!this.state.itemcheck){
            console.log(this.state.invoiceItems)
            if(this.state.itemcheckYes){
                const id = this.state.invoiceItems.findIndex((el) => el.id === this.state.itemId)
                const updatedInvoiceItems = update(this.state.invoiceItems,{$splice:[[id,1,this.state.itemId]]})
                this.setState({invoiceItems: updatedInvoiceItems})
                console.log(this.state.invoiceItems)
                this.setState({itemcheckYes:false})
            }else{
                this.setState({ invoiceItems: this.state.item})
            }
            this.setState({saveInvoiceCheck:false})
        }
        
            // window.sessionStorage.setItem("InvoiceItems", JSON.stringify(this.state.itemArray))
            // window.sessionStorage.setItem("InvoiceTotal", this.state.total)
            // this.setState({ invoiceItems: JSON.parse(window.sessionStorage.getItem('InvoiceItems'))})         
    }

    checkItem(data){
        return e =>{
            e.preventDefault()
            data['count'] = parseInt(this.state.count) 
            this.setState({itemId:data.id})
            if (!this.isItemExist(data.id)) {
                this.state.item.push(data)
                this.setState({ total: this.state.total + (data.count * data.sellingPrice) })
                // this.setState({ invoiceItems: this.state.item})
                this.handleSubmit()
                         
            }else{
                console.log('item exists')
                this.setState({ itemcheck: true })
            }
            console.log(this.state.invoiceItems)
        }
    }

    isItemExist = (item) => {
        console.log(item)
        return this.state.invoiceItems.some(function (el) {
            return el.id === item;
        });
    }

    saveInvoice = () =>{
        console.log('invoice');
        if(this.state.customerCheck==false || this.state.invoiceItems.length==0){
            this.setState({ saveInvoiceCheck: true})
        }else{
            
        }
    }



    onSearchCustomerClick = () => {
        this.setState({customerCheck:true})
        getCustomer(this.state.searchNameKey).then(res => {
            try {
                if (res.data.isDeleted) {
                    this.setState({ searchCustomerKey: true })
                } else {
                    this.setState({ customer: res.data })
                    console.log(this.state.customer)
                    this.setState({ customerName: this.state.customer.name })
                    this.setState({ customerArea: this.state.customer.area })
                    this.setState({saveInvoiceCheck:false})
                }
            } catch (error) {
                this.setState({ searchCustomerKey: true })
            }


        })

    }

    onSearchProductClick = () => {
        getSingleProduct(this.state.searchProductKey).then(res => {
            try {
                if (res.data.isDeleted) {
                    this.setState({ searchKey: true })
                } else {
                    this.setState({ data: [res.data] })
                    console.log(this.state.data)
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
                        <div className="row">
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
                                                        <td>{invoiceItem.sellingPrice}</td>
                                                        <td>{invoiceItem.count * invoiceItem.sellingPrice}</td>
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
                                        <Button className="btn btn-sm btn-warning w-100" text="Save Invoice" onClick={this.saveInvoice}/>
                                        {this.state.saveInvoiceCheck && 
                                        <div className="text-danger">{this.state.saveInvoiceMessage}</div>
                                        }
                                    </div>
                                </div>

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

                        {/* {this.state.itemcheck &&
                            <div className="row">
                                <div className="col-12">
                                    <h6 className="text-danger"> Product is has been already added to the list. Do you want to change the quntity?</h6>
                                </div>
                                <div className="col-12">
                                    <Button className="btn btn-sm btn-success" text="Yes" onClick={this.handleYes}/>     &nbsp;    &nbsp;
                                    <Button className="btn btn-sm btn-secondary" text="No" />
                                </div>


                            </div>
                        } */}

                        <div className="row">
                            <table className="table">
                                <thead className="thead-dark">
                                    <tr>
                                        {this.columnList.map((value, index) => {
                                            return (
                                                <th key={index}>{value}</th>
                                            )
                                        })}
                                    </tr>
                                </thead>
                                {this.state.data.map((data, index) => {

                                    return (
                                        <tbody key={index}>
                                            <tr>
                                                <td>{data.id}</td>
                                                <td>{data.itemCode}</td>
                                                <td>{data.name}</td>
                                                <td>{data.description}</td>
                                                <td>{data.qty}</td>
                                                <td>{data.sellingPrice}</td>
                                                <td>{data.stockValue}</td>
                                                <td>
                                                    <form onSubmit={this.checkItem(data)} >

                                                        <input className="sm" type='number' placeholder='1' inputclassname="form-control" min={1} max={data.qty} onChange={this.handleChangeCount} />
                                                        &nbsp;
                                                        <button className="button-add btn-info" type='submit'  >Add</button>
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

export default InvoiceForm;