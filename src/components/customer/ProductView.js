import React, { Component } from "react";
import AnchorTag from "../../components/Anchortag";
import { deleteProduct, getSingleProduct } from "../../context/Product";
import moment from 'moment/moment.js';
import Button from "../../components/Button";

class ProductView extends Component {
    constructor(props) {
        super(props);
        this.productDetails = "PERFECT GIFT IDEA: Works on wet, dry, Long, short, thick, curly, and straight hair. Perfect gift for Valentines Day, Mother's Day, Thanksgiving, Christmas, Anniversary and Birthday to your girlfriend, wife, mom, sister and friends. NOTE: Paddle brush is designed to have one missing pin on the bottom of the cushion. This is to help with air circulation and is not a product defect."

        this.state = {
            productId: null,
            data: []
        }
    }

    componentDidMount() {
        getSingleProduct(this.props.match.params.productId).then(c => {
            if (c !== undefined) {
                this.setState({ data: c.data })
            }

        });

    }
    handledelete = () => {

        deleteProduct(this.props.match.params.productId).then(c => {
            if (c.data === true) {
                this.props.history.push(`/app/shop/product/list`);
            } else {
                alert("failed !");
            }

        })

    }

    render() {

        return (
            <div className=" admin-content mx-auto w-50">

                <div className="w-100 mb-2">
                    <h4>Product Details</h4>
                </div>
                <div className="w-100 ">
                    <form>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <label className="mb-2">Name</label>
                                        <input type="text" className="form-control aradana-font" value={this.state.data.name} readOnly />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <label className="mb-2">Item Code</label>
                                        <input type="text" className="form-control" value={this.state.data.itemCode} readOnly />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <label className="mb-2">Description</label>
                                        <textarea className="form-control" value={this.state.data.description} rows="2" readOnly />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label className="mb-2">Last Updated</label>
                                        <input type="text" className="form-control" value={new Date(this.state.data.lastUpdated).toDateString('en-us', { year: "numeric", month: "short" })} readOnly />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label className="mb-2">Buying Price(LKR)</label>
                                        <input type="text" className="form-control" value={this.state.data.buyingPrice} readOnly />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label className="mb-2">Selling Price(LKR)</label>
                                        <input type="text" className="form-control" value={this.state.data.sellingPrice} readOnly />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label className="mb-2">Stock Amount</label>
                                        <input type="text" className="form-control" value={this.state.data.qty} readOnly />
                                    </div>
                                </div>

                                <div className="col-6">
                                    <div className="form-group">
                                        <label className="mb-2">Stock Value : <sm className="text-secondary">qty x buying Price</sm>  </label>
                                        <input type="text" className="form-control" value={this.state.data.stockValue} readOnly />
                                    </div>
                                </div>

                                <div className="col-6">
                                    <div className="form-group">
                                        <label className="mb-2">Measurement</label>
                                        <input type="text" className="form-control" value={this.state.data.measurement} readOnly />
                                    </div>
                                </div>

                                <div className="col-6 mt-4">
                                    <div className="form-group">
                                        <AnchorTag className="btn btn-warning mr-5" itemValue="Back to List" link="/app/shop/product/list" />
                                        
                                    <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#exampleModal">
                                       Product delete
                                    </button>
                                    </div>

                                </div>
                             


                            </div>
                        </div>

                    </form>



                    <div className="col-6 mt-4">
                        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Are you sure you want to delete this product ?</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>

                                    <div class="modal-footer d-flex">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
                                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.handledelete}>Yes</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
    
            
        )
    }
}

export default ProductView;