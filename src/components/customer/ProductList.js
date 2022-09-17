import React, {Component} from "react";
import AnchorTag from "../../components/Anchortag";
import Table from "../../components/table/Table";
import { getProductList } from "../../context/Product";
import InputWithSuggestionProductCode from "../input/InputWithSuggestionProductCode";
import InputWithSuggestionCustomerName from "../input/InputWithSuggestionProductName";
import Helmet from "react-helmet";

class ProductList extends Component{
    constructor(props){
        super(props);
        this.columnList = ["S/N","ItemCode", "Name", "Description", "QTY","Buying Price(LKR)", "Selling Price(LKR)", "Unit","Val. of QTY(LKR)","Action"];
        this.tableData = [ ]
        this.state = {
            isLoading:true,
            data: [],
            searchProductKey: '',
            searchProductName: '',
            searchKey: false,
            productData: [],
            searchProduct: false,
            searchByCode: true
          }

          this.handleChangeSearchProductKey = this.handleChangeSearchProductKey.bind(this);
          this.handleChangeSearchProductName = this.handleChangeSearchProductName.bind(this);

    }

    onSubmitHndl = e => {
        e.preventDefault();
        this.setState({ error: "Some error" });
      };

    handleChangeSearchProductKey(e) {
        this.setState({ searchKey: false,  searchProductKey: e , searchProduct: false },
            () => {
                this.onSearchProductClick();
              }
        )  
    }
    handleChangeSearchProductName(e) {
        this.setState({ searchKey: false,  searchProductName: e , searchProduct: false },
            () => {
                this.onSearchProductNameClick();
              }
        )  
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
        this.setState({productData: this.state.data.filter(data =>data.itemCode.startsWith(this.state.searchProductKey.toUpperCase()))});
        this.setState({ searchProduct: true ,searchByCode: true});
    }
    onSearchProductNameClick = () => {
        this.setState({productData: this.state.data.filter(data =>data.description.toLowerCase().startsWith(this.state.searchProductName.toLowerCase()))});
        this.setState({ searchProduct: true, searchByCode: false });
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
                    <div className="col-4">
                        {/* <InputFormGroup inputid="list-search-data" labelClassName="mb-2" label="" inputclassname="form-control form-control-sm" placeholder="Product Code" onChange={this.handleChangeSearchProductKey}/> */}
                        <InputWithSuggestionProductCode fieldType= "productCode" action={this.handleChangeSearchProductKey} placeholder="search by code" inputId="list-search-data" inputclassname="form-control  form-control-sm mb-1"/>
                    </div>
                    <div className="col-4">
                        {/* <InputFormGroup inputid="list-search-data" labelClassName="mb-2" label="" inputclassname="form-control form-control-sm" placeholder="Product Code" onChange={this.handleChangeSearchProductKey}/> */}
                        <InputWithSuggestionCustomerName fieldType= "productName" action={this.handleChangeSearchProductName} placeholder="search by name" inputId="list-search-data-product-name" inputclassname="form-control  form-control-sm mb-1"/>
                    </div>
                    {/* <div className="col-2">
                        <div className="form-group">
                            <input type="submit" className="w-100 btn btn-sm btn-success" value="Search" onClick={this.onSearchProductClick}/>
                        </div>
                    </div> */}
                    </form>
                </div>
                <div className="list-table">
                    {this.state.searchProduct && 
                    <Table className="table table-striped " 
                    columnList={this.columnList} 
                    tableData={this.state.productData
                        .sort(this.state.searchByCode ?(a, b) => a.itemCode.localeCompare(b.itemCode) : (a, b) => a.description.localeCompare(b.description))
                        .sort(this.state.searchByCode ? (a,b) => a.itemCode.length - b.itemCode.length :(a,b) => a.description.length - b.description.length )} 
                    actionLinkPrefix="" 
                    tableType="product">
                    </Table> }
                    {!this.state.searchProduct &&  <Table className="table table-striped " columnList={this.columnList} tableData={this.state.data} actionLinkPrefix="" tableType="product"></Table>}
                </div>
                <Helmet>
          <script>{`
        
        document.getElementById("list-search-data").focus();
        
    `}</script>
        </Helmet>
            </div>
        ) 
    }
}

export default ProductList;