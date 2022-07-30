import React, { Component } from "react";

export default class ShortcutManual extends Component {
  render() {
    return (
      <div className="p-3 pl-5 w-50">
        <h3 className="pb-3">Short Keys Manual</h3>
        <div>
          <table className="table h5">
            <thead className="thead-light">
              <tr>
                <th scope="col" className="col-3 h4 font-weight-bold">Key(s)</th>
                <th scope="col" className="h4 font-weight-bold">Description</th>
              </tr>
            </thead>
            <tbody >
              <tr>
                <td>1</td>
                <td>Focus first field in any form</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Focus Search by Code in invoice create</td>
              </tr>
              <tr>
                <td>ctrl+c</td>
                <td>Go to Create Invoice</td>
              </tr>
              <tr>
                <td>ctrl+d</td>
                <td>Go to Dashboard</td>
              </tr>
              <tr>
                <td>ctrl+p</td>
                <td>Go to Products</td>
              </tr>
              <tr>
                <td>ctrl+k</td>
                <td>Go to Customers</td>
              </tr>
              <tr>
                <td>ctrl+i</td>
                <td>Go to Invoices</td>
              </tr>
              <tr>
                <td>s</td>
                <td>Toggle switch On/Off</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
