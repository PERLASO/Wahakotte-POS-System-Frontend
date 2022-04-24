import React from 'react';


class Invoice extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            invoiceItems : props.props[0],
            total:props.props[1],
            customer: props.props[2],
            billNo:props.props[3],
            checkSaved:false

        }

        const current = new Date();
        this.date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
      
    }

   


    render() { 
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
                                <input type="text" className="form-control" value={this.date} readOnly/>
                            </div>
                        </div>
                        <div className='row p-1'>
                            <div className='col'>
                                Bill No
                            </div>
                            <div className='col'>
                            <input type="text" className="form-control" value={this.state.billNo} readOnly/>
                            </div>
                        </div>
                        <div className='row p-1'>
                            <div className='col'>
                                Customer ID
                            </div>
                            <div className='col'>
                            <input type="text" className="form-control" value={this.state.customer.id} readOnly/>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className='row p-1'>
                            <div className='col'>
                                Customer Name
                            </div>
                            <div className='col'>
                                <input type="text" className="form-control" value={this.state.customer.name} readOnly/>
                            </div>
                        </div>
                        <div className='row p-1'>
                            <div className='col'>
                                Area
                            </div>
                            <div className='col'>
                            <input type="text" className="form-control" value={this.state.customer.area} readOnly/>
                            </div>
                        </div>
                        <div className='row p-1'>
                            <div className='col'>
                                T/N
                            </div>
                            <div className='col'>
                            <input type="text" className="form-control" value={this.state.customer.phoneNumber} readOnly/>
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
                    {this.state.invoiceItems.map((invoiceItem, index) => {
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
                    <td className='font-weight-bold '>{this.state.total}</td>

                    </tr>
                </tbody>
            </table>
        </div>

        );
    }
}

 
export default Invoice;