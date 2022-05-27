import React, {Component} from "react";
import AnchorTag from "../../components/Anchortag";
import Table from "../../components/table/Table";
import InputFormGroup from "../../components/input/InputFormGroup";
import SelectFormGroup from "../../components/input/SelectFormGroup";
import { getProductList, getSingleProductByShortcode } from "../../context/Product";

class ProductList extends Component{
    constructor(props){
        super(props);
        this.columnList = ["S/N","ItemCode", "Name", "Description", "QTY", "Selling Price(LKR)", "Unit","Val. of QTY(LKR)","Action"];
        this.tableData = [
            {"id": 1, "name": "KP", "category": "කපුරු පෙති", "price": "238.00", "stock": 20},
        ]

        this.state = {
            isLoading:true,
            data: [],
            searchProductKey: '',
            searchKey: false,
            productData: [],
            searchProduct: false,
          }

          this.handleChangeSearchProductKey = this.handleChangeSearchProductKey.bind(this);

    }

    onSubmitHndl = e => {
        e.preventDefault();
        this.setState({ error: "Some error" });
      };

    handleChangeSearchProductKey(e) {
        this.setState({ searchKey: false })
        this.setState({ searchProductKey: e.target.value })
        this.setState({ searchProduct: false })
    }

    componentDidMount(){
        getProductList().then(c =>{
            if(c != undefined){
                this.setState({isLoading:false})
                this.setState({data:c.data})
            }
        });
        
    }

    onSearchProductClick = () => {
        getSingleProductByShortcode(this.state.searchProductKey).then(res => {
            try {
                if (res.data.isDeleted) {
                    this.setState({ searchKey: true })
                } else {
                    this.setState({ productData: res.data })
                    this.setState({ searchProduct: true })
                }
            } catch (error) {
                this.setState({ searchKey: true })
            }
        })
    }

    render(){
        if(this.state.isLoading===true){
            return(
                <div>
                     <AnchorTag link="/app/shop/product/create" className="btn  btn-warning" itemValue="Create Product"></AnchorTag>    
                </div>     
            )
        }
        return (
            <div className="admin-content mx-auto">
                <div className="w-100 mb-3">
                    <AnchorTag link="/app/shop/product/create" className="btn  btn-warning float-right" itemValue="Create Product"></AnchorTag>
                    <h4>Product List</h4>
                </div>
                <div className="row mb-2">
                    <div className="ol-12">
                        <p><b>Search Product</b></p>
                    </div>
                    <form onSubmit={this.onSubmitHndl} className="w-100 d-flex">
                    <div className="col-2">
                        <InputFormGroup inputid="list-search-data" labelClassName="mb-2" label="" inputclassname="form-control form-control-sm" placeholder="Product Code" onChange={this.handleChangeSearchProductKey}/>
                    </div>
                    <div className="col-2">
                        <div className="form-group">
                            <input type="submit" className="w-100 btn btn-sm btn-success" value="Search" onClick={this.onSearchProductClick}/>
                        </div>
                    </div>
                    </form>
                </div>
                <div className="list-table">
                    {this.state.searchProduct && <Table className="table table-striped " columnList={this.columnList} tableData={this.state.productData} actionLinkPrefix="" tableType="product"></Table> }
                    {!this.state.searchProduct &&  <Table className="table table-striped " columnList={this.columnList} tableData={this.state.data} actionLinkPrefix="" tableType="product"></Table>}
                </div>
            </div>
        ) 
    }
}

export default ProductList;