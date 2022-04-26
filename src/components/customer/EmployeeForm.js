import React, {Component} from "react";
import AnchorTag from "../../components/Anchortag";
import { setCustomer } from "../../context/Customer";
import InputFormGroup from "../input/InputFormGroup";



class EmployeeForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            empName: '',
            shortCode: '',
            address: '',
            area : '',
            phoneNumber: '',
        };

        this.handleChangeEmpName = this.handleChangeEmpName.bind(this);
        this.handleChangeShortCode = this.handleChangeShortCode.bind(this);
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.handleChangeArea = this.handleChangeArea.bind(this);
        this.handleChangePhoneNumber = this.handleChangePhoneNumber.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeEmpName(e){
        this.setState({empName:e.target.value})
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

    handleSubmit (event){
        event.preventDefault();
        let data = {
            name: this.state.empName,
            shortCode: this.state.shortCode,
            address: this.state.address,
            area : this.state.area,
            phoneNumber:this.state.phoneNumber,
        }

        setCustomer(data).then( res => {
            if(res.data == true){
                alert("Employee Added");
                this.props.history.push(`/app/shop/employee/list`)
            }else{
                alert("Failed")
            }
        })
        
        
    }



    render(){
        return (
            <div className="admin-content mx-auto">
                <div className="w-100 mb-5">
                    <AnchorTag link="/app/shop/employee/list" className="btn btn-primary float-right" itemValue="Back to Employee List"></AnchorTag>
                    <h4>Create Employee </h4>
                </div>
                <div className="w-75">
                    <form onSubmit={this.handleSubmit}>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <InputFormGroup labelClassName="mb-2" onChange={this.handleChangeEmpName} required={true}  inputclassname="form-control" label="Name" />
                                </div>
                                <div className="col-12">
                                    <InputFormGroup  labelClassName="mb-2" onChange={this.handleChangeShortCode} required={true}  inputclassname="form-control capitalize-input" label="Short Name"  />
                                </div>
                                <div className="col-12">
                                    <InputFormGroup  labelClassName="mb-2" onChange={this.handleChangeAddress}  required={true}  inputclassname="form-control" label="Address" />
                                </div>

                                <div className="col-6">
                                    <InputFormGroup  labelClassName="mb-2" onChange={this.handleChangeArea} required={true}  inputclassname="form-control" label="Area" />
                                </div>
                                <div className="col-6">
                                    <InputFormGroup p labelClassName="mb-2" onChange={this.handleChangePhoneNumber}  required={true}  inputclassname="form-control" label="Phone Number" />
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
        ) 
    }
}

export default EmployeeForm;