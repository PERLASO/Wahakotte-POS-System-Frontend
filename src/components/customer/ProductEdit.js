import React, { Component } from "react";
import AnchorTag from "../../components/Anchortag";
import InputFormGroup from "../input/InputFormGroup";
import TextAreaFormGroup from "../input/TextAreaFormGroup";
import SelectFormGroup from "../input/SelectFormGroup";
import InputNumberGroup from "../input/InputNumberGroup";
import { setProduct } from "../../context/Customer";
import { getSingleProduct, updateProduct } from "../../context/Customer";

class ProductEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            itemcode: '',
            description: '',
            sellingprice: null,
            qty: null,
            buyingprice: null,
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
        console.log(this.state)
        let data = {
            id:this.props.match.params.productId,
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
        
      //  console.log(data)
        updateProduct(data).then(c=>{
            if(c.data === true){
                alert("Success !");
                this.props.history.push(`${this.props.match.path}/product/list`);
            }else{
                alert("Update failed !");
            }
        })
    }
    componentDidMount(){
        
        getSingleProduct(this.props.match.params.productId).then(c =>{
            if(c != undefined){
                this.setState({name:c.data.name,});
                this.setState({itemcode:c.data.itemCode})
                this.setState({description:c.data.description})
                this.setState({sellingprice:c.data.sellingPrice})
                this.setState({qty:c.data.qty})
                this.setState({buyingprice:c.data.buyingPrice})
                this.setState({measurement:c.data.measurement})
            
            }
       
        });
        
    }

    render() {
        return (
            <div className="admin-content mx-auto">
                <div className="w-100 mb-5">
                    <AnchorTag link="/app/shop/product/list" className="btn btn-primary float-right" itemValue="Back to Product List"></AnchorTag>
                    <h4>Edit Product</h4>
                </div>
                <div className="w-75">
                    <form onSubmit={this.handleSubmit}>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <InputFormGroup labelClassName="mb-2" onChange={this.handleChangeName} value={this.state.name} inputClassName="form-control" label="Name" />
                                </div>
                                <div className="col-12">
                                    <InputFormGroup labelClassName="mb-2" onChange={this.handleChangeItemCode} value={this.state.itemcode} inputClassName="form-control" label="Item Code" />
                                </div>
                                <div className="col-12">
                                    <TextAreaFormGroup label="Description" onChange={this.handleChangeDescription} value={this.state.description} rows="2" />
                                </div>
                                <div className="col-6">
                                    <InputNumberGroup labelClassName="mb-2" onChange={this.handleChangeSellingPrice} value={this.state.sellingprice} inputClassName="form-control" label="Selling Price(LKR)" />
                                </div>

                                <div className="col-6">
                                    <InputNumberGroup labelClassName="mb-2" onChange={this.handleChangeQty} value={this.state.qty} label="Qty." />
                                </div>
                                <div className="col-6">
                                    <InputNumberGroup labelClassName="mb-2" onChange={this.handleChangeBuyingprice} value={this.state.buyingprice} label="Buying Price(LKR)" />
                                </div>
                                <div className="col-6">
                                    <InputFormGroup labelClassName="mb-2" onChange={this.handleChangeMeasurement} value={this.state.measurement} label="Measurement" />
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

export default ProductEdit;