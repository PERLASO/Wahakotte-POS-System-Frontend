import React, {Component} from "react";
import AnchorTag from "../../components/Anchortag";
import Table from "../../components/table/Table";
import { getInvoiceList } from "../../context/Invoice";
import InputFormGroup from "../input/InputFormGroup";



class InvoiceList extends Component{
    constructor(props){
        super(props);
        this.columnList = ["ID", "Customer", "Invoice ID", "Total", "Paid", "Date", "Action"];
        
        

        this.state = {
            isLoading:true,
            data: [],
            tableData : []
          }
    }

    componentDidMount(){
        getInvoiceList().then(c => {
            console.log(c.data)
            if(c != undefined){
                this.setState({isLoading:false})
                this.setState({tableData:c.data})
            }
        })
    }



    render(){
        if(this.state.isLoading===true){
            return(
                <div>
                     <AnchorTag link="/app/shop/invoice/create" className="btn btn-sm btn-warning" itemValue="Create Invocie"></AnchorTag>
                </div>
            )
        }
        return (
            <div className="admin-content mx-auto">
                <div className="w-100 mb-3">
                    <AnchorTag link="/app/shop/invoice/create" className="btn btn-warning float-right" itemValue="Create Invocie"></AnchorTag>
                    <h4>Invoice List</h4>
                </div>
                <div className="row mb-2">
                    <div className="col-12">
                        <p><b>Search Invoice</b></p>
                    </div>
                    <div className="col-2">
                        <InputFormGroup id="invoiceList-customer-name-input" labelClassName="sr-only" inputclassname="form-control form-control-sm" placeholder="Customer Name"/>
                    </div>
                    <div className="col-2">
                        <InputFormGroup labelClassName="sr-only" inputclassname="form-control form-control-sm" placeholder="Invoice ID"/>
                    </div>
                    <div className="col-2">
                        <div className="form-group">
                            <input type="submit" className="btn btn-sm btn-success" value="Search"/>
                        </div>
                    </div>
                </div>
                <div className="list-table">
                <Table className="table table-striped " columnList={this.columnList} tableData={this.state.tableData} actionLinkPrefix=""></Table>
                </div>
            </div>
        ) 
    }
}

export default InvoiceList;