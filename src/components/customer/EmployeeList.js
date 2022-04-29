import React, {Component} from "react";
import { getAllCustomers, getCustomerByShortname } from "../../context/Customer";
import AnchorTag from "../../components/Anchortag";
import InputFormGroup from "../../components/input/InputFormGroup";

import Table from "../../components/table/Table";


class EmployeeList extends Component{

    constructor(props){
        super(props);
        this.state = {
            customers : [],
            customerbyshortname:[],
            searchNameKey: '',
            searchKey: false,
            isLoading:true,
            searchCustomer:false
        }
        this.columnList = ["ID", "Name", "Short Name", "Address", "Area", "Phone Number", "Action"];
        this.handleChangeSearchNameKey = this.handleChangeSearchNameKey.bind(this);            
    }

    handleChangeSearchNameKey(e){
        this.setState({searchKey: false})
        this.setState({searchNameKey: e.target.value})
        this.setState({searchCustomer: false})
    }

    handleChangeSearchAreaKey(e){
        this.setState({searchAreaKey: e.target.value})
    }

    componentDidMount(){
        getAllCustomers().then( (res) => {
            this.setState({isLoading : false})
            console.log(res.data)
            this.setState({customers: res.data})
    
        })
    }


    onSearchClick = () => {
        getCustomerByShortname(this.state.searchNameKey).then(res => {
            try {
                if (res.data.isDeleted) {
                    this.setState({ searchKey: true })
                } else {
                    this.setState({customerbyshortname: res.data})
                    this.setState({searchCustomer: true})
                }
            } catch (error) {
                this.setState({ searchKey: true })
            }
        })
    }



    render(){
        if(this.state.isLoading===true){
            return(
                <div>
                     <AnchorTag link="/app/shop/employee/create" className="btn btn-sm btn-warning" itemValue="Create Customer"></AnchorTag>   
                </div>     
            )
        }
        return (
            <div className="admin-content mx-auto">
                <div className="w-100 mb-3">
                    <AnchorTag link="/app/shop/employee/create" className="btn btn-sm btn-warning float-right" itemValue="Create Customer"></AnchorTag>
                    <h4>Customer List</h4>
                </div>
                <div className="row mb-2">
                    <div className="col-4">
                        <p><b>Search a Customer</b></p>
                    </div>
                    <div className="col-4">
                        <InputFormGroup id="customer-short-name-input" labelClassName="mb-2" label="" inputclassname="form-control form-control-sm"  onChange={this.handleChangeSearchNameKey} placeholder="Customer Short Name"/>
                    </div>       
                    <div className="col-2">
                        <div className="form-group">
                            <input type="submit" className="btn btn-sm btn-success" value="Search" onClick={this.onSearchClick}/>
                        </div>
                    </div>
                    <div className="col-8">
                    {this.state.searchKey && <div><h6 className="text-danger">User Not Found!</h6></div>}
                    </div>
                </div>
                <div className="list-table">
                    {this.state.searchCustomer && 
                    <Table className="table table-striped" columnList={this.columnList} tableData={this.state.customerbyshortname} actionLinkPrefix=""></Table>
                    }
                    {!this.state.searchCustomer && 
                     <Table className="table table-striped" columnList={this.columnList} tableData={this.state.customers} actionLinkPrefix=""></Table>
                    }
           </div>
            </div>
        ) 
    }
}

export default EmployeeList;