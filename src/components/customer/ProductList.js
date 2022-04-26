import React, {Component} from "react";
import AnchorTag from "../../components/Anchortag";
import Table from "../../components/table/Table";
import InputFormGroup from "../../components/input/InputFormGroup";
import SelectFormGroup from "../../components/input/SelectFormGroup";
import { getProductList } from "../../context/Product";

class ProductList extends Component{
    constructor(props){
        super(props);
        this.columnList = ["S/N","ItemCode", "Name", "Description", "QTY", "Selling Price(LKR)", "Val. of QTY(LKR)","Action"];
        this.tableData = [
            {"id": 1, "name": "KP", "category": "කපුරු පෙති", "price": "238.00", "stock": 20},
        ]

        this.state = {
            isLoading:true,
            data: []
          }
    }

    componentDidMount(){
        getProductList().then(c =>{
            if(c != undefined){
                this.setState({isLoading:false})
                this.setState({data:c.data})
            }
        });
        
    }

    render(){
        if(this.state.isLoading===true){
            return(
                <div>
                     <AnchorTag link="/app/shop/product/create" className="btn btn-sm btn-warning" itemValue="Create Product"></AnchorTag>    
                </div>     
            )
        }
        return (
            <div className="admin-content mx-auto">
                <div className="w-100 mb-3">
                    <AnchorTag link="/app/shop/product/create" className="btn btn-sm btn-warning float-right" itemValue="Create Product"></AnchorTag>
                    <h4>Product List</h4>
                </div>
                <div className="row mb-2">
                    <div className="ol-12">
                        <p><b>Search Product</b></p>
                    </div>
                    <div className="col-2">
                        <InputFormGroup labelClassName="mb-2" label="" inputclassname="form-control form-control-sm" placeholder="Product Name"/>
                    </div>
                    <div className="col-2">
                        <div className="form-group">
                            <input type="submit" className="w-100 btn btn-sm btn-success" value="Search"/>
                        </div>
                    </div>
                </div>
                <div className="list-table">
                <Table className="table table-striped " columnList={this.columnList} tableData={this.state.data} actionLinkPrefix=""></Table>
                </div>
            </div>
        ) 
    }
}

export default ProductList;