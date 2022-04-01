import React, { Component } from "react";
import AnchorTag from "../../components/Anchortag";
import InputFormGroup from "../input/InputFormGroup";
import TextAreaFormGroup from "../input/TextAreaFormGroup";
import SelectFormGroup from "../input/SelectFormGroup";
import InputNumberGroup from "../input/InputNumberGroup";

class ProductForm extends Component {
    constructor(props) {
        super(props);
        

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert('A name was submitted: ');
        event.preventDefault();
    }

    render() {
        return (
            <div className="admin-content mx-auto">
                <div className="w-100 mb-5">
                    <AnchorTag link="/app/shop/product/list" className="btn btn-primary float-right" itemValue="Back to Product List"></AnchorTag>
                    <h4>Create Product</h4>
                </div>
                <div className="w-75">
                    <form onSubmit={this.handleSubmit}>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <InputFormGroup labelClassName="mb-2" inputClassName="form-control" label="Name" />
                                </div>
                                <div className="col-12">
                                    <InputFormGroup labelClassName="mb-2" inputClassName="form-control" label="Item Code" />
                                </div>
                                <div className="col-12">
                                    <TextAreaFormGroup label="Description" rows="2" />
                                </div>
                                <div className="col-6">
                                    <InputNumberGroup labelClassName="mb-2" inputClassName="form-control" label="Selling Price(LKR)" />
                                </div>

                                <div className="col-6">
                                    <InputNumberGroup labelClassName="mb-2" label="Qty." />
                                </div>
                                <div className="col-6">
                                    <InputNumberGroup labelClassName="mb-2" label="Buying Price(LKR)" />
                                </div>
                                <div className="col-6">
                                    <InputFormGroup labelClassName="mb-2" label="Measurement" />
                                </div>

                                {/* <div className="col-12">
                                    <div className="form-group form-check">
                                        <input type="checkbox" className="form-check-input" id="publicOnCreation"/>
                                        <label className="form-check-label" for="publicOnCreation">Make public on creation</label>
                                    </div>
                                </div> */}

                                <div className="col-12 mt-3">
                                    <div className="form-group">
                                        <AnchorTag className="btn btn-warning" itemValue="Back" link="/app/shop/product/list" />
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

export default ProductForm;