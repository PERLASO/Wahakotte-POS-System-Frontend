import React, { Component } from "react";

export default class InvoiceAdditionalRows extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowsCount: props.rowsCount,
    };
  }

  render() {
    let CounToRender = 21 - (this.state.rowsCount % 27) ;
     return Array.from({ length: CounToRender}, () => (
         <tr>
             <td style={{height:"45px"}}></td>
        </tr>
     ));
  }
}
