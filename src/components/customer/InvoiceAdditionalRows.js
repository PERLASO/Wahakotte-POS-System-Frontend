import React, { Component } from "react";

export default class InvoiceAdditionalRows extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowsCount: props.rowsCount,
    };
  }

  render() {
    debugger
    if(this.state.rowsCount < 27) {
    let CounToRender = 23 - this.state.rowsCount;
    return Array.from({ length: CounToRender}, () => (
        <tr>
            <td style={{height:"45px"}}></td>
        </tr>
      ));
    }
    else {
        let CounToRender = 35 - ((this.state.rowsCount-26) % 35 );
    return Array.from({ length: CounToRender}, () => (
        <tr>
            <td style={{height:"35px"}}></td>
        </tr>
      ));
    }
  }
}
