import React, { Component } from "react";
import AnchorTag from "../../components/Anchortag";
import InputFormGroup from "../input/InputFormGroup";
import TextAreaFormGroup from "../input/TextAreaFormGroup";
import SelectFormGroup from "../input/SelectFormGroup";
import InputNumberGroup from "../input/InputNumberGroup";
import { setProduct } from "../../context/Product";
import Helmet from "react-helmet";
import { getMeasurementList, setMeasurement ,updateMeasurement} from "../../context/Setting";
import { getNumbereOfProducts} from "../../context/Product";

class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      itemcode: "",
      description: "",
      sellingprice: 0,
      qty: 0,
      buyingprice: 0,
      measurement: "ROLL",
      measurements: [],
      numberOfProducts: 0,
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

  componentDidMount() {
    getMeasurementList().then((res) => {
      this.setState({ measurements: res.data });
    });
    getNumbereOfProducts().then((res) => {
      this.setState({ numberOfProducts: res.data });
      console.log(res.data);
    });
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
    this.setState({ measurement: event.target.value }, () => {
      document.getElementById("submit-button").click();
    });
  }
  handleSubmit(event) {
    event.preventDefault();

    if(this.state.numberOfProducts < 1000){
    let stock = this.state.buyingprice * this.state.qty;
    let data = {
      name: this.state.name,
      itemCode: this.state.itemcode,
      description: this.state.description,
      sellingPrice: this.state.sellingprice,
      qty: this.state.qty,
      buyingPrice: this.state.buyingprice,
      stockValue: stock,
      measurement: this.state.measurement,
      isDeleted: false,
    };


    setProduct(data).then((c) => {
      if (c.data === true) {
        alert("Product Added!");
        this.props.history.push(`/app/shop/product/list`);
      }else if(c.message == "short-code-already-exist"){
        alert("Sorry Short Code already exist")
      } else {
        alert("failed !");
      }
    });
  }
}

  render() {
    return (
      <div className="admin-content mx-auto w-50">
        <div className="w-100">
          <div className="w-100 mb-2">
            <AnchorTag
              link="/app/shop/product/list"
              className="btn btn-primary float-right"
              itemValue="Back to Product List"
            ></AnchorTag>
            <h4>Create Product</h4>
          </div>
          {this.state.numberOfProducts > 990 ?  (
                <div class="alert alert-warning" role="alert">
                  You can only add more {1000 - this.state.numberOfProducts} measurements  
                </div>
        ): null}
        {this.state.numberOfProducts == 1000 ? (
                <div class="alert alert-danger" role="alert">
                  Maximum number of products reached! Can not add more products  
                </div>
        ): null}
          <form onSubmit={this.handleSubmit}>
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <InputFormGroup
                    inputid="product-create-name" 
                    labelClassName="mb-2"
                    required={true}
                    onChange={this.handleChangeName}
                    inputclassname="form-control aradana-font"
                    label="Name"
                  />
                </div>
                <div className="col-12">
                  <InputFormGroup
                    labelClassName="mb-2"
                    required={true}
                    onChange={this.handleChangeItemCode}
                    inputclassname="form-control capitalize-input"
                    label="Item Code"
                  />
                </div>
                <div className="col-12">
                  <InputFormGroup
                    labelClassName="mb-2"
                    label="Description"
                    required={true}
                    inputclassname="form-control"
                    onChange={this.handleChangeDescription}
                  />
                </div>
                <div className="col-6">
                  <InputNumberGroup
                    labelClassName="mb-2"
                    required={true}
                    onChange={this.handleChangeBuyingprice}
                    label="Buying Price(LKR)"
                  /> 
                </div>
                <div className="col-6">
                  <InputNumberGroup
                    labelClassName="mb-2"
                    required={true}
                    onChange={this.handleChangeQty}
                    label="Qty."
                  />
                </div>
                <div className="col-6">
                  <InputNumberGroup
                    labelClassName="mb-2"
                    required={true}
                    onChange={this.handleChangeSellingPrice}
                    inputclassname="form-control"
                    label="Selling Price(LKR)"
                  />
                </div>
                <div className="col-6 ">
                  <label className="mb-2 ">Measurement</label>
                  <select
                    id="select-field-measurement"
                    className="form-control"
                    required
                    onChange={this.handleChangeMeasurement}
                  >
                    <option>
                    </option>
                    {this.state.measurements.map((item, index) => {
                return (
                  <option>{item.name}</option>
                );
              })}
                  
                  </select>
                </div>

                <div className="col-12 mt-3">
                  <div className="form-group">
                    <AnchorTag
                      className="btn btn-warning"
                      itemValue="Back"
                      link="/app/shop/product/list"
                    />
                    <input
                    id="submit-button"
                      type="submit"
                      className="btn btn-success ml-3"
                      value="Submit"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <Helmet>
          <script>{`
        
        document.getElementById("product-create-name").focus();
        
    `}</script>
        </Helmet>
      </div>
    );
  }
}

export default ProductForm;
