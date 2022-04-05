import React, {Component} from "react";
import AnchorTag from "../../components/Anchortag";
import { getCustomer } from "../../context/Customer";


class EmployeeView extends Component{
    constructor(props){
        super(props);
        this.productDetails = "PERFECT GIFT IDEA: Works on wet, tion and is not a product defect."
        this.state = {
            id : null,
            data : []
        }
    }

    componentDidMount() {
        getCustomer(this.props.match.params.employeeId).then(c => {
            console.log(c.data)
            if (c !== undefined) {
                this.setState({ data: c.data })
            }

        });

    }

    render(){
        return (
            <div className="admin-content mx-auto">
                <div className="w-100 mb-5">
                    <h4>Employee Details</h4>
                </div>
                <div className="w-75">
                    <form>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label className="mb-2">Name</label>
                                        <input type="text" className="form-control" value={this.state.data.name} readOnly/>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label className="mb-2">Short Name</label>
                                        <input type="text" className="form-control" value={this.state.data.shortCode} readOnly/>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label className="mb-2">Address</label>
                                        <input type="text" className="form-control" value={this.state.data.address} readOnly/>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label className="mb-2">Area</label>
                                        <input type="text" className="form-control" value={this.state.data.area} readOnly/>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label className="mb-2">Phone Number</label>
                                        <input type="text" className="form-control" value={this.state.data.phoneNumber} readOnly/>
                                    </div>
                                </div>
                                {/* <div className="col-6">
                                    <div className="form-group">
                                        <label className="mb-2">Joined At</label>
                                        <input type="text" className="form-control" value="20th April, 2021" readOnly/>
                                    </div>
                                </div> */}

                                <div className="col-12 mt-4">
                                    <div className="form-group">
                                        <AnchorTag className="btn btn-warning" itemValue="Back to List" link="/app/shop/employee/list"/>
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

export default EmployeeView;