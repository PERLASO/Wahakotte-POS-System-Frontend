import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import Invoice from "./Invoice";

export default function InvoicePrint(props) {

  let newDate = new Date()
let date = newDate.getDate().toString();
let month = newDate.getMonth().toString();
let year = newDate.getFullYear().toString();
  let componentRef = useRef();

  let data = props.location.state;

  return (
    <div>
      {/* button to trigger printing of target component */}
      <div className="float-right">
        <ReactToPrint className="pb-12"
          trigger={() => (
            <button className="btn btn-info invoice-print-btn"> Print and Save Invoice</button>
          )}
          content={() => componentRef}

          documentTitle= {data[3] +"-"+ data[2].name+ "-"  + year +"."+ month + "."+ date}
          pageStyle ={
           ` @page { size: auto; margin: margin: 10mm ; !important; }
           @media print {
            div.page-footer {
            position: fixed;
            bottom:0mm;
            width: 100%;
            height: 50px;
            page-break-after: always;
            }
           `
          }
        />
         <Invoice ref={(el) => (componentRef = el)} props={data}  />
      </div>
    </div>
  );
}
