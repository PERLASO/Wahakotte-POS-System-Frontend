import React, { Component } from "react";
import AnchorTag from "../../components/Anchortag";
import { deleteProduct, getSingleProduct } from "../../context/Customer";
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
                // alert("Product deleted!");
                this.props.history.push(`/app/shop/product/list`);
            } else {
                alert("failed !");
            }

        })
        // console.log("deleted")
        // this.props.history.push(`/app/shop/product/list`);

    }

    render() {

        return (
            <div className="admin-content mx-auto">
                <div className="w-100 mb-5">
                    <h4>Product Details</h4>
                </div>
                <div className="w-75">
                    <form>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <label className="mb-2">Name</label>
                                        <input type="text" className="form-control" value={this.state.data.name} readOnly />
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
                                        <label className="mb-2">Stock Value(LKR)</label>
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
                                        <AnchorTag className="btn btn-warning" itemValue="Back to List" link="/app/shop/product/list" />
                                    </div>


                                </div>


                            </div>
                        </div>

                    </form>



                    <div className="col-6 mt-4">

                        <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#exampleModal">
                            Product delete
                        </button>

                        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Confirm ?</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>

                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
                                        <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={this.handledelete}>Yes</button>
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