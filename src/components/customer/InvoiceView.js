import React, { useEffect, useState } from 'react'
import moment from 'moment/moment.js';
import AnchorTag from "../../components/Anchortag";
import { getInvoice } from '../../context/Invoice';

export default function InvoiceView(props) {

    const [data, setdata] = useState(0);
    const [customer, setcustomer] = useState('');
    const [status, setstatus] = useState('');
    const [total, settotal] = useState(0);
    const [credit, setcredit] = useState(0);
    const [date, setdate] = useState('');
    const [productList, setproductList] = useState([])


    let columnList = ["S/N", "ItemCode", "Name", "Description", "QTY", 'Price(LKR)', "Total(LKR)"];
    let invoiceItems; 

    useEffect(() => {
        
        getInvoice(props.match.params.id).then(c => {
            if (c !== undefined) {
                setdata(c.data.id)
                setcustomer(c.data.customer.shortCode)
                setstatus(c.data.status)
                settotal(c.data.total)
                setcredit(c.data.balancetobepaid)
                setdate(c.data.createdDate)
                setproductList(c.data.invoiceProducts)   
            }

        });
    },[])
    

    return (
        <div className="admin-content mx-auto w-50">
            <div className="w-100 mb-5">
                <h4>Invoice Details</h4>
            </div>
            <div className="w-100">
                <form>
                    <div className="container-fluid">
                        <div className="row">
                        <div className="col-12 mt-4">
                                <div className="form-group">
                                    <AnchorTag className="btn btn-warning" itemValue="Back to List" link="/app/shop/invoice/list"/>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label className="mb-2">Bill No</label>
                                    <input type="text" className="form-control"  value={data} readOnly/>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label className="mb-2">Customer Shortname</label>
                                    <input type="text" className="form-control" value={customer} readOnly/>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label className="mb-2">Status</label>
                                    <input type="text" className="form-control" value={status} readOnly/>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label className="mb-2">Total</label>
                                    <input type="text" className="form-control" value={(Math.round(total * 100) / 100).toFixed(2)} readOnly/>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label className="mb-2">Credit balance</label>
                                    <input type="text" className="form-control" value={(Math.round(credit * 100) / 100).toFixed(2)} readOnly/>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label className="mb-2">Date</label>
                                    <input type="text" className="form-control" value={moment(date).format('L')} readOnly/>
                                </div>
                            </div>
                            <label className="mb-2">Product List</label>
                            <div className="col-12 list-table-invoice-view">
                            
                                <table className='table'>
                                <thead className="thead-dark">
                                    <tr>
                                        {columnList.map((field, index) => {
                                            return (
                                                <th key={index}>{field}</th>
                                            )
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        productList.map((invoiceItem, index) => {
                                            return (

                                                <tr key={index}>
                                                    <td>{invoiceItem.id}</td>
                                                    <td>{invoiceItem.product.itemCode}</td>
                                                    <td className='aradana-font'>{invoiceItem.product.name}</td>
                                                    <td>{invoiceItem.product.description}</td>
                                                    <td>{invoiceItem.qty}</td>          
                                                    <td>{(Math.round(invoiceItem.sellingPrice * 100) / 100).toFixed(2)}</td>
                                                    <td> {(Math.round(invoiceItem.qty * invoiceItem.sellingPrice * 100) / 100).toFixed(2)}</td>
                                                   
                                                </tr>
                                            )
                                        })

                                    }
                                </tbody>
                                </table>
                            </div>
                            
                        </div>
                    </div>
                    
                </form>

            </div>
            
        </div>
    )
}
