import React, { Component } from "react";

export default class InvoiceAdditionalRows extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowsCount: props.rowsCount,
    };
  }

  render() {
    
  //   if(this.state.rowsCount < 27) {
     let a = this.state.rowsCount % 26
     let CounToRender = 23 - (this.state.rowsCount % 26) ;
     return Array.from({ length: CounToRender}, () => (
         <tr>
             <td style={{height:"45px"}}></td>
        </tr>
     ));
  }
  //   else {
  //       let CounToRender = (33 - ((this.state.rowsCount-26) % 33 ))- (Math.floor(this.state.rowsCount/33));
  //   return Array.from({ length: CounToRender}, () => (
  //       <tr>
  //           <td style={{height:"45px"}}></td>
  //       </tr>
  //     ));
  //   }
  // }
}
