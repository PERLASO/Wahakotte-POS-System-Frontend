import React, {Component} from "react";
import { Route, Switch } from "react-router-dom";
import ShopView from "../../../components/customer/ShopView";
import ShopEdit from "../../../components/customer/ShopEdit";
import ProductCategoryList from "../../../components/customer/ProductCategoryList";
import ProductCategoryForm from "../../../components/customer/ProductCategoryForm";
import ProductCategoryView from "../../../components/customer/ProductCategoryView";
import ProductList from "../../../components/customer/ProductList";
import ProductForm from "../../../components/customer/ProductForm";
import ProductView from "../../../components/customer/ProductView";
import EmployeeList from "../../../components/customer/EmployeeList";
import EmployeeForm from "../../../components/customer/EmployeeForm";
import EmployeeView from "../../../components/customer/EmployeeView";
import InvoiceList from "../../../components/customer/InvoiceList";
import InvoiceForm from "../../../components/customer/InvoiceForm";
import ProductEdit from "../../../components/customer/ProductEdit";
import EmployeeEdit from "../../../components/customer/EmployeeEdit";
import InvoicePrint from "../../../components/customer/InvoicePrint";
import Invoice from '../../../components/customer/Invoice'
import PrintComponent from "../../../components/input/PrintComponent";
import InvoiceView from "../../../components/customer/InvoiceView";


class CustomerShopPage extends Component{
    constructor(props){
        super(props);
    }


    render(){
        return (
            <div className="w-100">
            <Switch>
                <Route exact path={`${this.props.match.path}/view`} component={ShopView}/>
                <Route exact path={`${this.props.match.path}/edit`} component={ShopEdit}/>
                <Route exact path={`${this.props.match.path}/product-category/list`} component={ProductCategoryList}/>
                <Route exact path={`${this.props.match.path}/product-category/create`} component={ProductCategoryForm}/>
                <Route exact path={`${this.props.match.path}/product-category/view/:categoryId`} component={ProductCategoryView}/>
                <Route exact path={`${this.props.match.path}/product/list`} component={ProductList}/>
                <Route exact path={`${this.props.match.path}/product/create`} component={ProductForm}/>
                <Route exact path={`${this.props.match.path}/product/view/:productId`} component={ProductView}/>
                <Route exact path={`${this.props.match.path}/product/edit/:productId`} component={ProductEdit}/>
                <Route exact path={`${this.props.match.path}/employee/list`} component={EmployeeList}/>
                <Route exact path={`${this.props.match.path}/employee/create`} component={EmployeeForm}/>
                <Route exact path={`${this.props.match.path}/employee/view/:employeeId`} component={EmployeeView}/>
                <Route exact path={`${this.props.match.path}/employee/edit/:employeeId`} component={EmployeeEdit} />
                <Route exact path={`${this.props.match.path}/invoice/list`} component={InvoiceList}/>
                <Route exact path={`${this.props.match.path}/invoice/view/:id`} component={InvoiceView}/>
                <Route exact path={`${this.props.match.path}/invoice/create`} component={InvoiceForm}/>
                <Route exact path={`${this.props.match.path}/invoice/create/save`} component={Invoice}/>
                <Route exact path={`${this.props.match.path}/invoice/create/save/print`} component={PrintComponent}/>
            </Switch>
            
        </div>
        ) 
    }
}

export default CustomerShopPage;