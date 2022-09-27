// import React, { Component } from "react";

// export default class LoadingOverlay extends Component {
//   render() {
    
//   }
// }


import React from 'react'

export default function LoadingOverlay() {
    return (
      <div className="loading-overlay">
        <div className="loading-overlay-content">
          <div className="spinner-border spinner" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <h3 className="text-light mt-3">Loading . . .</h3>
        </div>
      </div>
    );
}
