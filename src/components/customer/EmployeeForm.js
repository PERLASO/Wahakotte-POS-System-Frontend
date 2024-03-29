import React, {Component} from "react";
import AnchorTag from "../../components/Anchortag";
import { setCustomer } from "../../context/Customer";
import InputFormGroup from "../input/InputFormGroup";
import Helmet from "react-helmet";
import { getNumbereOfCustomers} from "../../context/Customer";



class EmployeeForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            empName: '',
            shortCode: '',
            address: '',
            area : '',
            phoneNumber: '',
            numbereOfCustomers: 0,
        };

        this.handleChangeEmpName = this.handleChangeEmpName.bind(this);
        this.handleChangeShortCode = this.handleChangeShortCode.bind(this);
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.handleChangeArea = this.handleChangeArea.bind(this);
        this.handleChangePhoneNumber = this.handleChangePhoneNumber.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        getNumbereOfCustomers().then((res) => {
          this.setState({ numbereOfCustomers: res.data });
          console.log(res.data);
        });
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
        if(this.state.numbereOfCustomers < 800){
        let data = {
            name: this.state.empName,
            shortCode: this.state.shortCode,
            address: this.state.address,
            area : this.state.area,
            phoneNumber:this.state.phoneNumber,
        }
        setCustomer(data).then( res => {
            if(res.data == true){
                alert("Customer Added");
                this.props.history.push(`/app/shop/employee/list`)
            }else if(res.message == "short-code-already-exist"){
                alert("Sorry Short Code already exist")
            }
            else{
                alert("Somthing went wrong try again!")
            }
        })
    }
}

    render(){
        return (
            <div className="admin-content mx-auto w-50">
                <div className="w-100 mb-5">
                    <AnchorTag link="/app/shop/employee/list" className="btn btn-primary float-right" itemValue="Back to Customer List"></AnchorTag>
                    <h4>Create Customer </h4>
                </div>
                {this.state.numbereOfCustomers > 790 ?  (
                <div class="alert alert-warning" role="alert">
                  You can only add more {800 - this.state.numbereOfCustomers} customers  
                </div>
        ): null}
        {this.state.numbereOfCustomers == 800 ? (
                <div class="alert alert-danger" role="alert">
                  Maximum number of customers reached! Cannot add more customers  
                </div>
        ): null}
                <div className="w-100">
                    <form onSubmit={this.handleSubmit}>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <InputFormGroup inputid="customer-create-name" labelClassName="mb-2" onChange={this.handleChangeEmpName} required={true}  inputclassname="form-control" label="Name" />
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
                <Helmet>
          <script>{`
        
        document.getElementById("customer-create-name").focus();
        
    `}</script>
        </Helmet>
            </div>
        ) 
    }
}

export default EmployeeForm;