import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import Invoice from "./Invoice";



export default function PrintComponent(props) {
  let componentRef = useRef();

  let data = props.location.state

  return (
      <div>
        {/* component to be printed */}
        <Invoice ref={(el) => (componentRef = el)} props={data}/>

         {/* button to trigger printing of target component */}
         <ReactToPrint
          trigger={() => <button className="btn btn-info"> Print and Save Invoice</button>}
          content={() => componentRef}
        />
      </div>
  );
}