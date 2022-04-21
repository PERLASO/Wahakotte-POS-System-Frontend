import React, {Component} from "react";
import { getAllCustomers, getCustomer } from "../../context/Customer";
import AnchorTag from "../../components/Anchortag";
import InputFormGroup from "../../components/input/InputFormGroup";

import Table from "../../components/table/Table";


class EmployeeList extends Component{

    constructor(props){
        super(props);
        this.state = {
            customers : [],
            searchNameKey: '',
            searchKey: false,
            isLoading:true
        }
        this.columnList = ["ID", "Name", "Short Name", "Address", "Area", "Phone Number", "Action"];
        this.handleChangeSearchNameKey = this.handleChangeSearchNameKey.bind(this);            
    }

    handleChangeSearchNameKey(e){
        this.setState({searchKey: false})
        this.setState({searchNameKey: e.target.value})
    }

    handleChangeSearchAreaKey(e){
        this.setState({searchAreaKey: e.target.value})
    }

    componentDidMount(){
        getAllCustomers().then( (res) => {
            this.setState({isLoading : false})
            this.setState({customers: res.data})
            console.log(this.state.customers)
        })
    }


    onSearchClick = () => {
        getCustomer(this.state.searchNameKey).then(res => {
            try {
                if(res.data.isDeleted){
                    this.setState({searchKey: true})
                }else{
                    this.setState({customers: [res.data]})
                   
                }
                
            } catch (error) {
                this.setState({searchKey: true})
            }
            
            
        })

    }



    render(){
        return (
            <div className="admin-content mx-auto">
                <div className="w-100 mb-5">
                    <AnchorTag link="/app/shop/employee/create" className="btn btn-sm btn-warning float-right" itemValue="Create Customer"></AnchorTag>
                    <h4>Customer List</h4>
                </div>
                <div className="row mb-5">
                    <div className="col-4">
                        <p><b>Search a Customer</b></p>
                    </div>
                    <div className="col-4">
                        <InputFormGroup labelClassName="mb-2" label="" inputclassname="form-control form-control-sm"  onChange={this.handleChangeSearchNameKey} placeholder="Customer ID"/>
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
                <Table className="table table-striped" columnList={this.columnList} tableData={this.state.customers} actionLinkPrefix=""></Table>
            </div>
        ) 
    }
}

export default EmployeeList;