import React, {Component} from "react";
import AnchorTag from "../../components/Anchortag";
import Button from "../Button";
import InputFormGroup from "../input/InputFormGroup";
import SelectFormGroup from "../input/SelectFormGroup";
import SearchDataTable from "../table/SearchDataTable";
import Table from "../table/Table";
import { getProductList } from "../../context/Product";
import { getAllCustomers, getCustomer } from "../../context/Customer";



class InvoiceForm extends Component{
    constructor(props){
        super(props);
        this.columnList = ["S/N","ItemCode", "Name", "Description", "QTY", "Selling Price(LKR)", "Val. of QTY(LKR)", "Select Quantity"];

        this.invoiceColumnList = ["S/N","ItemCode", "Name", "Description", "QTY",'Price', "Total"];
        this.invoiceTableData = []

        this.state = {
            isLoading:true,
            data: [],
            customerData : [],
            count : 1,
            item:[],
            customerID : '1',
            customerName:'',
            customerArea:''
          }

        this.handleChangeCount = this.handleChangeCount.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCustomerId= this.handleCustomerId.bind(this)
    }

    handleChangeCount(e){
        this.setState({count:e.target.value})
    }

    handleCustomerId(e){
        this.setState({customerID: e.target.value})
    }

    

    componentDidMount(){
        getProductList().then(c =>{
            if(c != undefined){
                this.setState({isLoading:false})
                this.setState({data:c.data})
                //console.log(this.state.data)
            }
        });
        getAllCustomers().then(c => {
            if(c != undefined){
                this.setState({isLoading:false})
                this.setState({customerData:c.data})
                //console.log(this.state.customerData)
            }
        })
        
        
        
    }

    componentDidUpdate(){
        getCustomer(this.state.customerID).then(c => {
            this.setState({customerName: c.data.name, customerArea:c.data.area})
        })
    }

    handleSubmit(){
        console.log(this.state.item)
        console.log(this.state.count)
    }





    render(){
        // if(this.state.isLoading===true){
        //     return(
        //         <div>
        //             Loading ...
        //         </div>
        //     )
        // }
        return (
            <div className="admin-content mx-auto">
               <div className="w-100 mb-5">
                    <AnchorTag link="/app/shop/invoice/list" className="btn btn-sm btn-primary float-right" itemValue="Back to Invoice List"></AnchorTag>
                    <h4>Create Invoice</h4>
                </div>
                <div className="w-100">
                    <div className="container-fluid">
                        <div className="row">
                        <div className="col-12">
                                <div className="form">
                                    <label className='mb-2'>Select Customer ID</label>
                                    <select onChange={this.handleCustomerId}>
                                        {
                                            this.state.customerData.map((customer, index) => {
                                                return (
                                                    
                                                    <option key={index} value={customer.id}>{customer.id}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>

                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                <label className="mb-2">Customer Name</label>
                                <input type="text" className="form-control" value={this.state.customerName} readOnly/>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                <label className="mb-2">Area</label>
                                <input type="text" className="form-control" value={this.state.customerArea} readOnly/>
                                </div>
                            </div>

                            <div className="col-12">
                               <hr/>
                            </div>

                            <div className="col-6">
                                <div className="form-group">
                                    <Button className="btn btn-sm btn-success w-100" text="Add Item" dataToggle="modal" dataTarget="#exampleModalCenter"/>
                                </div>
                            </div>
                        
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
                                    <Button className="btn btn-sm btn-warning w-100" text="Save Invoice"/>
                                </div>
                            </div>
                        </div>
                        {/* Modal */}
                        <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div className="modal-dialog modal-xl " role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalCenterTitle">Search & Add Product</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="form-row mb-5 modal-search-box">
                                            <div className="col-12">
                                                <p><b>Search Box</b></p>
                                            </div>
                                            <div className="col-3">
                                                <InputFormGroup labelClassName="sr-only" inputclassname="form-control form-control-sm" placeholder="Product Name"/>
                                            </div>
                                            <div className="col-3">
                                                <InputFormGroup labelClassName="sr-only" inputclassname="form-control  form-control-sm" placeholder="Product Code"/>
                                            </div>
                                            {/* <div className="col-3">
                                                <SelectFormGroup labelClassName="sr-only" placeholder="Category" selectClassName="custom-select custom-select-sm mr-sm-2" selectData={this.productCategory}/>
                                            </div> */}
                                            <div className="col-3">
                                                <Button className="btn btn-sm btn-warning w-75" text="Search"/>
                                            </div>
                                            
                                        </div>
                                        <div className="w-100">
                                            {/* <SearchDataTable className="table table-sm search-tb-font table-striped" columnList={this.columnList} tableData={this.state.data} actionLinkPrefix=""/> */}
                                            <table className="table">
                                            <thead className="thead-dark">
                                                <tr>
                                                {this.columnList.map((value, index) => {
                                                    return (       
                                                            <th  key={index}>{value}</th>   
                                                    )
                                                })}
                                                 <th></th>
                                                 </tr>
                                                 </thead>
                                             
                                                {this.state.data.map((data,index) => {
                                                    return (
                                                        <tbody  key={index}>
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
                                                                    this.setState({item: [data]})
                                                                 }}/>
                                                                    <button type='submit' >Add</button>
                                                                </form>
                                                            </td>
                                                            <td></td>            
                                                            </tr>
                                                
                                                            </tbody>
                                                            
                                                    )
                                                })}
                
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        ) 
    }
}

export default InvoiceForm;