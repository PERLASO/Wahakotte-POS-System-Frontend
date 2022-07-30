import React, { Component } from "react";

export default class InvoiceAdditionalRows extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowsCount: props.rowsCount,
    };
  }

  render() {
     let CounToRender = 23 - (this.state.rowsCount % 26) ;
     return Array.from({ length: CounToRender}, () => (
         <tr>
             <td style={{height:"45px"}}></td>
        </tr>
     ));
  }
}
