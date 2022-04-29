import React, { Component } from "react";
import AnchorTag from "../../components/Anchortag";
import InputFormGroup from "../input/InputFormGroup";
import InputNumberGroup from "../input/InputNumberGroup";
import { getCustomer, updateCustomer } from "../../context/Customer";

class EmployeeEdit extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            shortCode: '',
            address: '',
            area : '',
            phoneNumber: '',
        };
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeShortCode = this.handleChangeShortCode.bind(this);
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.handleChangeArea = this.handleChangeArea.bind(this);
        this.handleChangePhoneNumber = this.handleChangePhoneNumber.bind(this);
    }



    handleChangeName(e){
        this.setState({name:e.target.value})
    }

    handleChangeShortCode(e){
        this.setState({shortCode:e.target.value})
    }
    handleChangeAddress(e){
        this.setState({address:e.target.value})
    }

    handleChangeArea(e){
        this.setState({area:e.target.value})
    }

    handleChangePhoneNumber(e){
        this.setState({phoneNumber:e.target.value})
    }



    componentDidMount(){
        getCustomer(this.props.match.params.employeeId).then(res => {
            if(res !=undefined){
                //this.setState({id: res.data.id});
                this.setState({name: res.data.name});
                this.setState({shortCode: res.data.shortCode});
                this.setState({address: res.data.address});
                this.setState({area: res.data.area});
                this.setState({phoneNumber: res.data.phoneNumber})

            }
        })
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        let data = {
            id : this.props.match.params.employeeId,
            name: this.state.name,
            shortCode: this.state.shortCode,
            address: this.state.address,
            area : this.state.area,
            phoneNumber:this.state.phoneNumber,
        }

        updateCustomer(data).then(res => {
            if(res.data === true){
                alert("Success!");
                this.props.history.push(`/app/shop/employee/list`);
            } else {
                alert("Update Failed")
            }
        })
        
    }

    render() { 
        return (
            <div className="admin-content mx-auto w-50">
                <div className="w-100 mb-5">
                    <AnchorTag link="/app/shop/employee/list" className="btn btn-primary float-right" itemValue="Back to Employee List"></AnchorTag>
                    <h4>Edit Employee Details</h4>
                </div>
                <div className="w-100">
                    <form onSubmit={this.handleSubmit}>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <InputFormGroup labelClassName="mb-2" onChange={this.handleChangeName} value={this.state.name} inputclassname="form-control" label="Name" />
                                </div>
                                <div className="col-12">
                                    <InputFormGroup  labelClassName="mb-2" onChange={this.handleChangeShortCode} value={this.state.shortCode} inputclassname="form-control" label="Short Name"  />
                                </div>
                                <div className="col-12">
                                    <InputFormGroup  labelClassName="mb-2" onChange={this.handleChangeAddress} value={this.state.address} inputclassname="form-control" label="Address" />
                                </div>

                                <div className="col-6">
                                    <InputFormGroup  labelClassName="mb-2" onChange={this.handleChangeArea} value={this.state.area} inputclassname="form-control" label="Area" />
                                </div>
                                <div className="col-6">
                                    <InputFormGroup p labelClassName="mb-2" onChange={this.handleChangePhoneNumber} value={this.state.phoneNumber} inputclassname="form-control" label="Phone Number" />
                                </div>

                                <div className="col-12 mt-3">
                                    <div className="form-group">
                                        <AnchorTag className="btn btn-warning" itemValue="Cancel" link="/app/shop/employee/list" />
                                        <input type="submit" className="btn btn-success ml-3" value="Submit" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </form>
                    
                </div>

            </div>
        );
    }
}
 
export default EmployeeEdit;