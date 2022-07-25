import React, { Component } from "react";

export default class InvoiceAdditionalRows extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowsCount: props.rowsCount,
    };
  }

  render() {
    if(this.state.rowsCount > 22) {
    let CounToRender = 27 - ((this.state.rowsCount -26) % 27);
    return Array.from({ length: CounToRender}, () => (
        <tr>
            <td style={{height:"45px"}}></td>
        </tr>
      ));
    }
    else {
        let CounToRender = 22 - (this.state.rowsCount % 22);
    return Array.from({ length: CounToRender}, () => (
        <tr>
            <td style={{height:"45px"}}></td>
        </tr>
      ));
    }
  }
}
