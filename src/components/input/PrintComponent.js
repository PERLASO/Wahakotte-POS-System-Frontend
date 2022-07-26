import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import ReactToPrint from "react-to-print";
import InvoiceForm from "../customer/InvoiceForm";
import InvoicePrint from "../customer/InvoicePrint";

export default function PrintComponent(props) {

    let newDate = new Date()
    let date = newDate.getDate().toString();
    let month = newDate.getMonth().toString();
    let year = newDate.getFullYear().toString();

    let componentRef = useRef();

    let history = useHistory()

    let data = props.location.state

    let today = year+'/'+month+'/'+date;

    useEffect(() => {
      document.getElementById('proceed').click();
      document.getElementById('create-invoice-btn').click();
      
    }, [])
    
  return (
    <div>
      <div>
        <ReactToPrint className="pb-12"
          trigger={() => (
            <button id="proceed" className="btn btn-info invoice-print-btn"> Print Invoice</button>
          )}
          content={() => componentRef}

          documentTitle= {data[3] +"-"+ data[2].name+ "-"  + year +"."+ month + "."+ date}
          pageStyle ={
           ` @page { size: auto; margin: 5mm ; !important;}
           @media print {
            div.page-footer {
            position: fixed; 
            width: 100%;
            height: 50px;
            page-break-after: always;
            }
            }
           `
          }
        />
         <button className="btn btn-warning invoice-print-btn ml-5" onClick={() => history.push('/app/shop/invoice/list')}> View Invoice List</button>
         <InvoicePrint ref={(el) => (componentRef = el)} props={data}  date={today}/>
      </div>
    </div>
  )
}
