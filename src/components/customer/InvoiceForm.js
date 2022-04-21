import React, { Component } from "react";
import AnchorTag from "../../components/Anchortag";
import Button from "../Button";
import InputFormGroup from "../input/InputFormGroup";
import Table from "../table/Table";
import { getProductList, getSingleProduct } from "../../context/Product";
import { getAllCustomers, getCustomer } from "../../context/Customer";


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
            customerID: '1',
            customers:[],
            customerName: 'Customer Name',
            customerArea: 'Area',
            searchNameKey: '',
            searchProductKey:'',
            searchKey: false,
        }

        this.handleChangeCount = this.handleChangeCount.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeSearchNameKey = this.handleChangeSearchNameKey.bind(this);  
        this.handleChangeSearchProductKey = this.handleChangeSearchProductKey.bind(this);   
    }

    handleChangeCount(e) {
        this.setState({ count: e.target.value })
    }



    handleChangeSearchNameKey(e){
        this.setState({searchKey: false})
        this.setState({searchNameKey: e.target.value})
    }

    handleChangeSearchProductKey(e){
        this.setState({searchKey: false})
        this.setState({searchProductKey: e.target.value})

    }



    componentDidMount() {
        getProductList().then(c => {
            if (c != undefined) {
                this.setState({ isLoading: false })
                this.setState({ data: c.data })
                console.log(this.state.data)
            }
        });
        getAllCustomers().then(c => {
            if (c != undefined) {
                this.setState({ isLoading: false })
                this.setState({ customerData: c.data })
                //console.log(this.state.customerData)
            }
        })



    }

    handleSubmit() {
        console.log(this.state.item)
        console.log(this.state.count)
    }

    onSearchCustomerClick = () => {
        getCustomer(this.state.searchNameKey).then(res => {
            try {
                if(res.data.isDeleted){
                    this.setState({searchKey: true})
                }else{
                    this.setState({customers: [res.data]})
                    this.setState({customerName:this.state.customers[0].name})
                    this.setState({customerArea:this.state.customers[0].area})
                }          
            } catch (error) {
                this.setState({searchKey: true})
            }
            
            
        })

    }

    onSearchProductClick = () => {
        getSingleProduct(this.state.searchProductKey).then(res => {
            try {
                if(res.data.isDeleted){
                    this.setState({searchKey: true})
                }else{
                    this.setState({data: [res.data]})
                    console.log(this.state.data)
                }          
            } catch (error) {
                this.setState({searchKey: true})
            }
        })

    }





    render() {
        if(this.state.isLoading===true){
            return(
                <div>
                    Loading ...
                </div>
            )
        }
        return (
            <div className="admin-content mx-auto">
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
                                        {this.state.searchKey && <div><h6 className="text-danger">User Not Found!</h6></div>}
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

                                <div className="col-12 mt-4">
                                    <Table className="table table-stripped" allowAction={false} columnList={this.invoiceColumnList} tableData={this.state.item} actionLinkPrefix=""></Table>
                                    <table className="table table-dark w-25 float-right mt-4">
                                        <tbody>
                                            <tr>
                                                <td>Total</td>
                                                <td>25785.00</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="col-6">
                                    <div className="form-group">
                                        <Button className="btn btn-sm btn-warning w-100" text="Save Invoice" />
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
                                        <InputFormGroup labelClassName="sr-only" inputclassname="form-control  form-control-sm" placeholder="Product Code" onChange={this.handleChangeSearchProductKey}/>
                                    </div>
                                    <div className="col-2">
                                        <Button className="btn btn-sm btn-success w-75" text="Search" onClick={this.onSearchProductClick}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="table">
                                        <div className="thead-dark">
                                            <div className="tr">
                                            {this.columnList.map((value, index) => {
                                                        return (
                                                            <th key={index}>{value}</th>
                                                        )
                                                    })}
                                                    <th></th>
                                            </div>
                                        </div>
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
                                                                <form onSubmit={this.handleSubmit} >
                                                                    <input type='number' placeholder='1' inputclassname="form-control" onChange={() => {
                                                                        this.handleChangeCount;
                                                                        this.setState({ item: [data] })
                                                                    }} />
                                                                    <button type='submit' >Add</button>
                                                                </form>
                                                            </td>
                                                            <td></td>
                                                        </tr>

                                                    </tbody>

                                                )
                                            })}
                                    </div>                         
                                </div>
                        </div>
                    </div>
                </div>
        )
    }
}

export default InvoiceForm;