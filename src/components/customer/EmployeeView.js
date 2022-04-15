import React, {Component} from "react";
import AnchorTag from "../../components/Anchortag";
import { deleteCustomer, getCustomer } from "../../context/Customer";


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
            console.log(this.props.match.params.employeeId)
            if (c !== undefined) {
                this.setState({ data: c.data })
            }

        });

    }

    handleDelete = () => {
        deleteCustomer(this.props.match.params.employeeId).then( res => {
            if (res.data === true) {
                alert("Employee has been deleted successfully!");
                this.props.history.push(`/app/shop/employee/list`);
            } else {
                alert("failed !");
            }
        })
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
                                <div className="col-12">
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

                                <div className="col-6 mt-4">
                                    <div className="form-group">
                                        <AnchorTag className="btn btn-warning" itemValue="Back to List" link="/app/shop/employee/list"/>
                                    </div>
                                </div>
                                <div className="col-6 mt-4">

                        <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#exampleModal">
                             Delete Employee
                        </button>

                        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Are you sure you want to delete this Employee ?</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>

                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
                                        <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={this.handleDelete}>Yes</button>
                                    </div>
                                </div>
                            </div>
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