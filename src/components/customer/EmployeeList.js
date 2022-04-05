import React, {Component, useEffect} from "react";
import { getAllCustomers } from "../../context/Customer";
import AnchorTag from "../../components/Anchortag";
import InputFormGroup from "../../components/input/InputFormGroup";
import SelectFormGroup from "../../components/input/SelectFormGroup";
import Table from "../../components/table/Table";


class EmployeeList extends Component{



    constructor(props){
        super(props);
        this.state = {
            customers : []
        }
        this.columnList = ["ID", "Name", "Short Name", "Address", "Area", "Phone Number", "Action"];

        this.roleData = [
            {"id": 1, "name": "Admin"},
            {"id": 2, "name": "Sales"},
            {"id": 3, "name": "Editor"}
        ]

                
    }

    componentDidMount(){
        getAllCustomers().then( (res) => {
            console.log(res.data)
            this.setState({customers: res.data})
        })
    }


    

    

    render(){
        return (
            <div className="admin-content mx-auto">
                <div className="w-100 mb-5">
                    <AnchorTag link="/app/shop/employee/create" className="btn btn-sm btn-warning float-right" itemValue="Create Employee"></AnchorTag>
                    <h4>Customer List</h4>
                </div>
                <div className="row mb-5">
                    <div className="col-12">
                        <p><b>Search Box</b></p>
                    </div>
                    <div className="col-2">
                        <InputFormGroup labelClassName="mb-2" label="" inputClassName="form-control form-control-sm" placeholder="Employee Email"/>
                    </div>
                    <div className="col-2">
                        <InputFormGroup labelClassName="mb-2" label="" inputClassName="form-control form-control-sm" placeholder="Employee Name"/>
                    </div>
                    <div className="col-2">
                        <SelectFormGroup selectClassName="custom-select custom-select-sm" selectData={this.roleData}/>
                    </div>
                    
                    <div className="col-2">
                        <div className="form-group">
                            <input type="submit" className="btn btn-sm btn-success" value="Search"/>
                        </div>
                    </div>
                </div>
                <Table className="table table-striped" columnList={this.columnList} tableData={this.state.customers} actionLinkPrefix=""></Table>
            </div>
        ) 
    }
}

export default EmployeeList;