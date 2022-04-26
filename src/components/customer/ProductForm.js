import React, { Component } from "react";
import AnchorTag from "../../components/Anchortag";
import InputFormGroup from "../input/InputFormGroup";
import TextAreaFormGroup from "../input/TextAreaFormGroup";
import SelectFormGroup from "../input/SelectFormGroup";
import InputNumberGroup from "../input/InputNumberGroup";
import { setProduct } from "../../context/Product";

class ProductForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            itemcode: "",
            description: '',
            sellingprice: 0,
            qty: 0,
            buyingprice: 0,
            measurement: ''

        };

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeItemCode = this.handleChangeItemCode.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleChangeSellingPrice = this.handleChangeSellingPrice.bind(this);
        this.handleChangeQty = this.handleChangeQty.bind(this);
        this.handleChangeBuyingprice = this.handleChangeBuyingprice.bind(this);
        this.handleChangeMeasurement = this.handleChangeMeasurement.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleChangeName(event) {
        this.setState({ name: event.target.value });
    }
    handleChangeItemCode(event) {
        this.setState({ itemcode: event.target.value });
    }
    handleChangeDescription(event) {
        this.setState({ description: event.target.value });
    }
    handleChangeSellingPrice(event) {
        this.setState({ sellingprice: event.target.value });
    }
    handleChangeQty(event) {
        this.setState({ qty: event.target.value });
    }
    handleChangeBuyingprice(event) {
        this.setState({ buyingprice: event.target.value });
    }
    handleChangeMeasurement(event) {
        this.setState({ measurement: event.target.value });
    }
    handleSubmit(event) {
        event.preventDefault();
        let stock= this.state.buyingprice*this.state.qty;
        let data = {
            name: this.state.name,
            itemCode: this.state.itemcode,
            description: this.state.description,
            sellingPrice: this.state.sellingprice,
            qty: this.state.qty,
            buyingPrice: this.state.buyingprice,
            stockValue: stock,
            measurement: this.state.measurement,
            isDeleted: false
            
        }
        
        setProduct(data).then(c=>{
            if(c.data === true){
                alert("Product Added!");
                this.props.history.push(`/app/shop/product/list`);
            }else{
                alert("failed !");
            }
        });;
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
                                    <InputFormGroup labelClassName="mb-2" required={true} onChange={this.handleChangeName} inputclassname="form-control" label="Name" />
                                </div>
                                <div className="col-12">
                                    <InputFormGroup labelClassName="mb-2" required={true} onChange={this.handleChangeItemCode} inputclassname="form-control capitalize-input" label="Item Code" />
                                </div>
                                <div className="col-12">
                                    <TextAreaFormGroup label="Description" required={false} onChange={this.handleChangeDescription} rows="2" />
                                </div>
                                <div className="col-6">
                                    <InputNumberGroup labelClassName="mb-2" required={true} onChange={this.handleChangeSellingPrice} inputclassname="form-control" label="Selling Price(LKR)" />
                                </div>

                                <div className="col-6">
                                    <InputNumberGroup labelClassName="mb-2" required={true} onChange={this.handleChangeQty} label="Qty." />
                                </div>
                                <div className="col-6">
                                    <InputNumberGroup labelClassName="mb-2" required={true} onChange={this.handleChangeBuyingprice} label="Buying Price(LKR)" />
                                </div>
                                <div className="col-6">
                                    <InputFormGroup labelClassName="mb-2" required={true} onChange={this.handleChangeMeasurement} label="Measurement" />
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