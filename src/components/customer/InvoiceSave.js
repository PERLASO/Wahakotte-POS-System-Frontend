import React, { useState } from 'react'
import InputFormGroup from "../input/InputFormGroup";

export default function InvoiceSave(props) {
    const [invoiceItems, setinvoiceItems] = useState(props.location.state[0]);
    const [total, settotal] = useState(props.location.state[1])
    const [customer, setcustomer] = useState(props.location.state[2])

    return (
        <div className='container'>
            <h4 className='text-center pb-5'>Wijerathna Marketing Service</h4>
            <div className="container">
                <div className="row">
                    <div className="col mb-3">
                        <div className='row p-1'>
                            <div className='col'>
                                Date
                            </div>
                            <div className='col'>
                                <input type="text" className="form-control" value={'2022/02/22'} readOnly/>
                            </div>
                        </div>
                        <div className='row p-1'>
                            <div className='col'>
                                Bill No
                            </div>
                            <div className='col'>
                            <input type="text" className="form-control" placeholder="Enter Bill No" />
                            </div>
                        </div>
                        <div className='row p-1'>
                            <div className='col'>
                                Customer ID
                            </div>
                            <div className='col'>
                            <input type="text" className="form-control" value={customer.id} readOnly/>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className='row p-1'>
                            <div className='col'>
                                Customer Name
                            </div>
                            <div className='col'>
                                <input type="text" className="form-control" value={customer.name} readOnly/>
                            </div>
                        </div>
                        <div className='row p-1'>
                            <div className='col'>
                                Area
                            </div>
                            <div className='col'>
                            <input type="text" className="form-control" value={customer.area} readOnly/>
                            </div>
                        </div>
                        <div className='row p-1'>
                            <div className='col'>
                                T/N
                            </div>
                            <div className='col'>
                            <input type="text" className="form-control" value={0} readOnly/>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <table className='table'>

                <thead className='thead-dark'>
                    <tr>
                        <th>S/N</th>
                        <th>ItemCode</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>QTY</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {invoiceItems.map((invoiceItem, index) => {
                        return (

                            <tr key={index}>
                                <td>{invoiceItem.id}</td>
                                <td>{invoiceItem.itemCode}</td>
                                <td>{invoiceItem.name}</td>
                                <td>{invoiceItem.description}</td>
                                <td>{invoiceItem.count}</td>
                                <td>{invoiceItem.sellingPrice}</td>
                                <td>{invoiceItem.count * invoiceItem.sellingPrice}</td>

                            </tr>

                        )
                    })}
                    <tr>

                    <td className='font-weight-bold '>Grand Total</td>
                    <td className='font-weight-bold '>{total}</td>

                    </tr>

                   

                </tbody>
            </table>
            <button className='btn btn-success m-1'> Save & Print </button>
            <button className='btn btn-primary m-1'> Save </button>
        </div>
    )
}
